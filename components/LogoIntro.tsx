'use client'

import { useEffect, useState } from 'react'

export default function LogoIntro() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)

    const fadeTimer = setTimeout(() => setPhase('fading'), 2200)
    const goneTimer = setTimeout(() => setPhase('gone'),   3200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(goneTimer)
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className={`logo-intro ${phase === 'fading' ? 'logo-intro--fading' : ''}`}>
      {/* Blurred background image */}
      <img
        src={isMobile ? '/mobile-intro-bg.png' : '/intro-background.png'}
        alt=""
        aria-hidden="true"
        className="logo-intro-bg-img"
      />

      {/* Semi-transparent cream overlay */}
      <div className="logo-intro-backdrop" />

      {/* Centered content column */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <img
          src="/centre-logo.png"
          alt="Malikal Events & Entertainment"
          className="center-logo"
        />

        <p className="text-maroon/60 text-sm sm:text-base md:text-lg font-light tracking-wider mt-2">
          Elegant • Creative • Reliable
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-maroon max-w-sm sm:max-w-md leading-snug">
          Professional Planning<br />
          And<br />
          Flawless Execution
        </h2>
      </div>
    </div>
  )
}
