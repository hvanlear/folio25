import React, { useEffect, useRef } from "react";

interface ColorBarProps {
  className?: string;
  height?: string;
  colorSets?: Array<[string, string]>; // [startColor, endColor] pairs
  transitionDuration?: number;
}

const ColorBar: React.FC<ColorBarProps> = ({
  className = "",
  height = "h-1.5",
  colorSets = [
    // Green shades (dark to light)
    ["#0F5132", "#4FF0B7"],
    // Teal shades
    ["#134E4A", "#5EEAD4"],
    // Blue-green shades
    ["#155E75", "#67E8F9"],
    // Forest to mint
    ["#064E3B", "#6EE7B7"],
  ],
  transitionDuration = 10, // seconds - slower for more subtle transitions
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const currentSetRef = useRef<number>(0);
  const nextSetRef = useRef<number>(1);
  const transitionProgressRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
    };

    const hexToRgb = (hex: string): [number, number, number] => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const blendColors = (
      color1: [number, number, number],
      color2: [number, number, number],
      factor: number
    ): [number, number, number] => {
      return [
        Math.round(color1[0] * (1 - factor) + color2[0] * factor),
        Math.round(color1[1] * (1 - factor) + color2[1] * factor),
        Math.round(color1[2] * (1 - factor) + color2[2] * factor),
      ];
    };

    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const elapsed = timestamp - timeRef.current;

      // Update transition progress - slower transition
      const transitionTime = (transitionDuration * 1000) / 2; // Half the time for transition
      transitionProgressRef.current += elapsed / transitionTime;

      if (transitionProgressRef.current >= 1) {
        // Transition complete, move to next color set
        currentSetRef.current = nextSetRef.current;
        nextSetRef.current = (nextSetRef.current + 1) % colorSets.length;
        transitionProgressRef.current = 0;
      }

      timeRef.current = timestamp;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current and next color sets
      const currentSet = colorSets[currentSetRef.current];
      const nextSet = colorSets[nextSetRef.current];

      // Convert hex colors to RGB
      const currentStartRgb = hexToRgb(currentSet[0]);
      const currentEndRgb = hexToRgb(currentSet[1]);
      const nextStartRgb = hexToRgb(nextSet[0]);
      const nextEndRgb = hexToRgb(nextSet[1]);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

      // Number of segments - more segments for smoother gradient
      const segments = 20;

      for (let i = 0; i <= segments; i++) {
        const position = i / segments;

        // Blend between current and next color sets based on transition progress
        const startColor = blendColors(
          currentStartRgb,
          nextStartRgb,
          transitionProgressRef.current
        );

        const endColor = blendColors(
          currentEndRgb,
          nextEndRgb,
          transitionProgressRef.current
        );

        // Blend between start and end colors based on position
        const segmentColor = blendColors(startColor, endColor, position);

        // Add subtle pulse effect - reduced intensity for more subtle effect
        const pulseIntensity =
          Math.sin(timestamp / 800 + position * Math.PI * 2) * 0.08 + 0.92;
        const pulsedColor: [number, number, number] = [
          Math.min(255, Math.round(segmentColor[0] * pulseIntensity)),
          Math.min(255, Math.round(segmentColor[1] * pulseIntensity)),
          Math.min(255, Math.round(segmentColor[2] * pulseIntensity)),
        ];

        gradient.addColorStop(
          position,
          `rgb(${pulsedColor[0]}, ${pulsedColor[1]}, ${pulsedColor[2]})`
        );
      }

      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reduced glow effect for more subtle appearance
      ctx.shadowBlur = 3;
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)";

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colorSets, transitionDuration]);

  return (
    <canvas ref={canvasRef} className={`w-full block ${height} ${className}`} />
  );
};

export default ColorBar;
