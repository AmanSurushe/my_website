'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '@/lib/analytics';

function AnalyticsWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = pathname + (searchParams ? searchParams.toString() : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {

  // Don't load analytics in development or if no GA_TRACKING_ID is provided
  if (!GA_TRACKING_ID || process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsWrapper />
      </Suspense>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}