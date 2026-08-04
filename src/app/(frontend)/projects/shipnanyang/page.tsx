import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Check, Gauge, Globe2, PackageCheck, Route, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ShipNanyangPreview } from '@/components/ProjectShowcase/SitePreview'

export const metadata: Metadata = { title: 'ShipNanyang — Project Case Study', description: 'A logistics website and content platform designed and developed for ShipNanyang.' }

const outcomes = [
  { icon: Globe2, label: 'Clearer global reach', copy: 'Service regions and freight options are easier to understand.' },
  { icon: Route, label: 'Simpler customer journey', copy: 'Quote and tracking actions stay visible across the experience.' },
  { icon: Gauge, label: 'Faster publishing', copy: 'Reusable content sections make updates consistent and quick.' },
  { icon: ShieldCheck, label: 'Stronger credibility', copy: 'A polished interface supports trust at every decision point.' },
]

export default function ShipNanyangProjectPage() {
  return (
    <main className="min-h-screen bg-[#030812] pt-32 text-white" data-theme="dark">
      <section className="container pb-20">
        <div className="mb-10 flex items-center justify-between"><Link className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white" href="/#projects"><ArrowLeft className="size-4" /> Back to projects</Link><a className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-xs font-bold text-blue-200" href="https://shipnanyang.com" rel="noreferrer" target="_blank">Visit live site <ArrowUpRight className="size-3.5" /></a></div>
        <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><span className="inline-flex rounded-md bg-blue-500/15 px-2 py-1 font-mono text-[.65rem] text-cyan-300">01</span><h1 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[.88] tracking-[-.07em]">Ship<br />Nanyang</h1><p className="mt-5 text-lg font-medium text-blue-100">Global logistics website & content platform</p><p className="mt-6 max-w-xl text-base leading-8 text-slate-300/70">A clearer digital front door for a freight-forwarding company connecting businesses across Southeast Asia and the UAE.</p></div>
          <div className="relative h-[23rem] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-[0_30px_100px_rgba(0,0,0,.45)] md:h-[32rem]"><ShipNanyangPreview /></div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{[['My role','Full-stack developer'],['Scope','UX/UI, development, deployment'],['Goal','Turn interest into quote requests'],['Technologies','Next.js, Payload CMS, TypeScript']].map(([label,value]) => <div className="bg-[#08111f] p-6" key={label}><p className="font-mono text-[.6rem] uppercase tracking-[.16em] text-slate-500">{label}</p><p className="mt-3 text-sm font-medium text-slate-200">{value}</p></div>)}</div>
      </section>

      <section className="border-y border-white/8 bg-[#050c17] py-20" id="operations"><div className="container grid gap-14 lg:grid-cols-2"><div><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">The challenge</p><h2 className="mt-4 max-w-[14ch] text-3xl font-black tracking-tight md:text-5xl">International shipping is already complex. The website shouldn’t be.</h2><p className="mt-6 max-w-xl text-base leading-8 text-slate-300/70">ShipNanyang needed to explain multiple freight services, regions, and shipment steps without overwhelming prospective customers. The experience also had to establish trust quickly and guide visitors toward a quote or tracking action.</p></div><div><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">The solution</p><h2 className="mt-4 max-w-[15ch] text-3xl font-black tracking-tight md:text-5xl">A confident path from first visit to shipment.</h2><p className="mt-6 max-w-xl text-base leading-8 text-slate-300/70">I shaped the site around clear service categories, visible conversion points, regional expertise, and a simple four-step process. A reusable content structure keeps the experience consistent as the business grows.</p></div></div></section>

      <section className="container py-20" id="system"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">Key features</p><h2 className="mt-4 text-4xl font-black tracking-tight">Built for clarity and action.</h2></div><div className="grid gap-4 sm:grid-cols-2">{['Quote-first information architecture','Shipment tracking entry points','Service and destination pages','Reusable Payload content sections','Responsive, accessible layouts','SEO-ready publishing workflow'].map(item => <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[.025] p-4 text-sm text-slate-300" key={item}><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10"><Check className="size-3 text-cyan-300" /></span>{item}</div>)}</div></div>
        <div className="mt-20"><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">Outcomes</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{outcomes.map(({icon: Icon,label,copy}) => <article className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b1728,#07101d)] p-6" key={label}><Icon className="size-6 text-blue-300" /><h3 className="mt-8 font-bold">{label}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p></article>)}</div></div>
        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-blue-400/20 bg-blue-500/[.07] p-8 md:flex-row md:items-center md:p-12"><div><PackageCheck className="mb-5 size-8 text-cyan-300" /><h2 className="text-3xl font-black tracking-tight">See the experience in production.</h2><p className="mt-3 text-slate-400">Explore ShipNanyang’s live customer-facing website.</p></div><a className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#030812]" href="https://shipnanyang.com" rel="noreferrer" target="_blank">Visit shipnanyang.com <ArrowUpRight className="size-4" /></a></div>
      </section>
    </main>
  )
}
