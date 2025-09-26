'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Column, Text, Button, Flex, Icon, SmartLink } from '@once-ui-system/core';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SearchModal.module.scss';

interface SearchResult {
  type: 'project' | 'blog';
  title: string;
  description: string;
  href: string;
  tags?: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search data - includes projects and blog posts
  const searchData: SearchResult[] = useMemo(() => [
    {
      type: 'project',
      title: 'WhatsApp Campaign Management System',
      description: 'A comprehensive system for managing WhatsApp marketing campaigns with real-time analytics and automated messaging.',
      href: '/work/whatsapp-campaign-management-system',
      tags: ['Node.js', 'React', 'WhatsApp API', 'Analytics', 'MongoDB', 'Express']
    },
    {
      type: 'project', 
      title: 'Real-time Voice Communication Platform',
      description: 'High-performance voice communication system with WebRTC integration and scalable architecture.',
      href: '/work/real-time-voice-communication-platform',
      tags: ['WebRTC', 'Real-time', 'Voice', 'Communication', 'JavaScript', 'Node.js']
    },
    {
      type: 'project',
      title: 'Campus Management & Security System',
      description: 'Comprehensive educational management platform with student, faculty, and administrative modules plus security features.',
      href: '/work/campus-management-system',
      tags: ['Education', 'Management', 'Students', 'Faculty', 'Security', 'Database']
    },
    {
      type: 'blog',
      title: 'LazyVim: Zero to Hero in 10 Minutes',
      description: 'Transform your coding experience with LazyVim - the modern Neovim configuration that just works. Complete setup guide with essential shortcuts.',
      href: '/blog/lazyvim-complete-guide',
      tags: ['Neovim', 'LazyVim', 'Editor', 'IDE', 'Development Tools', 'Productivity']
    },
  ], []);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const filteredResults = searchData.filter(item => {
        const searchText = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.tags?.some(tag => tag.toLowerCase().includes(searchText))
        );
      });

      // Sort results by relevance (title matches first)
      filteredResults.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase());
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase());
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
      });

      setResults(filteredResults.slice(0, 6));
      setSelectedIndex(0);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, searchData]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            onClose();
            router.push(results[selectedIndex].href);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, router]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={styles.searchModal}
          >
            <Flex
              background="page"
              border="neutral-alpha-weak" 
              radius="m-4"
              shadow="l"
              direction="column"
              gap="m"
              padding="m"
              style={{ 
                maxHeight: 'calc(80vh - 40px)',
                overflow: 'hidden',
                minHeight: '400px'
              }}
              className={styles.searchContainer}
            >
              {/* Header */}
              <Flex gap="s" vertical="center">
                <Icon name="search" size="m" />
                <Text variant="heading-strong-m">Search</Text>
              </Flex>

              {/* Search Input */}
              <Input
                ref={inputRef}
                id="search-modal-input"
                placeholder="Search projects and blog posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* Results Container */}
              <Column gap="m" style={{ 
                minHeight: '280px', 
                maxHeight: 'min(400px, calc(100vh - 320px))', 
                overflowY: 'auto'
              }}>
                {!query ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Column gap="m" horizontal="center" paddingY="xl">
                      <Column gap="s" horizontal="center">
                        <Icon name="search" size="l" onBackground="neutral-weak" />
                        <Text variant="body-default-m" onBackground="neutral-medium">
                          Start typing to search
                        </Text>
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          Find projects, blog posts, and technologies
                        </Text>
                      </Column>
                      
                      <Column gap="xs">
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          Try searching for:
                        </Text>
                        <Flex gap="xs" wrap horizontal="center" style={{ maxWidth: '100%' }}>
                          {['React', 'Node.js', 'WhatsApp', 'LazyVim', 'WebRTC', 'Management'].map((term) => (
                            <Button
                              key={term}
                              variant="tertiary"
                              size="s"
                              onClick={() => setQuery(term)}
                              style={{ flexShrink: 0, minWidth: 'fit-content' }}
                            >
                              {term}
                            </Button>
                          ))}
                        </Flex>
                      </Column>
                    </Column>
                  </motion.div>
                ) : isLoading ? (
                  <Flex horizontal="center" vertical="center" paddingY="xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Icon name="search" size="m" onBackground="neutral-weak" />
                    </motion.div>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      Searching...
                    </Text>
                  </Flex>
                ) : results.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Column gap="s">
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        {results.length} result{results.length !== 1 ? 's' : ''} found
                      </Text>
                      
                      {results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Flex
                            paddingY="m"
                            paddingX="s"
                            radius="s"
                            border={selectedIndex === index ? "accent-medium" : "transparent"}
                            background={selectedIndex === index ? "accent-alpha-weak" : "transparent"}
                            gap="m"
                            direction="column"
                            style={{ cursor: 'pointer', width: '100%', transition: 'all 0.2s ease' }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onClose();
                              router.push(result.href);
                            }}
                          >
                              <Flex horizontal="between" vertical="start" gap="m">
                                <Column gap="xs" style={{ flex: 1 }}>
                                  <Text variant="heading-default-s" onBackground="neutral-strong">
                                    {result.title}
                                  </Text>
                                  <Text 
                                    variant="body-default-m" 
                                    onBackground="neutral-weak"
                                    style={{ 
                                      overflow: 'hidden',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      lineHeight: '1.4'
                                    }}
                                  >
                                    {result.description}
                                  </Text>
                                </Column>
                                
                                <Flex
                                  paddingX="s"
                                  paddingY="xs"
                                  radius="s"
                                  background="neutral-alpha-weak"
                                  style={{ flexShrink: 0 }}
                                >
                                  <Text 
                                    variant="label-default-s" 
                                    onBackground="neutral-medium"
                                    style={{ textTransform: 'capitalize', fontWeight: '500' }}
                                  >
                                    {result.type}
                                  </Text>
                                </Flex>
                              </Flex>
                              
                              {result.tags && result.tags.length > 0 && (
                                <Flex gap="xs" wrap>
                                  {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <Text
                                      key={tagIndex}
                                      variant="label-default-xs"
                                      onBackground="neutral-weak"
                                      style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: 'var(--neutral-alpha-weak)',
                                        fontSize: '11px'
                                      }}
                                    >
                                      {tag}
                                    </Text>
                                  ))}
                                  {result.tags.length > 3 && (
                                    <Text
                                      variant="label-default-xs"
                                      onBackground="neutral-weak"
                                      style={{ fontSize: '11px', opacity: 0.7 }}
                                    >
                                      +{result.tags.length - 3} more
                                    </Text>
                                  )}
                                </Flex>
                              )}
                          </Flex>
                        </motion.div>
                      ))}
                    </Column>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Column gap="s" horizontal="center" paddingY="xl">
                      <Icon name="search" size="l" onBackground="neutral-weak" />
                      <Text variant="body-default-m" onBackground="neutral-medium">
                        No results found for &ldquo;{query}&rdquo;
                      </Text>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        Try different keywords or browse all content
                      </Text>
                    </Column>
                  </motion.div>
                )}
              </Column>

              {/* Footer */}
              <Flex 
                horizontal="between" 
                vertical="center" 
                paddingTop="s" 
                style={{ 
                  borderTop: '1px solid var(--neutral-alpha-weak)',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <Text 
                  variant="label-default-xs" 
                  onBackground="neutral-weak"
                  className={styles.searchShortcuts}
                >
                  Use ↑↓ to navigate, Enter to select, Esc to close
                </Text>
                <Text 
                  variant="label-default-xs" 
                  onBackground="neutral-weak"
                  className={styles.searchShortcutsMobile}
                >
                  ↑↓ navigate • Enter select • Esc close
                </Text>
                <SmartLink href="/search" onClick={onClose}>
                  <Text variant="label-default-xs" onBackground="accent-strong">
                    Advanced search →
                  </Text>
                </SmartLink>
              </Flex>
            </Flex>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}