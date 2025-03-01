import React, { PropsWithChildren } from "react";
import { inView } from "motion";
import { useRef, useEffect } from "react";

interface AnimateInViewProps {
  className?: string;
  animation?: "fade" | "slide-up" | "slide-right" | "scale";
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const AnimateInView: React.FC<PropsWithChildren<AnimateInViewProps>> = ({
  children,
  className = "",
  animation = "",
  delay = 0,
  threshold = 0.2,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let initialStyles: Record<string, string> = {};
    let targetStyles: Record<string, number | string> = {};

    // Set initial styles based on animation type
    switch (animation) {
      case "fade":
        initialStyles = { opacity: "0" };
        targetStyles = { opacity: 1 };
        break;
      case "slide-up":
        initialStyles = { opacity: "0", transform: "translateY(20px)" };
        targetStyles = { opacity: 1, y: 0 };
        break;
      case "slide-right":
        initialStyles = { opacity: "0", transform: "translateX(-20px)" };
        targetStyles = { opacity: 1, x: 0 };
        break;
      case "scale":
        initialStyles = { opacity: "0", transform: "scale(0.9)" };
        targetStyles = { opacity: 1, scale: 1 };
        break;
    }

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
            duration: 0.6,
            delay,
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
                  duration: 0.6,
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
  }, [animation, delay, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimateInView;
