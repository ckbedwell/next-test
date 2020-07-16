import { Layout } from 'components/Layout'

const About = ({ description, title, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <h1>About</h1>
      <p>
        {description}
      </p>
    </Layout>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      description: configData.default.description,
      title: configData.default.title,
    }
  }
}
