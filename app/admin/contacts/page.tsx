'use client'

import { useEffect, useMemo, useState } from 'react'
import * as XLSX from 'xlsx'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch(`${API_URL}/api/contact`)

      if (!res.ok) {
        throw new Error('Failed to fetch contacts')
      }

      const data = await res.json()
      setContacts(data.contacts || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setError('Cannot reach the backend. Please check the backend connection.')
    } finally {
      setLoading(false)
    }
  }

  const deleteContact = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this contact?'
    )

    if (!confirmed) return

    try {
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete contact')
      }

      setContacts((previousContacts) =>
        previousContacts.filter((contact) => contact._id !== id)
      )
    } catch (error) {
      console.error('Error deleting contact:', error)
      alert('Failed to delete the contact.')
    }
  }

  const filteredContacts = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return contacts

    return contacts.filter((contact) => {
      return (
        contact.fullName.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phoneNumber.toLowerCase().includes(query) ||
        contact.eventType.toLowerCase().includes(query)
      )
    })
  }, [contacts, search])

  const exportToExcel = () => {
    const exportData = contacts.map((contact) => ({
      Name: contact.fullName,
      Phone: contact.phoneNumber,
      Email: contact.email,
      'Event Type': contact.eventType,
      Message: contact.message,
      Status: contact.status,
      Date: new Date(contact.createdAt).toLocaleString(),
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Contact Submissions'
    )

    XLSX.writeFile(workbook, 'contact-submissions.xlsx')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl text-maroon">
          Loading contacts...
        </div>
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

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full sm:max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-maroon"
          />

          <button
            onClick={exportToExcel}
            className="bg-maroon text-white px-6 py-3 rounded-lg hover:bg-maroon-light transition-colors"
          >
            Export to Excel
          </button>
        </div>

        <div className="grid gap-6">
          {filteredContacts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-gray-600">
                No contact submissions found.
              </p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
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

                <div className="mt-4 flex flex-wrap justify-between gap-3 items-center">
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
                      className="inline-block bg-maroon text-white px-4 py-2 rounded hover:bg-maroon-light transition-colors"
                    >
                      Call
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Email
                    </a>

                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
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
