'use client'

import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  Dumbbell,
  Gauge,
  Layers3,
  MessageSquareMore,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { DashboardPreview, ShipNanyangPreview } from './SitePreview'

type Benefit = { copy: string; icon: LucideIcon; title: string }

const projects: Array<{
  benefits: Benefit[]
  description: string
  detailEyebrow: string
  detailHeading: string
  href: string
  index: string
  name: string
  preview: 'site' | 'dashboard' | 'athlete'
  services: string
  summary: string
  tags: string[]
}> = [
  {
    benefits: [
      { copy: 'Clear calls to action make it easy for customers to request quotes.', icon: MessageSquareMore, title: 'Generate inquiries' },
      { copy: 'A focused customer journey moves visitors from interest to shipment.', icon: PackageCheck, title: 'Guide shipments' },
      { copy: 'Services, destinations, and shipment steps are easier to understand.', icon: ClipboardCheck, title: 'Create clarity' },
      { copy: 'A polished experience supports trust across every decision point.', icon: ShieldCheck, title: 'Build credibility' },
    ],
    description: 'Logistics website & content platform',
    detailEyebrow: 'Built to solve business problems',
    detailHeading: 'More than just a website.',
    href: '/projects/shipnanyang',
    index: '01',
    name: 'ShipNanyang',
    preview: 'site',
    services: 'Web design / Full-stack development',
    summary: 'ShipNanyang helps turn visitors into customers and makes international shipping easier to understand.',
    tags: ['Next.js', 'Payload CMS', 'TypeScript'],
  },
  {
    benefits: [
      { copy: 'One workspace keeps people, roles, and membership records organized.', icon: UsersRound, title: 'Unify operations' },
      { copy: 'Useful summaries turn daily activity into quick decisions.', icon: Gauge, title: 'Surface insights' },
      { copy: 'Reusable workflows reduce repetitive administrative work.', icon: Boxes, title: 'Standardize tasks' },
      { copy: 'Clear ownership and status make collaboration easier.', icon: Layers3, title: 'Improve visibility' },
    ],
    description: 'Internal membership & operations platform',
    detailEyebrow: 'Designed for everyday operations',
    detailHeading: 'One place to run the work.',
    href: '/projects/shipnanyang#operations',
    index: '02',
    name: 'Membership & Operations',
    preview: 'dashboard',
    services: 'Product design / Dashboard system',
    summary: 'A focused internal platform for managing members, records, and the work that keeps an organization moving.',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
  },
  {
    benefits: [
      { copy: 'Structured plans keep training purposeful from week to week.', icon: Target, title: 'Focus training' },
      { copy: 'Progress views make patterns and improvements visible.', icon: Gauge, title: 'Track progress' },
      { copy: 'Performance data helps athletes adjust with confidence.', icon: Sparkles, title: 'Reveal insights' },
      { copy: 'A single athlete profile brings goals, sessions, and results together.', icon: Dumbbell, title: 'Stay consistent' },
    ],
    description: 'Training plans, progress & performance analytics',
    detailEyebrow: 'Built around athlete progress',
    detailHeading: 'Train with a clearer picture.',
    href: '/projects/shipnanyang#system',
    index: '03',
    name: 'Badminton Athlete Platform',
    preview: 'athlete',
    services: 'Product design / Performance system',
    summary: 'A training platform that turns plans, sessions, and performance data into a practical view of athlete development.',
    tags: ['Next.js', 'MongoDB', 'AWS S3'],
  },
]

export function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]

  return (
    <section className="relative overflow-hidden bg-[#030812] py-24 text-white md:py-32" data-theme="dark" id="projects">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(37,137,255,.1),transparent_30%)]" />
      <div className="container relative">
        <div className="mb-12 grid gap-6 md:grid-cols-[.92fr_1.08fr] md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[.2em] text-cyan-400">Selected work</p>
            <h2 className="max-w-[12ch] text-[clamp(2.8rem,5vw,5.3rem)] font-black leading-[.92] tracking-[-.06em]">Projects that solve real problems.</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-300/70 md:pb-2">A selection of recent work where I designed, built, and shipped full-stack solutions from concept to production.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              aria-current={activeIndex === index ? 'true' : undefined}
              aria-label={`View ${project.name} case study`}
              className={`group rounded-2xl border p-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${activeIndex === index ? 'border-cyan-300/75 bg-blue-400/[.07] shadow-[0_0_0_1px_rgba(103,232,249,.08),0_18px_50px_rgba(0,0,0,.28)]' : 'border-white/10 bg-white/[.025] hover:border-white/25'}`}
              href={project.href}
              key={project.name}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="h-52 overflow-hidden rounded-xl border border-white/8 md:h-44 xl:h-56">
                {project.preview === 'site' ? <ShipNanyangPreview compact /> : <DashboardPreview />}
              </div>
              <div className="px-3 pb-4 pt-5">
                <span className="inline-flex rounded bg-blue-500/15 px-2 py-1 font-mono text-[.62rem] text-cyan-300">{project.index}</span>
                <h3 className="mt-3 text-lg font-bold leading-tight">{project.name}</h3>
                <p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{project.tags.map((tag) => <span className="rounded border border-white/8 bg-white/[.035] px-2 py-1 font-mono text-[.56rem] text-slate-400" key={tag}>{tag}</span>)}</div>
                <div className="mt-5 flex items-center gap-2 text-[.7rem] font-bold text-blue-300">View case study <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></div>
              </div>
            </Link>
          ))}
        </div>

        <div aria-live="polite" className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(8,20,35,.78),rgba(3,10,19,.96))] p-7 md:p-10">
          <div className="absolute left-[16%] top-0 h-14 w-px -translate-y-full bg-cyan-300/80 shadow-[0_0_15px_rgba(103,232,249,.65)] md:h-20" />
          <p className="font-mono text-[.65rem] font-bold uppercase tracking-[.16em] text-blue-400">{active.detailEyebrow}</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-4xl">{active.detailHeading}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300/65">{active.summary}</p>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {active.benefits.map(({ copy, icon: Icon, title }) => (
              <article key={title}>
                <Icon className="size-7 text-blue-400" strokeWidth={1.5} />
                <h4 className="mt-5 text-sm font-bold">{title}</h4>
                <p className="mt-2 text-xs leading-6 text-slate-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
