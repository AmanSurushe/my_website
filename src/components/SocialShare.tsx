'use client';

import { useState } from 'react';
import { Button, Flex, Text, Column } from '@once-ui-system/core';
import { AnimatedCard } from '@/components';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  className?: string;
}

interface SharePlatform {
  name: string;
  icon: string;
  color: string;
  shareUrl: (params: SocialShareProps) => string;
}

const shareStats = {
  shares: 0,
  likes: 0,
  views: 0,
};

const platforms: SharePlatform[] = [
  {
    name: 'Twitter',
    icon: '🐦',
    color: '#1DA1F2',
    shareUrl: ({ url, title, hashtags }) => {
      const text = `${title} ${hashtags?.map(tag => `#${tag}`).join(' ') || ''}`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    },
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0077B5',
    shareUrl: ({ url, title, description }) => {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`;
    },
  },
  {
    name: 'Facebook',
    icon: '👥',
    color: '#1877F2',
    shareUrl: ({ url }) => {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    },
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    shareUrl: ({ url, title }) => {
      const text = `${title} - ${url}`;
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    },
  },
  {
    name: 'Telegram',
    icon: '📱',
    color: '#0088CC',
    shareUrl: ({ url, title }) => {
      return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    },
  },
  {
    name: 'Reddit',
    icon: '🤖',
    color: '#FF4500',
    shareUrl: ({ url, title }) => {
      return `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    },
  },
];

export function SocialShare({ url, title, description, hashtags, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(shareStats.shares);

  const handleShare = async (platform: SharePlatform) => {
    const shareUrl = platform.shareUrl({ url, title, description, hashtags });
    
    // Track share
    setShareCount(prev => prev + 1);
    
    // Open share URL
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        setShareCount(prev => prev + 1);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <AnimatedCard className={className}>
      <Column gap="16">
        <Flex horizontal="between" vertical="center">
          <Text variant="heading-strong-s">Share this</Text>
          <Text variant="label-default-xs" onBackground="neutral-weak">
            {shareCount} shares
          </Text>
        </Flex>

        <Flex gap="8" wrap>
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="ghost"
              size="s"
              onClick={() => handleShare(platform)}
              style={{
                border: `1px solid ${platform.color}20`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${platform.color}10`;
                e.currentTarget.style.borderColor = `${platform.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = `${platform.color}20`;
              }}
            >
              <Flex gap="4" vertical="center">
                <span>{platform.icon}</span>
                <Text variant="label-default-xs">{platform.name}</Text>
              </Flex>
            </Button>
          ))}
        </Flex>

        <Flex gap="8">
          <Button
            variant="secondary"
            size="s"
            onClick={copyToClipboard}
            style={{ flex: 1 }}
          >
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </Button>

          {navigator.share && (
            <Button
              variant="secondary"
              size="s"
              onClick={handleNativeShare}
            >
              📤 Share
            </Button>
          )}
        </Flex>

        {hashtags && hashtags.length > 0 && (
          <Column gap="4">
            <Text variant="label-default-xs" onBackground="neutral-medium">
              Suggested hashtags:
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {hashtags.map(tag => `#${tag}`).join(' ')}
            </Text>
          </Column>
        )}
      </Column>
    </AnimatedCard>
  );
}

// Usage in blog posts and projects
export function BlogShareWidget({ slug }: { slug: string }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${baseUrl}/blog/${slug}`;
  
  return (
    <SocialShare
      url={url}
      title="Check out this blog post by Aman Surushe"
      description="Insights and learnings from a full-stack software engineer"
      hashtags={['webdev', 'nodejs', 'react', 'programming']}
    />
  );
}

export function ProjectShareWidget({ slug }: { slug: string }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${baseUrl}/work/${slug}`;
  
  return (
    <SocialShare
      url={url}
      title="Check out this project by Aman Surushe"
      description="A showcase of full-stack development expertise"
      hashtags={['portfolio', 'webdev', 'project', 'fullstack']}
    />
  );
}