'use client'

import type { ThreeHeroBlock as ThreeHeroBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ThreeHero } from '@/components/ThreeHero'

export const ThreeHeroBlock: React.FC<ThreeHeroBlockProps> = ({
  eyebrow,
  fallbackMedia,
  heading,
  links,
  richText,
  showSportsDetails,
  technologies,
}) => {
  const labels = technologies?.map(({ label }) => label) ?? []

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#02050b] text-white"
      data-theme="dark"
    >
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        <ThreeHero showSportsDetails={showSportsDetails} technologies={labels} />
      </div>

      <div className="absolute inset-0 md:hidden" aria-hidden="true">
        {fallbackMedia && typeof fallbackMedia === 'object' && (
          <Media fill imgClassName="object-cover opacity-40" priority resource={fallbackMedia} />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(21,121,255,0.42),transparent_42%),linear-gradient(135deg,#02050b_20%,#071a3d_65%,#1579ff_140%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,11,0.98)_0%,rgba(2,5,11,0.86)_35%,rgba(2,5,11,0.15)_68%,rgba(2,5,11,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02050b] to-transparent" />

      <div className="container pointer-events-none relative z-10 flex min-h-[100svh] items-center py-24">
        <div className="pointer-events-auto max-w-[39rem]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.18em] text-blue-100 uppercase backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_#6ee7ff]" />
            {eyebrow}
          </div>

          <h1 className="mb-6 max-w-[11ch] text-[clamp(3.25rem,6.4vw,6.5rem)] leading-[0.9] font-black tracking-[-0.065em] text-balance">
            {heading || 'Building ideas, layer by layer.'}
          </h1>

          <RichText
            className="mb-7 [&_p]:max-w-[35rem] [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-blue-100/75 md:[&_p]:text-lg"
            data={richText}
            enableGutter={false}
          />

          {links && links.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {links.map(({ link }, index) => (
                <li key={index}>
                  <CMSLink
                    {...link}
                    className={
                      index === 0
                        ? 'rounded-full bg-white px-6 text-black hover:bg-blue-100'
                        : 'rounded-full border-white/25 bg-white/5 px-6 text-white backdrop-blur hover:bg-white/10'
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="absolute right-5 bottom-6 z-10 hidden items-center gap-3 font-mono text-[0.62rem] tracking-[0.16em] text-white/45 uppercase md:flex">
        <span>Drag to rotate</span>
        <span className="h-px w-12 bg-gradient-to-r from-blue-400 to-transparent" />
      </div>
    </section>
  )
}
