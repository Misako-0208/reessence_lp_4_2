import Image from "next/image"

const links = [
  { label: "Our Story", href: "https://www.re-essence.com/our-story" },
  { label: "企業情報", href: "https://www.re-essence.com/company" },
  { label: "コラム", href: "https://www.re-essence.com/column" },
  { label: "お問い合わせ", href: "https://www.re-essence.com/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div>
            <Image
              src="/images/logo.png"
              alt="ReEssence"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              {"肌に貼るアロマシール"}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {"© 2026 ReEssence. All Rights Reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
