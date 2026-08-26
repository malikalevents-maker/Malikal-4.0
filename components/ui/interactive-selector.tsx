'use client'

import { useState, useEffect } from 'react'
import { MdCelebration } from 'react-icons/md'
import { GiPartyPopper, GiMicrophone } from 'react-icons/gi'
import { BsBuildingsFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

/* ─── Data — same Unsplash images from the existing Dome Gallery ─── */
const ITEMS = [
  {
    id: 1,
    title: 'Wedding Events',
    description: 'Elegant weddings & unforgettable celebrations',
    icon: FaHeart,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
    alt: 'Elegant wedding reception',
  },
  {
    id: 2,
    title: 'Birthday Parties',
    description: 'Memorable celebrations for every occasion',
    icon: GiPartyPopper,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop',
    alt: 'Birthday celebration',
  },
  {
    id: 3,
    title: 'Corporate Events',
    description: 'Professional events designed to impress',
    icon: BsBuildingsFill,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    alt: 'Corporate conference event',
  },
  {
    id: 4,
    title: 'Music Festivals',
    description: 'Live music, lights & incredible experiences',
    icon: GiMicrophone,
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop',
    alt: 'Concert entertainment',
  },
  {
    id: 5,
    title: 'Live Entertainment',
    description: 'High-energy performances & experiences',
    icon: MdCelebration,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
    alt: 'Stage performance',
  },
]

export default function InteractiveSelector() {
  const [activeId, setActiveId] = useState<number>(1)
  const [mounted, setMounted]   = useState(false)

  /* entrance animation trigger */
  useEffect(() => { setMounted(true) }, [])

  const active = ITEMS.find(i => i.id === activeId) ?? ITEMS[0]

  return (
    <div
      className={`
        w-full transition-opacity duration-700
        ${mounted ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* ── Panel row ── */}
      <div className="flex gap-2 sm:gap-3 w-full" style={{ height: 'clamp(320px, 50vw, 560px)' }}>
        {ITEMS.map(item => {
          const isActive = item.id === activeId
          const Icon = item.icon

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                flex-shrink-0
              `}
              style={{
                flex: isActive ? '5 1 0%' : '1 1 0%',
                minWidth: isActive ? 0 : '48px',
              }}
              role="button"
              tabIndex={0}
              aria-label={item.title}
              onKeyDown={e => e.key === 'Enter' && setActiveId(item.id)}
            >
              {/* Background image */}
              <img
                src={item.image}
                alt={item.alt}
                draggable={false}
                className={`
                  absolute inset-0 w-full h-full object-cover
                  transition-all duration-500
                  ${isActive ? 'scale-100' : 'scale-105 brightness-75'}
                `}
              />

              {/* Gradient overlay — stronger on active for readability */}
              <div
                className={`
                  absolute inset-0 transition-opacity duration-500
                  ${isActive
                    ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100'
                    : 'bg-black/30 opacity-100'}
                `}
              />

              {/* Collapsed label — rotated, visible only when not active */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-300
                  ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="text-white/90 text-xl" />
                  <span
                    className="text-white/90 text-xs font-semibold tracking-widest uppercase whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Expanded content — visible only when active */}
              <div
                className={`
                  absolute bottom-0 left-0 right-0 p-5 sm:p-7
                  transition-all duration-500
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="text-white text-base" />
                  </div>
                  <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/80 text-sm sm:text-base leading-snug pl-11">
                  {item.description}
                </p>
              </div>

              {/* Maroon accent bar at bottom when active */}
              <div
                className={`
                  absolute bottom-0 left-0 right-0 h-1 bg-maroon
                  transition-transform duration-500 origin-left
                  ${isActive ? 'scale-x-100' : 'scale-x-0'}
                `}
              />
            </div>
          )
        })}
      </div>

      {/* ── Thumbnail strip — shows all images as small pills below ── */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            aria-label={item.title}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${item.id === activeId ? 'bg-maroon scale-125' : 'bg-maroon/30 hover:bg-maroon/60'}
            `}
          />
        ))}
      </div>
    </div>
  )
}
