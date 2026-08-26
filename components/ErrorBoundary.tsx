'use client'

import React from 'react'

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Catches runtime errors in child components so they don't bubble up
 * and crash the entire React tree (which would freeze LogoIntro).
 */
export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console so the developer can see what crashed
    console.error('[ErrorBoundary] Component error caught:', error)
    console.error('[ErrorBoundary] Component stack:', info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      // Render a minimal fallback — the rest of the page is still usable
      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#6B2E1F',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <p>Something went wrong loading this section.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              border: '2px solid #6B2E1F',
              background: 'transparent',
              color: '#6B2E1F',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
