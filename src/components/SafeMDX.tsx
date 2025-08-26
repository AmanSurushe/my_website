'use client';

import React from 'react';
import { Text, Heading } from "@once-ui-system/core";

interface SafeMDXProps {
  source: string;
}

export function SafeMDX({ source }: SafeMDXProps) {
  try {
    // Simple markdown parser for basic content
    const lines = source.split('\n');
    const elements: React.ReactElement[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(
          <Heading key={index} as="h2" variant="heading-strong-l" marginTop="24" marginBottom="12">
            {line.replace('## ', '')}
          </Heading>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <Heading key={index} as="h1" variant="display-strong-s" marginTop="24" marginBottom="12">
            {line.replace('# ', '')}
          </Heading>
        );
      } else if (line.trim() && !line.startsWith('-') && !line.startsWith('*')) {
        elements.push(
          <Text key={index} variant="body-default-m" marginBottom="12" style={{ lineHeight: '1.6' }}>
            {line}
          </Text>
        );
      }
    });
    
    return <div>{elements}</div>;
  } catch (error) {
    console.error('SafeMDX rendering error:', error);
    return (
      <Text variant="body-default-m" onBackground="neutral-medium">
        Content could not be rendered. Please check back later.
      </Text>
    );
  }
}