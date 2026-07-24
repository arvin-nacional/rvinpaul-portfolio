import type { Block } from 'payload'

const iconOptions = [
  { label: 'Discover', value: 'discover' },
  { label: 'Plan', value: 'plan' },
  { label: 'Design', value: 'design' },
  { label: 'Build', value: 'build' },
  { label: 'Test', value: 'test' },
  { label: 'Deploy', value: 'deploy' },
  { label: 'Iterate', value: 'iterate' },
]

export const DevelopmentProcess: Block = {
  slug: 'developmentProcess',
  interfaceName: 'DevelopmentProcessBlock',
  labels: {
    plural: 'Development Processes',
    singular: 'Development Process',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'How I build',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'From requirements to release.',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'I approach software as more than writing code. I work through the full development lifecycle—understanding the problem, designing the system, building and testing it, deploying it, and improving it based on real-world use.',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      admin: {
        description: 'Seven steps create the desktop snake layout shown on the site.',
        initCollapsed: true,
      },
      defaultValue: [
        {
          description: 'Understand the problem, users, requirements, and constraints.',
          details: 'Requirements • User Stories • Scope',
          icon: 'discover',
          title: 'Discover',
        },
        {
          description: 'Break the problem into features, milestones, and technical decisions.',
          details: 'Architecture • Tasks • Data Models',
          icon: 'plan',
          title: 'Plan',
        },
        {
          description: 'Define application structure, database, APIs, and user experience.',
          details: 'UX • Database • API Design',
          icon: 'design',
          title: 'Design',
        },
        {
          description: 'Develop maintainable frontend and backend systems.',
          details: 'Next.js • TypeScript • Node.js',
          icon: 'build',
          title: 'Build',
        },
        {
          description: 'Validate functionality, edge cases, accessibility, and performance.',
          details: 'Validation • Debugging • QA',
          icon: 'test',
          title: 'Test',
        },
        {
          description: 'Move the application into production with cloud services and monitoring.',
          details: 'Cloud • CI/CD • Production',
          icon: 'deploy',
          title: 'Deploy',
        },
        {
          description: 'Observe, gather feedback, fix issues, and improve the product.',
          details: 'Monitor • Improve • Refactor',
          icon: 'iterate',
          title: 'Iterate',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'details',
          type: 'text',
          admin: {
            description: 'Short technologies or deliverables separated with bullets.',
          },
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'build',
          options: iconOptions,
          required: true,
        },
      ],
      maxRows: 7,
      minRows: 3,
      required: true,
    },
  ],
}
