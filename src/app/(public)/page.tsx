import Link from 'next/link'
import { VENTURES } from '@/types'

export default function HomePage() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-8">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-900/60 text-blue-300 border border-blue-500/30">
          Integrated Multi-Venture Acceleration
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          One Operating System for <span className="text-blue-400">Sustainable Business Growth</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          From corporate compliance and strategic branding to digital automation and funding readiness—Hamzury unites 6 specialized ventures under one high-trust infrastructure.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 transition"
          >
            Start Service Assessment
          </Link>
          <Link
            href="/portal"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 bg-[#0c1e38] text-slate-200 font-medium transition"
          >
            Access Client Portal
          </Link>
        </div>
      </section>

      {/* 6 Specialized Ventures Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Our Specialized Ventures</h2>
          <p className="text-slate-400 text-sm">Targeted expertise backed by a shared customer CRM and delivery engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(VENTURES).map((v) => (
            <div
              key={v.slug}
              className="p-6 rounded-xl bg-[#0c1e38] border border-[#1e3a63] hover:border-blue-500/50 transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: v.color }}
                  />
                  <span className="text-xs font-mono uppercase text-slate-400">{v.slug}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                  {v.name}
                </h3>
                <p className="text-xs font-medium text-blue-300">{v.tagline}</p>
                <p className="text-sm text-slate-300">{v.description}</p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1e3a63]/50 flex items-center justify-between">
                <Link
                  href={`/ventures/${v.slug}`}
                  className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
                >
                  Explore Services & Journeys →
                </Link>
                <Link
                  href={`/contact?venture=${v.slug}`}
                  className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Reliability Banner */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-[#1e3a63] text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Unified Customer Experience</h3>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          Every enquiry, quotation, project deliverable, and document is governed through real database permissions and Row Level Security.
        </p>
      </section>
    </div>
  )
}
