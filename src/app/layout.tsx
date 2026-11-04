import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hamzury Holdings — Multi-Venture Business Acceleration',
  description: 'Unifying specialized ventures in documentation, branding, digital systems, automation, capability training, and partnerships.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#09172c] text-slate-100">
        <header className="border-b border-[#1e3a63] bg-[#0c1e38]/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg">H</span>
              Hamzury Holdings
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/ventures/bizdoc" className="hover:text-blue-400 transition">BizDoc</Link>
              <Link href="/ventures/medialy" className="hover:text-purple-400 transition">Medialy</Link>
              <Link href="/ventures/subt" className="hover:text-emerald-400 transition">SUBT</Link>
              <Link href="/ventures/iotics" className="hover:text-amber-400 transition">Iotics</Link>
              <Link href="/ventures/hamzury-hub" className="hover:text-pink-400 transition">Hamzury Hub</Link>
              <Link href="/ventures/iwiin" className="hover:text-indigo-400 transition">Iwiin</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/portal" className="text-sm px-3 py-1.5 rounded border border-blue-500/50 hover:bg-blue-500/10 text-blue-300 transition">
                Client Portal
              </Link>
              <Link href="/staff/crm" className="text-sm px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition">
                Staff CRM
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-[#1e3a63] py-8 text-center text-xs text-slate-400 bg-[#081426]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Hamzury Holdings. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/staff/item-saver" className="hover:underline">Item Saver</Link>
              <Link href="/staff/account-register" className="hover:underline">Account Register</Link>
              <Link href="/contact" className="hover:underline">Contact & Enquiries</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
