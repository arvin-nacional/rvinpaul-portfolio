import type { Block } from 'payload'

export const FeaturedProjects: Block = {
  slug: 'featuredProjects',
  interfaceName: 'FeaturedProjectsBlock',
  labels: {
    plural: 'Featured Projects',
    singular: 'Featured Projects',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Selected work',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Projects that solve real problems.',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'A selection of recent work where I designed, built, and shipped full-stack solutions from concept to production.',
      required: true,
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      maxRows: 6,
      minRows: 1,
      required: true,
      admin: {
        description: 'Select and order the projects that should appear in this section.',
      },
    },
  ],
}
