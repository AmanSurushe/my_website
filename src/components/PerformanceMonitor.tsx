'use client';

import { useEffect, useState } from 'react';
import { Column, Text, Badge, Flex, Button } from '@once-ui-system/core';
import { AnimatedCard } from '@/components';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  ttfb: number; // Time to First Byte
  loadTime: number;
  domNodes: number;
  memoryUsed: number;
}

interface ConnectionInfo {
  effectiveType: string;
  rtt: number;
  downlink: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [connection, setConnection] = useState<ConnectionInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window === 'undefined') return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      // Get Web Vitals
      let fcp = 0;
      let lcp = 0;
      let cls = 0;
      let fid = 0;

      // First Contentful Paint
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) fcp = fcpEntry.startTime;

      // Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        lcp = lastEntry.startTime;
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Connection info
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        setConnection({
          effectiveType: conn.effectiveType || 'unknown',
          rtt: conn.rtt || 0,
          downlink: conn.downlink || 0,
        });
      }

      // Memory usage
      const memory = (performance as any).memory;
      const memoryUsed = memory ? memory.usedJSHeapSize / (1024 * 1024) : 0;

      setMetrics({
        fcp,
        lcp,
        cls,
        fid,
        ttfb: navigation.responseStart - navigation.requestStart,
        loadTime: navigation.loadEventEnd - navigation.navigationStart,
        domNodes: document.querySelectorAll('*').length,
        memoryUsed,
      });
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 600, poor: 1500 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'neutral';

    if (value <= threshold.good) return 'accent';
    if (value <= threshold.poor) return 'warning';
    return 'danger';
  };

  const formatMetric = (value: number, unit: string) => {
    if (unit === 'ms') return `${Math.round(value)}ms`;
    if (unit === 'MB') return `${value.toFixed(1)}MB`;
    if (unit === 'Mbps') return `${value.toFixed(1)}Mbps`;
    return value.toString();
  };

  if (!metrics || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        maxWidth: '300px',
      }}
    >
      <Button
        variant="ghost"
        size="s"
        onClick={() => setIsVisible(!isVisible)}
        style={{
          marginBottom: '8px',
          backgroundColor: 'var(--neutral-alpha-weak)',
          backdropFilter: 'blur(10px)',
        }}
      >
        📊 Performance {isVisible ? '▼' : '▲'}
      </Button>

      {isVisible && (
        <AnimatedCard>
          <Column
            gap="12"
            padding="16"
            background="neutral-on-background-weak"
            radius="m"
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--neutral-alpha-medium)',
            }}
          >
            <Text variant="heading-strong-s">Performance Metrics</Text>

            {/* Core Web Vitals */}
            <Column gap="8">
              <Text variant="label-strong-xs">Core Web Vitals</Text>
              
              <Flex horizontal="between" vertical="center">
                <Text variant="body-default-xs">FCP</Text>
                <Badge
                  background={`${getScoreColor('fcp', metrics.fcp)}-alpha-weak`}
                  onBackground={`${getScoreColor('fcp', metrics.fcp)}-strong`}
                  paddingX="6"
                  paddingY="2"
                >
                  {formatMetric(metrics.fcp, 'ms')}
                </Badge>
              </Flex>

              <Flex horizontal="between" vertical="center">
                <Text variant="body-default-xs">LCP</Text>
                <Badge
                  background={`${getScoreColor('lcp', metrics.lcp)}-alpha-weak`}
                  onBackground={`${getScoreColor('lcp', metrics.lcp)}-strong`}
                  paddingX="6"
                  paddingY="2"
                >
                  {formatMetric(metrics.lcp, 'ms')}
                </Badge>
              </Flex>

              <Flex horizontal="between" vertical="center">
                <Text variant="body-default-xs">TTFB</Text>
                <Badge
                  background={`${getScoreColor('ttfb', metrics.ttfb)}-alpha-weak`}
                  onBackground={`${getScoreColor('ttfb', metrics.ttfb)}-strong`}
                  paddingX="6"
                  paddingY="2"
                >
                  {formatMetric(metrics.ttfb, 'ms')}
                </Badge>
              </Flex>
            </Column>

            {/* Resource Usage */}
            <Column gap="8">
              <Text variant="label-strong-xs">Resource Usage</Text>
              
              <Flex horizontal="between" vertical="center">
                <Text variant="body-default-xs">Load Time</Text>
                <Text variant="label-default-xs">
                  {formatMetric(metrics.loadTime, 'ms')}
                </Text>
              </Flex>

              <Flex horizontal="between" vertical="center">
                <Text variant="body-default-xs">DOM Nodes</Text>
                <Text variant="label-default-xs">
                  {metrics.domNodes}
                </Text>
              </Flex>

              <Flex horizontal="between" vertical="center">
                <Text variant="body-default-xs">Memory</Text>
                <Text variant="label-default-xs">
                  {formatMetric(metrics.memoryUsed, 'MB')}
                </Text>
              </Flex>
            </Column>

            {/* Connection Info */}
            {connection && (
              <Column gap="8">
                <Text variant="label-strong-xs">Connection</Text>
                
                <Flex horizontal="between" vertical="center">
                  <Text variant="body-default-xs">Type</Text>
                  <Text variant="label-default-xs">
                    {connection.effectiveType.toUpperCase()}
                  </Text>
                </Flex>

                <Flex horizontal="between" vertical="center">
                  <Text variant="body-default-xs">RTT</Text>
                  <Text variant="label-default-xs">
                    {connection.rtt}ms
                  </Text>
                </Flex>

                <Flex horizontal="between" vertical="center">
                  <Text variant="body-default-xs">Downlink</Text>
                  <Text variant="label-default-xs">
                    {formatMetric(connection.downlink, 'Mbps')}
                  </Text>
                </Flex>
              </Column>
            )}
          </Column>
        </AnimatedCard>
      )}
    </div>
  );
}