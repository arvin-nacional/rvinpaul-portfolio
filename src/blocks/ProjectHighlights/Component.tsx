import type { ProjectHighlightsBlock } from '@/payload-types'
import { Check, Gauge, Globe2, PackageCheck, Route, ShieldCheck, type LucideIcon } from 'lucide-react'

const icons: Record<string, LucideIcon> = { check: Check, gauge: Gauge, globe: Globe2, package: PackageCheck, route: Route, shield: ShieldCheck }

export function ProjectHighlightsBlockComponent(props: ProjectHighlightsBlock) {
  return <section className="container py-20" id={props.anchor || undefined}>
    <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">{props.featuresEyebrow}</p><h2 className="mt-4 text-4xl font-black tracking-tight">{props.featuresHeading}</h2></div><div className="grid gap-4 sm:grid-cols-2">{props.features?.map((item) => <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[.025] p-4 text-sm text-slate-300" key={item.id || item.text}><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10"><Check className="size-3 text-cyan-300" /></span>{item.text}</div>)}</div></div>
    {props.outcomes?.length ? <div className="mt-20"><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">{props.outcomesEyebrow}</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{props.outcomes.map((outcome) => { const Icon = icons[outcome.icon] || Check; return <article className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b1728,#07101d)] p-6" key={outcome.id || outcome.title}><Icon className="size-6 text-blue-300" /><h3 className="mt-8 font-bold">{outcome.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{outcome.description}</p></article> })}</div></div> : null}
  </section>
}
