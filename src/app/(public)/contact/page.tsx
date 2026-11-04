'use client'

import { useState } from 'react'
import { VENTURES } from '@/types'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organisationName: '',
    departmentSlug: 'bizdoc',
    serviceCode: 'b1',
    description: '',
    botTrap: ''
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    leadReference?: string
    whatsappLink?: string
    message?: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/public/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to submit inquiry')
      } else {
        setResult(data)
      }
    } catch {
      setError('A network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl font-bold text-white">Service Assessment & Enquiry</h1>
        <p className="text-sm text-slate-300">
          Connect directly with the specialized venture team best aligned with your operational stage.
        </p>
      </div>

      {result?.success ? (
        <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h2 className="text-xl font-bold text-white">Enquiry Received Successfully</h2>
          <p className="text-sm text-slate-300">{result.message}</p>
          <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs font-mono text-emerald-300">
            Reference: {result.leadReference}
          </div>
          {result.whatsappLink && (
            <div className="pt-4">
              <a
                href={result.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition"
              >
                Continue on WhatsApp →
              </a>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-[#0c1e38] border border-[#1e3a63] space-y-4">
          {error && (
            <div className="p-3 rounded bg-red-950/50 border border-red-500/50 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="botTrap"
            value={formData.botTrap}
            onChange={(e) => setFormData({ ...formData, botTrap: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Adam Haruna"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="adam@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="+234..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Business</label>
              <input
                type="text"
                value={formData.organisationName}
                onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Company Name Ltd."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Responsible Venture</label>
              <select
                value={formData.departmentSlug}
                onChange={(e) => setFormData({ ...formData, departmentSlug: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.values(VENTURES).map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Service Tier</label>
              <select
                value={formData.serviceCode}
                onChange={(e) => setFormData({ ...formData, serviceCode: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="b1">Level 0: Essentials & Feasibility</option>
                <option value="b2">Level 1: Core Execution</option>
                <option value="b3">Level 2: Systems & Governance</option>
                <option value="b4">Level 3: Scale & Expansion</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Needs & Context Details *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="Please describe your current operational requirements or the challenges you are addressing..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition"
          >
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      )}
    </div>
  )
}

