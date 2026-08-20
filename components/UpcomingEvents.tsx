'use client'

import { useState } from 'react'
import { upcomingEvents } from '../data/events'

export default function UpcomingEvents() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  // Only show events that are active
  const activeEvents = upcomingEvents.filter((event) => event.active)

  const toggleEvent = (eventId: number) => {
    setExpandedEvent(
      expandedEvent === eventId ? null : eventId
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800'

      case 'Planning':
        return 'bg-blue-100 text-blue-800'

      case 'Completed':
        return 'bg-gray-100 text-gray-800'

      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Wedding':
        return '💍'

      case 'Corporate Event':
        return '🏢'

      case 'Celebration':
        return '🎉'

      case 'Entertainment':
        return '🎭'

      default:
        return '📅'
    }
  }

  return (
    <section id="upcoming-events" className="relative py-20 overflow-hidden">

      {/* Subtle blobs */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-maroon/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ========================================
            SECTION HEADER
        ======================================== */}

        <div className="text-center mb-16">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
            Upcoming Events
          </h2>

          <div className="flex items-center justify-center mb-6">

            <div className="w-16 h-px bg-maroon"></div>

            <div className="mx-4 text-maroon text-xl">
              ❋
            </div>

            <div className="w-16 h-px bg-maroon"></div>

          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Exciting events we're currently planning and managing
          </p>

        </div>


        {/* ========================================
            NO ACTIVE EVENTS
        ======================================== */}

        {activeEvents.length === 0 ? (

          <div className="text-center py-12">

            <div className="text-6xl mb-4">
              📅
            </div>

            <h3 className="text-2xl font-serif font-bold text-maroon mb-4">
              No Upcoming Events Yet
            </h3>

            <p className="text-gray-600 mb-8">
              We're ready to plan your next amazing event!
              Get in touch with us to get started.
            </p>

            <button
              onClick={() => {
                const element =
                  document.getElementById('contact')

                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
              }}
              className="bg-maroon text-white px-8 py-3 rounded-full hover:bg-maroon/80 transition-colors"            >
              Contact Us
            </button>

          </div>

        ) : (

          /* ========================================
             ACTIVE EVENTS
          ======================================== */

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">

            {activeEvents.map((event) => (

              <div
                key={event.id}
                className={`glass rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
                  event.featured ? 'border-2 border-maroon/60' : ''
                }`}
              >

                {/* ========================================
                    CLICKABLE EVENT HEADER
                ======================================== */}

                <button
                  onClick={() =>
                    toggleEvent(event.id)
                  }
                  className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 p-6 text-left hover:from-yellow-500 hover:to-pink-500 transition-all"
                >

                  <div className="flex items-center justify-between flex-wrap gap-3">

                    <div className="flex-1 min-w-0">

                      <h3 className="text-xl md:text-3xl font-serif font-bold text-white drop-shadow-lg mb-2 leading-tight">
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white text-xs md:text-base">

                        <span>
                          📅 {event.date}
                        </span>

                        <span>
                          ⏰ {event.time}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                            event.status
                          )}`}
                        >
                          {event.status}
                        </span>

                      </div>

                    </div>

                    <div className="text-white text-3xl ml-4">

                      {expandedEvent === event.id
                        ? '▼'
                        : '▶'}

                    </div>

                  </div>

                </button>


                {/* ========================================
                    EXPANDED EVENT CONTENT
                ======================================== */}

                {expandedEvent === event.id && (

                  <div className="p-4 sm:p-6 md:p-8">

                    {/* FEATURED EVENT */}

                    {event.featured && (

                      <div className="text-center mb-6">

                        <span className="inline-block bg-white text-maroon px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          🎉 FEATURED EVENT 🎉
                        </span>

                      </div>

                    )}


                    {/* FULL EVENT TITLE */}

                    <h4 className="text-2xl md:text-3xl font-serif font-bold text-maroon mb-6 text-center">
                      {event.fullTitle}
                    </h4>


                    {/* EVENT TYPE + STATUS */}

                    <div className="flex items-start justify-between mb-6">

                      <div className="text-5xl">
                        {getTypeIcon(event.type)}
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>

                    </div>


                    {/* ========================================
                        DATE + LOCATION + PRICING
                    ======================================== */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                      {/* EVENT INFORMATION */}

                      <div className="space-y-3">

                        {/* DATE */}

                        <div className="flex items-center text-gray-800">

                          <span className="mr-3 text-2xl">
                            📅
                          </span>

                          <div>

                            <div className="font-bold">
                              {event.date}
                            </div>

                            {event.time && (
                              <div className="text-sm text-gray-600">
                                {event.time}
                              </div>
                            )}

                          </div>

                        </div>


                        {/* LOCATION */}

                        <div className="flex items-start text-gray-800">

                          <span className="mr-3 text-2xl">
                            📍
                          </span>

                          <div className="text-sm">
                            {event.location}
                          </div>

                        </div>

                      </div>


                      {/* TICKET PRICING */}

                      <div className="glass rounded-xl p-4">

                        <h4 className="font-bold text-maroon mb-2">
                          🎟️ Ticket Prices:
                        </h4>

                        <div className="space-y-1 text-sm">

                          <div className="flex justify-between">
                            <span>
                              Below 12 yrs:
                            </span>

                            <span className="font-bold">
                              {event.pricing.below12}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              Single:
                            </span>

                            <span className="font-bold">
                              {event.pricing.single}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              VIP:
                            </span>

                            <span className="font-bold text-maroon">
                              {event.pricing.vip}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              Couple:
                            </span>

                            <span className="font-bold">
                              {event.pricing.couple}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              VIP Couple:
                            </span>

                            <span className="font-bold text-maroon">
                              {event.pricing.vipCouple}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              Group of 5:
                            </span>

                            <span className="font-bold">
                              {event.pricing.group5}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              Group of 10:
                            </span>

                            <span className="font-bold">
                              {event.pricing.group10}
                            </span>
                          </div>

                        </div>

                      </div>

                    </div>


                    {/* ========================================
                        DESCRIPTION
                    ======================================== */}

                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      {event.description}
                    </p>


                    {/* ========================================
                        EVENT HIGHLIGHTS
                    ======================================== */}

                    <div className="glass rounded-xl p-6 mb-6">

                      <h4 className="font-bold text-maroon mb-4 text-lg">
                        ✨ Event Highlights:
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {event.highlights.map(
                          (highlight, idx) => (

                            <div
                              key={idx}
                              className="flex items-center text-gray-700"
                            >
                              <span className="text-sm">
                                {highlight}
                              </span>
                            </div>

                          )
                        )}

                      </div>

                    </div>


                    {/* ========================================
                        URGENCY MESSAGE
                    ======================================== */}

                    {event.urgency && (

                      <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 mb-6">

                        <p className="text-red-700 font-bold text-center">
                          🚨 {event.urgency}
                        </p>

                      </div>

                    )}


                    {/* ========================================
                        BOOKING BUTTONS
                    ======================================== */}

                    <div className="flex flex-col sm:flex-row gap-4">

                      {/* WHATSAPP */}

                      <a
                        href={`https://wa.me/919030348600?text=${encodeURIComponent(
                          `Hi! I want to book tickets for ${event.fullTitle}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white py-4 px-6 rounded-lg font-bold text-center hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center"
                      >

                        <svg
                          className="w-6 h-6 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                        </svg>

                        Book on WhatsApp

                      </a>


                      {/* PHONE */}

                      <a
                        href={`tel:${event.bookingPhone}`}
                        className="flex-1 bg-maroon text-white py-4 px-6 rounded-lg font-bold text-center hover:bg-maroon-light transition-colors shadow-lg"
                      >
                        📞 Call to Book
                      </a>

                    </div>


                    {/* ========================================
                        ENTRY WARNING
                    ======================================== */}

                    <div className="bg-maroon text-white p-4 text-center mt-6 rounded-b-xl">

                      <p className="text-sm">
                        ⚠️ Event entry strictly through valid tickets only |
                        Management reserves the right of admission
                      </p>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}


        {/* ========================================
            BOTTOM CTA
        ======================================== */}

        <div className="text-center mt-12">

          <p className="text-gray-600 mb-4">
            Want to see your event featured here?
          </p>

          <button
            onClick={() => {
              const element =
                document.getElementById('contact')

              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            }}
            className="bg-maroon text-white px-8 py-3 rounded-full hover:bg-maroon/80 transition-colors shadow-lg"
          >
            Plan Your Event With Us
          </button>

        </div>

      </div>
    </section>
  )
}