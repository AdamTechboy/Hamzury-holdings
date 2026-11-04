import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RevealObserver, StickyCta } from '@/components/Motion';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

// Self-hosted by Next.js at build time. Display serif for headings, light sans for text.
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const sans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'hamzury holding · understand it. put it together. move forward.',
    template: '%s · hamzury',
  },
  description:
    'Registration, branding, software, training and funding support, planned around your goals and delivered by six specialist teams. Answer a few questions and get a clear plan.',
  openGraph: {
    title: 'hamzury holding · understand it. put it together. move forward.',
    description: 'Six specialist teams. One clear plan for your business.',
    images: ['/assets/hamzury.png'],
  },
};

export const viewport: Viewport = { themeColor: '#f8f3eb' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide .reveal elements only when JS is running to fade them in. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  );
}
