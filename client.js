import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: `xh382maz`,
  dataset: `production`,
  useCdn: true,
})
