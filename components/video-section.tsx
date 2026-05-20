export function VideoSection() {
  return (
    <section className="py-14">
      <div className="px-5">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
            {"使い方動画"}
          </p>
          <h2 className="text-xl font-bold leading-snug text-foreground">
            <span className="block">{"アロマシール、"}</span>
            <span className="block">{"実際に貼るとどんな感じ？"}</span>
          </h2>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl bg-foreground/5 shadow-lg">
            <video
              src="/videos/lp4-usage.mp4"
              title="アロマシール 使い方動画"
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
