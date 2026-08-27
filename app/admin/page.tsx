'use client'

import { useState, useEffect } from 'react'

interface Contact {
  _id: string
  fullName: string
  phoneNumber: string
  email: string
  eventType: string
  message: string
  status: string
  createdAt: string
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact`)

      const data = await response.json()

      setContacts(data.contacts || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl text-maroon">Loading contacts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-maroon mb-4">
            Contact Form Submissions
          </h1>

          <p className="text-gray-600">
            Total submissions: {contacts.length}
          </p>
        </div>

        <div className="grid gap-6">
          {contacts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-gray-600">
                No contact submissions yet.
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-maroon text-lg">
                      {contact.fullName}
                    </h3>

                    <p className="text-gray-600">
                      {contact.email}
                    </p>

                    <p className="text-gray-600">
                      {contact.phoneNumber}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block bg-maroon text-white px-3 py-1 rounded-full text-sm">
                      {contact.eventType}
                    </span>

                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Message:
                  </h4>

                  <p className="text-gray-700 leading-relaxed">
                    {contact.message}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      contact.status === 'new'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    Status: {contact.status}
                  </span>

                  <div className="space-x-2">
                    <a
                      href={`tel:${contact.phoneNumber}`}
                      className="bg-maroon text-white px-4 py-2 rounded hover:bg-maroon-light transition-colors"
                    >
                      Call
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={fetchContacts}
            className="bg-maroon text-white px-6 py-3 rounded-lg hover:bg-maroon-light transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}
