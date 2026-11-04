'use client'

import { useState } from 'react'

interface ResourceItem {
  id: string
  title: string
  category: string
  description: string
  url: string
  tags: string[]
}

const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: '1',
    title: 'CAC Corporate Affairs Commission Portal',
    category: 'BizDoc Compliance',
    description: 'Direct portal for Nigerian business registration, post-incorporation filings, and annual returns.',
    url: 'https://post.cac.gov.ng',
    tags: ['cac', 'registration', 'compliance']
  },
  {
    id: '2',
    title: 'Figma Brand Guidelines Kit',
    category: 'Medialy Creative',
    description: 'Shared design system components and vector templates for client profile plans.',
    url: 'https://figma.com/@hamzury',
    tags: ['design', 'branding', 'figma']
  },
  {
    id: '3',
    title: 'Supabase Documentation & RLS Guides',
    category: 'SUBT Development',
    description: 'Official PostgreSQL reference for Row-Level Security policies and edge functions.',
    url: 'https://supabase.com/docs',
    tags: ['supabase', 'database', 'security']
  }
]

export default function ItemSaverPage() {
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = resources.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.includes(search.toLowerCase()))
    const matchesCategory = category === 'all' || r.category.includes(category)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e3a63] pb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-blue-400">Internal Tool Module</span>
          <h1 className="text-2xl font-bold text-white">Item Saver (Knowledge Directory)</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
            + Add New Resource
          </button>
          <button className="px-3 py-1.5 rounded border border-slate-700 bg-slate-800 text-xs text-slate-200">
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, description or tag..."
          className="flex-1 px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="BizDoc">BizDoc</option>
          <option value="Medialy">Medialy</option>
          <option value="SUBT">SUBT</option>
        </select>
      </div>

      {/* Resource Table */}
      <div className="border border-[#1e3a63] rounded-xl overflow-hidden bg-[#0c1e38]">
        <div className="grid grid-cols-12 bg-slate-900 p-3 text-xs font-semibold text-slate-300 border-b border-slate-800">
          <span className="col-span-4">Title & Details</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-3">Tags</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>
        {filtered.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 p-3 text-xs border-b border-[#1e3a63]/50 items-center hover:bg-slate-800/40 transition"
          >
            <div className="col-span-4 space-y-1">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white hover:text-blue-400"
              >
                {item.title} ↗
              </a>
              <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
            </div>
            <div className="col-span-3 text-slate-300">{item.category}</div>
            <div className="col-span-3 flex flex-wrap gap-1">
              {item.tags.map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                  #{t}
                </span>
              ))}
            </div>
            <div className="col-span-2 text-right">
              <button
                onClick={() => navigator.clipboard.writeText(item.url)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-blue-300"
              >
                Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
