import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['en', 'hi', 'mr'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  hi: '🇮🇳',
  mr: '🇮🇳'
};

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});