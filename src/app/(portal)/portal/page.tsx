'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClientPortalDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'documents' | 'support'>('overview')

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-[#0c1e38] border border-[#1e3a63] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-blue-400">Authenticated Client Session</span>
          <h1 className="text-2xl font-bold text-white">Client Portal Dashboard</h1>
          <p className="text-xs text-slate-300">Centralized view across all your active venture engagements.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
            Upload Document
          </button>
          <button className="px-3 py-1.5 rounded border border-slate-700 bg-slate-800 text-xs text-slate-200">
            Request Support
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1e3a63] text-sm">
        {(['overview', 'projects', 'documents', 'support'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize border-b-2 transition ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#0c1e38] border border-[#1e3a63]">
              <span className="text-xs text-slate-400 uppercase font-mono">Active Projects</span>
              <p className="text-2xl font-bold text-white mt-1">1</p>
              <p className="text-xs text-blue-400 mt-2">SUBT • Website & CRM Setup</p>
            </div>
            <div className="p-5 rounded-xl bg-[#0c1e38] border border-[#1e3a63]">
              <span className="text-xs text-slate-400 uppercase font-mono">Pending Documents</span>
              <p className="text-2xl font-bold text-amber-400 mt-1">1</p>
              <p className="text-xs text-slate-300 mt-2">Action needed: Identity Evidence</p>
            </div>
            <div className="p-5 rounded-xl bg-[#0c1e38] border border-[#1e3a63]">
              <span className="text-xs text-slate-400 uppercase font-mono">Payment Status</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">Clear</p>
              <p className="text-xs text-slate-400 mt-2">No outstanding balance</p>
            </div>
          </div>

          {/* Your Next Business Move Recommendation (Section 8 Requirement) */}
          <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-purple-300">Your Next Business Move</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/30">Tailored</span>
            </div>
            <p className="text-xs text-slate-200">
              Upon delivering your SUBT digital infrastructure, activate <strong>Medialy Profile Plan & Branding Kit</strong> to ensure your brand identity matches your new web platform.
            </p>
            <Link
              href="/contact?venture=medialy"
              className="inline-block text-xs font-semibold text-purple-400 hover:underline"
            >
              Learn about Medialy Brand Kits →
            </Link>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="p-6 rounded-xl bg-[#0c1e38] border border-[#1e3a63] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Active Engagement</h3>
            <span className="text-xs px-2.5 py-1 rounded bg-blue-900/60 text-blue-300 border border-blue-500/30 font-mono">
              IN PROGRESS
            </span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <p><strong>Ref:</strong> PRJ-2026-SUBT1</p>
            <p><strong>Department:</strong> SUBT (Digital Infrastructure)</p>
            <p><strong>Deliverable:</strong> Portfolio Website & Enquiry Tracker</p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-2/3" />
          </div>
          <p className="text-xs text-slate-400">Milestone 2 of 3: Quality Review</p>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-xl bg-[#0c1e38] border border-[#1e3a63] space-y-4">
          <h3 className="font-bold text-white">Project Documents & Checkpoints</h3>
          <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-slate-900 p-3 font-semibold text-slate-300">
              <span>Title</span>
              <span>Type</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            <div className="grid grid-cols-4 p-3 border-t border-slate-800 items-center text-slate-300">
              <span>Identity Verification</span>
              <span>Client Evidence</span>
              <span className="text-amber-400">Pending Review</span>
              <button className="text-blue-400 hover:underline text-left">Upload File</button>
            </div>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="p-6 rounded-xl bg-[#0c1e38] border border-[#1e3a63] space-y-4">
          <h3 className="font-bold text-white">Open Support Inquiries</h3>
          <p className="text-xs text-slate-400">No open tickets. If you need assistance, please submit a request below.</p>
          <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
            Create Support Ticket
          </button>
        </div>
      )}
    </div>
  )
}

