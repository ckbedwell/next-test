import Link from 'next/link'

export const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>My blog</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  )
}
