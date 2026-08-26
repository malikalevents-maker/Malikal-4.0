'use client'

import InteractiveSelector from './ui/interactive-selector'

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
            Our Inspiration
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Drag to explore — click any image to expand. Drawing inspiration from the finest
            celebrations to create your perfect event.
          </p>
        </div>
      </div>

      {/* InteractiveSelector */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <InteractiveSelector />
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mt-10">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-maroon text-white px-8 py-3 rounded-full font-medium border-2 border-maroon hover:bg-white hover:text-maroon transition-colors shadow-lg text-sm sm:text-base"
          >
            Let's Create Your First Event
          </button>
        </div>
      </div>
    </section>
  )
}
