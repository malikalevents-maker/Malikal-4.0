import Header from '../components/Header'
import EventBanner from '../components/EventBanner'
import Hero from '../components/Hero'
import About from '../components/About'
import Founder from '../components/Founder'
import Services from '../components/Services'
import UpcomingEvents from '../components/UpcomingEvents'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import LogoIntro from '../components/LogoIntro'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Home() {
  return (
    <>
      {/*
        LogoIntro lives OUTSIDE the ErrorBoundary.
        If anything inside <main> throws, LogoIntro's timers
        are unaffected and it will always finish its sequence.
      */}
      <LogoIntro />

      <ErrorBoundary>
        <main className="pb-20 md:pb-0">
          <Header />
          <EventBanner />
          <Hero />
          <About />
          <Founder />
          <Services />
          <UpcomingEvents />
          <Gallery />
          <Contact />
          <Footer />
        </main>
      </ErrorBoundary>
    </>
  )
}
