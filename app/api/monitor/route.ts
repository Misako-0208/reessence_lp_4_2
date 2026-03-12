import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"
import { existsSync, readFileSync } from "fs"
import path from "path"

const connectionString = process.env.NEON_DATABASE_URL
const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.PDF_FROM_EMAIL ?? "ReEssence <onboarding@resend.dev>"

const PDF_FILENAME = "symptom-diary-guide.pdf"

if (!connectionString) {
  console.warn("NEON_DATABASE_URL is not set. /api/monitor will fail until it is configured.")
}

const sql = connectionString ? neon(connectionString) : null
const resend = resendApiKey ? new Resend(resendApiKey) : null

function getPdfPath(): string {
  return path.join(process.cwd(), "public", "pdfs", PDF_FILENAME)
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!sql) {
      return NextResponse.json(
        { error: "Database is not configured" },
        { status: 500 },
      )
    }

    await sql`
      INSERT INTO leads (name, email, source, created_at)
      VALUES (${name ?? null}, ${email}, 'lp-pdf-signup', NOW())
    `

    if (resend) {
      const pdfPath = getPdfPath()
      const hasPdf = existsSync(pdfPath)
      let attachments: { filename: string; content: Buffer }[] = []
      if (hasPdf) {
        attachments = [
          {
            filename: "症状日誌ガイド.pdf",
            content: readFileSync(pdfPath),
          },
        ]
      }

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: hasPdf
          ? "【ReEssence】症状日誌ガイドPDF"
          : "【ReEssence】症状日誌ガイドへのご登録ありがとうございます",
        html: hasPdf
          ? `<p>${name ? `${name}様` : "ご登録者様"}</p><p>このたびは症状日誌ガイドPDFにお申し込みいただきありがとうございます。</p><p>PDFを添付してお送りします。ご確認ください。</p><p>ReEssence</p>`
          : `<p>${name ? `${name}様` : "ご登録者様"}</p><p>このたびは症状日誌ガイドへのご登録ありがとうございます。</p><p>PDFは準備でき次第、改めてお送りいたします。</p><p>ReEssence</p>`,
        attachments,
      })
    } else {
      console.warn("RESEND_API_KEY is not set. Lead saved but no email sent.")
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}
