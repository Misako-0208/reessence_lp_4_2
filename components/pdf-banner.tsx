export function PdfBanner() {
  return (
    <section className="bg-card/80 px-5 py-4">
      <div className="rounded-xl border border-dashed border-accent/40 bg-background px-4 py-3 text-xs text-card-foreground">
        <p className="font-semibold">
          {"生理前のゆらぎを整える症状日誌ガイドを無料プレゼント中"}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {"日々のからだや気分の変化を整理して、医療機関にも共有しやすくなるPDFです。"}
        </p>
        <a
          href="#monitor"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {"症状日誌ガイドを受け取る（無料）"}
        </a>
      </div>
    </section>
  )
}

