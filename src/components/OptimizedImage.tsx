'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        position: fill ? 'relative' : undefined,
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        overflow: 'hidden',
      }}
    >
      {isLoading && (
        <div
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
            backgroundColor: '#f3f4f6',
            position: fill ? 'absolute' : undefined,
            top: 0,
            left: 0,
            zIndex: 1,
            borderRadius: '4px',
          }}
        />
      )}
      
      {(isInView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoadComplete}
          style={{
            objectFit: 'cover',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoading ? 0 : 1,
          }}
        />
      )}
    </div>
  );
}

// Generate blur data URL for better loading experience
export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  
  if (ctx) {
    // Create a simple gradient blur effect
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};