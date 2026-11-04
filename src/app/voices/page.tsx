import type { Metadata } from 'next';
import Editorial from '@/components/Editorial';

export const metadata: Metadata = { title: 'What people say' };

export default function Voices() {
  return (
    <Editorial
      eyebrow="what people say"
      title="experiences worth listening to."
      text="client and learner feedback, published with their permission, clear context and an accurate account of the work."
      pending="we only publish feedback people have agreed to share. the first stories are on their way."
    />
  );
}
