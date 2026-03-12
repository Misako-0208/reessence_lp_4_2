import { Check } from "lucide-react"

const painPoints = [
  "仕事が手につかず、生産性が落ちる",
  "パートナーや家族、同僚にあたって\n自己嫌悪に陥る",
  "大事な予定を入れられず、機会損失している",
]

export function PainPointsSection() {
  return (
    <section className="py-14">
      <div className="px-5 text-center">
        <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
          {"あなたの悩みに寄り添います"}
        </p>
        <h2 className="text-xl font-bold leading-snug text-foreground">
          <span className="block">{"生理前、"}</span>
          <span className="block">{"こんなお悩みありませんか？"}</span>
        </h2>

        <div className="mt-8 flex flex-col gap-3 text-left">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <Check className="size-3.5 text-accent" />
              </div>
              <p className="text-sm leading-relaxed text-card-foreground whitespace-pre-line">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
