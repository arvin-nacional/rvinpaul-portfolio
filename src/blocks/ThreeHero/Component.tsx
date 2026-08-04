'use client'

import type { ThreeHeroBlock as ThreeHeroBlockProps } from '@/payload-types'

import { useEffect, useState } from 'react'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { ThreeHero } from '@/components/ThreeHero'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const check = () => setIsMobile(mq.matches)
    check()
    mq.addEventListener('change', check)
    return () => mq.removeEventListener('change', check)
  }, [breakpoint])

  return isMobile
}

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
  const isMobile = useIsMobile()

  return (
    <section
      className="relative overflow-hidden bg-[#02050b] text-white md:min-h-[100svh]"
      data-theme="dark"
    >
      {isMobile === false && (
        <div className="absolute inset-0 pb-24" aria-hidden="true">
          <ThreeHero showSportsDetails={showSportsDetails} technologies={labels} />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(2,5,11,0.98)_0%,rgba(2,5,11,0.86)_35%,rgba(2,5,11,0.15)_68%,rgba(2,5,11,0.2)_100%)] md:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-[#02050b] to-transparent md:block" />

      <div className="container pointer-events-none relative z-10 flex flex-col pt-36 pb-8 md:min-h-[100svh] md:flex-row md:items-center md:py-24">
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

        {isMobile === true && (
          <div className="pointer-events-auto -mx-4 mt-4 h-[100vw]" aria-hidden="true">
            <ThreeHero centered showSportsDetails={showSportsDetails} technologies={labels} />
          </div>
        )}
      </div>

      <div className="absolute right-5 bottom-6 z-10 hidden items-center gap-3 font-mono text-[0.62rem] tracking-[0.16em] text-white/45 uppercase md:flex">
        <span>Drag to rotate</span>
        <span className="h-px w-12 bg-gradient-to-r from-blue-400 to-transparent" />
      </div>
    </section>
  )
}
