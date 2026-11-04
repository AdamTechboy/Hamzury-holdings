'use client'

import { useState } from 'react'

interface AccountRecord {
  id: string
  accountName: string
  purpose: string
  loginEmail: string
  department: string
  responsiblePerson: string
  accessStatus: 'active' | 'suspended' | 'under_review'
  vaultReference: string
  mfaEnabled: boolean
  lastReview: string
}

const INITIAL_ACCOUNTS: AccountRecord[] = [
  {
    id: '1',
    accountName: 'Netlify Production Team',
    purpose: 'Hosting, Edge functions, and DNS management for Holding & Ventures.',
    loginEmail: 'admin@hamzury.com',
    department: 'Holding & SUBT',
    responsiblePerson: 'Lead Systems Architect',
    accessStatus: 'active',
    vaultReference: 'vault-uuid-7718',
    mfaEnabled: true,
    lastReview: '2026-10-15'
  },
  {
    id: '2',
    accountName: 'CAC Corporate Portal Custodian',
    purpose: 'Filing corporate documents and post-incorporation certificates.',
    loginEmail: 'compliance@bizdoc.hamzury.com',
    department: 'BizDoc',
    responsiblePerson: 'Head of Compliance',
    accessStatus: 'active',
    vaultReference: 'vault-uuid-9921',
    mfaEnabled: true,
    lastReview: '2026-10-20'
  },
  {
    id: '3',
    accountName: 'Meta WhatsApp Business Cloud',
    purpose: 'Inbound customer communication and verified messaging.',
    loginEmail: 'contact@hamzury.com',
    department: 'Central CRM',
    responsiblePerson: 'CRM Operations Manager',
    accessStatus: 'active',
    vaultReference: 'vault-uuid-3342',
    mfaEnabled: true,
    lastReview: '2026-10-01'
  }
]

export default function AccountRegisterPage() {
  const [accounts] = useState<AccountRecord[]>(INITIAL_ACCOUNTS)

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e3a63] pb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400">Security Governance Module</span>
          <h1 className="text-2xl font-bold text-white">Account Access Register</h1>
          <p className="text-xs text-slate-400">Custodians, MFA status, and credential vault references across ventures.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
            + Register Account
          </button>
        </div>
      </div>

      {/* Security Compliance Notice */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3">
        <span className="text-lg">🛡️</span>
        <div>
          <strong>Strict Security Policy:</strong> Passwords, recovery tokens, and API credentials are never stored or retrieved by this application. Only vault references (1Password / Bitwarden UUIDs) and custodian metadata are recorded.
        </div>
      </div>

      {/* Account Inventory Table */}
      <div className="border border-[#1e3a63] rounded-xl overflow-hidden bg-[#0c1e38]">
        <div className="grid grid-cols-12 bg-slate-900 p-3 text-xs font-semibold text-slate-300 border-b border-slate-800">
          <span className="col-span-3">Service / Account</span>
          <span className="col-span-3">Login Email & Purpose</span>
          <span className="col-span-2">Custodian</span>
          <span className="col-span-2">Vault Reference</span>
          <span className="col-span-2 text-right">MFA & Status</span>
        </div>

        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="grid grid-cols-12 p-3 text-xs border-b border-[#1e3a63]/50 items-center hover:bg-slate-800/40 transition"
          >
            <div className="col-span-3 space-y-0.5">
              <span className="font-bold text-white">{acc.accountName}</span>
              <p className="text-[11px] text-blue-300">{acc.department}</p>
            </div>
            <div className="col-span-3 space-y-0.5">
              <span className="font-mono text-slate-200">{acc.loginEmail}</span>
              <p className="text-[11px] text-slate-400 line-clamp-1">{acc.purpose}</p>
            </div>
            <div className="col-span-2 text-slate-300">
              {acc.responsiblePerson}
            </div>
            <div className="col-span-2 font-mono text-[11px] text-slate-400">
              {acc.vaultReference}
            </div>
            <div className="col-span-2 text-right space-y-1">
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  acc.mfaEnabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400'
                }`}>
                  {acc.mfaEnabled ? 'MFA ACTIVE' : 'NO MFA'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Reviewed {acc.lastReview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

