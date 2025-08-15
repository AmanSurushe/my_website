import { Flex, Grid } from "@once-ui-system/core";

interface LoadingSkeletonProps {
  count?: number;
  variant?: 'card' | 'line' | 'text';
}

export function LoadingSkeleton({ count = 6, variant = 'card' }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <Grid columns="3" gap="16" fillWidth>
        {skeletons.map((index) => (
          <Flex
            key={index}
            direction="column"
            fillWidth
            padding="16"
            gap="12"
            radius="l"
            style={{
              backgroundColor: 'var(--neutral-alpha-weak)',
              animation: 'pulse 1.5s ease-in-out infinite',
              minHeight: '200px'
            }}
          >
            <div
              style={{
                height: '20px',
                backgroundColor: 'var(--neutral-alpha-medium)',
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.1s'
              }}
            />
            <div
              style={{
                height: '14px',
                backgroundColor: 'var(--neutral-alpha-medium)',
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.2s',
                width: '80%'
              }}
            />
            <div
              style={{
                height: '12px',
                backgroundColor: 'var(--neutral-alpha-medium)',
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.3s',
                width: '60%'
              }}
            />
            <Flex gap="4" paddingTop="8">
              <div
                style={{
                  height: '10px',
                  width: '40px',
                  backgroundColor: 'var(--neutral-alpha-medium)',
                  borderRadius: '4px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: '0.4s'
                }}
              />
              <div
                style={{
                  height: '10px',
                  width: '30px',
                  backgroundColor: 'var(--neutral-alpha-medium)',
                  borderRadius: '4px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              />
            </Flex>
          </Flex>
        ))}
      </Grid>
    );
  }

  if (variant === 'line') {
    return (
      <Flex direction="column" gap="8" fillWidth>
        {skeletons.map((index) => (
          <div
            key={index}
            style={{
              height: '12px',
              backgroundColor: 'var(--neutral-alpha-weak)',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="4" fillWidth>
      {skeletons.map((index) => (
        <div
          key={index}
          style={{
            height: '14px',
            backgroundColor: 'var(--neutral-alpha-weak)',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: `${index * 0.1}s`,
            width: `${Math.random() * 40 + 60}%`
          }}
        />
      ))}
    </Flex>
  );
}