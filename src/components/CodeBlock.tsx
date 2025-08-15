'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button, Flex, Text } from '@once-ui-system/core';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  maxHeight?: string;
  className?: string;
}

export function CodeBlock({
  children,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  maxHeight = '400px',
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const customStyle = {
    margin: 0,
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.5',
    maxHeight,
    overflow: 'auto',
    background: isDark ? '#1e1e1e' : '#f8f9fa',
  };

  const getLineProps = (lineNumber: number) => {
    const style: any = {};
    if (highlightLines.includes(lineNumber)) {
      style.backgroundColor = isDark ? '#2d3748' : '#fef5e7';
      style.display = 'block';
      style.margin = '0 -1em';
      style.padding = '0 1em';
      style.borderLeft = `3px solid ${isDark ? '#4ade80' : '#f59e0b'}`;
    }
    return { style };
  };

  return (
    <div className={className}>
      {/* Header */}
      <Flex
        horizontal="between"
        vertical="center"
        paddingX="16"
        paddingY="xs"
        background="neutral-alpha-weak"
        style={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid var(--neutral-alpha-medium)',
        }}
      >
        <Flex gap="8" vertical="center">
          {filename && (
            <Text variant="label-default-s" onBackground="neutral-medium">
              {filename}
            </Text>
          )}
          <Text variant="label-default-xs" onBackground="neutral-weak">
            {language}
          </Text>
        </Flex>
        
        <Flex gap="8">
          <Button
            variant="secondary"
            size="s"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </Button>
          <Button
            variant="secondary"
            size="s"
            onClick={copyToClipboard}
            aria-label="Copy code"
          >
            {copied ? '✅' : '📋'}
          </Button>
        </Flex>
      </Flex>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        showLineNumbers={showLineNumbers}
        customStyle={customStyle}
        lineProps={getLineProps}
        wrapLines={highlightLines.length > 0}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

export function InlineCode({ children, className }: { children: string; className?: string }) {
  return (
    <code
      className={className}
      style={{
        backgroundColor: 'var(--neutral-alpha-weak)',
        color: 'var(--accent-strong)',
        padding: '2px 4px',
        borderRadius: '4px',
        fontSize: '0.875em',
        fontFamily: 'var(--font-code)',
      }}
    >
      {children}
    </code>
  );
}