'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#FFF3E6]/90 backdrop-blur-xl border-b border-maroon/10 shadow-lg shadow-maroon/5'
          : 'bg-[#FFF3E6]/70 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Malikal Events Logo"
              className="h-10 md:h-12 w-auto"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {[
              { label: 'About', id: 'about' },
              { label: 'Founder', id: 'founder' },
              { label: 'Services', id: 'services' },
              { label: 'Events', id: 'upcoming-events' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-maroon hover:text-maroon/60 transition-colors text-sm lg:text-base font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-maroon p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="mt-4 pb-4 border-t border-maroon/10">
            <div className="flex flex-col space-y-1 pt-4">
              {[
                { label: 'About', id: 'about' },
                { label: 'Founder', id: 'founder' },
                { label: 'Services', id: 'services' },
                { label: 'Events', id: 'upcoming-events' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Contact', id: 'contact' },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-left text-maroon hover:text-maroon/70 hover:bg-maroon/5 transition-colors py-2.5 px-3 rounded-lg"
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
