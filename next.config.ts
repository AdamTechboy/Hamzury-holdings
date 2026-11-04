import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the project root so Next.js doesn't pick up stray lockfiles in parent folders.
  turbopack: { root: import.meta.dirname },
  outputFileTracingRoot: import.meta.dirname,
  // Old static page URLs (from before the Next.js move) keep working.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      {
        source: '/venture.html',
        has: [{ type: 'query', key: 'v', value: '(?<v>[a-z]+)' }],
        destination: '/services/:v',
        permanent: true,
      },
      { source: '/venture.html', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
