/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const scriptSources = ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : []), 'https://challenges.cloudflare.com', 'https://www.googletagmanager.com'].join(' ');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['192.168.29.164'],
  // Keep static generation predictable on constrained Windows hosts.
  experimental: { cpus: 1 },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src ${scriptSources}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.google-analytics.com",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com https://www.google-analytics.com https://analytics.google.com https://*.googletagmanager.com",
              "frame-src https://challenges.cloudflare.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
