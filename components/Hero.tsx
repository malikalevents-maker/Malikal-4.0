'use client'

import LogoIntro from './LogoIntro'

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <LogoIntro />

      <section className="relative min-h-screen flex items-center justify-center pt-28 md:pt-36 pb-16 overflow-hidden">

        {/* intro-background.png — full section background */}
        <img
          src="/intro-background.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Light #FFF3E6 tint over the image so text stays readable */}
        <div className="absolute inset-0 bg-[#FFF3E6]/70 pointer-events-none" />

        {/* Subtle ambient blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-maroon/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

        {/* side-holders.gif — centered decoration */}
        <img
          src="/side-holders.gif"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none opacity-90"
        />

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-maroon mb-6 leading-tight">
            Crafting Unforgettable
            <br />
            <span className="text-maroon/70">Celebrations</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed px-2">
            A fresh start in luxury event planning. We bring passion, creativity, and unwavering
            commitment to transform your vision into reality with precision and elegance.
          </p>

          {/* CTA button */}
          <button
            onClick={scrollToContact}
            className="bg-maroon text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-maroon hover:bg-white hover:text-maroon shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Planning Your Event
          </button>

          {/* Stat cards */}
          <div className="mt-14 md:mt-20 grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Fresh', sub: 'New Beginning' },
              { label: 'Ready', sub: 'To Create Magic' },
              { label: 'Ambitious', sub: 'Vision & Drive' },
            ].map(({ label, sub }) => (
              <div key={label} className="glass rounded-2xl py-4 px-2 sm:px-4">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-maroon mb-1">{label}</div>
                <div className="text-gray-500 text-xs sm:text-sm">{sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
