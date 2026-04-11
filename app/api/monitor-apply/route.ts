import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const connectionString = process.env.NEON_DATABASE_URL
const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.PDF_FROM_EMAIL ?? "ReEssence <onboarding@resend.dev>"

if (!connectionString) {
  console.warn("NEON_DATABASE_URL is not set. /api/monitor-apply will fail until configured.")
}

const sql = connectionString ? neon(connectionString) : null
const resend = resendApiKey ? new Resend(resendApiKey) : null

/** チャネル識別（例: instagram_ads / instagram_profile / threads）。Vercel プロジェクトごとに設定。 */
const monitorSource = process.env.MONITOR_APPLICATION_SOURCE?.trim() || "lp"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      postalCode,
      address,
      email,
      agreeSkinStop,
      agreeNotPregnant,
      agreeAppDownload,
      wearableDevice,
      smartphoneOs,
    } = body

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "氏名は必須です。" }, { status: 400 })
    }
    if (!postalCode || typeof postalCode !== "string" || !postalCode.trim()) {
      return NextResponse.json({ error: "郵便番号は必須です。" }, { status: 400 })
    }
    if (!address || typeof address !== "string" || !address.trim()) {
      return NextResponse.json({ error: "住所は必須です。" }, { status: 400 })
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "有効なメールアドレスを入力してください。" }, { status: 400 })
    }
    if (!["yes", "no", "unknown"].includes(wearableDevice)) {
      return NextResponse.json({ error: "ウェアラブルデバイスについて選択してください。" }, { status: 400 })
    }
    if (!["ios", "android", "other"].includes(smartphoneOs)) {
      return NextResponse.json({ error: "スマホのOSを選択してください。" }, { status: 400 })
    }

    if (!sql) {
      return NextResponse.json(
        { error: "データベースの設定がありません。" },
        { status: 500 },
      )
    }

    await sql`
      INSERT INTO monitor_applications (
        name, postal_code, address, email,
        agree_skin_stop, agree_not_pregnant, agree_app_download,
        wearable_device, smartphone_os, source, created_at
      ) VALUES (
        ${name.trim()}, ${postalCode.trim()}, ${address.trim()}, ${email.trim()},
        ${!!agreeSkinStop}, ${!!agreeNotPregnant}, ${!!agreeAppDownload},
        ${wearableDevice}, ${smartphoneOs}, ${monitorSource}, NOW()
      )
    `

    const toAddr = email.trim()
    if (resend) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: toAddr,
          subject: "【ReEssence】モニター応募を受け付けました",
          html: `<p>${name.trim()} 様</p>
<p>このたびはモニター募集にお申し込みいただき、ありがとうございます。</p>
<p>内容を確認のうえ、担当よりご連絡いたします。</p>
<p>本メールは送信専用です。ご返信いただいてもお答えできない場合がございます。</p>
<p>ReEssence</p>`,
        })
      } catch (mailErr) {
        console.error("[monitor-apply] Resend send failed (application still saved):", mailErr)
      }
    } else {
      console.warn("RESEND_API_KEY is not set. Monitor application saved but no confirmation email sent.")
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "送信に失敗しました。しばらくしてから再度お試しください。" },
      { status: 500 },
    )
  }
}
