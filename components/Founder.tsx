'use client'

export default function Founder() {
  return (
    <section id="founder" className="relative py-20 bg-[#FFF3E6] overflow-hidden">

      {/* Subtle blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-maroon/4 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative mandalas */}
      <div className="absolute top-10 left-10 opacity-8 pointer-events-none">
        <img src="/mandala-pattern.png" alt="" aria-hidden="true" className="w-32 h-32 object-contain" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-8 rotate-180 pointer-events-none">
        <img src="/mandala-pattern.png" alt="" aria-hidden="true" className="w-32 h-32 object-contain" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
            About Founder
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-maroon/30"></div>
            <div className="mx-4 text-maroon text-xl">❋</div>
            <div className="w-16 h-px bg-maroon/30"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The journey of passion, resilience, and unwavering determination
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

            {/* Founder Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative inline-block">
                <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-maroon/20">
                  <img
                    src="/founder-photo.jpeg"
                    alt="Charandeep — Founder of Malikal Events"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Crect width='320' height='320' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='24' fill='%236B2E1F'%3EFounder Photo%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-maroon/30 animate-pulse pointer-events-none"></div>
              </div>
            </div>

            {/* Founder Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-maroon mb-2">Charandeep</h3>
                <p className="text-base sm:text-xl text-gray-600 font-medium mb-4">Founder & Creative Director</p>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>I'm Charandeep, Founder of Malikal Events & Entertainment — a young event planner
                  in the industry, backed by strong hands-on experience and real-world learning.</p>
                <p>I started this company with nothing but ambition, passion, and the courage to dream big.
                  My journey has been filled with struggles, risks, and lessons earned the hard way.
                  Every setback sharpened my vision, and every challenge strengthened my mindset.</p>
                <p>Malikal Events & Entertainment was born from the belief that great events aren't just
                  organized, they are felt. This brand stands for hustle, resilience, creativity, and
                  an obsession with excellence.</p>
                <p className="font-semibold text-maroon">This is not a short-term business. This is a long-term mission.</p>
              </div>

              {/* Glass stat cards */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-maroon/10">
                {[
                  { val: 'New', sub: 'Fresh Start' },
                  { val: '100%', sub: 'Commitment' },
                  { val: '∞', sub: 'Possibilities' },
                  { val: 'Ready', sub: 'To Deliver' },
                ].map(({ val, sub }) => (
                  <div key={sub} className="glass rounded-xl py-4 text-center">
                    <div className="text-2xl font-bold text-maroon mb-1">{val}</div>
                    <div className="text-sm text-gray-500">{sub}</div>
                  </div>
                ))}
              </div>

              {/* Glass quote box */}
              <div className="glass rounded-2xl p-6 mt-4">
                <blockquote className="text-base italic text-gray-700 text-center leading-relaxed">
                  "Every struggle I faced became fuel, and every event we create is proof that
                  hard work always speaks louder than words. I didn't start Malikal Events to
                  follow trends — I started it to set them."
                </blockquote>
                <div className="text-center mt-4">
                  <div className="text-maroon font-semibold">— Charandeep</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-16 border-t border-maroon/10">
            {[
              {
                icon: '👁️',
                title: 'Our Vision',
                text: 'To build Malikal Events & Entertainment into a powerful and trusted brand that sets new benchmarks in the event industry — known for bold ideas, flawless execution, and experiences that leave a lasting emotional impact.',
              },
              {
                icon: '🎯',
                title: 'Our Mission',
                text: 'To create unforgettable events through passion-driven planning, creative thinking, and disciplined execution. We are committed to continuous growth, honest work, and delivering value that exceeds expectations.',
              },
            ].map(({ icon, title, text }) => (
              <div key={title} className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h4 className="text-2xl font-serif font-bold text-maroon mb-4">{title}</h4>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
