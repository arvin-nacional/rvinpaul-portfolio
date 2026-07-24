'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })

    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <header
      className={cn(
        'inset-x-0 top-0 z-50 px-4 transition-[background-color,transform] duration-500 md:px-6',
        isScrolled ? 'fixed' : 'absolute',
      )}
      data-scrolled={isScrolled}
      {...(isScrolled ? { 'data-theme': 'dark' } : theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={cn(
          'mx-auto mt-4 flex w-full max-w-[86rem] items-center justify-between rounded-full border px-5 py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:mt-5 md:px-7',
          isScrolled
            ? 'border-white/10 bg-[#030812]/88 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl'
            : 'border-transparent bg-transparent shadow-none',
        )}
      >
        <Link className="relative z-10 shrink-0" href="/">
          <Logo
            loading="eager"
            priority="high"
            className="max-w-[7.5rem] brightness-0 invert md:max-w-[8.5rem]"
          />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
