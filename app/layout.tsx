import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ExitIntentPopup } from '@/components/exit-intent-popup'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ReEssence | 肌に貼るアロマシールで生理前でも挑戦しよう',
  description:
    '肌に貼るアロマシール「ReEssence」。わずか0.4秒で気持ちを切り替え、生理前の不調に悩む毎日から解放されましょう。ゼラニウム・ラベンダーの香りで楽しくフェムケア。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f0e8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased bg-muted">
        <div className="mx-auto max-w-[430px] bg-background shadow-xl min-h-screen">
          {children}
        </div>
        <ExitIntentPopup />
        <Analytics />
      </body>
    </html>
  )
}
