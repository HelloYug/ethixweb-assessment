'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { siteConfig } from '@/lib/config/site';

const measurementId = siteConfig.analytics.googleMeasurementId;

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId || !pathname) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('config', measurementId, {
      page_path: pathname,
    });
  }, [pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: false });`}
      </Script>
    </>
  );
}
