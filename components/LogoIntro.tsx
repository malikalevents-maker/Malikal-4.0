'use client'

import { useEffect, useState } from 'react'

// How long the intro plays normally before fading (ms)
const FADE_DELAY = 1700
// How long after fade starts before we remove from DOM (ms)
const GONE_DELAY = 2700
// Hard fallback: force-remove after this many ms no matter what (ms)
const FALLBACK_TIMEOUT = 5000

export default function LogoIntro() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // ── sessionStorage guard: only show intro once per browser session ──
    // On page refresh the session persists, but this prevents
    // the intro re-playing on every client-side navigation.
    try {
      if (sessionStorage.getItem('intro-shown') === '1') {
        setPhase('gone')
        return
      }
      sessionStorage.setItem('intro-shown', '1')
    } catch {
      // sessionStorage may be blocked (private mode, etc.) — safe to ignore
    }

    // ── Mobile detection ──
    try {
      setIsMobile(window.innerWidth <= 768)
    } catch {
      // ignore
    }

    // ── Guaranteed DOM-level escape hatch ──
    // Even if React state updates are somehow blocked, this directly
    // removes the overlay element from the DOM after FALLBACK_TIMEOUT.
    let domFallbackTimer: ReturnType<typeof setTimeout> | null = null
    try {
      domFallbackTimer = setTimeout(() => {
        try {
          const el = document.getElementById('logo-intro-overlay')
          if (el) el.style.display = 'none'
        } catch {
          // ignore
        }
      }, FALLBACK_TIMEOUT)
    } catch {
      // ignore
    }

    // ── Normal animation sequence ──
    const fadeTimer = setTimeout(() => {
      try { setPhase('fading') } catch { /* ignore */ }
    }, FADE_DELAY)

    const goneTimer = setTimeout(() => {
      try { setPhase('gone') } catch { /* ignore */ }
      // Clear the DOM fallback — React handled it cleanly
      if (domFallbackTimer !== null) clearTimeout(domFallbackTimer)
    }, GONE_DELAY)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(goneTimer)
      if (domFallbackTimer !== null) clearTimeout(domFallbackTimer)
    }
  }, [])

  // React removed this from the tree — nothing rendered, page is fully visible
  if (phase === 'gone') return null

  return (
    <div
      id="logo-intro-overlay"
      className="logo-intro"
      style={{
        opacity:       phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
        transition:    'opacity 0.9s ease',
      }}
    >
      {/* Blurred background image */}
      <img
        src={isMobile ? '/mobile-intro-bg.png' : '/intro-background.png'}
        alt=""
        aria-hidden="true"
        className="logo-intro-bg-img"
      />

      {/* Semi-transparent cream overlay */}
      <div className="logo-intro-backdrop" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <img
          src="/centre-logo.png"
          alt="Malikal Events & Entertainment"
          className="center-logo"
        />

        <p className="text-maroon/60 text-sm sm:text-base md:text-lg font-light tracking-wider mt-2">
          Elegant • Creative • Reliable
        </p>
          <br>
          </br>
        <h2 className="text-lg sm:text-xl md:text-3xl font-serif font-bold text-maroon whitespace-nowrap leading-snug">
  Professional Planning & Flawless Execution
</h2>
      </div>
    </div>
  )
}
