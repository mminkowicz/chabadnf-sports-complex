import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({ name: 'siteTitle', type: 'string', title: 'Site Title' }),
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading' }),
    defineField({ name: 'heroSub', type: 'text', title: 'Hero Subheading' }),
    defineField({ name: 'heroImage', type: 'image', title: 'Hero Image' }),
  ],
})
