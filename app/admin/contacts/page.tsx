'use client'

import { useState, useEffect, useMemo } from 'react'
import * as XLSX from 'xlsx'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Contact {
  _id: string
  fullName: string
  phoneNumber: string
  email: string
  eventType: string
  message: string
  createdAt: string
}

type SortField = 'fullName' | 'eventType' | 'createdAt'
type SortDir = 'asc' | 'desc'

const EVENT_TYPES = [
  'All Events',
  'Wedding',
  'Corporate Event',
  'Birthday / Celebration',
  'Entertainment',
  'Other',
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function isToday(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  )
}

// ── Summary Card ──────────────────────────────────────────────────────────────
function SummaryCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-5 flex flex-col gap-1"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="text-3xl font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

// ── Sort Icon ─────────────────────────────────────────────────────────────────
function SortIcon({
  field,
  current,
  dir,
}: {
  field: SortField
  current: SortField
  dir: SortDir
}) {
  if (field !== current)
    return <span className="ml-1 text-gray-300 text-xs">⇅</span>
  return (
    <span className="ml-1 text-white text-xs">
      {dir === 'asc' ? '↑' : '↓'}
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactsDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [eventFilter, setEventFilter] = useState('All Events')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:5000/api/contact')
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      const data = await res.json()
      setContacts(data.contacts ?? [])
    } catch (err: unknown) {
      setError(
        'Cannot reach the backend. Make sure it is running on http://localhost:5000.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  // ── Summary counts ──────────────────────────────────────────────────────────
  const total = contacts.length
  const todayCount = contacts.filter((c) => isToday(c.createdAt)).length
  const weddingCount = contacts.filter((c) => c.eventType === 'Wedding').length
  const entertainmentCount = contacts.filter(
    (c) => c.eventType === 'Entertainment'
  ).length

  // ── Filter + Search + Sort ──────────────────────────────────────────────────
  const displayed = useMemo(() => {
    let rows = [...contacts]

    // Event filter
    if (eventFilter !== 'All Events') {
      rows = rows.filter((c) => c.eventType === eventFilter)
    }

    // Search
    const q = search.trim().toLowerCase()
    if (q) {
      rows = rows.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.phoneNumber.toLowerCase().includes(q) ||
          (c.email ?? '').toLowerCase().includes(q) ||
          c.eventType.toLowerCase().includes(q) ||
          (c.message ?? '').toLowerCase().includes(q)
      )
    }

    // Sort
    rows.sort((a, b) => {
      let av: string | number = ''
      let bv: string | number = ''
      if (sortField === 'createdAt') {
        av = new Date(a.createdAt).getTime()
        bv = new Date(b.createdAt).getTime()
      } else {
        av = (a[sortField] ?? '').toLowerCase()
        bv = (b[sortField] ?? '').toLowerCase()
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return rows
  }, [contacts, eventFilter, search, sortField, sortDir])

  // ── Toggle sort ─────────────────────────────────────────────────────────────
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete enquiry from "${name}"? This cannot be undone.`))
      return
    setDeletingId(id)
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const data = await res.json()
        alert(`Delete failed: ${data.error ?? res.status}`)
        return
      }
      setContacts((prev) => prev.filter((c) => c._id !== id))
    } catch {
      alert('Delete failed: could not reach the backend.')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Excel Export ────────────────────────────────────────────────────────────
  const handleExport = () => {
    const rows = displayed.map((c) => ({
      Name: c.fullName,
      Phone: c.phoneNumber,
      Email: c.email ?? '',
      'Event Type': c.eventType,
      Message: c.message ?? '',
      Date: formatDateTime(c.createdAt),
    }))

    const ws = XLSX.utils.json_to_sheet(rows)

    // Column widths
    ws['!cols'] = [
      { wch: 22 },
      { wch: 15 },
      { wch: 28 },
      { wch: 22 },
      { wch: 40 },
      { wch: 22 },
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts')
    XLSX.writeFile(wb, 'malikal-contacts.xlsx')
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#faf7f4] py-10 px-4 sm:px-8">
      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#6B2E1F]">
            Contact Enquiries
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Malikal Events — Admin Dashboard
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchContacts}
            disabled={loading}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <span className={loading ? 'animate-spin inline-block' : ''}>↻</span>
            Refresh
          </button>
          <button
            onClick={handleExport}
            disabled={displayed.length === 0}
            className="flex items-center gap-2 bg-[#6B2E1F] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#8B3E2F] transition-colors disabled:opacity-50 shadow-sm"
          >
            ⬇ Export to Excel
          </button>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Enquiries" value={total} color="#6B2E1F" />
        <SummaryCard label="Today's Enquiries" value={todayCount} color="#b45309" />
        <SummaryCard label="Weddings" value={weddingCount} color="#0f766e" />
        <SummaryCard
          label="Entertainment"
          value={entertainmentCount}
          color="#7c3aed"
        />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name, phone, email, event type or message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2E1F]/30 bg-white"
          />
        </div>

        {/* Event type filter */}
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6B2E1F]/30 min-w-[170px]"
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* ── States ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-5 py-4 mb-5 text-sm">
          ⚠ {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-[#6B2E1F] text-lg font-medium">
          <span className="animate-spin mr-3 text-2xl">↻</span>
          Loading submissions…
        </div>
      ) : (
        <>
          {/* result count */}
          <p className="text-xs text-gray-400 mb-3">
            Showing {displayed.length} of {total} record
            {total !== 1 ? 's' : ''}
          </p>

          {/* ── Table ── */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#6B2E1F] text-white text-left">
                    <th className="px-4 py-3 font-semibold whitespace-nowrap border-r border-[#7a3522]">
                      #
                    </th>
                    {/* Sortable: Name */}
                    <th
                      className="px-4 py-3 font-semibold whitespace-nowrap border-r border-[#7a3522] cursor-pointer select-none hover:bg-[#7a3522] transition-colors"
                      onClick={() => toggleSort('fullName')}
                    >
                      Name
                      <SortIcon
                        field="fullName"
                        current={sortField}
                        dir={sortDir}
                      />
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap border-r border-[#7a3522]">
                      Phone
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap border-r border-[#7a3522]">
                      Email
                    </th>
                    {/* Sortable: Event Type */}
                    <th
                      className="px-4 py-3 font-semibold whitespace-nowrap border-r border-[#7a3522] cursor-pointer select-none hover:bg-[#7a3522] transition-colors"
                      onClick={() => toggleSort('eventType')}
                    >
                      Event Type
                      <SortIcon
                        field="eventType"
                        current={sortField}
                        dir={sortDir}
                      />
                    </th>
                    <th className="px-4 py-3 font-semibold border-r border-[#7a3522]">
                      Message
                    </th>
                    {/* Sortable: Date */}
                    <th
                      className="px-4 py-3 font-semibold whitespace-nowrap border-r border-[#7a3522] cursor-pointer select-none hover:bg-[#7a3522] transition-colors"
                      onClick={() => toggleSort('createdAt')}
                    >
                      Date
                      <SortIcon
                        field="createdAt"
                        current={sortField}
                        dir={sortDir}
                      />
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayed.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center text-gray-400"
                      >
                        {search || eventFilter !== 'All Events'
                          ? 'No records match your search or filter.'
                          : 'No submissions yet. The table will populate when the contact form is used.'}
                      </td>
                    </tr>
                  ) : (
                    displayed.map((contact, idx) => (
                      <tr
                        key={contact._id}
                        className={`border-t border-gray-100 hover:bg-[#fdf6f3] transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#fdf9f8]'
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-400 border-r border-gray-100 tabular-nums">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-100 whitespace-nowrap">
                          {contact.fullName}
                        </td>
                        <td className="px-4 py-3 text-gray-700 border-r border-gray-100 whitespace-nowrap">
                          <a
                            href={`tel:${contact.phoneNumber}`}
                            className="hover:text-[#6B2E1F] hover:underline"
                          >
                            {contact.phoneNumber}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-gray-700 border-r border-gray-100">
                          {contact.email ? (
                            <a
                              href={`mailto:${contact.email}`}
                              className="hover:text-[#6B2E1F] hover:underline break-all"
                            >
                              {contact.email}
                            </a>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-r border-gray-100 whitespace-nowrap">
                          <span className="inline-block bg-[#6B2E1F]/10 text-[#6B2E1F] text-xs font-medium px-2.5 py-1 rounded-full">
                            {contact.eventType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 border-r border-gray-100 max-w-xs">
                          <span
                            className="block truncate"
                            title={contact.message}
                          >
                            {contact.message || (
                              <span className="text-gray-300">—</span>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 border-r border-gray-100 whitespace-nowrap text-xs">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-center whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleDelete(contact._id, contact.fullName)
                            }
                            disabled={deletingId === contact._id}
                            className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            {deletingId === contact._id ? '…' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
