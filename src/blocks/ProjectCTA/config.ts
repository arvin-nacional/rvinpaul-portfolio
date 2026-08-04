import type { Block } from 'payload'

export const ProjectCTA: Block = {
  slug: 'projectCTA',
  interfaceName: 'ProjectCTABlock',
  labels: { singular: 'Project call to action', plural: 'Project calls to action' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'buttonLabel', type: 'text', required: true },
    { name: 'buttonURL', type: 'text', required: true },
  ],
}
