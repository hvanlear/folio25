import React, { useRef, useEffect } from 'react';
import { hover, animate } from 'motion';

interface AnimatedLineProps {
  width: number;
  className?: string;
  height?: number;
  strokeWidth?: number;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({ 
  width, 
  className = '', 
  height = 4, 
  strokeWidth = 1.5 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    
    // Set up hover animation with strumming effect
    hover(svgRef.current, () => {
      // Add slight randomness to make each strumming animation unique
      const randomOffset = Math.random() * 2 - 1; // Random value between -1 and 1
      
      // Animate the path when hovered with a strumming effect
      const keyframes = [
        { transform: `translateY(0)`, stroke: 'currentColor' },
        { transform: `translateY(${5 + randomOffset}px)`, stroke: 'currentColor' },
        { transform: `translateY(${-3 - randomOffset}px)`, stroke: 'currentColor' },
        { transform: `translateY(${2 + randomOffset * 0.5}px)`, stroke: 'currentColor' },
        { transform: `translateY(${-1 - randomOffset * 0.5}px)`, stroke: 'currentColor' },
        { transform: `translateY(0)`, stroke: 'currentColor' }
      ];
      
      animate(
        path, 
        keyframes, 
        { 
          duration: 0.5 + Math.random() * 0.3, // Slightly random duration between 0.5-0.8s
          easing: 'ease-out'
        }
      );
      
      return () => {
        // Smoothly reset the path when hover ends
        animate(
          path, 
          { transform: 'translateY(0)' }, 
          { 
            duration: 0.2 + Math.random() * 0.2, // Slightly random reset duration
            easing: 'ease-out'
          }
        );
      };
    });
  }, []);

  return (
    <svg 
      ref={svgRef}
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} 2`} 
      className={`overflow-visible ${className}`}
    >
      <path
        ref={pathRef}
        d={`M0,1 L${width},1`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AnimatedLine;