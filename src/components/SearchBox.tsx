'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input, Column, Text, Button, Flex } from '@once-ui-system/core';
import { AdvancedFilters } from '@/components/AdvancedFilters';
import Link from 'next/link';

interface SearchResult {
  type: 'project' | 'blog';
  title: string;
  description: string;
  href: string;
  tags?: string[];
}

interface SearchBoxProps {
  onClose?: () => void;
  isVisible?: boolean;
}

export function SearchBox({ onClose, isVisible = true }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in a real app, this would come from your CMS or API
  const searchData: SearchResult[] = useMemo(() => [
    {
      type: 'project',
      title: 'WhatsApp Campaign Management System',
      description: 'A comprehensive system for managing WhatsApp marketing campaigns with real-time analytics and automated messaging.',
      href: '/work/whatsapp-campaign-management-system',
      tags: ['Node.js', 'React', 'WhatsApp API', 'Analytics']
    },
    {
      type: 'project', 
      title: 'Real-time Voice Communication Platform',
      description: 'High-performance voice communication system with WebRTC integration and scalable architecture.',
      href: '/work/real-time-voice-communication-platform',
      tags: ['WebRTC', 'Real-time', 'Voice', 'Communication']
    },
    {
      type: 'project',
      title: 'Campus Management System',
      description: 'Comprehensive educational management platform with student, faculty, and administrative modules.',
      href: '/work/campus-management-system',
      tags: ['Education', 'Management', 'Students', 'Faculty']
    },
    {
      type: 'blog',
      title: 'Getting Started with React: A Journey into Modern Web Development',
      description: 'My experience learning React and how it transformed my approach to building user interfaces.',
      href: '/blog/getting-started-with-react',
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      type: 'blog',
      title: 'Building Scalable Node.js APIs: Lessons from Production',
      description: 'Best practices for designing and implementing robust Node.js APIs that can handle growth.',
      href: '/blog/building-scalable-node-apis',
      tags: ['Node.js', 'API', 'Backend', 'Scalability']
    },
    {
      type: 'blog',
      title: 'TypeScript Best Practices: Writing Better, Safer Code',
      description: 'Essential TypeScript practices that have improved my code quality and developer experience.',
      href: '/blog/typescript-best-practices',
      tags: ['TypeScript', 'Best Practices', 'Code Quality']
    }
  ], []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
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

      setResults(filteredResults.slice(0, 6)); // Limit to 6 results
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, searchData]);

  if (!isVisible) return null;

  return (
    <Column maxWidth="m" gap="16">
      <Input
        id="search-input"
        placeholder="Search projects and blog posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <Column gap="8" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {isLoading ? (
            <Text variant="body-default-s" onBackground="neutral-weak">
              Searching...
            </Text>
          ) : results.length > 0 ? (
            <>
              <Text variant="body-default-s" onBackground="neutral-medium">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </Text>
              {results.map((result, index) => (
                <Link key={index} href={result.href} onClick={onClose}>
                  <Flex
                    padding="12"
                    radius="s"
                    border="neutral-alpha-weak"
                    background="neutral-alpha-weak"
                    gap="8"
                    direction="column"
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--neutral-alpha-medium)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--neutral-alpha-weak)';
                    }}
                  >
                    <Flex horizontal="between" vertical="start">
                      <Text variant="body-strong-s">
                        {result.title}
                      </Text>
                      <Text 
                        variant="label-default-xs" 
                        onBackground="accent-strong"
                        style={{ textTransform: 'uppercase' }}
                      >
                        {result.type}
                      </Text>
                    </Flex>
                    <Text 
                      variant="body-default-s" 
                      onBackground="neutral-medium"
                      style={{ 
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {result.description}
                    </Text>
                    {result.tags && result.tags.length > 0 && (
                      <Flex gap="4" wrap>
                        {result.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Text
                            key={tagIndex}
                            variant="label-default-xs"
                            onBackground="neutral-medium"
                            style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: 'var(--neutral-alpha-weak)',
                            }}
                          >
                            {tag}
                          </Text>
                        ))}
                        {result.tags.length > 3 && (
                          <Text
                            variant="label-default-xs"
                            onBackground="neutral-weak"
                          >
                            +{result.tags.length - 3}
                          </Text>
                        )}
                      </Flex>
                    )}
                  </Flex>
                </Link>
              ))}
            </>
          ) : (
            <Flex direction="column" gap="8" horizontal="center" paddingY="24">
              <Text variant="body-default-s" onBackground="neutral-weak">
                No results found for &quot;{query}&quot;
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Try searching for projects, blog posts, or technologies
              </Text>
            </Flex>
          )}
        </Column>
      )}
    </Column>
  );
}