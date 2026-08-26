'use client'

import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'About',    id: 'about' },
  { label: 'Founder',  id: 'founder' },
  { label: 'Services', id: 'services' },
  { label: 'Events',   id: 'upcoming-events' },
  { label: 'Gallery',  id: 'gallery' },
  { label: 'Contact',  id: 'contact' },
]

/* ─── Single pill nav item with circle-expand hover effect ─── */
function PillItem({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden px-2.5 lg:px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40 whitespace-nowrap"
      style={{ minWidth: 0 }}
      aria-current={active ? 'page' : undefined}
    >
      {/* Expanding circle — grows from bottom-center */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-full bg-maroon transition-all duration-300 ease-out"
        style={{
          width:  hovered ? '200%' : '0%',
          paddingBottom: hovered ? '200%' : '0%',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Label layer — slides up on hover */}
      <span className="relative flex flex-col items-center overflow-hidden leading-none" style={{ height: '1.1em' }}>
        {/* Default text — slides up and out */}
        <span
          className="transition-transform duration-300 ease-out"
          style={{
            color: active ? '#6B2E1F' : '#6B2E1F',
            fontWeight: active ? 700 : 500,
            transform: hovered ? 'translateY(-110%)' : 'translateY(0)',
          }}
        >
          {label}
        </span>
        {/* Hover text — slides up into view */}
        <span
          aria-hidden="true"
          className="absolute top-full transition-transform duration-300 ease-out text-white font-semibold"
          style={{
            transform: hovered ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          {label}
        </span>
      </span>

      {/* Active dot */}
      {active && !hovered && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-maroon" />
      )}
    </button>
  )
}

/* ─── Main Header ─── */
export default function Header() {
  const [activeId, setActiveId]           = useState<string>('')
  const [isMobileMenuOpen, setMobileMenu] = useState(false)
  const mobileMenuRef                     = useRef<HTMLDivElement>(null)

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* Close mobile menu on outside click */
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActiveId(id)
    setMobileMenu(false)
  }

  return (
    /* Outer wrapper — positions the floating header at the top */
    <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center pt-3 sm:pt-4 px-3 sm:px-4 pointer-events-none">

      {/* ── Pill container — the floating bar ── */}
      <div
        ref={mobileMenuRef}
        className="pointer-events-auto w-full max-w-5xl min-w-0"
      >
        {/* Main bar — px-3 right-side, pl-2 left for logo breathing room */}
        <div className="flex items-center bg-[#FFF3E6]/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-maroon/10 rounded-full pl-2 pr-3 py-1.5 gap-1 md:gap-1.5 min-w-0 overflow-hidden">

          {/* Logo — plain image, no circle, scales with screen */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none"
            aria-label="Scroll to top"
          >
            <img
              src="/logo.png"
              alt="Malikal Events Logo"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain"
              onError={(e) => {
                const t = e.currentTarget
                t.style.display = 'none'
                const parent = t.parentElement
                if (parent) {
                  parent.innerHTML = '<span style="color:#6B2E1F;font-size:0.85rem;font-weight:700;letter-spacing:0.02em;">Malikal</span>'
                }
              }}
            />
          </button>

          {/* Desktop nav pills — flex-1 fills available space, min-w-0 allows shrink */}
          <nav className="hidden md:flex items-center flex-1 min-w-0 overflow-hidden" aria-label="Main navigation">
            {/* Nav pills — pushed to the right */}
            <div className="flex items-center min-w-0 ml-auto">
              {NAV_LINKS.map(({ label, id }) => (
                <PillItem
                  key={id}
                  label={label}
                  active={activeId === id}
                  onClick={() => scrollToSection(id)}
                />
              ))}
            </div>

            {/* Push social icons to the right */}
            <div className="flex items-center flex-shrink-0">
              {/* Divider */}
              <span className="mx-2 h-4 w-px bg-maroon/20 flex-shrink-0" aria-hidden="true" />

              {/* Social icons — even gap, right-flush with pr already on main bar */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <a
                  href="https://instagram.com/malikalevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href="https://facebook.com/malikalevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href="https://x.com/malikalevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          {/* Spacer on mobile so hamburger is right-aligned */}
          <div className="flex-1 md:hidden" />

          {/* Circular hamburger button — mobile only */}
          <button
            className="md:hidden flex-shrink-0 w-9 h-9 rounded-full bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon hover:bg-maroon/20 transition-colors duration-200"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {/* Animated hamburger → X */}
            <span className="relative w-4 h-4 flex flex-col items-center justify-center gap-[3px]">
              <span
                className="block h-[1.5px] bg-maroon rounded-full transition-all duration-300 origin-center"
                style={{
                  width: isMobileMenuOpen ? '100%' : '100%',
                  transform: isMobileMenuOpen ? 'translateY(4.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-[1.5px] bg-maroon rounded-full transition-all duration-300"
                style={{
                  width: '100%',
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transform: isMobileMenuOpen ? 'scaleX(0)' : 'none',
                }}
              />
              <span
                className="block h-[1.5px] bg-maroon rounded-full transition-all duration-300 origin-center"
                style={{
                  width: isMobileMenuOpen ? '100%' : '100%',
                  transform: isMobileMenuOpen ? 'translateY(-4.5px) rotate(-45deg)' : 'none',
                }}
              />
            </span>
          </button>
        </div>

        {/* ── Mobile dropdown panel ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isMobileMenuOpen ? '400px' : '0px',
            opacity:   isMobileMenuOpen ? 1 : 0,
          }}
        >
          <nav
            className="mt-2 bg-[#FFF3E6]/95 backdrop-blur-xl border border-white/60 shadow-lg shadow-maroon/10 rounded-3xl px-3 py-3"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                    ${activeId === id
                      ? 'bg-maroon text-white'
                      : 'text-maroon hover:bg-maroon/10'
                    }`}
                >
                  {label}
                </button>
              ))}

              {/* Social icons row */}
              <div className="flex items-center gap-2 px-4 pt-2 pb-1 border-t border-maroon/10 mt-1">
                <span className="text-xs text-maroon/50 font-medium mr-1">Follow us</span>
                <a
                  href="https://instagram.com/malikalevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-maroon bg-maroon/8 hover:bg-maroon hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/malikalevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-maroon bg-maroon/8 hover:bg-maroon hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/malikalevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-maroon bg-maroon/8 hover:bg-maroon hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
