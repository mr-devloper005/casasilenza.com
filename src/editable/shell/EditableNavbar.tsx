'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, Plus, LogOut } from 'lucide-react'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
const links = [['Home','/'],['Classified','/classified'],['About','/about'],['Search','/search']] as const
export function EditableNavbar() {
  const [open,setOpen]=useState(false); const pathname=usePathname(); const {session,logout}=useEditableLocalAuthSession()
  return <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 backdrop-blur-xl"><nav className="mx-auto flex min-h-20 max-w-[var(--editable-container)] items-center gap-8 px-5 lg:px-8">
    <Link href="/" className="flex items-center gap-3 text-xl font-extrabold tracking-[-.04em]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--editable-cta-bg)]">C</span><span>Casa<span className="text-violet-400">Silenza</span></span></Link>
    <div className="hidden items-center gap-7 lg:flex">{links.map(([label,href])=><Link key={href} href={href} className={`text-sm font-semibold hover:text-violet-300 ${pathname===href?'text-violet-300':'text-[var(--slot4-muted-text)]'}`}>{label}</Link>)}</div>
    <form action="/search" className="ml-auto hidden items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2 md:flex"><Search className="h-4 w-4 text-violet-300"/><input name="q" aria-label="Search" placeholder="Search CasaSilenza" className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]"/></form>
    <div className="flex items-center gap-2">{session?<><span className="hidden text-sm font-bold sm:block">{session.name||'Member'}</span><Link href="/create" className="inline-flex items-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-bold"><Plus className="h-4 w-4"/> Create</Link><button onClick={logout} aria-label="Logout" className="rounded-lg border border-[var(--editable-border)] p-2.5 text-[var(--slot4-muted-text)] hover:text-white"><LogOut className="h-4 w-4"/></button></>:<><Link href="/login" className="hidden px-3 py-2 text-sm font-semibold sm:block">Login</Link><Link href="/signup" className="rounded-lg bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-bold">Sign up</Link></>}<button onClick={()=>setOpen(!open)} className="p-2 lg:hidden" aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div>
  </nav>{open&&<div className="grid border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] p-4 lg:hidden">{links.map(([l,h])=><Link onClick={()=>setOpen(false)} key={h} href={h} className="rounded-lg px-4 py-3 font-semibold hover:bg-[var(--slot4-panel-bg)]">{l}</Link>)}</div>}</header>
}
