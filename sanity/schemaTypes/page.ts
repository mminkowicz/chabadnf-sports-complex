import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', type: 'string', title: 'Heading' },
          { name: 'body', type: 'text', title: 'Body' },
        ]
      }]
    })
  ],
})
