'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SlideInFromBottom({ 
  children, 
  delay = 0,
  className 
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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

export function ScaleIn({ 
  children, 
  delay = 0,
  className 
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingAnimation({ 
  children, 
  className 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}