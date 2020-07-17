import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import client from 'client'

const Post = (props) => {
  const {
    authorImage,
    body = [],
    categories,
    name = 'Missing name',
    title = 'Missing title',
  } = props

  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={
              imageUrlBuilder(client)
              .image(authorImage)
              .width(50)
              .url()}
          />
        </div>
      )}
      <BlockContent
        blocks={body}
        imageOptions={{
          w: 320,
          h: 240,
          fit: 'max',
        }}
        {...client.config()}
      />
    </article>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

Post.getInitialProps = async function(context) {
  const { post = `` } = context.query

  return await client.fetch(query,
    {
      slug: post
    }
  )
}

export default Post
