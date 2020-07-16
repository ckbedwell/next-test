import Head from 'next/Head'
import { Header } from 'components/Header'

export const Layout = ({ children, pageTitle, ...props }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section>
        <Header />
        <div>
          {children}
        </div>
      </section>
      <footer>Built by Chris</footer>
    </>
  )
}
