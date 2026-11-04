import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VENTURES } from '@/types'

export function generateStaticParams() {
  return Object.keys(VENTURES).map((slug) => ({ slug }))
}

export default function VenturePage({ params }: { params: { slug: string } }) {
  const venture = VENTURES[params.slug]
  if (!venture) notFound()

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 space-y-12">
      <div className="space-y-4">
        <Link href="/" className="text-xs text-blue-400 hover:underline">
          ← Back to Holding Overview
        </Link>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: venture.color }} />
          <h1 className="text-3xl font-extrabold text-white">{venture.name}</h1>
        </div>
        <p className="text-lg text-blue-300 font-medium">{venture.tagline}</p>
        <p className="text-slate-300 max-w-3xl leading-relaxed">{venture.description}</p>
      </div>

      {/* Venture Service Architecture */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#1e3a63] pb-3">
          Service Roadmap & Tiers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-[#0c1e38] border border-[#1e3a63] space-y-2">
            <span className="text-xs font-mono uppercase text-blue-400">Level 0 • Discovery & Essentials</span>
            <h3 className="font-bold text-white">Initial Needs & Feasibility</h3>
            <p className="text-xs text-slate-300">
              Rapid assessment, compliance/branding audit, or starter setup to qualify scope.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0c1e38] border border-[#1e3a63] space-y-2">
            <span className="text-xs font-mono uppercase text-purple-400">Level 1 • Core Implementation</span>
            <h3 className="font-bold text-white">Full Service Execution</h3>
            <p className="text-xs text-slate-300">
              End-to-end delivery of approved corporate documentation, design kit, or digital system.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0c1e38] border border-[#1e3a63] space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-400">Level 2 • Workflow & Governance</span>
            <h3 className="font-bold text-white">System Integration</h3>
            <p className="text-xs text-slate-300">
              Recurring governance routines, automated pipelines, and team capability adoption.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0c1e38] border border-[#1e3a63] space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400">Level 3 • Scale & Expansion</span>
            <h3 className="font-bold text-white">Multi-Team Growth</h3>
            <p className="text-xs text-slate-300">
              Strategic partnerships, multi-location installations, and long-term retention.
            </p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-6 rounded-xl bg-blue-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Ready to begin with {venture.name}?</h3>
          <p className="text-xs text-slate-300">Submit an assessment inquiry to receive quotation options.</p>
        </div>
        <Link
          href={`/contact?venture=${venture.slug}`}
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition"
        >
          Submit Inquiry →
        </Link>
      </div>
    </div>
  )
}

