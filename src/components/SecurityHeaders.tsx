'use client';

import { useEffect, useState } from 'react';
import { Column, Text, Badge, Flex, Button } from '@once-ui-system/core';
import { AnimatedCard } from '@/components';

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};

interface SecurityCheck {
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  details: string;
}

interface CSPReport {
  directive: string;
  blockedURI: string;
  violatedDirective: string;
  originalPolicy: string;
}

export function SecurityDashboard() {
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);
  const [cspReports, setCspReports] = useState<CSPReport[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const runSecurityChecks = () => {
      const checks: SecurityCheck[] = [];

      // Check HTTPS
      checks.push({
        name: 'HTTPS',
        description: 'Page served over secure connection',
        status: window.location.protocol === 'https:' ? 'pass' : 'fail',
        details: `Protocol: ${window.location.protocol}`,
      });

      // Check Mixed Content
      const hasHTTPResources = Array.from(document.querySelectorAll('img, script, link'))
        .some(el => {
          const src = el.getAttribute('src') || el.getAttribute('href') || '';
          return src.startsWith('http://');
        });

      checks.push({
        name: 'Mixed Content',
        description: 'No insecure HTTP resources on HTTPS page',
        status: hasHTTPResources ? 'fail' : 'pass',
        details: hasHTTPResources ? 'HTTP resources detected' : 'All resources secure',
      });

      // Check Content Security Policy
      const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      checks.push({
        name: 'Content Security Policy',
        description: 'CSP header or meta tag present',
        status: metaCSP ? 'pass' : 'warning',
        details: metaCSP ? 'CSP meta tag found' : 'No CSP meta tag detected',
      });

      // Check X-Frame-Options equivalent
      const allowsFraming = !document.querySelector('meta[http-equiv="X-Frame-Options"]');
      checks.push({
        name: 'Clickjacking Protection',
        description: 'Protection against iframe embedding',
        status: allowsFraming ? 'warning' : 'pass',
        details: allowsFraming ? 'No X-Frame-Options detected' : 'Clickjacking protection active',
      });

      // Check for sensitive data exposure
      const hasPasswordFields = document.querySelectorAll('input[type="password"]').length > 0;
      const isSecureForm = hasPasswordFields ? window.location.protocol === 'https:' : true;
      
      if (hasPasswordFields) {
        checks.push({
          name: 'Form Security',
          description: 'Password fields served over HTTPS',
          status: isSecureForm ? 'pass' : 'fail',
          details: isSecureForm ? 'Password forms secure' : 'Password forms over HTTP',
        });
      }

      // Check for console warnings/errors
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      let hasSecurityWarnings = false;

      console.error = (...args) => {
        const message = args.join(' ').toLowerCase();
        if (message.includes('security') || message.includes('csp') || message.includes('mixed')) {
          hasSecurityWarnings = true;
        }
        originalConsoleError.apply(console, args);
      };

      console.warn = (...args) => {
        const message = args.join(' ').toLowerCase();
        if (message.includes('security') || message.includes('csp') || message.includes('mixed')) {
          hasSecurityWarnings = true;
        }
        originalConsoleWarn.apply(console, args);
      };

      setTimeout(() => {
        checks.push({
          name: 'Console Security Warnings',
          description: 'No security-related console warnings',
          status: hasSecurityWarnings ? 'warning' : 'pass',
          details: hasSecurityWarnings ? 'Security warnings detected in console' : 'No security warnings',
        });

        setSecurityChecks(checks);
      }, 1000);
    };

    runSecurityChecks();

    // Listen for CSP violation reports
    document.addEventListener('securitypolicyviolation', (event) => {
      const report: CSPReport = {
        directive: event.violatedDirective,
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
      };
      
      setCspReports(prev => [...prev.slice(-4), report]); // Keep last 5 reports
    });
  }, []);

  const getStatusColor = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'pass': return 'accent';
      case 'warning': return 'warning';
      case 'fail': return 'danger';
      default: return 'neutral';
    }
  };

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'pass': return '✅';
      case 'warning': return '⚠️';
      case 'fail': return '❌';
      default: return '❓';
    }
  };

  if (process.env.NODE_ENV === 'production' || isMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        maxWidth: '350px',
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
        🛡️ Security {isVisible ? '▼' : '▲'}
      </Button>

      {isVisible && (
        <AnimatedCard>
          <Column
            gap="16"
            padding="16"
            background="neutral-on-background-weak"
            radius="m"
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--neutral-alpha-medium)',
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            <Text variant="heading-strong-s">Security Dashboard</Text>

            {/* Security Checks */}
            <Column gap="12">
              <Text variant="label-strong-xs">Security Checks</Text>
              
              {securityChecks.map((check, index) => (
                <Column key={index} gap="4">
                  <Flex horizontal="between" vertical="center">
                    <Flex gap="8" vertical="center">
                      <span>{getStatusIcon(check.status)}</span>
                      <Text variant="body-default-xs">{check.name}</Text>
                    </Flex>
                    <Badge
                      background={`${getStatusColor(check.status)}-alpha-weak`}
                      onBackground={`${getStatusColor(check.status)}-strong`}
                      paddingX="6"
                      paddingY="2"
                    >
                      {check.status.toUpperCase()}
                    </Badge>
                  </Flex>
                  
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {check.description}
                  </Text>
                  
                  <Text variant="label-default-xs" onBackground="neutral-medium">
                    {check.details}
                  </Text>
                </Column>
              ))}
            </Column>

            {/* CSP Violation Reports */}
            {cspReports.length > 0 && (
              <Column gap="12">
                <Text variant="label-strong-xs">CSP Violations ({cspReports.length})</Text>
                
                {cspReports.slice(-3).map((report, index) => (
                  <Column key={index} gap="4">
                    <Flex horizontal="between" vertical="center">
                      <Text variant="body-default-xs">Blocked Resource</Text>
                      <Badge
                        background="danger-alpha-weak"
                        onBackground="danger-strong"
                        paddingX="6"
                        paddingY="2"
                      >
                        VIOLATION
                      </Badge>
                    </Flex>
                    
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Directive: {report.violatedDirective}
                    </Text>
                    
                    <Text 
                      variant="label-default-xs" 
                      onBackground="neutral-medium"
                      style={{ 
                        wordBreak: 'break-all',
                        fontSize: '10px',
                      }}
                    >
                      URI: {report.blockedURI}
                    </Text>
                  </Column>
                ))}
              </Column>
            )}

            {/* Security Score */}
            <Column gap="8">
              <Text variant="label-strong-xs">Security Score</Text>
              
              {securityChecks.length > 0 && (
                <Flex horizontal="between" vertical="center">
                  <Text variant="body-default-xs">Overall Score</Text>
                  <Badge
                    background={`${getOverallScore()}-alpha-weak`}
                    onBackground={`${getOverallScore()}-strong`}
                    paddingX="8"
                    paddingY="4"
                  >
                    {Math.round((securityChecks.filter(c => c.status === 'pass').length / securityChecks.length) * 100)}%
                  </Badge>
                </Flex>
              )}
            </Column>

            {/* Security Tips */}
            <Column gap="8">
              <Text variant="label-strong-xs">Security Tips</Text>
              
              <Text variant="body-default-xs" onBackground="neutral-weak">
                • Always use HTTPS in production
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                • Implement Content Security Policy
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                • Validate all user inputs
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                • Keep dependencies updated
              </Text>
            </Column>
          </Column>
        </AnimatedCard>
      )}
    </div>
  );

  function getOverallScore() {
    if (securityChecks.length === 0) return 'neutral';
    
    const passCount = securityChecks.filter(c => c.status === 'pass').length;
    const percentage = passCount / securityChecks.length;
    
    if (percentage >= 0.8) return 'accent';
    if (percentage >= 0.6) return 'warning';
    return 'danger';
  }
}