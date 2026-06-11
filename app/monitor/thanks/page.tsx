"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const THANKS_PATH = "/monitor/thanks"

const IOS_APP_URL = "https://apps.apple.com/jp/app/kaorism/id6761862893"
const ANDROID_APP_URL =
  "https://play.google.com/store/apps/details?id=com.reessence.app&pli=1"

export default function MonitorThanksPage() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return
    const gtag = window.gtag
    if (typeof gtag === "function") {
      gtag("config", GA_ID, { page_path: THANKS_PATH })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
        >
          <ChevronLeft className="size-4" />
          トップへ
        </Link>
      </header>
      <main className="px-5 py-8 pb-12">
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-5 sm:p-6">
          <h1 className="text-lg font-bold text-foreground">ご応募いただきありがとうございます</h1>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            自動送信メールを送付いたしました。
            <br />
            メールをご確認いただくか、以下の流れに沿って進めてください。
            <br />
            所要時間は10分弱です。ぜひシールをゲットして体験してくださいね。
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            ※迷惑メールフォルダに振り分けられる場合があります。届かない場合はこのページの手順をご利用ください。
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground">
            <section>
              <h2 className="font-bold">STEP1: アプリのダウンロード</h2>
              <p className="mt-2 text-muted-foreground">
                以下リンクより、ダウンロードしてください。
              </p>
              <p className="mt-3">
                <span className="font-medium text-foreground">iOSの方：</span>
                <br />
                <a
                  href={IOS_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary underline underline-offset-2"
                >
                  {IOS_APP_URL}
                </a>
              </p>
              <p className="mt-3">
                <span className="font-medium text-foreground">Androidの方：</span>
                <br />
                <a
                  href={ANDROID_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary underline underline-offset-2"
                >
                  {ANDROID_APP_URL}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-bold">STEP2: 初期設定（3分）</h2>
              <p className="mt-2 text-muted-foreground">
                ダウンロード後、いくつか質問が表示されますので、入力を進めてください。
                途中でサインイン画面（ページ最下部に「Secured by Clerk」と表示）が現れた場合は、ページ下部の「Don&apos;t
                have an account? Sign up」をクリックして初期登録をしてください。
              </p>
            </section>

            <section>
              <h2 className="font-bold">STEP3: 生理日設定ならびに通知設定（1分）</h2>
              <p className="mt-2 text-muted-foreground">
                ダッシュボードに進むとガイドが表示されます。ガイドに従って設定をお願いします。
              </p>
            </section>

            <section>
              <h2 className="font-bold">STEP4: DRSP回答（1分）</h2>
              <p className="mt-2 text-muted-foreground">
                生理前（生理日5日前）になるとリマインドが届くので、バナーのDRSPタブから回答してください。
                3回以上回答すると、シールをお届けします。
              </p>
            </section>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            ご質問などございましたら、自動受信メールに返信する形でご連絡をお願いいたします。
          </p>

          <Button asChild className="mt-6 w-full sm:w-auto">
            <Link href="/">トップページへ戻る</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
