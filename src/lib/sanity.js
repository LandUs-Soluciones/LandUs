import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '8oftgxze'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

const client = createClient({projectId, dataset, apiVersion: '2026-08-28', useCdn: false})

const query = `*[_type == "landingPage" && _id == "landusLanding"][0]{
  brand,
  contactUrl,
  hero,
  problem,
  route[]{_key, number, label, title, text},
  caseStudy,
  offer[]{_key, number, title, text},
  faq[]{_key, question, answer},
  finalCta
}`

export function getLandingContent() {
  return client.fetch(query)
}