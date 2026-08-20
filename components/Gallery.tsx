'use client'

import DomeGallery from './DomeGallery'

const EVENT_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop', alt: 'Elegant wedding reception' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop', alt: 'Wedding ceremony decoration' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop', alt: 'Birthday celebration' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop', alt: 'Corporate conference event' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop', alt: 'Gala dinner event' },
  { src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&auto=format&fit=crop', alt: 'Floral decoration' },
  { src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop', alt: 'Party celebration' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop', alt: 'Event lights' },
  { src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop', alt: 'Concert entertainment' },
  { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop', alt: 'Stage performance' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop', alt: 'Festive celebration' },
  { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop', alt: 'Wedding couple' },
]

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

      {/* DomeGallery — needs an explicit height container */}
      <div className="relative w-full" style={{ height: 'clamp(360px, 75vw, 700px)' }}>
        <DomeGallery
          images={EVENT_IMAGES}
          overlayBlurColor="#FFF3E6"
          grayscale={false}
          fit={0.5}
          minRadius={300}
          imageBorderRadius="20px"
          openedImageBorderRadius="24px"
          openedImageWidth="320px"
          openedImageHeight="420px"
          dragSensitivity={22}
          dragDampening={2}
        />
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
