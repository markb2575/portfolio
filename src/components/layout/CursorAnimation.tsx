"use client";

import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const THEME_CONFIG = {
  light: {
    particle: "rgb(78, 66, 56)",
    layerAlpha: [0.7, 0.8, 0.9], // per LAYERS entry; small specks need more opacity on light
  },
  dark: {
    particle: "rgb(225, 225, 225)",
    layerAlpha: [0.35, 0.6, 0.95],
  },
};

const CONFIG = {
  spacingDesktop: 30, // average px between stars
  spacingMobile: 38,
  maxParticles: 1800, // caps the star count on large screens
  minParticles: 300, // floor for adaptive quality
  noiseScale: 0.006,
  noiseSpeed: 0.12, // noise time units per second
  noiseStrength: 6, // px of drift around each star's home
  mouseRadius: 200,
  mouseStrength: 60, // max px a star is pushed away from the cursor
  swirl: 0.9, // max radians stars are twisted around the cursor
  mouseFollow: 20, // how quickly the smoothed cursor catches up (1/s)
  ease: 10, // how quickly stars settle toward their target (1/s)
  twinkle: 0.35, // size variation from twinkling (fraction of base size)
  streak: 0.025, // seconds of motion shown as a trail behind moving stars
  maxStreak: 18, // px
  fadeInMs: 1200,
  frameBudgetMs: 8, // drop stars if drawing takes longer than this
};

// Faint distant stars move and react less than bright near ones, giving depth
const LAYERS = [
  { share: 0.72, minSize: 0.5, maxSize: 0.55, depth: 0.5, round: false },
  { share: 0.2, minSize: 0.7, maxSize: 0.85, depth: 0.75, round: false },
  { share: 0.08, minSize: 0.85, maxSize: 1, depth: 1, round: true },
];

