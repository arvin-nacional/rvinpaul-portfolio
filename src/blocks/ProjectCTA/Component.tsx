import type { ProjectCTABlock } from '@/payload-types'
import { ArrowUpRight, PackageCheck } from 'lucide-react'

export function ProjectCTABlockComponent(props: ProjectCTABlock) {
  return <section className="container pb-20"><div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-blue-400/20 bg-blue-500/[.07] p-8 md:flex-row md:items-center md:p-12"><div><PackageCheck className="mb-5 size-8 text-cyan-300" /><h2 className="text-3xl font-black tracking-tight">{props.heading}</h2><p className="mt-3 text-slate-400">{props.description}</p></div><a className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#030812]" href={props.buttonURL} rel="noreferrer" target="_blank">{props.buttonLabel} <ArrowUpRight className="size-4" /></a></div></section>
}
