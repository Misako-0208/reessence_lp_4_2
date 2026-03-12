"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "肌はかぶれませんか？",
    answer:
      "粘着剤不使用のオイルゲルを使用しております。目元への貼り付け実績もあるため、生理前のお肌が敏感な時期にも安心してご利用いただけます。オーナーは絆創膏でかぶれますが、肌に貼るアロマシールではかぶれませんでした。\n※個人の感想です。すべての方がかぶれないとは限りません。",
  },
  {
    question: "どこに貼ったらいいですか？",
    answer:
      "鼻に近く、肌の伸縮の少ない部位がおススメです。デコルテ、手の甲、衣類で隠れた部分にも貼ることが出来ます。",
  },
  {
    question: "どんな香りか購入前に確認したい",
    answer:
      "生活の木様のゼラニウム精油を使用しております。生活の木様の店舗で是非お試しください。",
  },
  {
    question: "肌に貼ったら目立ちませんか？",
    answer:
      "製品はオレンジ色であり、日本人の肌になじみやすい色をしております。極力目立たないように設計をしております。",
  },
  {
    question: "効果があるか調べてみたいです",
    answer:
      "PMSの症状日記をつけることで、健康記録をつけられます。記録をつけられるアプリを提供しているため、製品に同封したQRコードからダウンロードしてご利用ください。",
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium tracking-widest uppercase text-accent">
            FAQ
          </p>
          <h2 className="text-balance text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {"よくあるご質問"}
          </h2>
        </div>

        <div className="mt-12 rounded-2xl bg-card p-6 shadow-sm md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-card-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
