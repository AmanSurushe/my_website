'use client';

import { useState } from 'react';
import { Column, Heading, Text, Flex, Avatar, Button } from '@once-ui-system/core';
import { FadeInWhenVisible, AnimatedCard, StaggerContainer } from '@/components';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  project?: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Project Manager',
    company: 'St. Vincent Pallotti College',
    content: 'Aman developed our campus management system with exceptional attention to detail. His technical expertise and problem-solving skills made the entire process smooth. The system handles student records, faculty management, and administrative tasks efficiently.',
    rating: 5,
    project: 'Campus Management System',
    date: '2024-03'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: 'Technical Lead',
    company: 'Oxybills Services',
    content: 'Working with Aman was a great experience. He delivered a robust WhatsApp campaign management system that significantly improved our client communication workflows. His code quality and documentation were outstanding.',
    rating: 5,
    project: 'WhatsApp Campaign System',
    date: '2024-01'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'Business Analyst',
    company: 'Pinnacle Teleservices',
    content: 'Aman built our real-time voice communication platform that handles high-volume concurrent calls. His understanding of scalable architecture and performance optimization was impressive. Highly recommended for complex projects.',
    rating: 5,
    project: 'Voice Communication Platform',
    date: '2023-11'
  },
  {
    id: '4',
    name: 'Ankit Verma',
    role: 'DevOps Engineer',
    company: 'TechFlow Solutions',
    content: 'Aman\'s full-stack development skills are remarkable. He seamlessly integrated our frontend and backend systems, and his knowledge of modern tech stacks like React and Node.js is solid. Great team player too.',
    rating: 5,
    date: '2024-02'
  }
];

interface TestimonialsProps {
  maxDisplay?: number;
  showPagination?: boolean;
}

export function Testimonials({ maxDisplay = 3, showPagination = true }: TestimonialsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = Math.ceil(testimonials.length / maxDisplay);
  const startIndex = currentPage * maxDisplay;
  const displayedTestimonials = testimonials.slice(startIndex, startIndex + maxDisplay);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#e5e5e5' }}>★</span>
    ));
  };

  return (
    <Column fillWidth gap="24">
      <FadeInWhenVisible>
        <Column gap="8">
          <Heading as="h2" variant="display-strong-s" style={{ textAlign: "center" }}>
            Client Testimonials
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" style={{ textAlign: "center" }}>
            What colleagues and clients say about working with me
          </Text>
        </Column>
      </FadeInWhenVisible>

      <StaggerContainer staggerChildren={0.2}>
        <Flex direction="column" gap="16">
          {displayedTestimonials.map((testimonial, index) => (
            <AnimatedCard key={testimonial.id} delay={index * 0.1}>
              <Flex
                padding="24"
                radius="m"
                border="neutral-alpha-weak"
                background="neutral-alpha-weak"
                direction="column"
                gap="16"
                style={{
                  transition: 'all 0.3s ease',
                }}
              >
                <Flex horizontal="between" vertical="start" gap="16">
                  <Flex gap="12" vertical="center">
                    <Avatar
                      src={testimonial.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.name}`}
                      size="m"
                    />
                    <Column gap="2">
                      <Text variant="body-strong-m">{testimonial.name}</Text>
                      <Text variant="body-default-s" onBackground="neutral-medium">
                        {testimonial.role} at {testimonial.company}
                      </Text>
                      {testimonial.project && (
                        <Text variant="label-default-xs" onBackground="accent-strong">
                          Project: {testimonial.project}
                        </Text>
                      )}
                    </Column>
                  </Flex>
                  <Column gap="4" horizontal="end">
                    <Flex gap="2">
                      {renderStars(testimonial.rating)}
                    </Flex>
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      {new Date(testimonial.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </Text>
                  </Column>
                </Flex>
                
                <Text variant="body-default-m" onBackground="neutral-medium">
                  "{testimonial.content}"
                </Text>
              </Flex>
            </AnimatedCard>
          ))}
        </Flex>
      </StaggerContainer>

      {showPagination && totalPages > 1 && (
        <FadeInWhenVisible delay={0.4}>
          <Flex style={{ textAlign: "center" }} gap="8" paddingTop="16">
            <Button
              variant="secondary"
              size="s"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            >
              Previous
            </Button>
            
            <Flex gap="4" vertical="center">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={i === currentPage ? "primary" : "secondary"}
                  size="s"
                  onClick={() => setCurrentPage(i)}
                  style={{ minWidth: '32px' }}
                >
                  {i + 1}
                </Button>
              ))}
            </Flex>

            <Button
              variant="secondary"
              size="s"
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            >
              Next
            </Button>
          </Flex>
        </FadeInWhenVisible>
      )}
    </Column>
  );
}