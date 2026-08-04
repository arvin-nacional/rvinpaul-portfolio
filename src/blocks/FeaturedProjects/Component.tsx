import type {
  FeaturedProjectsBlock as FeaturedProjectsBlockProps,
  Project,
  ProjectHeroBlock,
} from '@/payload-types'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { ArrowRight } from 'lucide-react'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'

type FeaturedProject = Pick<Project, 'id' | 'layout' | 'slug' | 'title'>

function getHero(project: FeaturedProject) {
  return project.layout?.find(
    (block): block is ProjectHeroBlock => block.blockType === 'projectHero',
  )
}

function getTechnologyTags(hero?: ProjectHeroBlock) {
  const value = hero?.details?.find(
    ({ label }) => label.trim().toLowerCase() === 'technologies',
  )?.value

  return (
    value
      ?.split(',')
      .map((tag) => tag.trim())
      .filter(Boolean) ?? []
  )
}

export async function FeaturedProjectsBlock({
  description,
  eyebrow,
  heading,
  projects,
}: FeaturedProjectsBlockProps) {
  const projectIDs = projects.map((project) =>
    typeof project === 'object' ? project.id : project,
  )

  if (!projectIDs.length) return null

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    depth: 1,
    draft,
    limit: projectIDs.length,
    overrideAccess: draft,
    pagination: false,
    select: {
      layout: true,
      slug: true,
      title: true,
    },
    where: {
      id: {
        in: projectIDs,
      },
    },
  })

  const projectsByID = new Map(result.docs.map((project) => [project.id, project]))
  const featuredProjects = projectIDs
    .map((id) => projectsByID.get(id))
    .filter((project): project is FeaturedProject => Boolean(project))

  if (!featuredProjects.length) return null

  return (
    <section
      className="relative overflow-hidden bg-[#030812] py-24 text-white md:py-32"
      data-theme="dark"
      id="projects"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(37,137,255,.1),transparent_30%)]" />
      <div className="container relative">
        <div className="mb-12 grid gap-6 md:grid-cols-[.92fr_1.08fr] md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[.2em] text-cyan-400">
              {eyebrow}
            </p>
            <h2 className="max-w-[12ch] text-[clamp(2.8rem,5vw,5.3rem)] font-black leading-[.92] tracking-[-.06em]">
              {heading}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-300/70 md:pb-2">{description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => {
            const hero = getHero(project)
            const tags = getTechnologyTags(hero)

            return (
              <Link
                aria-label={`View ${project.title} case study`}
                className="group rounded-2xl border border-white/10 bg-white/[.025] p-2 focus-visible:outline-2 focus-visible:outline-cyan-300"
                href={`/projects/${project.slug}`}
                key={project.id}
              >
                <div className="relative h-52 overflow-hidden rounded-xl border border-white/8 bg-[#08111f] md:h-44 xl:h-56">
                  {hero?.previewImage && typeof hero.previewImage === 'object' && (
                    <Media
                      fill
                      htmlElement={null}
                      imgClassName="object-cover"
                      resource={hero.previewImage}
                    />
                  )}
                </div>
                <div className="px-3 pb-4 pt-5">
                  {hero?.projectNumber && (
                    <span className="inline-flex rounded bg-blue-500/15 px-2 py-1 font-mono text-[.62rem] text-cyan-300">
                      {hero.projectNumber}
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-bold leading-tight">{project.title}</h3>
                  {hero?.subtitle && (
                    <p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">
                      {hero.subtitle}
                    </p>
                  )}
                  {tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          className="rounded border border-white/8 bg-white/[.035] px-2 py-1 font-mono text-[.56rem] text-slate-400"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 flex items-center gap-2 text-[.7rem] font-bold text-blue-300">
                    View case study
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
