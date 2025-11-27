"use client";

import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

// Define your colors here for easy tweaking
const THEME_CONFIG = {
  light: {
    background: "rgba(225, 225, 225, 0.6)",
    particle: "rgb(0, 0, 0)",
  },
  dark: {
    background: "rgba(17, 17, 17, 0.6)",
    particle: "rgb(225, 225, 225)",
  },
};

type Particle = { homeX: number; homeY: number; x: number; y: number; vx: number; vy: number; currentSize: number; currentAlpha: number; twinkleTimer: number; }

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const noise3D = useRef(createNoise3D()).current;
  
  // Store current colors in a ref so the animation loop can access them instantly
  // defaulting to dark mode initially, will update on mount
  const currentColors = useRef(THEME_CONFIG.dark); 

  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const config = useRef({
    gridSpacing: 50, 
    mouseRadius: 120, 
    spring: 0.005, 
    friction: 0.90, 
    noiseStrength: 15,
    particleSize: 0.75,
    pillLength: 1,
    colorRingRadius: 250,
    colorRingThickness: 85,
    ringWiggle: 20,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let time = 0;

    // --- Theme Detection Logic ---
    const updateTheme = () => {
      // Check if the 'dark' class is present on the document element (Tailwind standard)
      const isDark = document.documentElement.classList.contains("dark");
      currentColors.current = isDark ? THEME_CONFIG.dark : THEME_CONFIG.light;
    };

    // Initial check
    updateTheme();

    // Watch for class changes on the <html> tag to switch themes dynamically
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- Grid Initialization ---
    const initGrid = () => {
      particles.current = [];
      const spacing = config.current.gridSpacing;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;
          
          particles.current.push({
            homeX: px,
            homeY: py,
            x: px,
            y: py,
            vx: 0,
            vy: 0,
            currentSize: 0,
            currentAlpha: 0,
            twinkleTimer: 0,
          });
        }
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      config.current.gridSpacing = window.innerWidth < 768 ? 38 : 30;
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const drawPill = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      size: number,
      length: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(-length / 2, -size, length, size * 2, size);
      } else {
        ctx.rect(-length / 2, -size, length, size * 2);
      }
      ctx.closePath();
      ctx.restore();
    };

    // --- Animation Loop ---
    const animate = () => {
      // 1. Clear background using the CURRENT theme color
      ctx.fillStyle = currentColors.current.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      const {
        mouseRadius, spring, friction, noiseStrength,
        colorRingRadius, colorRingThickness, ringWiggle,
        particleSize, pillLength
      } = config.current;

      const mRadius = mouseRadius;

      const dimAlpha = 0.15;
      const brightAlpha = 1.0;
      const lerpSpeed = 0.05;

      particles.current.forEach((p) => {
        // --- Physics ---
        const nX = noise3D(p.homeX * 0.01, p.homeY * 0.01, time) * noiseStrength;
        const nY = noise3D(p.homeX * 0.01 + 500, p.homeY * 0.01 + 500, time) * noiseStrength;
        const targetX = p.homeX + nX;
        const targetY = p.homeY + nY;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < mRadius) {
          const force = (mRadius - dist) / mRadius;
          const angle = Math.atan2(dy, dx);
          const push = force * 6;
          p.vx += Math.cos(angle) * push;
          p.vy += Math.sin(angle) * push;
        }

        p.vx += (targetX - p.x) * spring;
        p.vy += (targetY - p.y) * spring;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        // --- Zone Logic ---
        let regionState = 0; 
        if (dist < colorRingRadius + colorRingThickness + ringWiggle + 100) {
           const angleToMouse = Math.atan2(dy, dx);
           const noiseVal = noise3D(
             Math.cos(angleToMouse) * 1.5,
             Math.sin(angleToMouse) * 1.5,
             time * 0.4
           );
           const localCenterRadius = colorRingRadius + (noiseVal * ringWiggle);
           const innerEdge = localCenterRadius - colorRingThickness / 2;
           const outerEdge = localCenterRadius + colorRingThickness / 2;

           if (dist < innerEdge) regionState = 2;
           else if (dist >= innerEdge && dist <= outerEdge) regionState = 1;
           else regionState = 0;
        }

        p.currentSize += (particleSize - p.currentSize) * lerpSpeed;
        p.currentAlpha += (brightAlpha - p.currentAlpha) * lerpSpeed;

        // 2. Draw using the CURRENT theme particle color
        // We parse the RGB string and add the calculated alpha
        const baseColor = currentColors.current.particle; 
        // Assuming baseColor is "rgb(r, g, b)" -> we replace ')' with ', alpha)'
        ctx.fillStyle = baseColor.replace(")", `, ${p.currentAlpha})`);
        
        const drawSize = Math.max(0.1, p.currentSize);
        const angle = Math.atan2(mouse.current.y - p.y, mouse.current.x - p.x);
        const curLen = Math.max(drawSize * 2, pillLength * (drawSize / particleSize));
        
        drawPill(ctx, p.x, p.y, angle, drawSize, curLen);
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect(); // Stop watching for theme changes
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [noise3D]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-colors duration-500"
    />
  );
}