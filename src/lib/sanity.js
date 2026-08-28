import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '8oftgxze'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

const client = createClient({projectId, dataset, apiVersion: '2026-08-28', useCdn: false})

const query = `*[_type == "landingPage" && _id == "landusLanding"][0]{
  brand,
  hero,
  services[]{_key, number, title, text},
  process[]{_key, step, title, text},
  team[]{_key, name, role},
  finalCta
}`

export function getLandingContent() {
  return client.fetch(query)
}
