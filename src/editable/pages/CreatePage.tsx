'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-xl border border-[var(--editable-border)] bg-[#0d0b31] px-4 py-3.5 text-sm font-semibold text-white outline-none transition placeholder:text-[#817ba8] focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="relative min-h-screen overflow-hidden bg-[var(--slot4-page-bg)] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
          <section className="relative mx-auto grid max-w-5xl gap-8 overflow-hidden rounded-[2.5rem] border border-violet-400/25 bg-[#0b092b]/90 p-7 shadow-[0_30px_100px_rgba(91,33,244,0.22)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-[2rem] border border-violet-400/20 bg-[radial-gradient(circle_at_50%_40%,#342078,#11103b_65%)]">
              <div className="editable-float grid h-32 w-32 place-items-center rounded-[2rem] border border-violet-300/30 bg-violet-500/15 shadow-[0_20px_70px_rgba(139,92,246,.3)]"><Lock className="h-14 w-14 text-violet-200" /></div>
            </div>
            <div className="self-center">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-violet-300">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1] tracking-[-0.055em] sm:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-[var(--editable-cta-bg)] px-6 py-3 text-sm font-bold text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-6 py-3 text-sm font-bold">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="relative min-h-screen overflow-hidden bg-[var(--slot4-page-bg)] text-white">
        <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[120px]" />
        <section className="relative mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 overflow-hidden rounded-[2.5rem] border border-violet-400/25 bg-[#0b092b]/90 p-6 shadow-[0_30px_100px_rgba(91,33,244,0.2)] backdrop-blur lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <aside>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-violet-300">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[0.96] tracking-[-0.055em] sm:text-6xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
            </aside>

            <form onSubmit={submit} className="rounded-[2rem] border border-violet-400/25 bg-[#05051f] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-200">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#5b21f4,#8b5cf6)] px-6 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_16px_40px_rgba(91,33,244,.25)] transition hover:-translate-y-1 hover:brightness-110">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
