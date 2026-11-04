import type { Metadata } from 'next';
import Editorial from '@/components/Editorial';

export const metadata: Metadata = { title: 'Portfolio' };

export default function Portfolio() {
  return (
    <Editorial
      eyebrow="portfolio"
      title="the situation. the work. the result."
      text="every case study explains where a business started, the strategy we agreed, what we put in place and the verified result."
      pending="case studies are being prepared with our clients’ permission. in the meantime, tell us about your situation and we’ll show you how we would approach it."
    />
  );
}
