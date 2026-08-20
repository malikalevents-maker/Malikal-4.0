'use client'

export default function Services() {
  const services = [
    {
      title: 'Weddings',
      description: 'Complete wedding planning from intimate ceremonies to grand celebrations. We handle every detail to make your special day perfect.',
      icon: '💍',
      features: ['Venue Selection', 'Decoration & Styling', 'Catering Coordination', 'Photography & Videography'],
    },
    {
      title: 'Corporate Events',
      description: 'Professional corporate event management for conferences, product launches, team building, and business celebrations.',
      icon: '🏢',
      features: ['Conference Planning', 'Product Launches', 'Team Building', 'Award Ceremonies'],
    },
    {
      title: 'Celebrations',
      description: 'Birthday parties, anniversaries, and milestone celebrations designed to create lasting memories for you and your loved ones.',
      icon: '🎉',
      features: ['Birthday Parties', 'Anniversaries', 'Milestone Events', 'Family Gatherings'],
    },
    {
      title: 'Entertainment',
      description: 'Complete entertainment solutions including live performances, DJ services, and cultural programs for any occasion.',
      icon: '🎭',
      features: ['Live Performances', 'DJ Services', 'Cultural Programs', 'Interactive Entertainment'],
    },
  ]

  return (
    <section id="services" className="relative py-20 overflow-hidden">

      {/* Subtle blobs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-maroon/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive event management solutions tailored to your unique vision and requirements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass glass-hover rounded-2xl p-5 md:p-8 group">
              <div className="text-3xl md:text-4xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-maroon mb-3 md:mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-maroon rounded-full mr-3 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
