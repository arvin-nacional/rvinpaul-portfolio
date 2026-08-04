import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ArrowUpRight, FileText, Mail, MapPin } from 'lucide-react'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const eyebrow = footerData?.eyebrow || 'Open to new opportunities'
  const heading = footerData?.heading || "Let's build products that make a difference."
  const description =
    footerData?.description ||
    'I am a full-stack developer who turns complex requirements into reliable, thoughtful digital experiences. I am ready to bring that experience to a strong product team.'
  const email = footerData?.email || 'hello@rvinpaul.com'
  const location = footerData?.location || 'Philippines · Open to remote opportunities'
  const availability = footerData?.availability || 'Open to full-time and contract roles'
  const resumeURL = footerData?.resumeURL
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#020712] text-white" data-theme="dark">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,137,255,.12),transparent_32%)]" />

      <div className="container relative py-16 md:py-24">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.4fr_.6fr] lg:items-end md:pb-20">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[.68rem] font-bold uppercase tracking-[.2em] text-cyan-300">
              <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.9)]" />
              {eyebrow}
            </div>
            <h2 className="max-w-[13ch] text-[clamp(2.8rem,6vw,6rem)] font-black leading-[.92] tracking-[-.06em]">
              {heading}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400">{description}</p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end lg:justify-self-end">
            <a
              className="group inline-flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold text-[#020712]"
              href={`mailto:${email}`}
            >
              Contact me
              <span className="flex size-11 items-center justify-center rounded-full bg-blue-500 text-white">
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
            {resumeURL && (
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                href={resumeURL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FileText className="size-4 text-blue-300" />
                View résumé
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]" />
              {availability}
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <Link className="inline-flex items-center" href="/">
              <Logo className="brightness-0 invert" />
            </Link>
            <div className="mt-7 space-y-3 text-sm text-slate-400">
              <a className="flex items-center gap-3 transition-colors hover:text-white" href={`mailto:${email}`}>
                <Mail className="size-4 text-blue-300" />
                {email}
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-blue-300" />
                {location}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-5 font-mono text-[.65rem] uppercase tracking-[.18em] text-slate-500">Navigate</p>
            <nav className="flex flex-col items-start gap-3">
              {navItems.map(({ link }, i) => (
                <CMSLink className="text-sm text-slate-300 transition-colors hover:text-white" key={i} {...link} />
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-5 font-mono text-[.65rem] uppercase tracking-[.18em] text-slate-500">Connect</p>
            <div className="flex flex-col items-start gap-3">
              {socialLinks.map(({ label, url, id }) => (
                <a className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white" href={url} key={id || label} rel="noopener noreferrer" target="_blank">
                  {label}
                  <ArrowUpRight className="size-3.5 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 pt-7 text-[.7rem] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Rvinpaul. Designed and built with care.</p>
          <div className="flex items-center gap-5">
            <a className="transition-colors hover:text-white" href="#top">Back to top ↑</a>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
