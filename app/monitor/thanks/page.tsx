"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const THANKS_PATH = "/monitor/thanks"

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
      <main className="px-5 py-12">
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <h1 className="text-lg font-bold text-foreground">送信が完了しました</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            ご応募ありがとうございます。
            <br />
            自動でメールが送信されておりますので、
            <br />
            ご確認願います。
            <br />
            <span className="text-[10px]">（迷惑メールとして振り分けられるケースもございます。）</span>
            <br />
            ご不明点あればお気軽にご連絡くださいませ。
          </p>
          <Button asChild className="mt-6">
            <Link href="/">トップページへ戻る</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
