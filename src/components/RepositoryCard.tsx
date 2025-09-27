'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Flex, Text, Tag, Icon, SmartLink } from "@once-ui-system/core";
import { GitHubRepository, getRepositoryLanguageColor } from "@/utils/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const languageColor = getRepositoryLanguageColor(repository.language);
  const updatedDate = new Date(repository.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      style={{
        rotateY: isMobile ? 0 : rotateY,
        rotateX: isMobile ? 0 : rotateX,
        transformStyle: isMobile ? "flat" : "preserve-3d",
      }}
      whileHover={isMobile ? {} : { 
        z: 50,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="repository-card"
    >
      <motion.div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        <SmartLink href={repository.html_url} style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            style={{
              transform: "translateZ(20px)",
            }}
          >
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
                cursor: 'pointer',
                boxShadow: 'var(--shadow-medium)',
                backdropFilter: 'blur(10px)',
              }}
              className="repository-card-content"
            >
              {/* Repository Name and Fork Badge */}
              <Flex horizontal="between" vertical="start" fillWidth>
                <motion.div
                  style={{ transform: "translateZ(30px)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Text variant="heading-strong-s" onBackground="neutral-strong" className="repo-name">
                    {repository.name}
                  </Text>
                </motion.div>
                {repository.fork && (
                  <motion.div
                    style={{ transform: "translateZ(25px)" }}
                    whileHover={{ rotate: 5 }}
                  >
                    <Tag size="s" variant="neutral">
                      <Icon name="branch" size="xs" />
                      Fork
                    </Tag>
                  </motion.div>
                )}
              </Flex>

              {/* Description */}
              {repository.description && (
                <motion.div
                  style={{ transform: "translateZ(15px)" }}
                  whileHover={{ y: -2 }}
                >
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
                </motion.div>
              )}

              {/* Topics */}
              {repository.topics && repository.topics.length > 0 && (
                <motion.div
                  style={{ transform: "translateZ(20px)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Flex gap="4" wrap className="repo-topics">
                    {repository.topics.slice(0, 3).map((topic, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: Math.random() * 10 - 5,
                          transition: { duration: 0.2 }
                        }}
                        style={{ transform: `translateZ(${10 + index * 5}px)` }}
                      >
                        <Tag size="s" variant="neutral">
                          {topic}
                        </Tag>
                      </motion.div>
                    ))}
                    {repository.topics.length > 3 && (
                      <motion.div
                        style={{ transform: "translateZ(25px)" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Text variant="label-default-xs" onBackground="neutral-weak">
                          +{repository.topics.length - 3} more
                        </Text>
                      </motion.div>
                    )}
                  </Flex>
                </motion.div>
              )}

              {/* Stats and Language */}
              <motion.div
                style={{ transform: "translateZ(10px)" }}
                whileHover={{ y: -3 }}
              >
                <Flex horizontal="between" vertical="center" fillWidth className="repo-stats" wrap>
                  <Flex gap="8" vertical="center" wrap>
                    {repository.language && (
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Flex gap="4" vertical="center">
                          <motion.div
                            className="repo-language-dot"
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: languageColor,
                              transform: "translateZ(5px)"
                            }}
                            whileHover={{ 
                              scale: 1.5,
                              boxShadow: `0 0 10px ${languageColor}`
                            }}
                          />
                          <Text variant="label-default-xs" onBackground="neutral-medium">
                            {repository.language}
                          </Text>
                        </Flex>
                      </motion.div>
                    )}
                    
                    {repository.stargazers_count > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        style={{ transform: "translateZ(5px)" }}
                      >
                        <Flex gap="4" vertical="center">
                          <motion.div whileHover={{ rotate: 72 }}>
                            <Icon name="star" size="xs" />
                          </motion.div>
                          <Text variant="label-default-xs" onBackground="neutral-medium">
                            {repository.stargazers_count}
                          </Text>
                        </Flex>
                      </motion.div>
                    )}
                    
                    {repository.forks_count > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        style={{ transform: "translateZ(5px)" }}
                      >
                        <Flex gap="4" vertical="center">
                          <motion.div whileHover={{ rotate: -15 }}>
                            <Icon name="branch" size="xs" />
                          </motion.div>
                          <Text variant="label-default-xs" onBackground="neutral-medium">
                            {repository.forks_count}
                          </Text>
                        </Flex>
                      </motion.div>
                    )}
                  </Flex>

                  <motion.div
                    style={{ transform: "translateZ(5px)" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Updated {updatedDate}
                    </Text>
                  </motion.div>
                </Flex>
              </motion.div>

              {/* Homepage Link */}
              {repository.homepage && (
                <motion.div
                  style={{ transform: "translateZ(30px)" }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Flex gap="4" vertical="center">
                    <motion.div
                      whileHover={{ 
                        rotate: 45,
                        scale: 1.2
                      }}
                    >
                      <Icon name="openLink" size="xs" />
                    </motion.div>
                    <Text 
                      variant="label-default-xs" 
                      onBackground="brand-medium"
                      className="view-live-link"
                      style={{ 
                        fontSize: '12px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (repository.homepage) {
                          window.open(repository.homepage, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      View Live
                    </Text>
                  </Flex>
                </motion.div>
              )}
            </Flex>
          </motion.div>
        </SmartLink>
      </motion.div>

      <style jsx>{`
        /* Global mobile optimizations */
        * {
          box-sizing: border-box;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .repository-card {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .repository-card-content {
          transform-style: preserve-3d;
          will-change: transform;
          position: relative;
          overflow: hidden;
        }
        
        /* Light mode overlay */
        .repository-card-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
          border-radius: inherit;
          z-index: -1;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        
        /* Dark mode styles */
        :global([data-theme="dark"]) .repository-card-content::before {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          opacity: 0.6;
        }
        
        /* Hover effects for light mode */
        .repository-card-content:hover::before {
          opacity: 1;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.2) 100%
          );
        }
        
        /* Hover effects for dark mode */
        :global([data-theme="dark"]) .repository-card-content:hover::before {
          opacity: 0.8;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.04) 100%
          );
        }
        
        /* Additional shimmer effect on hover */
        .repository-card-content::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
          pointer-events: none;
          border-radius: inherit;
        }
        
        :global([data-theme="dark"]) .repository-card-content::after {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
        }
        
        .repository-card-content:hover::after {
          left: 100%;
        }
        
        /* Mobile responsive improvements */
        @media (max-width: 768px) {
          .repo-stats {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 8px;
            max-width: 100%;
            overflow-x: hidden;
          }
          
          .repo-topics {
            justify-content: flex-start;
            max-width: 100%;
            overflow-x: hidden;
          }
          
          .repo-name {
            font-size: 1rem;
            line-height: 1.4;
            word-break: break-word;
            max-width: 100%;
          }
          
          /* Disable 3D effects on mobile to prevent overflow */
          .repository-card {
            transform-style: flat !important;
            max-width: 100%;
            overflow: hidden;
            contain: layout style paint;
          }
          
          .repository-card-content {
            transform: none !important;
            will-change: auto !important;
          }
        }
        
        @media (max-width: 480px) {
          .repository-card-content {
            padding: 12px;
            max-width: 100%;
            overflow-x: hidden;
            transform: none !important;
          }
          
          .repository-card {
            max-width: 100%;
            overflow-x: hidden;
            transform-style: flat !important;
            contain: layout style paint;
          }
          
          /* Disable all motion transforms on very small screens */
          .repository-card * {
            transform: none !important;
            will-change: auto !important;
          }
        }
      `}</style>
    </motion.div>
  );
}