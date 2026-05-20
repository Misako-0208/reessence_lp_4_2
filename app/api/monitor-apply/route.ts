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

/** チャネル識別（例: lp4 / instagram_ads）。未設定時はこの LP 用の既定値。 */
const monitorSource = process.env.MONITOR_APPLICATION_SOURCE?.trim() || "lp4"
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
<p>モニター実施の手順を添付資料および以下文章にまとめました。</p>
<p>資料のp.2および3に記載の「アプリのダウンロード」と「DRSPの入力（生理前に3回以上）」を進めていただきますと、<br />お手元にシールが届きます。</p>
<p><strong>STEP1: アプリのダウンロード</strong><br />
以下リンクより、ダウンロードしてください。<br />
iOSの方：<br />
<a href="https://testflight.apple.com/join/1czM9VtG">https://testflight.apple.com/join/1czM9VtG</a><br />
ベータ版のため、TestFlightのダウンロードの許可をお願いいたします。<br /><br />
Androidの方：<br />
アドレスの登録が必要なため、このメールが送付されてから１日程度経ってからリンクをクリックしてください。<br />
<a href="https://play.google.com/apps/internaltest/4701642921159415939">https://play.google.com/apps/internaltest/4701642921159415939</a><br />
「download it on Google Play」をクリックしてください</p>
<p><strong>STEP2: 初期設定（3分）</strong><br />
ダウンロード後、いくつか質問が表示されますので、入力を進めてください。<br />
途中でサインイン画面（ページ最下部に「Secured by Clerk」と表示）が現れた場合は、ページ下部の「Don’t have an account? Sign up」をクリックして初期登録をしてください。</p>
<p><strong>STEP3: 生理日設定（1分）</strong><br />
ダッシュボードの円グラフ中央に「生理日設定ボタン」があります。<br />
遷移した画面で前回の生理日と生理周期を入力し、設定を保存してください。</p>
<p><strong>STEP4: 通知設定（2分）</strong><br />
バナーの「設定タブ」を押していただき、通知の設定を進めてください。<br />
ウェアラブルデバイスを持っている方は、接続機器設定のチャネルをONにしていただき、<br />
週に一度「同期を実行する」ボタンを押してください（リマインド設定可能）</p>
<p>DRSPリマインダとシール貼り付け通知はどちらもONにしていただき、<br />
通知時刻については<br />
DRSPリマインダ：スマホを触れる時間帯（電車に乗っている時間帯など）<br />
シール貼り付け通知：就寝前、貼り付けが可能な時間<br />
に設定してください。</p>
<p><strong>STEP5: DRSP回答（1分）</strong><br />
生理前になるとリマインドが届くので、バナーのDRSPタブから回答してください。<br />
3回以上回答すると、シールをお届けします。</p>
<p>以上お忙しい中お手数おかけしますが、ご協力のほど、何卒よろしくお願いいたします。<br />
アプリのバグなどございましたら、お気軽にご連絡くださいませ。<br />
ご不明点などもお気軽にお問い合わせくださいませ。</p>
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
