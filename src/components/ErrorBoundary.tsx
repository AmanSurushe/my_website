'use client';

import React from 'react';
import { Column, Heading, Text, Button, Flex, Icon } from '@once-ui-system/core';
import { AnimatedCard, ScaleIn } from '@/components';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <Column maxWidth="s" gap="xl" horizontal="center" paddingY="40">
      <AnimatedCard delay={0.2}>
        <Column fillWidth gap="m" horizontal="center">
          <ScaleIn delay={0.1}>
            <Icon name="warning" size="l" />
          </ScaleIn>
          
          <Column gap="12" horizontal="center">
            <AnimatedCard delay={0.4} direction="down">
              <Heading as="h1" variant="display-strong-l" horizontal="center">
                Something went wrong
              </Heading>
            </AnimatedCard>
            
            <AnimatedCard delay={0.6} direction="up">
              <Text onBackground="neutral-weak" horizontal="center">
                {error?.message || 'An unexpected error occurred. Please try again.'}
              </Text>
            </AnimatedCard>

            {process.env.NODE_ENV === 'development' && error?.stack && (
              <AnimatedCard delay={0.8} direction="left">
                <Column gap="8">
                  <Text variant="label-strong-s" onBackground="danger-strong">
                    Stack Trace (Development):
                  </Text>
                  <Text 
                    variant="body-default-xs" 
                    onBackground="neutral-medium"
                    style={{ 
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      maxWidth: '600px',
                      overflow: 'auto',
                      backgroundColor: 'var(--neutral-alpha-weak)',
                      padding: '12px',
                      borderRadius: '8px',
                    }}
                  >
                    {error.stack}
                  </Text>
                </Column>
              </AnimatedCard>
            )}
          </Column>

          <AnimatedCard delay={1.0} direction="up">
            <Flex gap="12" horizontal="center" paddingTop="16">
              <Button variant="primary" size="m" onClick={resetError}>
                Try Again
              </Button>
              <Button 
                variant="secondary" 
                size="m" 
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </Flex>
          </AnimatedCard>
        </Column>
      </AnimatedCard>
    </Column>
  );
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by hook:', error, errorInfo);
    // You could also send error to a logging service here
  };
}

export { ErrorBoundary, DefaultErrorFallback };