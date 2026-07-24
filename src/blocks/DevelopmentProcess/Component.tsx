'use client'

import type { DevelopmentProcessBlock as DevelopmentProcessBlockProps } from '@/payload-types'

import { ProcessFlow } from '@/components/ProcessFlow'
import {
  ClipboardList,
  CloudUpload,
  Code2,
  Compass,
  PanelsTopLeft,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const icons: Record<string, LucideIcon> = {
  build: Code2,
  deploy: CloudUpload,
  design: PanelsTopLeft,
  discover: Compass,
  iterate: RefreshCw,
  plan: ClipboardList,
  test: ShieldCheck,
}

export const DevelopmentProcessBlock: React.FC<DevelopmentProcessBlockProps> = ({
  description,
  eyebrow,
  heading,
  steps,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const visibleSteps = steps.slice(0, 7)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-10% 0px', threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative overflow-hidden bg-[#02060d] py-24 text-white md:py-32"
      data-theme="dark"
      ref={sectionRef}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(21,121,255,0.1),transparent_42%),linear-gradient(180deg,#02060d,#030914)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(37,137,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,137,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

      <div className="container relative z-10 grid items-center gap-16 lg:grid-cols-[0.72fr_1.7fr] lg:gap-12">
        <div>
          <p className="mb-4 font-mono text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">
            {eyebrow}
          </p>
          <h2 className="max-w-[13ch] text-[clamp(2.7rem,4.5vw,5rem)] leading-[0.96] font-black tracking-[-0.055em] text-balance">
            {heading}
          </h2>
          <p className="mt-7 max-w-[34rem] text-base leading-8 text-slate-300/78">{description}</p>
          <div className="mt-7 h-px w-16 bg-gradient-to-r from-cyan-300 to-blue-600" />
        </div>

        <div className="relative">
          <div className="absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
            <ProcessFlow active={isVisible} />
          </div>

          <div className="relative z-10 hidden min-h-[35rem] grid-cols-8 grid-rows-2 gap-x-4 gap-y-16 px-4 py-8 lg:grid xl:gap-x-6">
            {visibleSteps.map((step, index) => {
              const Icon = icons[step.icon] || Code2
              const isTopRow = index < 4
              const column = isTopRow ? index * 2 + 1 : 14 - index * 2

              return (
                <article
                  className={`relative self-center overflow-hidden rounded-2xl border border-blue-300/14 bg-[linear-gradient(145deg,rgba(17,35,57,0.96),rgba(5,15,28,0.98))] px-5 py-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  key={step.id || index}
                  style={{
                    gridColumn: `${column} / span 2`,
                    gridRow: isTopRow ? 1 : 2,
                    transitionDelay: `${180 + index * 110}ms`,
                  }}
                >
                  <span className="absolute top-0 left-0 rounded-br-lg bg-blue-500 px-2 py-1 font-mono text-[0.65rem] font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-blue-400/35 bg-blue-500/9 shadow-[0_0_24px_rgba(37,137,255,0.15)]">
                    <Icon className="size-7 text-blue-300" strokeWidth={1.7} />
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.08em] uppercase">{step.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-300/72">{step.description}</p>
                  <p className="mt-3 text-[0.66rem] leading-4 font-medium text-cyan-400">
                    {step.details}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="relative space-y-5 pl-8 lg:hidden">
            <div className="absolute top-6 bottom-6 left-2 w-px bg-gradient-to-b from-cyan-300 via-blue-500 to-cyan-300 shadow-[0_0_12px_#2589ff]" />
            {visibleSteps.map((step, index) => {
              const Icon = icons[step.icon] || Code2

              return (
                <article
                  className={`relative rounded-2xl border border-blue-300/14 bg-[#071321]/95 p-5 transition-all duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                  }`}
                  key={step.id || index}
                  style={{ transitionDelay: `${120 + index * 90}ms` }}
                >
                  <span className="absolute top-7 -left-[1.9rem] size-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#6ee7ff]" />
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">
                      <Icon className="size-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] text-blue-400">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-1 font-bold uppercase">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300/72">{step.description}</p>
                      <p className="mt-2 text-xs text-cyan-400">{step.details}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
