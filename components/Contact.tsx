'use client'

import { useState, useEffect, useRef } from 'react'

interface FormData {
  fullName: string
  phoneNumber: string
  email: string
  eventType: string
  message: string
}

const emptyForm: FormData = {
  fullName: '',
  phoneNumber: '',
  email: '',
  eventType: '',
  message: ''
}

// Unused inline-form state removed — form only lives in the dialog now
function ContactForm({
  formData,
  submitting,
  handleChange,
  handleSubmit,
  submitLabel = 'Generate Free Proposal'
}: {
  formData: FormData
  submitting: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  submitLabel?: string
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-200"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-200"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-200"
          >
            <option value="">Select event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Birthday / Celebration">Birthday / Celebration</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Tell us about your event vision, requirements, and any specific details..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-maroon text-white py-4 px-6 rounded-lg font-medium text-lg border-2 border-maroon hover:bg-white hover:text-maroon transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogSubmitting, setDialogSubmitting] = useState(false)
  const [dialogFormData, setDialogFormData] = useState<FormData>(emptyForm)

  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync native <dialog> open/close with state
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (dialogOpen) {
      el.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      el.close()
      document.body.style.overflow = ''
    }
  }, [dialogOpen])

  // Close on backdrop click
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeDialog()
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setDialogFormData(emptyForm)
  }

  const handleDialogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (dialogSubmitting) return
    setDialogSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dialogFormData),
      })
      const result = await response.json()
      if (response.ok) {
        alert('Thank you for your inquiry! We will get back to you soon.')
        setDialogFormData(emptyForm)
        closeDialog()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setDialogSubmitting(false)
    }
  }

  const handleDialogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDialogFormData({ ...dialogFormData, [e.target.name]: e.target.value })
  }

  if (!mounted) return null

  return (
    <>
      <section id="contact" className="py-20 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
              Consult an Expert
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
              Let's discuss your vision and create something extraordinary together
            </p>

            {/* Contact Us button */}
            <button
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-2 bg-maroon text-white px-7 sm:px-10 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg border-2 border-maroon hover:bg-white hover:text-maroon transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>✉</span> Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact Us Dialog ── */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="contact-dialog"
      >
        <div className="contact-dialog-inner">
          {/* Header */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-maroon">
                Consult an Expert
              </h3>
              <p className="text-gray-600 mt-0.5 text-sm">
                Let's discuss your vision and create something extraordinary together
              </p>
            </div>
            <button
              onClick={closeDialog}
              aria-label="Close dialog"
              className="absolute right-0 top-0 text-gray-400 hover:text-maroon transition-colors duration-200 text-3xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-maroon/20" />
            <span className="text-maroon/40 text-lg">✦</span>
            <div className="flex-1 h-px bg-maroon/20" />
          </div>

          <ContactForm
            formData={dialogFormData}
            submitting={dialogSubmitting}
            handleChange={handleDialogChange}
            handleSubmit={handleDialogSubmit}
            submitLabel="Generate Free Proposal"
          />
        </div>
      </dialog>
    </>
  )
}
