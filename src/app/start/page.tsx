import type { Metadata } from 'next';
import StartForm from './StartForm';

export const metadata: Metadata = {
  title: 'Get started',
  description:
    'Tell us about your business in a few simple steps. Our team will recommend a clear first step.',
};

type Props = { searchParams: Promise<{ service?: string; package?: string }> };

export default async function Start({ searchParams }: Props) {
  const { service, package: pkg } = await searchParams;
  return (
    <section className="start">
      <div className="wrap">
        <StartForm service={service} pkg={pkg} />
      </div>
    </section>
  );
}
