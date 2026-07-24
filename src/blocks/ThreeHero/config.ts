import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const ThreeHero: Block = {
  slug: 'threeHero',
  interfaceName: 'ThreeHeroBlock',
  labels: {
    plural: '3D Heroes',
    singular: '3D Hero',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Full-stack developer',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Keep this short—ideally four to seven words.',
      },
      defaultValue: 'Building ideas, layer by layer.',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Description',
      required: true,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'technologies',
      type: 'array',
      admin: {
        description:
          'Displayed from foundation to top. The scene currently supports up to nine blocks.',
        initCollapsed: true,
      },
      defaultValue: [
        { label: 'HTML' },
        { label: 'CSS' },
        { label: 'JAVASCRIPT' },
        { label: 'TYPESCRIPT' },
        { label: 'REACT' },
        { label: 'NEXT.JS' },
        { label: 'NODE.JS' },
        { label: 'MONGODB' },
        { label: 'GITHUB' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          maxLength: 14,
          required: true,
        },
      ],
      maxRows: 9,
      minRows: 1,
      required: true,
    },
    {
      name: 'fallbackMedia',
      type: 'upload',
      admin: {
        description: 'Shown on small screens and when the WebGL scene is unavailable.',
      },
      relationTo: 'media',
    },
    {
      name: 'showSportsDetails',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show subtle running-track lines',
    },
  ],
}
