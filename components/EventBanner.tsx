"use client"

import { bannerEvents } from "../data/events"

export default function EventBanner() {
  if (!bannerEvents.active) {
    return null
  }

  const scrollToEvents = () => {
    const element = document.getElementById("upcoming-events")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400 text-white shadow-lg overflow-hidden">
      {/* Scrolling text row */}
      <div className="relative py-2 pr-24 sm:pr-28 md:pr-36 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap inline-block">
          {bannerEvents.messages.map((message, index) => (
            <span
              key={index}
              className="inline-block px-8 text-xs sm:text-sm md:text-base font-bold"
            >
              {message}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {bannerEvents.messages.map((message, index) => (
            <span
              key={`repeat-${index}`}
              className="inline-block px-8 text-xs sm:text-sm md:text-base font-bold"
            >
              {message}
            </span>
          ))}
        </div>

        {/* Book Now button — positioned to the right, never overlapping text */}
        <button
          onClick={scrollToEvents}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-maroon px-2 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold hover:bg-cream transition-colors shadow-lg whitespace-nowrap"
        >
          Book Now →
        </button>
      </div>
    </div>
  )
}
