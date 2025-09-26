'use client';

import { useState, useEffect, useMemo } from 'react';
import { Flex, Grid, Heading, Text, Input, Tag, Button, Icon } from "@once-ui-system/core";
import { RepositoryCard } from './RepositoryCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { fetchGitHubRepositories, GitHubRepository } from '@/utils/github';

interface RepositoriesProps {
  username: string;
  maxRepos?: number;
  showFilters?: boolean;
}

export function Repositories({ username, maxRepos, showFilters = true }: RepositoriesProps) {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [showForks, setShowForks] = useState(false);

  useEffect(() => {
    async function loadRepositories() {
      setLoading(true);
      setError(null);
      
      const result = await fetchGitHubRepositories(username, {
        includeForks: true, // We'll filter client-side
        sortBy: sortBy === 'stars' ? 'updated' : sortBy === 'name' ? 'full_name' : 'updated',
        perPage: 100 // Get more repos to have better filtering options
      });

      if (result.error) {
        setError(result.error);
      } else {
        setRepositories(result.repositories);
      }
      
      setLoading(false);
    }

    loadRepositories();
  }, [username, sortBy]);

  const languages = useMemo(() => {
    const langSet = new Set<string>();
    repositories.forEach(repo => {
      if (repo.language) {
        langSet.add(repo.language);
      }
    });
    return Array.from(langSet).sort();
  }, [repositories]);

  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repositories.filter(repo => {
      // Search filter
      if (searchTerm && !repo.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !repo.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Language filter
      if (selectedLanguage !== 'all' && repo.language !== selectedLanguage) {
        return false;
      }
      
      // Fork filter
      if (!showForks && repo.fork) {
        return false;
      }
      
      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    return maxRepos ? filtered.slice(0, maxRepos) : filtered;
  }, [repositories, searchTerm, selectedLanguage, sortBy, showForks, maxRepos]);

  if (loading) {
    return (
      <Flex direction="column" fillWidth gap="24">
        {showFilters && (
          <Flex direction="column" gap="16" fillWidth>
            <div
              style={{
                height: '40px',
                backgroundColor: 'var(--neutral-alpha-weak)',
                borderRadius: '8px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
            <Flex gap="8" wrap>
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    height: '32px',
                    width: '80px',
                    backgroundColor: 'var(--neutral-alpha-weak)',
                    borderRadius: '6px',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </Flex>
          </Flex>
        )}
        <LoadingSkeleton count={maxRepos || 6} variant="card" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex fillWidth horizontal="center" paddingY="40" direction="column" gap="12">
        <Icon name="warning" size="l" />
        <Text variant="body-default-m" onBackground="neutral-medium">
          Failed to load repositories: {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" fillWidth gap="24">
      {showFilters && (
        <div
          className="filters-section"
          style={{
            opacity: 0,
            transform: 'translateY(-20px)',
            animation: 'fadeInDown 0.5s ease-out forwards'
          }}
        >
          <Flex direction="column" gap="16" fillWidth>
            {/* Search */}
            <Input
              id="repository-search"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filters */}
            <Flex gap="16" wrap fillWidth direction="column">
              {/* Language Filter */}
              <Flex gap="8" wrap fillWidth>
                <Button
                  variant={selectedLanguage === 'all' ? 'primary' : 'secondary'}
                  size="s"
                  onClick={() => setSelectedLanguage('all')}
                >
                  All Languages
                </Button>
                {languages.slice(0, 4).map(lang => (
                  <Button
                    key={lang}
                    variant={selectedLanguage === lang ? 'primary' : 'secondary'}
                    size="s"
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang}
                  </Button>
                ))}
              </Flex>

              {/* Sort and Fork Filters */}
              <Flex gap="8" wrap fillWidth>
                <Button
                  variant={sortBy === 'updated' ? 'primary' : 'secondary'}
                  size="s"
                  onClick={() => setSortBy('updated')}
                >
                  Recently Updated
                </Button>
                <Button
                  variant={sortBy === 'stars' ? 'primary' : 'secondary'}
                  size="s"
                  onClick={() => setSortBy('stars')}
                >
                  Most Stars
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'primary' : 'secondary'}
                  size="s"
                  onClick={() => setSortBy('name')}
                >
                  Name
                </Button>
                <Button
                  variant={showForks ? 'primary' : 'secondary'}
                  size="s"
                  onClick={() => setShowForks(!showForks)}
                >
                  {showForks ? 'Hide' : 'Show'} Forks
                </Button>
              </Flex>
            </Flex>

            {/* Stats */}
            <Flex gap="12" wrap>
              <Text variant="label-default-s" onBackground="neutral-medium">
                {filteredAndSortedRepos.length} repositories
              </Text>
              {searchTerm && (
                <Text variant="label-default-s" onBackground="neutral-medium">
                  matching &quot;{searchTerm}&quot;
                </Text>
              )}
              {selectedLanguage !== 'all' && (
                <Tag size="s" variant="neutral">
                  {selectedLanguage}
                </Tag>
              )}
            </Flex>
          </Flex>
        </div>
      )}

      {/* Repository Grid */}
      {filteredAndSortedRepos.length > 0 ? (
        <div
          className="repository-grid"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.6s ease-out forwards',
            animationDelay: showFilters ? '0.3s' : '0s'
          }}
        >
          <Grid 
            columns={{ initial: "1", xs: "1", s: "2", m: "3" }}
            gap="16" 
            fillWidth
          >
            {filteredAndSortedRepos.map((repo, index) => (
              <div
                key={repo.id}
                style={{
                  animationDelay: `${(index * 0.1) + (showFilters ? 0.4 : 0.1)}s`
                }}
              >
                <RepositoryCard repository={repo} />
              </div>
            ))}
          </Grid>
        </div>
      ) : (
        <div
          className="no-results"
          style={{
            opacity: 0,
            transform: 'scale(0.9)',
            animation: 'fadeInScale 0.4s ease-out forwards',
            animationDelay: '0.2s'
          }}
        >
          <Flex fillWidth horizontal="center" paddingY="40" direction="column" gap="12">
            <Icon name="search" size="l" />
            <Text variant="body-default-m" onBackground="neutral-medium">
              No repositories found matching your criteria
            </Text>
          </Flex>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Mobile responsive improvements */
        @media (max-width: 768px) {
          .filters-section {
            padding: 0 8px;
          }
          
          .repository-grid {
            padding: 0 8px;
          }
        }
        
        @media (max-width: 480px) {
          .filters-section {
            padding: 0 4px;
          }
          
          .repository-grid {
            padding: 0 4px;
          }
        }
      `}</style>
    </Flex>
  );
}