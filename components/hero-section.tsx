import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen min-h-[100dvh] flex-col overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-aroma.jpg"
        alt="肌に貼るアロマシール"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/*
        縦位置: 画像の「端からの%」ではなく、ビューポート基準の padding + flex。
        iOS/Android のノッチ・ホームバーは safe-area、高さの差は 100dvh で吸収。
      */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pt-[max(5rem,env(safe-area-inset-top,0px))] pb-6 text-center">
        <div>
          <h1 className="text-[1.7rem] font-bold leading-snug tracking-tight text-background">
            <span className="block">{"肌に貼るアロマシールで"}</span>
            <span className="block">{"生理前の不調、忘れよう"}</span>
          </h1>
          <p className="mx-auto mt-5 text-sm leading-relaxed text-background/80">
            <span className="block">{"わずか0.4秒で気持ちを切り替え、"}</span>
            <span className="block">{"香りとともに健やかな毎日を"}</span>
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center gap-3 pb-[max(6rem,env(safe-area-inset-bottom,0px))]">
          <a
            href="#pricing"
            className="inline-flex w-full max-w-[260px] items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform hover:scale-105"
          >
            {"今すぐ購入"}
          </a>
          <Link
            href="/monitor"
            className="inline-flex w-full max-w-[260px] items-center justify-center rounded-full border-2 border-background/60 px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-background/10"
          >
            {"モニター応募"}
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
