'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div 
      className={`
        transition-all duration-300 ease-in-out
        ${isTransitioning 
          ? 'opacity-0 transform translate-x-4' 
          : 'opacity-100 transform translate-x-0'
        }
      `}
    >
      {displayChildren}
    </div>
  );
} 