import { ShoppingBag, Package, Sparkles } from "lucide-react"

const steps = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "「今すぐ購入」ボタンから購入",
    description: "ショップページから簡単に購入可能。",
  },
  {
    icon: Package,
    number: "02",
    title: "ポストインで受取",
    description: "対面での受取が不要のため、\n受取日時の設定の手間がかかりません。",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "肌に貼る",
    description: "楽しいフェムケアで生理前でもリフレッシュ",
  },
]

export function StepsSection() {
  return (
    <section className="bg-secondary py-14">
      <div className="px-5">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
            {"かんたん3ステップ"}
          </p>
          <h2 className="text-xl font-bold leading-snug text-foreground">
            <span className="block">{"香りとともに"}</span>
            <span className="block">{"健やかな毎日を"}</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm">
              <div className="flex flex-col items-center gap-1">
                <div className="text-lg font-bold text-accent/50">{step.number}</div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                  <step.icon className="size-5 text-accent" />
                </div>
              </div>
              <div className="min-w-0 pt-1">
                <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
