import matter from 'gray-matter'

import { Layout } from 'components/Layout'
import { PostList } from 'components/PostList'

const Homepage = ({ description, posts, title, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <h1>Welcome to my blog</h1>
      <p>
        {description}
      </p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export default Homepage

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\\/]/, ``).slice(0, -3)
      const value = values[index]
      const document = matter(value.default)

      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })

    return data
  })(require.context(`../posts`, true, /\.md$/))

  return {
    props: {
      description: configData.default.description,
      posts,
      title: configData.default.title,
    }
  }
}
