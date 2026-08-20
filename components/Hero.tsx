'use client'

import ScrollReveal from './ScrollReveal'
import SpecularButton from './SpecularButton'
import BorderGlow from './BorderGlow'

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const cards = [
    { value: 'Fresh',     label: 'New Beginning' },
    { value: 'Ready',     label: 'To Create Magic' },
    { value: 'Ambitious', label: 'Vision & Drive' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 overflow-hidden">

      {/* Blurred background — intro-background.png, scaled to hide blur edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-110"
        style={{
          backgroundImage:    "url('/intro-background.png')",
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          backgroundRepeat:   'no-repeat',
          filter:             'blur(4px)',
        }}
      />

      {/* Soft cream overlay so text stays readable over the blurred image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#FFF3E6]/60"
      />

      <div className="container mx-auto text-center relative z-10">

        {/* Scroll-reveal heading */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          textClassName="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-maroon mb-6 leading-tight"
        >
          Crafting Unforgettable Celebrations
        </ScrollReveal>

        {/* Sub-heading */}
        <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          A fresh start in luxury event planning. We bring passion, creativity, and unwavering
          commitment to transform your vision into reality with precision and elegance.
        </p>

        {/* SpecularButton — React Bits API; md on mobile, lg on sm+ */}
        <SpecularButton
          size="md"
          radius={999}
          tint="#800000"
          tintOpacity={1}
          blur={0}
          textColor="#ffffff"
          lineColor="#ffb347"
          baseColor="#6B2E1F"
          intensity={1.2}
          shineSize={12}
          shineFade={45}
          thickness={1}
          speed={0.4}
          followMouse={true}
          proximity={280}
          autoAnimate={false}
          onClick={scrollToContact}
        >
          Start Planning Your Event
        </SpecularButton>

        {/* BorderGlow stat cards — React Bits API */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {cards.map(({ value, label }) => (
            <BorderGlow
              key={value}
              borderRadius={24}
              backgroundColor="#ffffff40"
              glowColor="10 80 80"
              glowIntensity={1.2}
              glowRadius={35}
              edgeSensitivity={25}
              coneSpread={28}
              colors={['#800000', '#ffb347', '#6B2E1F']}
              className="h-full"
            >
              <div className="text-center p-6 sm:p-8 h-full flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-bold text-maroon mb-2">{value}</div>
                <div className="text-gray-700 font-medium text-sm sm:text-base">{label}</div>
              </div>
            </BorderGlow>
          ))}
        </div>

      </div>
    </section>
  )
}
