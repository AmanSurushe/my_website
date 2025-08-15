import { Flex, Text, Tag, Icon, SmartLink } from "@once-ui-system/core";
import { GitHubRepository, getRepositoryLanguageColor } from "@/utils/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const languageColor = getRepositoryLanguageColor(repository.language);
  const updatedDate = new Date(repository.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <SmartLink href={repository.html_url} style={{ textDecoration: 'none' }}>
      <Flex
        direction="column"
        fillWidth
        padding="16"
        gap="12"
        border="neutral-alpha-weak"
        borderStyle="solid"
        radius="l"
        background="page"
        style={{
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
      >
        {/* Repository Name and Fork Badge */}
        <Flex horizontal="between" vertical="start" fillWidth>
          <Text variant="heading-strong-s" onBackground="neutral-strong">
            {repository.name}
          </Text>
          {repository.fork && (
            <Tag size="s" variant="neutral">
              <Icon name="branch" size="xs" />
              Fork
            </Tag>
          )}
        </Flex>

        {/* Description */}
        {repository.description && (
          <Text 
            variant="body-default-s" 
            onBackground="neutral-medium"
            style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {repository.description}
          </Text>
        )}

        {/* Topics */}
        {repository.topics && repository.topics.length > 0 && (
          <Flex gap="4" wrap>
            {repository.topics.slice(0, 3).map((topic, index) => (
              <Tag key={index} size="s" variant="neutral">
                {topic}
              </Tag>
            ))}
            {repository.topics.length > 3 && (
              <Text variant="label-default-xs" onBackground="neutral-weak">
                +{repository.topics.length - 3} more
              </Text>
            )}
          </Flex>
        )}

        {/* Stats and Language */}
        <Flex horizontal="between" vertical="center" fillWidth>
          <Flex gap="12" vertical="center">
            {repository.language && (
              <Flex gap="4" vertical="center">
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: languageColor
                  }}
                />
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  {repository.language}
                </Text>
              </Flex>
            )}
            
            {repository.stargazers_count > 0 && (
              <Flex gap="4" vertical="center">
                <Icon name="star" size="xs" />
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  {repository.stargazers_count}
                </Text>
              </Flex>
            )}
            
            {repository.forks_count > 0 && (
              <Flex gap="4" vertical="center">
                <Icon name="branch" size="xs" />
                <Text variant="label-default-xs" onBackground="neutral-medium">
                  {repository.forks_count}
                </Text>
              </Flex>
            )}
          </Flex>

          <Text variant="label-default-xs" onBackground="neutral-weak">
            Updated {updatedDate}
          </Text>
        </Flex>

        {/* Homepage Link */}
        {repository.homepage && (
          <Flex gap="4" vertical="center">
            <Icon name="openLink" size="xs" />
            <SmartLink 
              href={repository.homepage}
              style={{ fontSize: '12px' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Text variant="label-default-xs" onBackground="brand-medium">
                View Live
              </Text>
            </SmartLink>
          </Flex>
        )}
      </Flex>
    </SmartLink>
  );
}