type Star = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  size: number;
  layer: number;
  phase: number;
  twinkleSpeed: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const noise3D = createNoise3D();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let colors = THEME_CONFIG.dark;
    let background = "rgb(17, 17, 17)";
    let stars: Star[] = [];
    let time = 0;
    let clock = 0;
    let lastFrame = 0;
    let startTime = 0;
    let streakScale = 0;
    let frameCostAvg = 0;
    let framesSinceResize = 0;
    let animationId: number | null = null;

    const mouse = { x: -1000, y: -1000 };
    const smoothMouse = { x: -1000, y: -1000 };

    // Target position for a star, written to tx/ty to avoid per-frame allocations
    let tx = 0;
    let ty = 0;
    const target = (s: Star) => {
      const depth = LAYERS[s.layer].depth;
      const a = noise3D(s.homeX * CONFIG.noiseScale, s.homeY * CONFIG.noiseScale, time) * Math.PI * 2;
      tx = s.homeX + Math.cos(a) * CONFIG.noiseStrength * depth;
      ty = s.homeY + Math.sin(a) * CONFIG.noiseStrength * depth;

      const dx = tx - smoothMouse.x;
      const dy = ty - smoothMouse.y;
      const distSq = dx * dx + dy * dy;
      const r = CONFIG.mouseRadius;
      if (distSq < r * r && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const falloff = 1 - dist / r;
        const f2 = falloff * falloff * depth;
        // twist around the cursor, then push outward
        const angle = CONFIG.swirl * f2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const scale = 1 + (CONFIG.mouseStrength * f2) / dist;
        tx = smoothMouse.x + (dx * cos - dy * sin) * scale;
        ty = smoothMouse.y + (dx * sin + dy * cos) * scale;
      }
    };

    const pickLayer = () => {
      let r = Math.random();
      for (let i = 0; i < LAYERS.length - 1; i++) {
        if (r < LAYERS[i].share) return i;
        r -= LAYERS[i].share;
      }
      return LAYERS.length - 1;
    };

    const initStars = () => {
      const w = canvas.width;
      const h = canvas.height;
      const spacing = w < 768 ? CONFIG.spacingMobile : CONFIG.spacingDesktop;
      const count = Math.min(CONFIG.maxParticles, Math.round((w * h) / (spacing * spacing)));

      stars = [];
      for (let i = 0; i < count; i++) {
        const layer = pickLayer();
        const { minSize, maxSize } = LAYERS[layer];
        const s: Star = {
          homeX: Math.random() * w,
          homeY: Math.random() * h,
          x: 0,
          y: 0,
          prevX: 0,
          prevY: 0,
          size: minSize + Math.random() * (maxSize - minSize),
          layer,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
        };
        target(s);
        s.x = s.prevX = tx;
        s.y = s.prevY = ty;
        stars.push(s);
      }
      framesSinceResize = 0;
      frameCostAvg = 0;
    };

    const draw = (fade: number) => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors.particle;
      ctx.strokeStyle = colors.particle;
      ctx.lineCap = "round";

      // One fill for still stars and one stroke for streaks, per layer
      for (let l = 0; l < LAYERS.length; l++) {
        const layer = LAYERS[l];
        ctx.globalAlpha = colors.layerAlpha[l] * fade;

        ctx.beginPath();
        for (const s of stars) {
          if (s.layer !== l) continue;
          const vx = (s.x - s.prevX) * streakScale;
          const vy = (s.y - s.prevY) * streakScale;
          if (vx * vx + vy * vy > 1) continue;
          const size = s.size * fade * (1 + CONFIG.twinkle * Math.sin(clock * s.twinkleSpeed + s.phase));
          if (layer.round) {
            ctx.moveTo(s.x + size, s.y);
            ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
          } else {
            ctx.rect(s.x - size, s.y - size, size * 2, size * 2);
          }
        }
        ctx.fill();

        if (!streakScale) continue;
        ctx.lineWidth = (layer.minSize + layer.maxSize) * fade;
        ctx.beginPath();
        for (const s of stars) {
          if (s.layer !== l) continue;
          let vx = (s.x - s.prevX) * streakScale;
          let vy = (s.y - s.prevY) * streakScale;
          const lenSq = vx * vx + vy * vy;
          if (lenSq <= 1) continue;
          if (lenSq > CONFIG.maxStreak * CONFIG.maxStreak) {
            const k = CONFIG.maxStreak / Math.sqrt(lenSq);
            vx *= k;
            vy *= k;
          }
          ctx.moveTo(s.x - vx, s.y - vy);
          ctx.lineTo(s.x, s.y);
        }
        ctx.stroke();
      }
    };

    const animate = (now: number) => {
      if (!startTime) startTime = lastFrame = now;
      // clamp so returning to a background tab doesn't cause a jump
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      const workStart = performance.now();

      time += dt * CONFIG.noiseSpeed;
      clock += dt;
      const follow = 1 - Math.exp(-dt * CONFIG.mouseFollow);
      smoothMouse.x += (mouse.x - smoothMouse.x) * follow;
      smoothMouse.y += (mouse.y - smoothMouse.y) * follow;

      const ease = 1 - Math.exp(-dt * CONFIG.ease);
      for (const s of stars) {
        s.prevX = s.x;
        s.prevY = s.y;
        target(s);
        s.x += (tx - s.x) * ease;
        s.y += (ty - s.y) * ease;
      }
      // convert per-frame movement into a trail covering CONFIG.streak seconds
      streakScale = dt > 0 ? CONFIG.streak / dt : 0;

      const t = Math.min(1, (now - startTime) / CONFIG.fadeInMs);
      draw(t * (2 - t));

      // Adaptive quality: drop stars on devices that can't keep up
      frameCostAvg = frameCostAvg * 0.95 + (performance.now() - workStart) * 0.05;
      if (++framesSinceResize > 90 && frameCostAvg > CONFIG.frameBudgetMs && stars.length > CONFIG.minParticles) {
        stars.length = Math.max(CONFIG.minParticles, Math.floor(stars.length * 0.8));
        framesSinceResize = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    const drawStatic = () => {
      streakScale = 0;
      draw(1);
    };

    const start = () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      if (reducedMotion.matches) {
        drawStatic();
      } else {
        startTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    };

    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      colors = isDark ? THEME_CONFIG.dark : THEME_CONFIG.light;
      // match the page background so the canvas and load overlay never differ
      background = getComputedStyle(document.documentElement).getPropertyValue("--page-bg").trim() || background;
      if (reducedMotion.matches) drawStatic();
    };

    const handleResize = () => {
      canvas.width = canvas.clientWidth; // excludes the scrollbar, unlike innerWidth
      canvas.height = canvas.clientHeight;
      initStars();
      if (reducedMotion.matches) drawStatic();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouse.x === -1000) {
        smoothMouse.x = e.clientX;
        smoothMouse.y = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    reducedMotion.addEventListener("change", start);
    start();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      reducedMotion.removeEventListener("change", start);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-500"
    />
  );
}
