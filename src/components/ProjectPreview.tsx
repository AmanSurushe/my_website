'use client';

import { useState } from 'react';
import { Column, Heading, Text, Button, Flex, Badge } from '@once-ui-system/core';
import { AnimatedCard, FadeInWhenVisible } from '@/components';

interface ProjectDemo {
  id: string;
  title: string;
  description: string;
  type: 'iframe' | 'video' | 'images' | 'github';
  url: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
}

const projectDemos: ProjectDemo[] = [
  {
    id: 'whatsapp-campaign',
    title: 'WhatsApp Campaign Management System',
    description: 'A comprehensive system for managing WhatsApp marketing campaigns with real-time analytics and automated messaging.',
    type: 'github',
    url: 'https://github.com/AmanSurushe/whatsapp-campaign-system',
    technologies: ['Node.js', 'React', 'MongoDB', 'WhatsApp API', 'Socket.IO'],
    features: [
      'Bulk message sending',
      'Real-time delivery tracking',
      'Contact management',
      'Campaign analytics',
      'Message templates',
      'Automated responses'
    ],
    githubUrl: 'https://github.com/AmanSurushe/whatsapp-campaign-system',
  },
  {
    id: 'voice-platform',
    title: 'Real-time Voice Communication Platform',
    description: 'High-performance voice communication system with WebRTC integration and scalable architecture.',
    type: 'github',
    url: 'https://github.com/AmanSurushe/voice-communication-platform',
    technologies: ['WebRTC', 'Node.js', 'Socket.IO', 'React', 'Redis'],
    features: [
      'Real-time voice calls',
      'Conference calling',
      'Call recording',
      'User management',
      'Call history',
      'Quality monitoring'
    ],
    githubUrl: 'https://github.com/AmanSurushe/voice-communication-platform',
  },
  {
    id: 'campus-system',
    title: 'Campus Management System',
    description: 'Comprehensive educational management platform with student, faculty, and administrative modules.',
    type: 'github',
    url: 'https://github.com/AmanSurushe/campus-management-system',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js'],
    features: [
      'Student information system',
      'Faculty management',
      'Course scheduling',
      'Grade tracking',
      'Attendance system',
      'Report generation'
    ],
    githubUrl: 'https://github.com/AmanSurushe/campus-management-system',
  }
];

interface ProjectPreviewProps {
  maxDisplay?: number;
  showFilters?: boolean;
}

export function ProjectPreview({ maxDisplay = 3, showFilters = true }: ProjectPreviewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDemo | null>(null);

  const filters = ['all', 'node.js', 'react', 'webrtc', 'php'];
  
  const filteredProjects = projectDemos
    .filter(project => 
      selectedFilter === 'all' || 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    )
    .slice(0, maxDisplay);

  const renderProjectPreview = (project: ProjectDemo) => {
    switch (project.type) {
      case 'github':
        return (
          <Column gap="16">
            <Flex gap="12" wrap>
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  background="accent-alpha-weak"
                  onBackground="accent-strong"
                  paddingX="xs"
                  paddingY="xs"
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
            
            <Column gap="8">
              <Text variant="heading-strong-s">Key Features:</Text>
              <Column gap="4">
                {project.features.map((feature) => (
                  <Text key={feature} variant="body-default-s" onBackground="neutral-medium">
                    • {feature}
                  </Text>
                ))}
              </Column>
            </Column>

            <Flex gap="12">
              {project.githubUrl && (
                <Button
                  variant="secondary"
                  size="m"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  View on GitHub
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="primary"
                  size="m"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  Live Demo
                </Button>
              )}
            </Flex>
          </Column>
        );

      case 'iframe':
        return (
          <iframe
            src={project.url}
            width="100%"
            height="400"
            style={{ border: 'none', borderRadius: '8px' }}
            loading="lazy"
          />
        );

      case 'video':
        return (
          <video
            src={project.url}
            width="100%"
            height="400"
            controls
            style={{ borderRadius: '8px' }}
          />
        );

      case 'images':
        return (
          <Flex gap="8" wrap>
            {project.screenshots?.map((screenshot, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={screenshot}
                alt={`${project.title} screenshot ${index + 1}`}
                style={{
                  width: 'calc(50% - 4px)',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid var(--neutral-alpha-weak)',
                }}
              />
            ))}
          </Flex>
        );

      default:
        return null;
    }
  };

  if (selectedProject) {
    return (
      <FadeInWhenVisible>
        <Column maxWidth="l" gap="24">
          <Flex horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-m">
              {selectedProject.title}
            </Heading>
            <Button
              variant="secondary"
              size="s"
              onClick={() => setSelectedProject(null)}
            >
              ← Back to Projects
            </Button>
          </Flex>

          <Text variant="body-default-l" onBackground="neutral-medium">
            {selectedProject.description}
          </Text>

          {renderProjectPreview(selectedProject)}
        </Column>
      </FadeInWhenVisible>
    );
  }

  return (
    <Column fillWidth gap="24">
      <FadeInWhenVisible>
        <Column gap="12">
          <Heading as="h2" variant="display-strong-s" style={{ textAlign: "center" }}>
            Interactive Project Demos
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" style={{ textAlign: "center" }}>
            Explore my projects with detailed previews and technical insights
          </Text>
        </Column>
      </FadeInWhenVisible>

      {showFilters && (
        <FadeInWhenVisible delay={0.2}>
          <Flex style={{ textAlign: "center" }} gap="8" wrap>
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'primary' : 'secondary'}
                size="s"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter === 'all' ? 'All Projects' : filter.toUpperCase()}
              </Button>
            ))}
          </Flex>
        </FadeInWhenVisible>
      )}

      <Column gap="24">
        {filteredProjects.map((project, index) => (
          <AnimatedCard key={project.id} delay={index * 0.1}>
            <Column
              gap="20"
              padding="24"
              radius="m"
              border="neutral-alpha-weak"
              background="neutral-alpha-weak"
            >
              <Flex horizontal="between" vertical="start">
                <Column gap="8" style={{ flex: 1 }}>
                  <Heading as="h3" variant="heading-strong-m">
                    {project.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-medium">
                    {project.description}
                  </Text>
                </Column>
                
                <Button
                  variant="secondary"
                  size="s"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </Button>
              </Flex>

              <Flex gap="8" wrap>
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge
                    key={tech}
                    background="brand-alpha-weak"
                    onBackground="brand-strong"
                    paddingX="xs"
                    paddingY="xs"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge
                    background="neutral-alpha-weak"
                    onBackground="neutral-medium"
                    paddingX="xs"
                    paddingY="xs"
                  >
                    +{project.technologies.length - 4} more
                  </Badge>
                )}
              </Flex>

              <Flex gap="12">
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {project.features.length} key features
                </Text>
                {project.githubUrl && (
                  <Text variant="body-default-s" onBackground="accent-strong">
                    Open Source
                  </Text>
                )}
              </Flex>
            </Column>
          </AnimatedCard>
        ))}
      </Column>
    </Column>
  );
}