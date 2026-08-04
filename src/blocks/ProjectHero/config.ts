import type { Block } from 'payload'

export const ProjectHero: Block = {
  slug: 'projectHero',
  interfaceName: 'ProjectHeroBlock',
  labels: { singular: 'Project hero', plural: 'Project heroes' },
  fields: [
    { name: 'projectNumber', type: 'text', required: true, defaultValue: '01' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'previewImage', type: 'upload', relationTo: 'media' },
    { name: 'liveSiteURL', type: 'text' },
    { name: 'liveSiteLabel', type: 'text', defaultValue: 'Visit live site' },
    {
      name: 'details',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
