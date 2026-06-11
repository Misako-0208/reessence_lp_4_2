import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"
import { existsSync, readFileSync } from "fs"
import path from "path"

const connectionString = process.env.NEON_DATABASE_URL
const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.PDF_FROM_EMAIL ?? "ReEssence <onboarding@resend.dev>"

if (!connectionString) {
  console.warn("NEON_DATABASE_URL is not set. /api/monitor-apply will fail until configured.")
}

const sql = connectionString ? neon(connectionString) : null
const resend = resendApiKey ? new Resend(resendApiKey) : null

/** チャネル識別（例: lp4-2 / instagram_ads）。未設定時はこの LP 用の既定値。 */
const monitorSource = process.env.MONITOR_APPLICATION_SOURCE?.trim() || "lp4-2"
const MONITOR_GUIDE_FILENAME = "【肌に貼るアロマシール】モニター説明資料.pdf"

function getMonitorGuidePath(): string {
  return path.join(process.cwd(), "public", "pdfs", MONITOR_GUIDE_FILENAME)
}

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
        const guidePath = getMonitorGuidePath()
        const hasGuidePdf = existsSync(guidePath)
        const attachments = hasGuidePdf
          ? [
              {
                filename: MONITOR_GUIDE_FILENAME,
                content: readFileSync(guidePath),
              },
            ]
          : []

        await resend.emails.send({
          from: fromEmail,
          to: toAddr,
          subject: "【肌に貼るアロマシール】モニターのお礼と開始の手順について",
          html: `<p>${name.trim()}様</p>
<p>モニターにご応募いただきありがとうございます。<br />ReEssenceの重田と申します。</p>
<p>モニター実施の手順を添付資料および以下にまとめました。</p>
<p>以下の流れに沿って進めていただくと、お手元にシールが届きます。所要時間は10分弱です。ぜひシールをゲットして体験してくださいね。</p>
<p><strong>STEP1: アプリのダウンロード</strong><br />
以下リンクより、ダウンロードしてください。<br />
iOSの方：<br />
<a href="https://apps.apple.com/jp/app/kaorism/id6761862893">https://apps.apple.com/jp/app/kaorism/id6761862893</a><br /><br />
Androidの方：<br />
<a href="https://play.google.com/store/apps/details?id=com.reessence.app&pli=1">https://play.google.com/store/apps/details?id=com.reessence.app&pli=1</a></p>
<p><strong>STEP2: 初期設定（3分）</strong><br />
ダウンロード後、いくつか質問が表示されますので、入力を進めてください。<br />
途中でサインイン画面（ページ最下部に「Secured by Clerk」と表示）が現れた場合は、ページ下部の「Don’t have an account? Sign up」をクリックして初期登録をしてください。</p>
<p><strong>STEP3: 生理日設定ならびに通知設定（1分）</strong><br />
ダッシュボードに進むとガイドが表示されます。ガイドに従って設定をお願いします。</p>
<p><strong>STEP4: DRSP回答（1分）</strong><br />
生理前（生理日5日前）になるとリマインドが届くので、バナーのDRSPタブから回答してください。<br />
3回以上回答すると、シールをお届けします。</p>
<p>以上お忙しい中お手数おかけしますが、ご協力のほど、何卒よろしくお願いいたします。<br />
ご質問などございましたら、このメールに返信する形でご連絡をお願いいたします。</p>
<p>重田</p>`,
          attachments,
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
