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

export default function Home() {
  return (
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
  )
}