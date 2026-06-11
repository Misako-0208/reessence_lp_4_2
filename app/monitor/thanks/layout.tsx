import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "応募完了 | ReEssence",
  description: "モニター応募を受け付けました。アプリのダウンロードと設定手順をご確認ください。",
  robots: { index: false, follow: true },
}

export default function MonitorThanksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
