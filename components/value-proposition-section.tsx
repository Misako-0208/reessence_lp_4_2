import { Zap, Hand, Flower2 } from "lucide-react"

const values = [
  {
    icon: Zap,
    title: "わずか0.4秒",
    description:
      "まずは嗅いでみましょう！\nすぐに感情の高ぶりが落ち着き、\nまたどんよりとした気持ちが切り替わります。",
  },
  {
    icon: Hand,
    title: "高い利便性",
    description:
      "飲むための水は必要ありません。\n必要な時に肌に貼るだけ、\n液漏れも無く服もバッグも汚しません。\n香りが不要になったら剥がすだけでオフが可能。",
  },
  {
    icon: Flower2,
    title: "香害を気にせず、楽しくケア",
    description:
      "香りに癒される、楽しいフェムケア製品です。\n香りは半径30cmにしか届かないため、隣の人にも迷惑をかけず、自分だけ楽しめます。",
  },
]

export function ValuePropositionSection() {
  return (
    <section className="bg-secondary py-14">
      <div className="px-5">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
            {"Kaorismシールの特長"}
          </p>
          <h2 className="text-xl font-bold leading-snug text-foreground">
            <span className="block">{"煩わしさから"}</span>
            <span className="block">{"解放されましょう！"}</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {values.map((value, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                <value.icon className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-card-foreground">{value.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
