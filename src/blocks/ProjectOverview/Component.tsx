import type { ProjectOverviewBlock } from '@/payload-types'

export function ProjectOverviewBlockComponent(props: ProjectOverviewBlock) {
  return <section className="border-y border-white/8 bg-[#050c17] py-20" id={props.anchor || undefined}><div className="container grid gap-14 lg:grid-cols-2">
    <div><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">{props.challengeEyebrow}</p><h2 className="mt-4 max-w-[14ch] text-3xl font-black tracking-tight md:text-5xl">{props.challengeHeading}</h2><p className="mt-6 max-w-xl whitespace-pre-line text-base leading-8 text-slate-300/70">{props.challengeDescription}</p></div>
    <div><p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-400">{props.solutionEyebrow}</p><h2 className="mt-4 max-w-[15ch] text-3xl font-black tracking-tight md:text-5xl">{props.solutionHeading}</h2><p className="mt-6 max-w-xl whitespace-pre-line text-base leading-8 text-slate-300/70">{props.solutionDescription}</p></div>
  </div></section>
}
