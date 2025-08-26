'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface IOSPointerProps {
  children: React.ReactNode;
}

export function IOSPointer({ children }: IOSPointerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorWidth = useMotionValue(15);
  const cursorHeight = useMotionValue(15);
  
  const cursorWidthSpring = useSpring(cursorWidth, { damping: 15, stiffness: 250 });
  const cursorHeightSpring = useSpring(cursorHeight, { damping: 15, stiffness: 250 });

  useEffect(() => {
    // Detect initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    const updateCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Get the element under the cursor
      const target = e.target as HTMLElement;
      
      // Check if we should resize to target element
      const shouldResize = isInteractiveElement(target);
      
      if (shouldResize && target) {
        const rect = target.getBoundingClientRect();
        setTargetElement(target);
        setIsHovering(true);
        
        // Resize cursor to match target element
        cursorWidth.set(rect.width);
        cursorHeight.set(rect.height);
        
        // Position cursor at element's top-left corner
        cursorX.set(rect.left);
        cursorY.set(rect.top);
      } else {
        setTargetElement(null);
        setIsHovering(false);
        
        // Reset to small dot
        cursorWidth.set(17);
        cursorHeight.set(17);
        
        // Center the small dot on mouse position
        cursorX.set(e.clientX - 8.5);
        cursorY.set(e.clientY - 8.5);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setTargetElement(null);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, cursorWidth, cursorHeight, isVisible]);

  const isInteractiveElement = (element: HTMLElement): boolean => {
    if (!element) return false;
    
    const tagName = element.tagName.toLowerCase();
    const isButton = tagName === 'button' || element.role === 'button' || element.classList.contains('btn');
    // const isLink = !!(tagName === 'a' || element.closest('a'));
    // const isInput = ['input', 'textarea', 'select'].includes(tagName) || element.contentEditable === 'true';
    // const isCard = !!(element.classList.contains('repository-card-content') || 
    //                  element.closest('.repository-card') || 
    //                  element.classList.contains('project-card') || 
    //                  element.closest('.card'));
    // const isIcon = !!(tagName === 'svg' || element.closest('svg') || element.classList.contains('icon'));
    // const hasClickHandler = !!(element.onclick || element.getAttribute('onclick'));
    
    return isButton;
  };

  return (
    <>
      {children}
      
      <motion.div
        data-motion-cursor="pointer"
        data-framer-portal-id="motion-cursor"
        className="cursor"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorWidthSpring,
          height: cursorHeightSpring,
          zIndex: 99999,
          willChange: 'transform, width, height',
          contain: 'layout',
          mixBlendMode: isDarkMode ? 'normal' : 'multiply',
          top: 0,
          left: 0,
          position: 'fixed',
          pointerEvents: 'none',
          transformOrigin: '0 0 0px',
          borderRadius: isHovering ? '8px' : '10px',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.2 }
        }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .cursor {
          transition: background-color 0.2s ease;
          /* Light theme - using site's neutral color system */
          background-color: ${isHovering ? 'var(--neutral-alpha-medium)' : 'var(--neutral-on-background-strong)'};
        }
        
        /* Dark theme - transparent whitish cursor */
        [data-theme="dark"] .cursor {
          background-color: ${isHovering ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)'} !important;
        }
        
        /* Hide default cursor on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .cursor {
            display: none;
          }
          
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}