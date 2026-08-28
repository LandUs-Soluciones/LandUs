import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'

const section = (name: string, title: string, description: string, fields: ReturnType<typeof defineField>[], collapsed = true) =>
  defineField({name, title, description, type: 'object', options: {collapsible: true, collapsed}, fields})

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Sitio LandUs',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'brand', title: 'Nombre de marca', type: 'string', validation: (Rule) => Rule.required()}),
    section('hero', '1. Portada', 'El mensaje principal que verá un cliente al entrar.', [
      defineField({name: 'eyebrow', title: 'Etiqueta superior', type: 'string'}),
      defineField({name: 'title', title: 'Título principal', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'accent', title: 'Frase destacada', type: 'string'}),
      defineField({name: 'description', title: 'Descripción', type: 'text', rows: 3}),
      defineField({name: 'primaryCta', title: 'Texto del botón principal', type: 'string'}),
      defineField({name: 'secondaryCta', title: 'Texto del enlace secundario', type: 'string'}),
    ], false),
    defineField({
      name: 'services', title: '2. Servicios', description: 'Cada elemento se muestra como una propuesta de valor.', type: 'array',
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'number', title: 'Número', type: 'string'}),
        defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'text', title: 'Descripción', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
      ], preview: {select: {title: 'title', subtitle: 'number'}}})],
    }),
    defineField({
      name: 'process', title: '3. Proceso de trabajo', description: 'Los pasos que sigue LandUs en cada proyecto.', type: 'array',
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'step', title: 'Número', type: 'string'}),
        defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'text', title: 'Descripción', type: 'text', rows: 3}),
      ], preview: {select: {title: 'title', subtitle: 'step'}}})],
    }),
    defineField({
      name: 'team', title: '4. Equipo', description: 'Personas que se muestran en la landing.', type: 'array',
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'name', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'role', title: 'Rol', type: 'string', validation: (Rule) => Rule.required()}),
      ], preview: {select: {title: 'name', subtitle: 'role'}}})],
    }),
    section('finalCta', '5. Llamado final', 'La invitación final para iniciar un proyecto.', [
      defineField({name: 'title', title: 'Título', type: 'string'}),
      defineField({name: 'text', title: 'Descripción', type: 'text', rows: 3}),
      defineField({name: 'button', title: 'Texto del botón', type: 'string'}),
    ]),
  ],
  preview: {prepare: () => ({title: 'Sitio LandUs', subtitle: 'Contenido público de la landing'})},
})
