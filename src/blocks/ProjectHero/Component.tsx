import type { ProjectHeroBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export function ProjectHeroBlockComponent(props: ProjectHeroBlock) {
  const {
    description,
    details,
    heading,
    liveSiteLabel,
    liveSiteURL,
    previewImage,
    projectNumber,
    subtitle,
  } = props
  return (
    <section className="container pb-20 pt-32">
      <div className="mb-10 flex items-center justify-between">
        <Link
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          href="/#projects"
        >
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
        {liveSiteURL && (
          <a
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-xs font-bold text-blue-200"
            href={liveSiteURL}
            rel="noreferrer"
            target="_blank"
          >
            {liveSiteLabel || 'Visit live site'} <ArrowUpRight className="size-3.5" />
          </a>
        )}
      </div>
      <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="inline-flex rounded-md bg-blue-500/15 px-2 py-1 font-mono text-[.65rem] text-cyan-300">
            {projectNumber}
          </span>
          <h1 className="mt-5 whitespace-pre-line text-[clamp(3.5rem,7vw,7rem)] font-black leading-[.88] tracking-[-.07em]">
            {heading}
          </h1>
          <p className="mt-5 text-lg font-medium text-blue-100">{subtitle}</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300/70">{description}</p>
        </div>
        {previewImage && typeof previewImage === 'object' && (
          <div className="relative h-[23rem] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,.45)] md:h-[32rem]">
            <Media fill htmlElement={null} imgClassName="object-cover" resource={previewImage} />
          </div>
        )}
      </div>
      {details?.length ? (
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item) => (
            <div className="bg-[#08111f] p-6" key={item.id || item.label}>
              <p className="font-mono text-[.6rem] uppercase tracking-[.16em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-sm font-medium text-slate-200">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
