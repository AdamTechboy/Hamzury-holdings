import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RevealObserver, StickyCta } from '@/components/Motion';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Hamzury · Your business, put together',
    template: '%s · Hamzury',
  },
  description:
    'Registration, branding, software, training and funding support, planned around your goals and delivered by six specialist teams. Answer a few questions and get a clear plan.',
  openGraph: {
    title: 'Hamzury · Your business, put together',
    description: 'Six specialist teams. One clear plan for your business.',
    images: ['/assets/hamzury.png'],
  },
};

export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <RevealObserver />
      </body>
    </html>
  );
}
