'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-4 md:gap-6">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-sm font-medium text-white/72 no-underline transition-colors hover:text-white"
          />
        )
      })}
      <Link
        className="rounded-full p-2 text-white/72 transition-colors hover:bg-white/10 hover:text-white"
        href="/search"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="size-4.5" />
      </Link>
    </nav>
  )
}
