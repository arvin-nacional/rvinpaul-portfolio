import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { ProjectCTA } from '@/blocks/ProjectCTA/config'
import { ProjectHero } from '@/blocks/ProjectHero/config'
import { ProjectHighlights } from '@/blocks/ProjectHighlights/config'
import { ProjectOverview } from '@/blocks/ProjectOverview/config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: { create: authenticated, delete: authenticated, read: authenticatedOrPublished, update: authenticated },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: { url: ({ data, req }) => generatePreviewPath({ collection: 'projects', slug: data?.slug, req }) },
    preview: (data, { req }) => generatePreviewPath({ collection: 'projects', slug: data?.slug as string, req }),
  },
  defaultPopulate: { title: true, slug: true, meta: { description: true, image: true } },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [{ name: 'layout', type: 'blocks', required: true, admin: { initCollapsed: true }, blocks: [ProjectHero, ProjectOverview, ProjectHighlights, ProjectCTA] }],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({ titlePath: 'meta.title', descriptionPath: 'meta.description', imagePath: 'meta.image' }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({ hasGenerateFn: true, titlePath: 'meta.title', descriptionPath: 'meta.description' }),
          ],
        },
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    slugField(),
  ],
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true }, maxPerDoc: 50 },
}
