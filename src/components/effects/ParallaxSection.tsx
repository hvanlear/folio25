"use client"

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  children: ReactNode;
  direction?: "up" | "down";
  speed?: number;
  className?: string;
  offset?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  direction = "up",
  speed = 0.2,
  className = "",
  offset = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the translation distance based on direction and speed
  const factor = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset + 100 * factor * speed]
  );

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div style={{ y }}>{children}</motion.div>
    </motion.div>
  );
};

export default ParallaxSection;