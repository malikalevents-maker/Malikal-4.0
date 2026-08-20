'use client'

import { useEffect, useState } from 'react'

export default function LogoIntro() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile once on mount (≤ 768px = mobile)
    setIsMobile(window.innerWidth <= 768)

    // Start fade-out at 2.2s, fully unmount at 3.2s
    const fadeTimer = setTimeout(() => setPhase('fading'), 2200)
    const goneTimer = setTimeout(() => setPhase('gone'), 3200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(goneTimer)
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className={`logo-intro ${phase === 'fading' ? 'logo-intro--fading' : ''}`}>
      {/* Background image — mobile or desktop version */}
      <img
        src={isMobile ? '/mobile-intro-bg.png' : '/intro-background.png'}
        alt=""
        aria-hidden="true"
        className="logo-intro-bg-img"
      />
      {/* Overlay to deepen the blur effect */}
      <div className="logo-intro-backdrop" />

      {/* Center logo */}
      <img
        src="/centre-logo.png"
        alt="Company Logo"
        className="center-logo"
      />
      
          <div className="space-y-6">
            <div className="text-maroon/60 text-sm sm:text-base md:text-lg font-light tracking-wider">
              Elegant • Creative • Reliable
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-maroon">
              Professional Planning & Flawless Execution
            </h2>
    </div>
    </div>
  )
}
