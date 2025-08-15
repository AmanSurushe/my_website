'use client';

import { useState, useTransition } from 'react';
import { Button, Dropdown, Text, Flex } from '@once-ui-system/core';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: Locale) => {
    startTransition(() => {
      // Remove current locale from pathname if it exists
      const pathnameWithoutLocale = pathname.startsWith(`/${locale}`) 
        ? pathname.slice(`/${locale}`.length) 
        : pathname;
      
      // Add new locale to pathname
      const newPathname = newLocale === 'en' 
        ? pathnameWithoutLocale || '/'
        : `/${newLocale}${pathnameWithoutLocale || '/'}`;
      
      router.push(newPathname);
      setIsOpen(false);
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="ghost"
        size="s"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-label="Switch language"
        style={{ 
          minWidth: '60px',
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <Flex gap="4" vertical="center">
          <span>{localeFlags[locale]}</span>
          <Text variant="label-default-xs">
            {locale.toUpperCase()}
          </Text>
        </Flex>
      </Button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '4px',
              backgroundColor: 'var(--neutral-on-background-weak)',
              border: '1px solid var(--neutral-alpha-medium)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              minWidth: '120px',
              zIndex: 20,
              overflow: 'hidden',
            }}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                disabled={isPending}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  backgroundColor: loc === locale 
                    ? 'var(--accent-alpha-weak)' 
                    : 'transparent',
                  color: 'var(--neutral-on-background-strong)',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (loc !== locale) {
                    e.currentTarget.style.backgroundColor = 'var(--neutral-alpha-weak)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (loc !== locale) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Flex gap="8" vertical="center" horizontal="start">
                  <span>{localeFlags[loc]}</span>
                  <Text variant="body-default-s">
                    {localeNames[loc]}
                  </Text>
                  {loc === locale && (
                    <Text variant="label-default-xs" onBackground="accent-strong">
                      ✓
                    </Text>
                  )}
                </Flex>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}