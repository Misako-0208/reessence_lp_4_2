import Link from "next/link"

export function BrandStorySection() {
  return (
    <section className="py-14">
      <div className="px-5">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
            {"Our Story"}
          </p>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-card-foreground">
            <p>
              {"ReEssenceは、"}
              <br />
              {"あなたが"}
              <strong>{"生理前でも挑戦したいと"}</strong>
              <br />
              {"わかっています。"}
            </p>
            <p>
              {"そうなるには、"}
              <strong>{"継続できる楽しさ"}</strong>
              {"が必要です。"}
            </p>
            <p>
              {"問題は、"}
              <strong>{"既存のソリューションの多くが、"}</strong>
              <br />
              <strong>{"楽しみがない、苦い、手間がかかる"}</strong>
              {"ことで、"}
              <br />
              {"そのせいであなたは"}
              <strong>{"継続につらさを"}</strong>
              <br />
              {"感じています。"}
            </p>
            <p>
              {"私たちは、生理周期にかかわらず、"}
              <br />
              <strong>
                {"いつでも機会を逃さないことが"}
              </strong>
              <br />
              <strong>
                {"当たり前になるべき"}
              </strong>
              {"だと信じています。"}
            </p>
            <p>
              {"また私たちは"}
              <br />
              <strong>{"生理前の生産性の低下や"}</strong>
              <br />
              <strong>{"感情のコントロールの難しさ"}</strong>
              {"を理解しています。"}
            </p>
            <p>
              {"だからこそ、"}
              <strong>{"アロマシールを活用"}</strong>
              {"するのです。"}
            </p>

            <div className="mt-1 rounded-lg bg-secondary p-4">
              <p className="text-[10px] text-muted-foreground">
                {"その手順は次の通りです。"}
              </p>
              <p className="mt-1 text-xs font-medium text-foreground">
                {"「今すぐ購入」ボタンから購入し、ポストインで受取、肌に貼る。"}
              </p>
            </div>

            <p className="text-sm font-bold text-foreground">
              {"だから、今すぐ購入しましょう。"}
            </p>
            <p className="text-muted-foreground">
              {"そうすれば、"}
              <strong className="text-foreground">{"毎月の機会損失"}</strong>
              {"を止め、"}
              <br />
              <strong className="text-foreground">{"生理前でも挑戦を始める"}</strong>
              {"ことができます。"}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {"今すぐ購入"}
            </a>
            <Link
              href="/monitor"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {"モニター応募"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
