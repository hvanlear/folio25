"use client"

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = "#4ff0b7",
  height = 5,
  position = "bottom",
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const positionStyles = position === "top" 
    ? { top: 0 } 
    : { bottom: 0 };

  return (
    <motion.div
      className="fixed left-0 right-0 z-50"
      style={{
        height,
        background: color,
        scaleX,
        transformOrigin: "0%",
        ...positionStyles,
      }}
    />
  );
};

export default ScrollProgress;