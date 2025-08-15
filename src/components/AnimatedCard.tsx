'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  className,
  hover = true,
  direction = 'up',
  duration = 0.5
}: AnimatedCardProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.55, 1.4],
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? 'hover' : undefined}
      {...(hover && { variants: { ...variants, ...hoverVariants } })}
    >
      {children}
    </motion.div>
  );
}

export function FadeInWhenVisible({ 
  children, 
  delay = 0,
  direction = 'up',
  className 
}: {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.4, 0.55, 1.4],
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  staggerChildren = 0.1,
  className 
}: {
  children: ReactNode;
  staggerChildren?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}