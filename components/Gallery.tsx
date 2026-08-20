'use client'

export default function Gallery() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="relative py-20 bg-[#FFF3E6] overflow-hidden">

      {/* Subtle blobs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-maroon/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
            Our Inspiration
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Drawing inspiration from the finest celebrations to create your perfect event
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass glass-hover rounded-3xl p-6 sm:p-10 md:p-14 text-center">
            <div className="text-5xl sm:text-6xl mb-6">🎭</div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-maroon mb-4">
              Your Event Awaits
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              As a fresh new company, we're excited to create our first masterpieces with you.
              Every great event management company started with their first celebration, and we're
              ready to make yours extraordinary.
            </p>
            <p className="text-gray-500 italic text-sm sm:text-base">
              "The best time to plant a tree was 20 years ago. The second best time is now.
              Let's plant the seeds of your perfect event together."
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToContact}
            className="bg-maroon text-white px-8 py-3 rounded-full font-medium border-2 border-maroon hover:bg-white hover:text-maroon transition-colors shadow-lg"
          >
            Let's Create Your First Event
          </button>
        </div>
      </div>
    </section>
  )
}
