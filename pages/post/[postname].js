import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import { Layout } from 'components/Layout'

const BlogPost = ({ frontmatter, markdownBody, title }) => {
  if (!frontmatter) {
    return null
  }

  return (
    <Layout pageTitle={title || frontmatter.title}>
      <Link href="/">
        <a>Back to posts list</a>
      </Link>
      <article>
        <h1>{frontmatter.title}</h1>
        <p>{`By ${frontmatter.author}`}</p>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
    </Layout>
  )
}

export default BlogPost

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../../posts/${postname}.md`)
  const configData = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      title: configData.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = (context => {
    const keys = context.keys()
    const data = keys.map(key => {
      let slug = key.replace(/^.*[\\\/]/, ``).slice(0, -3) //slice off .md

      return slug
    })
    
    return data
  })(require.context(`../../posts`, true, /\.md$/))

  const paths = blogSlugs.map(slug => `/post/${slug}`)

  return {
    paths,
    fallback: false,
  }
}
