import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        {/* Remaining sections — to be built next */}
        <div id="work" className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
          {/* SelectedWork section placeholder */}
        </div>
        <div id="about" />
        <div id="contact" />
      </main>
    </>
  )
}
