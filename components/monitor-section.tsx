'use client'

import { useState } from "react"
import { pdfSignupCopy } from "@/lib/pdf-signup-copy"

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function MonitorSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMessage('正しいメールアドレスを入力してください。')
      return
    }

    setStatus('submitting')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/monitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (!response.ok) {
        throw new Error('送信に失敗しました。時間をおいて再度お試しください。')
      }

      setStatus('success')
      setName('')
      setEmail('')
    } catch (error) {
      console.error(error)
      setStatus('error')
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。')
    }
  }

  return (
    <section id="monitor" className="bg-background py-14">
      <div className="px-5">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-2 text-xs font-medium tracking-widest text-accent">
            {pdfSignupCopy.eyebrow}
          </p>
          <h2 className="text-lg font-bold leading-snug text-card-foreground">
            <span className="block">{pdfSignupCopy.headline}</span>
            <span className="block">{pdfSignupCopy.headlineSub}</span>
          </h2>
          <p className="mt-3 text-xs text-muted-foreground">
            {pdfSignupCopy.body}
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-medium text-card-foreground">
                {'お名前（任意）'}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                placeholder="例）山田 花子"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-card-foreground">
                {'メールアドレス'}
                <span className="ml-1 text-[10px] text-accent">{'必須'}</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                placeholder="例）you@example.com"
                required
              />
            </div>

            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
              {'ご登録いただいた情報は、PDF送付およびReEssenceに関するご案内のみに利用し、'}
              <br />
              {'プライバシーポリシーに基づき適切に管理いたします。'}
            </p>

            {errorMessage && (
              <p className="text-xs text-destructive">{errorMessage}</p>
            )}

            {status === 'success' ? (
              <p className="mt-2 rounded-md bg-secondary px-3 py-2 text-xs text-foreground">
                {pdfSignupCopy.successMessage}
              </p>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? '送信中...' : pdfSignupCopy.cta}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

