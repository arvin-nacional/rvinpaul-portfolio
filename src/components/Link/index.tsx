import { Button, type ButtonProps } from '@/components/ui/button'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'
import { ArrowDownToLine } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Media, Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  file?: Media | string | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'file' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    file,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const fileURL =
    type === 'file' && typeof file === 'object' && file?.url
      ? getMediaUrl(file.url, file.updatedAt)
      : null

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : type === 'file'
        ? fileURL
        : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const linkProps =
    type === 'file'
      ? { download: typeof file === 'object' ? file?.filename || true : true }
      : newTab
        ? { rel: 'noopener noreferrer', target: '_blank' }
        : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...linkProps}>
        {type === 'file' && (
          <ArrowDownToLine aria-hidden="true" className="size-[15px] shrink-0 stroke-[1.75]" />
        )}
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...linkProps}>
        {type === 'file' && (
          <ArrowDownToLine aria-hidden="true" className="size-[15px] shrink-0 stroke-[1.75]" />
        )}
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
