import type { Metadata } from 'next'
import type { Project } from '@/payload-types'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ProjectCTABlockComponent } from '@/blocks/ProjectCTA/Component'
import { ProjectHeroBlockComponent } from '@/blocks/ProjectHero/Component'
import { ProjectHighlightsBlockComponent } from '@/blocks/ProjectHighlights/Component'
import { ProjectOverviewBlockComponent } from '@/blocks/ProjectOverview/Component'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

type Args = { params: Promise<{ slug?: string }> }

const components = {
  projectCTA: ProjectCTABlockComponent,
  projectHero: ProjectHeroBlockComponent,
  projectHighlights: ProjectHighlightsBlockComponent,
  projectOverview: ProjectOverviewBlockComponent,
}

export default async function ProjectPage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const slug = decodeURIComponent((await params).slug || '')
  const project = await queryProject(slug)
  const url = `/projects/${slug}`
  if (!project) return <PayloadRedirects url={url} />

  return <main className="min-h-screen bg-[#030812] text-white" data-theme="dark">
    <PayloadRedirects disableNotFound url={url} />
    {draft && <LivePreviewListener />}
    {project.layout?.map((block, index) => {
      const Component = components[block.blockType] as React.ComponentType<typeof block> | undefined
      return Component ? <Component {...block} key={block.id || index} /> : null
    })}
  </main>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug || '')
  return generateMeta({ doc: await queryProject(slug) })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'projects', draft: false, limit: 1000, overrideAccess: false, pagination: false, select: { slug: true } })
  return result.docs.map(({ slug }) => ({ slug }))
}

const queryProject = cache(async (slug: string): Promise<Project | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'projects', draft, limit: 1, overrideAccess: draft, pagination: false, where: { slug: { equals: slug } } })
  return result.docs[0] || null
})
