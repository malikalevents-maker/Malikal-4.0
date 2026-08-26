'use client'

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <img src="/centre-logo.png" alt="Malikal Events & Entertainment"
              className="h-20 sm:h-24 md:h-32 w-auto mx-auto mb-4" />
          </div>


            <div className="flex items-center justify-center my-6 md:my-8">
              <div className="w-16 h-px bg-maroon/30"></div>
              <div className="mx-4 text-maroon text-xl">❋</div>
              <div className="w-16 h-px bg-maroon/30"></div>
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              At Malikal Events & Entertainment, we transform your vision into reality with meticulous
              attention to detail, creative excellence, and unwavering commitment to perfection.
            </p>

            {/* Glass pillar cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8">
              {[
                { icon: '🎭', title: 'Creative Excellence', desc: 'Innovative designs and unique concepts tailored to your vision' },
                { icon: '⚡', title: 'Flawless Execution', desc: 'Seamless coordination ensuring every detail is perfect' },
                { icon: '🤝', title: 'Trusted Partnership', desc: 'Reliable service with a personal touch for every client' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="glass glass-hover rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="font-serif font-semibold text-maroon mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      
    </section>
  )
}
