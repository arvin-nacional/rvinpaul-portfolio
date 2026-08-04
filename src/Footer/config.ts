import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Open to new opportunities',
      required: true,
    },
    {
      name: 'heading',
      type: 'textarea',
      defaultValue: "Let's build products that make a difference.",
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'I am a full-stack developer who turns complex requirements into reliable, thoughtful digital experiences. I am ready to bring that experience to a strong product team.',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: { width: '50%' },
          defaultValue: 'hello@rvinpaul.com',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          admin: { width: '50%' },
          defaultValue: 'Philippines · Open to remote opportunities',
          required: true,
        },
      ],
    },
    {
      name: 'availability',
      type: 'text',
      defaultValue: 'Open to full-time and contract roles',
      required: true,
    },
    {
      name: 'resumeURL',
      type: 'text',
      admin: {
        description: 'Link to your résumé or CV. Leave empty to hide the résumé button.',
      },
      label: 'Résumé URL',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      maxRows: 6,
      admin: {
        description: 'Social profiles and external links displayed in the footer.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
