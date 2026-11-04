import type { Metadata } from 'next';
import Editorial from '@/components/Editorial';

export const metadata: Metadata = { title: 'Reports & resources' };

export default function Resources() {
  return (
    <Editorial
      eyebrow="reports & resources"
      title="useful thinking. clear next actions."
      text="guides, reports and research that follow the same approach: the situation, the options, the practical next step, with sources and dates."
      pending="our first guides are being written. if you have a question now, start with a few questions and our team will point you in the right direction."
    />
  );
}
