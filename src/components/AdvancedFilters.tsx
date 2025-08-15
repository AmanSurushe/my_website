'use client';

import { useState, useEffect } from 'react';
import { Column, Row, Button, Text, Input, Badge, Flex } from '@once-ui-system/core';
import { FadeInWhenVisible } from '@/components';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface AdvancedFiltersProps {
  categories: FilterOption[];
  tags: FilterOption[];
  onFiltersChange: (filters: FilterState) => void;
  showSearch?: boolean;
  showDateRange?: boolean;
  className?: string;
}

interface FilterState {
  search: string;
  categories: string[];
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'date' | 'title' | 'relevance';
  sortOrder: 'asc' | 'desc';
}

export function AdvancedFilters({
  categories,
  tags,
  onFiltersChange,
  showSearch = true,
  showDateRange = false,
  className,
}: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    tags: [],
    dateRange: { start: '', end: '' },
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      categories: [],
      tags: [],
      dateRange: { start: '', end: '' },
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = 
    filters.search ||
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end;

  return (
    <FadeInWhenVisible className={className}>
      <Column gap="16">
        {/* Search Bar */}
        {showSearch && (
          <Input
            id="filter-search"
            placeholder="Search projects and posts..."
            value={filters.search}
            onChange={(e) =>
              setFilters(prev => ({ ...prev, search: e.target.value }))
            }
          />
        )}

        {/* Quick Actions */}
        <Flex horizontal="between" vertical="center" gap="8">
          <Button
            variant="ghost"
            size="s"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          <Flex gap="8" vertical="center">
            {hasActiveFilters && (
              <Button variant="ghost" size="s" onClick={handleReset}>
                Clear All
              </Button>
            )}
            
            <Text variant="label-default-s" onBackground="neutral-medium">
              Sort by:
            </Text>
            <Button
              variant={filters.sortBy === 'date' ? 'secondary' : 'ghost'}
              size="s"
              onClick={() => setFilters(prev => ({ ...prev, sortBy: 'date' }))}
            >
              Date
            </Button>
            <Button
              variant={filters.sortBy === 'title' ? 'secondary' : 'ghost'}
              size="s"
              onClick={() => setFilters(prev => ({ ...prev, sortBy: 'title' }))}
            >
              Title
            </Button>
          </Flex>
        </Flex>

        {/* Advanced Filters */}
        {isExpanded && (
          <Column gap="16">
            {/* Categories */}
            {categories.length > 0 && (
              <Column gap="8">
                <Text variant="label-strong-s">Categories</Text>
                <Row gap="8" wrap>
                  {categories.map((category) => (
                    <Badge
                      key={category.value}
                      background={
                        filters.categories.includes(category.value)
                          ? 'brand-strong'
                          : 'neutral-alpha-weak'
                      }
                      onBackground={
                        filters.categories.includes(category.value)
                          ? 'brand-on-background-strong'
                          : 'neutral-strong'
                      }
                      paddingX="8"
                      paddingY="4"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleCategoryToggle(category.value)}
                    >
                      {category.label}
                      {category.count && ` (${category.count})`}
                    </Badge>
                  ))}
                </Row>
              </Column>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <Column gap="8">
                <Text variant="label-strong-s">Technologies</Text>
                <Row gap="8" wrap>
                  {tags.map((tag) => (
                    <Badge
                      key={tag.value}
                      background={
                        filters.tags.includes(tag.value)
                          ? 'accent-strong'
                          : 'neutral-alpha-weak'
                      }
                      onBackground={
                        filters.tags.includes(tag.value)
                          ? 'accent-on-background-strong'
                          : 'neutral-strong'
                      }
                      paddingX="8"
                      paddingY="4"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleTagToggle(tag.value)}
                    >
                      {tag.label}
                      {tag.count && ` (${tag.count})`}
                    </Badge>
                  ))}
                </Row>
              </Column>
            )}

            {/* Date Range */}
            {showDateRange && (
              <Column gap="8">
                <Text variant="label-strong-s">Date Range</Text>
                <Row gap="8">
                  <Input
                    id="date-start"
                    type="date"
                    placeholder="Start date"
                    value={filters.dateRange.start}
                    onChange={(e) =>
                      setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value },
                      }))
                    }
                  />
                  <Input
                    id="date-end"
                    type="date"
                    placeholder="End date"
                    value={filters.dateRange.end}
                    onChange={(e) =>
                      setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value },
                      }))
                    }
                  />
                </Row>
              </Column>
            )}
          </Column>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Column gap="8">
            <Text variant="label-strong-xs" onBackground="neutral-medium">
              Active filters:
            </Text>
            <Row gap="4" wrap>
              {filters.categories.map((category) => (
                <Badge
                  key={`active-cat-${category}`}
                  background="brand-alpha-strong"
                  onBackground="brand-on-background-strong"
                  paddingX="6"
                  paddingY="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category} ×
                </Badge>
              ))}
              {filters.tags.map((tag) => (
                <Badge
                  key={`active-tag-${tag}`}
                  background="accent-alpha-strong"
                  onBackground="accent-on-background-strong"
                  paddingX="6"
                  paddingY="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </Row>
          </Column>
        )}
      </Column>
    </FadeInWhenVisible>
  );
}