"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { pdfSignupCopy } from "@/lib/pdf-signup-copy"

const STORAGE_KEY = "reessence_lp4_popup_shown"

export function ExitIntentPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isMonitorPage = pathname?.startsWith("/monitor")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isMonitorPage) {
      setOpen(false)
      return
    }

    const alreadyShown = window.sessionStorage.getItem(STORAGE_KEY)
    if (alreadyShown) return

    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const ratio = window.scrollY / scrollable
      if (ratio < 0.5) return
      if (window.sessionStorage.getItem(STORAGE_KEY)) return

      window.sessionStorage.setItem(STORAGE_KEY, "1")
      setOpen(true)
      window.removeEventListener("scroll", handleScroll)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMonitorPage])

  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-6">
      <div className="pointer-events-auto mx-auto w-full max-w-sm rounded-2xl bg-card p-5 shadow-xl">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {"少し待ってください"}
        </p>
        <h2 className="mt-2 text-base font-bold text-card-foreground">
          {pdfSignupCopy.headline}
          <br />
          {pdfSignupCopy.headlineSub}
          {"を受け取りませんか？"}
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          {pdfSignupCopy.body}
        </p>

        <div className="mt-4 space-y-2">
          <a
            href="#monitor"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {pdfSignupCopy.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-center text-[11px] text-muted-foreground underline underline-offset-2"
          >
            {"今回はスキップする"}
          </button>
        </div>
      </div>
    </div>
  )
}
