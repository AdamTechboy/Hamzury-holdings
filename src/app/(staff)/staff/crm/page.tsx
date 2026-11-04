'use client'

import { useState } from 'react'
import { LeadStatus } from '@/types'

interface MockLead {
  id: string
  reference: string
  customer: string
  venture: string
  service: string
  status: LeadStatus
  date: string
}

const INITIAL_LEADS: MockLead[] = [
  {
    id: '1',
    reference: 'ENQ-2026-A109F',
    customer: 'Apex Logistics Ltd',
    venture: 'BizDoc',
    service: 'Bank-Ready Documents',
    status: 'NEW ENQUIRY',
    date: 'Today, 14:20'
  },
  {
    id: '2',
    reference: 'ENQ-2026-B882C',
    customer: 'Khadija Usman',
    venture: 'Medialy',
    service: 'Profile Plan & Branding Kit',
    status: 'CONTACTED',
    date: 'Yesterday'
  },
  {
    id: '3',
    reference: 'ENQ-2026-F4401',
    customer: 'TechBuild Agro',
    venture: 'SUBT',
    service: 'Portfolio Website & Enquiry Tracker',
    status: 'QUALIFIED',
    date: 'Oct 28'
  }
]

export default function StaffCRMPage() {
  const [leads, setLeads] = useState<MockLead[]>(INITIAL_LEADS)
  const [selectedLead, setSelectedLead] = useState<MockLead | null>(INITIAL_LEADS[0])
  const [activityNote, setActivityNote] = useState('')

  const handleStatusChange = (newStatus: LeadStatus) => {
    if (!selectedLead) return
    const updated = leads.map((l) => (l.id === selectedLead.id ? { ...l, status: newStatus } : l))
    setLeads(updated)
    setSelectedLead({ ...selectedLead, status: newStatus })
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e3a63] pb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-blue-400">Staff CRM Module</span>
          <h1 className="text-2xl font-bold text-white">Central Enquiry & Lead Management</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
            Export Leads (CSV)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-semibold text-slate-300">Enquiry Queue ({leads.length})</h2>
          <div className="space-y-2">
            {leads.map((l) => (
              <div
                key={l.id}
                onClick={() => setSelectedLead(l)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedLead?.id === l.id
                    ? 'bg-[#102a4e] border-blue-500'
                    : 'bg-[#0c1e38] border-[#1e3a63] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>{l.reference}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                    {l.status}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">{l.customer}</h3>
                <p className="text-xs text-blue-400">{l.venture} • {l.service}</p>
                <p className="text-[10px] text-slate-400 mt-2">{l.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Detail & Actions */}
        {selectedLead && (
          <div className="lg:col-span-2 p-6 rounded-xl bg-[#0c1e38] border border-[#1e3a63] space-y-6">
            <div className="flex items-center justify-between border-b border-[#1e3a63] pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400">{selectedLead.reference}</span>
                <h2 className="text-xl font-bold text-white">{selectedLead.customer}</h2>
                <p className="text-xs text-blue-300">{selectedLead.venture} — {selectedLead.service}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white">
                  Generate Quotation
                </button>
              </div>
            </div>

            {/* Pipeline Stage Transition */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Update Sales Stage:</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {(['NEW ENQUIRY', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL SENT', 'WON'] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1 rounded font-mono transition ${
                      selectedLead.status === st
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Logging */}
            <div className="space-y-3 pt-4 border-t border-[#1e3a63]">
              <h3 className="text-sm font-semibold text-white">Record Interaction Activity</h3>
              <textarea
                rows={3}
                value={activityNote}
                onChange={(e) => setActivityNote(e.target.value)}
                placeholder="Log notes from discovery phone call, WhatsApp conversation, or requirement review..."
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setActivityNote('')}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
              >
                Save Activity Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
