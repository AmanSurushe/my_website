import { Column, Heading, Text, Button, Flex, Icon } from "@once-ui-system/core";
import { AnimatedCard, FloatingAnimation, ScaleIn } from '@/components';
import Link from "next/link";

export default function NotFound() {
  return (
    <Column as="section" maxWidth="s" gap="xl" horizontal="center" paddingY="40">
      <AnimatedCard delay={0.2}>
        <Column fillWidth gap="m" horizontal="center">
          <FloatingAnimation>
            <ScaleIn delay={0.1}>
              <Icon name="warning" size="l" />
            </ScaleIn>
          </FloatingAnimation>
          
          <Column gap="12" horizontal="center">
            <AnimatedCard delay={0.4} direction="down">
              <Text marginBottom="s" variant="display-strong-xl">
                404
              </Text>
            </AnimatedCard>
            
            <AnimatedCard delay={0.6} direction="up">
              <Heading marginBottom="l" variant="display-default-xs">
                Page Not Found
              </Heading>
            </AnimatedCard>
            
            <AnimatedCard delay={0.8} direction="left">
              <Text onBackground="neutral-weak" style={{ textAlign: 'center' }}>
                The page you're looking for doesn't exist or has been moved.
              </Text>
            </AnimatedCard>
          </Column>

          <AnimatedCard delay={1.0} direction="up">
            <Flex gap="12" horizontal="center" paddingTop="16">
              <Link href="/">
                <Button variant="primary" size="m">
                  Go Home
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="m">
                  About Me
                </Button>
              </Link>
            </Flex>
          </AnimatedCard>
        </Column>
      </AnimatedCard>
    </Column>
  );
}