import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'

const section = (name: string, title: string, description: string, fields: ReturnType<typeof defineField>[], collapsed = true) =>
  defineField({name, title, description, type: 'object', options: {collapsible: true, collapsed}, fields})

const legacyReason = 'Este contenido corresponde a la versión anterior de la landing. Usa las secciones nuevas de arriba.'

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Sitio LandUs',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'brand', title: 'Nombre de marca', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'contactUrl', title: 'Enlace principal de contacto', description: 'Ejemplo: el perfil de Instagram, WhatsApp o formulario de LandUs.', type: 'url', validation: (Rule) => Rule.uri({scheme: ['http', 'https']}).required()}),
    section('hero', '1. Portada', 'El mensaje que transforma un clic en el inicio de la Ruta LandUs.', [
      defineField({name: 'eyebrow', title: 'Etiqueta superior', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'title', title: 'Titular principal', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'accent', title: 'Frase destacada en azul', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'description', title: 'Explicación corta', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
      defineField({name: 'primaryCta', title: 'Botón principal', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'secondaryCta', title: 'Enlace secundario', type: 'string', validation: (Rule) => Rule.required()}),
    ], false),
    section('problem', '2. Después del clic', 'La sección que plantea el problema que resuelve LandUs.', [
      defineField({name: 'eyebrow', title: 'Etiqueta', type: 'string'}),
      defineField({name: 'title', title: 'Titular', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'text', title: 'Explicación', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
    ]),
    defineField({
      name: 'route', title: '3. La Ruta LandUs', description: 'Los cuatro momentos que llevan de una visita a una oportunidad.', type: 'array', validation: (Rule) => Rule.min(3).max(4),
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'number', title: 'Número', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'label', title: 'Etiqueta corta', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'text', title: 'Explicación', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
      ], preview: {select: {title: 'title', subtitle: 'label'}}})],
    }),
    section('caseStudy', '4. Caso demostrativo', 'Explica una landing a través de un objetivo comercial concreto.', [
      defineField({name: 'eyebrow', title: 'Etiqueta', type: 'string'}),
      defineField({name: 'title', title: 'Titular', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'accent', title: 'Frase destacada', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'text', title: 'Explicación', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
      defineField({name: 'context', title: 'Para quién', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'objective', title: 'Objetivo', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'actions', title: 'Acciones posibles', description: 'Ejemplos de acciones que una landing puede conseguir.', type: 'array', validation: (Rule) => Rule.min(2).max(4), of: [defineArrayMember({type: 'object', fields: [defineField({name: 'label', title: 'Acción', type: 'string', validation: (Rule) => Rule.required()})], preview: {select: {title: 'label'}}})]}),
    ]),
    defineField({
      name: 'offer', title: '5. Qué incluye una landing', description: 'Las partes del único producto de LandUs, no una lista de servicios genéricos.', type: 'array', validation: (Rule) => Rule.min(3).max(6),
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'number', title: 'Número', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'text', title: 'Descripción', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
      ], preview: {select: {title: 'title', subtitle: 'number'}}})],
    }),
    defineField({
      name: 'faq', title: '6. Preguntas frecuentes', description: 'Respuestas que reducen dudas antes de contactar.', type: 'array', validation: (Rule) => Rule.max(6),
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
      ], preview: {select: {title: 'question'}}})],
    }),
    section('finalCta', '7. Llamado final', 'La invitación final a iniciar un proyecto.', [
      defineField({name: 'title', title: 'Titular', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'text', title: 'Explicación', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
      defineField({name: 'button', title: 'Texto del botón', type: 'string', validation: (Rule) => Rule.required()}),
    ]),
    defineField({name: 'services', title: 'Contenido anterior: servicios', type: 'array', readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: legacyReason}, of: [defineArrayMember({type: 'object', fields: [defineField({name: 'number', type: 'string'}), defineField({name: 'title', type: 'string'}), defineField({name: 'text', type: 'text'})]})]}),
    defineField({name: 'process', title: 'Contenido anterior: proceso', type: 'array', readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: legacyReason}, of: [defineArrayMember({type: 'object', fields: [defineField({name: 'step', type: 'string'}), defineField({name: 'title', type: 'string'}), defineField({name: 'text', type: 'text'})]})]}),
    defineField({name: 'team', title: 'Contenido anterior: equipo', type: 'array', readOnly: true, hidden: ({value}) => value === undefined, deprecated: {reason: legacyReason}, of: [defineArrayMember({type: 'object', fields: [defineField({name: 'name', type: 'string'}), defineField({name: 'role', type: 'string'})]})]}),
  ],
  preview: {prepare: () => ({title: 'Sitio LandUs', subtitle: 'Contenido público de la landing'})},
})