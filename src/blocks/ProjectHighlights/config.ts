import type { Block } from 'payload'

const iconOptions = ['globe', 'route', 'gauge', 'shield', 'package', 'check']

export const ProjectHighlights: Block = {
  slug: 'projectHighlights',
  interfaceName: 'ProjectHighlightsBlock',
  labels: { singular: 'Features & outcomes', plural: 'Features & outcomes sections' },
  fields: [
    { name: 'anchor', type: 'text', admin: { description: 'Optional URL anchor, without the #.' } },
    { name: 'featuresEyebrow', type: 'text', defaultValue: 'Key features', required: true },
    { name: 'featuresHeading', type: 'text', required: true },
    { name: 'features', type: 'array', minRows: 1, fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'outcomesEyebrow', type: 'text', defaultValue: 'Outcomes', required: true },
    { name: 'outcomes', type: 'array', minRows: 1, maxRows: 4, fields: [
      { name: 'icon', type: 'select', options: iconOptions, defaultValue: 'check', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
    ] },
  ],
}
