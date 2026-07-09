import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="hero not-found" aria-label="Page not found">
      <div className="hero-intro">
        <div className="hero-top">
          <span className="tag">Error · 404</span>
        </div>
        <h1 className="hero-name">
          Lost the <span className="archer">thread.</span>
        </h1>
        <p className="hero-body">
          That page doesn&apos;t exist — or hasn&apos;t been built yet. Let&apos;s get you
          back to the work.
        </p>
        <div className="cta-row">
          <Link href="/" className="btn primary">
            Back to home <span className="arr">→</span>
          </Link>
          <Link href="/#work" className="btn">
            View the work <span className="arr">↓</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
