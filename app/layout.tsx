import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ExitIntentPopup } from '@/components/exit-intent-popup'

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_CLARITY_ID ?? ''
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
const isProduction = process.env.NODE_ENV === 'production'

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
        {isProduction && <Analytics />}
        {isProduction && gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        {isProduction && clarityProjectId && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");`}
          </Script>
        )}
      </body>
    </html>
  )
}
