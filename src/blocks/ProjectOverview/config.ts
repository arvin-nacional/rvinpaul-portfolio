import type { Block } from 'payload'

export const ProjectOverview: Block = {
  slug: 'projectOverview',
  interfaceName: 'ProjectOverviewBlock',
  labels: { singular: 'Challenge & solution', plural: 'Challenge & solution sections' },
  fields: [
    { name: 'anchor', type: 'text', admin: { description: 'Optional URL anchor, without the #.' } },
    { name: 'challengeEyebrow', type: 'text', defaultValue: 'The challenge', required: true },
    { name: 'challengeHeading', type: 'text', required: true },
    { name: 'challengeDescription', type: 'textarea', required: true },
    { name: 'solutionEyebrow', type: 'text', defaultValue: 'The solution', required: true },
    { name: 'solutionHeading', type: 'text', required: true },
    { name: 'solutionDescription', type: 'textarea', required: true },
  ],
}
