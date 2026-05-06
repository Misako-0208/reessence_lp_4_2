"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type Status = "idle" | "submitting" | "error"

export default function MonitorPage() {
  const [name, setName] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [agreeSkinStop, setAgreeSkinStop] = useState(false)
  const [agreeNotPregnant, setAgreeNotPregnant] = useState(false)
  const [agreeAppDownload, setAgreeAppDownload] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [wearableDevice, setWearableDevice] = useState<"yes" | "no" | "unknown" | "">("")
  const [smartphoneOs, setSmartphoneOs] = useState<"ios" | "android" | "other" | "">("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!name.trim()) {
      setErrorMessage("氏名を入力してください。")
      return
    }
    if (!postalCode.trim()) {
      setErrorMessage("郵便番号を入力してください。")
      return
    }
    if (!address.trim()) {
      setErrorMessage("住所を入力してください。")
      return
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("有効なメールアドレスを入力してください。")
      return
    }
    if (!agreeSkinStop || !agreeNotPregnant || !agreeAppDownload) {
      setErrorMessage("すべての同意項目にチェックを入れてください。")
      return
    }
    if (!agreePrivacy) {
      setErrorMessage("個人情報の取り扱いについてご同意ください。")
      return
    }
    if (!wearableDevice) {
      setErrorMessage("ウェアラブルデバイスの所持についてお答えください。")
      return
    }
    if (!smartphoneOs) {
      setErrorMessage("スマホのOSを選択してください。")
      return
    }

    setStatus("submitting")

    try {
      const res = await fetch("/api/monitor-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          postalCode: postalCode.trim(),
          address: address.trim(),
          email: email.trim(),
          agreeSkinStop,
          agreeNotPregnant,
          agreeAppDownload,
          wearableDevice,
          smartphoneOs,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "送信に失敗しました。")
      }
      // フル遷移（アプリ内ブラウザでもアドレスバーが /monitor/thanks に確実に変わる）
      window.location.replace(`${window.location.origin}/monitor/thanks`)
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "送信に失敗しました。時間をおいて再度お試しください。")
    }
  }

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

      <main className="px-5 pb-16 pt-6">
        <h1 className="text-xl font-bold text-foreground text-center">
          【肌に貼るアロマシール】
          <br />
          無料モニター応募
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          以下サンプル送付にあたり、
          <br />
          送付先の情報並びにモニター参加にあたり
          <br />
          注意事項へのご同意をお願いいたします。
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">氏名 <span className="text-destructive">*</span></Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 花子"
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">郵便番号 <span className="text-destructive">*</span></Label>
            <Input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="123-4567"
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">住所 <span className="text-destructive">*</span></Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="都道府県・市区町村・番地・建物名"
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス <span className="text-destructive">*</span></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">
              Androidの方はGmailアドレスを入力してください。
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
            <p className="text-xs text-muted-foreground">
              以下ご参加にあたってご同意をお願いいたします。
              <br />
              （製品の安全性については、製造販売元にて確認済みです。）
            </p>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={agreeSkinStop}
                onCheckedChange={(v) => setAgreeSkinStop(!!v)}
                required
              />
              <span className="text-sm">肌に異常が生じた場合は、直ちに使用を中断します。</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={agreeNotPregnant}
                onCheckedChange={(v) => setAgreeNotPregnant(!!v)}
                required
              />
              <span className="text-sm">
                妊娠中ではありません。
                <br />
                <span className="text-xs text-muted-foreground">※サンプル体験当日までにご懐妊された場合、ご連絡をお願いいたします。</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={agreeAppDownload}
                onCheckedChange={(v) => setAgreeAppDownload(!!v)}
                required
              />
              <span className="text-sm">
                指定されたアプリをダウンロードします。
                <br />
                <span className="text-xs text-muted-foreground">※モニター終了後に削除することは問題ありません。</span>
              </span>
            </label>
          </div>

          <div className="space-y-2">
            <Label>心拍情報を計測できるウェアラブルデバイスを所持している。 <span className="text-destructive">*</span></Label>
            <div className="flex flex-wrap gap-4 pt-1">
              {(["yes", "no", "unknown"] as const).map((value) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="wearableDevice"
                    value={value}
                    checked={wearableDevice === value}
                    onChange={() => setWearableDevice(value)}
                    className="size-4"
                  />
                  <span className="text-sm">
                    {value === "yes" ? "はい" : value === "no" ? "いいえ" : "わからない"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="smartphoneOs">スマホのOS <span className="text-destructive">*</span></Label>
            <select
              id="smartphoneOs"
              value={smartphoneOs}
              onChange={(e) => setSmartphoneOs(e.target.value as "ios" | "android" | "other")}
              required
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            >
              <option value="">選択してください</option>
              <option value="ios">iOS</option>
              <option value="android">android</option>
              <option value="other">その他</option>
            </select>
          </div>

          {/* 同意事項：個人情報の取り扱い（ポップアップで表示） */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <h2 className="text-sm font-bold text-foreground">同意事項</h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                id="agreePrivacy"
                checked={agreePrivacy}
                onCheckedChange={(v) => setAgreePrivacy(!!v)}
              />
              <span className="text-sm leading-relaxed">
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-primary underline underline-offset-2 hover:no-underline">
                      個人情報の取り扱いについて
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg max-h-[85vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-bold text-foreground">個人情報の取り扱いについて</DialogTitle>
                      <DialogDescription>プライバシーポリシー</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-3 -mx-1">
                      <div className="space-y-6 text-sm text-foreground pr-2">
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">1. 個人情報の利用目的</h3>
                          <p className="mb-3">
                            ReEssence（以下「当社」といいます）は、お客様からご提供いただいた個人情報を、以下の目的のために利用いたします。
                          </p>
                          <ul className="list-disc pl-6 mb-3 space-y-1">
                            <li>お問い合わせへの対応・回答</li>
                            <li>当社サービスに関する情報提供</li>
                            <li>当社イベント・セミナーなどのご案内</li>
                            <li>アンケート調査・市場調査</li>
                            <li>統計データの作成（個人を特定しない形での利用）</li>
                            <li>製品・サービスの品質向上のための分析</li>
                          </ul>
                          <p>
                            当社は、これらの目的以外で個人情報を利用する場合には、あらかじめご本人の同意を得るものとします。
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">2. 個人情報の管理</h3>
                          <p className="mb-3">
                            当社は、個人情報の正確性を保ち、これを安全に管理いたします。個人情報の紛失、破壊、改ざん、漏洩などを防止するため、適切なセキュリティ対策を講じます。
                          </p>
                          <p>
                            また、個人情報の取り扱いに関する社内規程を整備し、従業員教育を徹底します。個人情報への不正アクセス、紛失、破壊、改ざん、漏洩などが発生した場合には、速やかに是正措置を講じます。
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">3. 個人情報の第三者提供</h3>
                          <p className="mb-3">
                            当社は、以下のいずれかに該当する場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはありません。
                          </p>
                          <ul className="list-disc pl-6 mb-3 space-y-1">
                            <li>法令に基づく場合</li>
                            <li>人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難であるとき</li>
                            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、ご本人の同意を得ることが困難であるとき</li>
                            <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">4. 委託先の監督</h3>
                          <p>
                            当社は、個人情報の取り扱いを委託する場合には、十分な個人情報の保護水準を満たす者を選定し、契約等により適切な監督を行います。
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">5. 保有個人データの開示等</h3>
                          <p>
                            当社は、ご本人からの保有個人データの開示、訂正、利用停止、消去等のご請求に対して、法令に基づき適切に対応いたします。
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">6. お問い合わせ窓口</h3>
                          <p className="mb-3">
                            個人情報の取り扱いに関するお問い合わせは、下記の窓口までご連絡ください。
                          </p>
                          <p className="mb-3">
                            ReEssence 代表（個人情報保護管理者）
                            <br />
                            E-mail: notifications@re-essence.com
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mt-4 mb-2">7. プライバシーポリシーの改定</h3>
                          <p>
                            当社は、必要に応じて本プライバシーポリシーを改定することがあります。重要な変更がある場合には、当社ウェブサイト上でお知らせいたします。
                          </p>
                        </div>
                        <p className="text-right mt-6 text-muted-foreground">制定：2025年5月1日</p>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                に同意します <span className="text-destructive">*</span>
              </span>
            </label>
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full"
          >
            {status === "submitting" ? "送信中..." : "送信する"}
          </Button>
        </form>
      </main>
    </div>
  )
}
