export function VideoSection() {
  const videoId = "Dn-8h5BbKnQ"

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

        <div className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-foreground/5 shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="アロマシール 使い方動画"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
