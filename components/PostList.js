import Link from 'next/link'

export const PostList = ({ posts = [] }) => {
  return (
    <div>
      {!posts.length &&
        <div>
          {`No posts!`}
        </div>
      }

      <ul>
        {posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a>{post.frontmatter.title}</a>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
