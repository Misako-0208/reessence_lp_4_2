"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <a href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="ReEssence"
            width={120}
            height={32}
            className="h-6 w-auto"
            priority
          />
        </a>

        <nav className="flex items-center gap-2">
          <a
            href="#pricing"
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {"購入"}
          </a>
          <Link
            href="/monitor"
            className="rounded-full border border-foreground/20 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {"モニター"}
          </Link>
        </nav>
      </div>
    </header>
  )
}
