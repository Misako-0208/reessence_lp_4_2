import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"
import { existsSync, readFileSync } from "fs"
import path from "path"

const connectionString = process.env.NEON_DATABASE_URL
const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.PDF_FROM_EMAIL ?? "ReEssence <onboarding@resend.dev>"

const PDF_FILENAME = "pms-care-guide.pdf"
const PDF_ATTACHMENT_NAME = "PMS対策の選び方ガイド.pdf"
const LEAD_SOURCE = "lp4"

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
      VALUES (${name ?? null}, ${email}, ${LEAD_SOURCE}, NOW())
    `

    if (resend) {
      const pdfPath = getPdfPath()
      const hasPdf = existsSync(pdfPath)
      let attachments: { filename: string; content: Buffer }[] = []
      if (hasPdf) {
        attachments = [
          {
            filename: PDF_ATTACHMENT_NAME,
            content: readFileSync(pdfPath),
          },
        ]
      }

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: hasPdf
          ? "【ReEssence】PMS対策の選び方ガイド"
          : "【ReEssence】PMS対策ガイドへのご登録ありがとうございます",
        html: hasPdf
          ? `<p>${name ? `${name}様` : "ご登録者様"}</p><p>このたびはPMS対策の選び方ガイドにお申し込みいただきありがとうございます。</p><p>漢方・サプリ・肌に貼るケアなど、代表的なPMS対策を比較したPDFを添付してお送りします。ご確認ください。</p><p>ReEssence</p>`
          : `<p>${name ? `${name}様` : "ご登録者様"}</p><p>このたびはPMS対策ガイドへのご登録ありがとうございます。</p><p>PDFは準備でき次第、改めてお送りいたします。</p><p>ReEssence</p>`,
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
