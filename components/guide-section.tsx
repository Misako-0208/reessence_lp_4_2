import Image from "next/image"
import { Award, GraduationCap } from "lucide-react"

const awards = [
  "Tokyo Startup Gateway優秀賞（応募4418件）",
  "慶応医学部主催 健康医療ベンチャー大賞ウェルネスリーグ優勝",
]

const qualifications = [
  "工学博士",
  "アロマテラピー検定1級",
  "アロマテラピーアドバイザー",
  "日本フェムテック協会認定資格2級",
]

export function GuideSection() {
  return (
    <section className="py-14">
      <div className="px-5">
        <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
          {"開発者について"}
        </p>
        <h2 className="text-lg font-bold leading-snug text-foreground">
          <span className="block">{"私たちは、"}</span>
          <span className="block">{"生理前に生産性が落ちること・"}</span>
          <span className="block">{"感情がコントロールできないつらさを、"}</span>
          <span className="block">{"身をもって知っています。"}</span>
        </h2>

        {/* Image + Text side by side */}
        <div className="mt-4 flex items-stretch gap-3">
          <div className="relative w-20 shrink-0 overflow-hidden rounded-xl">
            <Image
              src="/images/founder.jpg"
              alt="ReEssence 開発者"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
            {"私は、PMSが酷くなり、大切な子どもを傷つけそうになった経験があります。\n子どもたちと向き合うのが、とても怖かった。\nまた仕事でも生理前は生産性が落ちて、\n仕事量にムラがある、\n機嫌が悪いなど指摘されました。"}
          </p>
        </div>

        {/* Awards */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Award className="size-4 text-accent" />
            {"ビジネスコンテストで数々の賞を受賞"}
          </div>
          <ul className="mt-2 flex flex-col gap-1.5 pl-6">
            {awards.map((award, i) => (
              <li key={i} className="text-xs leading-relaxed text-muted-foreground">
                {award}
              </li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <GraduationCap className="size-4 text-accent" />
            {"これらの資格を持ち合わせています"}
          </div>
          <ul className="mt-2 flex flex-col gap-1 pl-6">
            {qualifications.map((q, i) => (
              <li key={i} className="text-xs text-muted-foreground">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
