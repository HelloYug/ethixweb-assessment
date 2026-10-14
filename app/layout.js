import './globals.css';
import { SiteHeader, SiteFooter } from '@/components/site';
import { MotionLayer } from '@/components/animations';
import GoogleAnalytics from '@/components/GoogleAnalytics';

function getMetadataBase() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return new URL('http://localhost:3000');

  const value = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configured)
    ? `http://${configured}`
    : /^[a-z][a-z\d+.-]*:\/\//i.test(configured)
      ? configured
      : `https://${configured}`;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url
      : new URL('http://localhost:3000');
  } catch {
    return new URL('http://localhost:3000');
  }
}

export const metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Ethixweb India: Digital systems for ambitious businesses',
    template: '%s | Ethixweb India',
  },
  description: 'Premium websites, growth systems and intelligent automation for Indian businesses ready to scale with clarity.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    title: 'Ethixweb India: Global expertise. Built for Indian ambition.',
    description: 'Digital experiences, growth systems and automation that help ambitious Indian businesses move with clarity.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <GoogleAnalytics />
        <SiteHeader />
        <MotionLayer />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
