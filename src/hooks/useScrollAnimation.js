import { useEffect, useRef, useState } from 'react';

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) setHasAnimated(true);
          }
        } else if (!triggerOnce && !hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return [elementRef, isVisible];
};

// Custom hook for staggered animations
export const useStaggeredAnimation = (itemCount, baseDelay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger staggered animations
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * baseDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, baseDelay]);

  return [containerRef, visibleItems];
};

// Custom hook for parallax effect
export const useParallax = (speed = 0.5) => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;

      setTransform(`translate3d(0, ${rate}px, 0)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [elementRef, transform];
};

// Custom hook for mouse follower
export const useMouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.tagName === 'A' || 
                         target.tagName === 'BUTTON' || 
                         target.style.cursor === 'pointer' ||
                         target.closest('a, button, [role="button"]');
      setIsPointer(isClickable);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return { position, isPointer };
};

// Custom hook for advanced hover effects
export const useHoverEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = ((e.clientX - centerX) / (rect.width / 2)) * 100;
    const y = ((e.clientY - centerY) / (rect.height / 2)) * 100;

    setMousePosition({ x, y });
  };

  return {
    elementRef,
    isHovered,
    mousePosition,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove
    }
  };
};