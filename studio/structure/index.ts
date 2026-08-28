import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list().title('Contenido').items([
    S.listItem().title('Sitio LandUs').id('landusLanding').child(
      S.document().schemaType('landingPage').documentId('landusLanding').title('Sitio LandUs'),
    ),
  ])
