import React, { PropsWithChildren } from "react";
import { inView } from "motion";
import { useRef, useEffect } from "react";

type AnimationType = 
  | "fade" 
  | "slide-up" 
  | "slide-down" 
  | "slide-left" 
  | "slide-right" 
  | "scale-up" 
  | "scale-down" 
  | "rotate";

interface AnimateInViewProps {
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  once?: boolean;
  duration?: number;
  ease?: string;
}

// Animation presets
const animationPresets: Record<AnimationType, { 
  initial: Record<string, string>, 
  target: Record<string, number | string> 
}> = {
  "fade": {
    initial: { opacity: "0" },
    target: { opacity: 1 }
  },
  "slide-up": {
    initial: { opacity: "0", transform: "translateY(20px)" },
    target: { opacity: 1, transform: "translateY(0)" }
  },
  "slide-down": {
    initial: { opacity: "0", transform: "translateY(-20px)" },
    target: { opacity: 1, transform: "translateY(0)" }
  },
  "slide-left": {
    initial: { opacity: "0", transform: "translateX(20px)" },
    target: { opacity: 1, transform: "translateX(0)" }
  },
  "slide-right": {
    initial: { opacity: "0", transform: "translateX(-20px)" },
    target: { opacity: 1, transform: "translateX(0)" }
  },
  "scale-up": {
    initial: { opacity: "0", transform: "scale(0.9)" },
    target: { opacity: 1, transform: "scale(1)" }
  },
  "scale-down": {
    initial: { opacity: "0", transform: "scale(1.1)" },
    target: { opacity: 1, transform: "scale(1)" }
  },
  "rotate": {
    initial: { opacity: "0", transform: "rotate(-5deg)" },
    target: { opacity: 1, transform: "rotate(0deg)" }
  }
};

const AnimateInView: React.FC<PropsWithChildren<AnimateInViewProps>> = ({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  threshold = 0.2,
  once = true,
  duration = 0.6,
  ease = "easeOut"
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    // Get the animation preset
    const preset = animationPresets[animation] || animationPresets.fade;
    const initialStyles = preset.initial;
    const targetStyles = preset.target;

    // Apply initial styles
    Object.entries(initialStyles).forEach(([key, value]) => {
      try {
        const htmlElement = element as HTMLElement;
        htmlElement.style[key as any] = value;
      } catch (error) {
        console.warn(`Could not set style property ${key}: ${error}`);
      }
    });

    // Setup intersection observer
    const stop = inView(
      element,
      (element) => {
        // Using Motion's animate function on the element
        import("motion").then(({ animate: motionAnimate }) => {
          motionAnimate(element, targetStyles, {
            duration,
            delay,
            ease
          });

          // Store the animate function for cleanup use
          (element as any)._motionAnimate = motionAnimate;
        });

        // Return cleanup function for when element leaves viewport
        return once
          ? undefined
          : () => {
              // Use animate function for exit animation if available
              if ((element as any)._motionAnimate) {
                (element as any)._motionAnimate(element, initialStyles, {
                  duration: duration / 2,
                  ease
                });
              } else {
                // Fallback to direct style setting
                Object.entries(initialStyles).forEach(([key, value]) => {
                  (element as HTMLElement).style[
                    key as keyof CSSStyleDeclaration
                  ] = value as string;
                });
              }
            };
      },
      { amount: threshold }
    );

    return () => stop();
  }, [animation, delay, threshold, once, duration, ease]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimateInView;

// Export animation types for reuse
export type { AnimationType };
