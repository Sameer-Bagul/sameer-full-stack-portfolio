
import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export const useScrollDirection = (
  threshold = 10,
  initialDirection: ScrollDirection = null
) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const blocking = useRef(false);
  const prevScrollY = useRef(0);
  
  useEffect(() => {
    prevScrollY.current = window.scrollY;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      // Set isAtTop state
      setIsAtTop(scrollY < 20);
      
      if (Math.abs(scrollY - prevScrollY.current) < threshold) {
        blocking.current = false;
        return;
      }
      
      if (blocking.current) return;
      
      const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';
      
      setScrollDirection(newScrollDirection);
      prevScrollY.current = scrollY > 0 ? scrollY : 0;
      blocking.current = true;
      setTimeout(() => {
        blocking.current = false;
      }, 250);
    };
    
    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);
    
    window.addEventListener('scroll', onScroll);
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  
  return { scrollDirection, isAtTop };
};
