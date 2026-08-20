import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Malikal Events & Entertainment - Premium Event Management in Hyderabad',
  description: 'Professional event planning services in Hyderabad. Specializing in weddings, corporate events, celebrations, and entertainment. Contact us at +91 90303 48600',
  keywords: 'event management, wedding planner, corporate events, Hyderabad events, Malikal Events',
  openGraph: {
    title: 'Malikal Events & Entertainment',
    description: 'Creating unforgettable celebrations with elegance and style',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-800 bg-cream overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}