declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Track custom events
export const event = ({
  name,
  category,
  label,
  value,
}: {
  name: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track contact form submissions
export const trackContactFormSubmission = (success: boolean) => {
  event({
    name: 'form_submit',
    category: 'engagement',
    label: success ? 'contact_form_success' : 'contact_form_error',
    value: success ? 1 : 0,
  });
};

// Track project views
export const trackProjectView = (projectSlug: string) => {
  event({
    name: 'view_item',
    category: 'engagement',
    label: `project_${projectSlug}`,
  });
};

// Track blog post views
export const trackBlogView = (blogSlug: string) => {
  event({
    name: 'view_item',
    category: 'content',
    label: `blog_${blogSlug}`,
  });
};

// Track search queries
export const trackSearch = (query: string, resultCount: number) => {
  event({
    name: 'search',
    category: 'engagement',
    label: query,
    value: resultCount,
  });
};