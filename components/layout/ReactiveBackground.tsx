"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  color: string;
  alpha: number;
}

export function ReactiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse pointer & smooth interpolated cursor state
    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    // Determine particle count based on viewport width
    function getParticleCount(w: number): number {
      if (w < 640) return 12; // Mobile
      if (w < 1024) return 26; // Tablet
      return 45; // Desktop
    }

    const colors = ["#06b6d4", "#00f5d4", "#14b8a6"];

    function createParticles(): Particle[] {
      const count = getParticleCount(width);
      const list: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const speed = 0.15 + Math.random() * 0.25;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius: 1.2 + Math.random() * 1.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.18 + Math.random() * 0.22,
        });
      }
      return list;
    }

    let particles = createParticles();

    // Event listeners
    function onPointerMove(e: MouseEvent) {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    }

    function onResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = createParticles();
    }

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("resize", onResize, { passive: true });

    // Render loop
    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation (inertia / lag)
      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.08;
        pointer.y += (pointer.targetY - pointer.y) * 0.08;

        // Subtle ambient radial glow under cursor (intensity: ~6-8%)
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          200
        );
        glow.addColorStop(0, "rgba(6, 182, 212, 0.07)");
        glow.addColorStop(0.4, "rgba(20, 184, 166, 0.03)");
        glow.addColorStop(1, "rgba(9, 11, 16, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw particle connections (connecting lines if close)
      const maxConnectDist = 95;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.05;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Cursor repulsion / gentle organic interaction
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 140;

            if (dist < influenceRadius && dist > 0.1) {
              const force = (1 - dist / influenceRadius) * 0.45;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Damping back to base speed
          p.vx += (p.baseVx - p.vx) * 0.03;
          p.vy += (p.baseVy - p.vy) * 0.03;

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Screen edge wrap
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Draw particle dot
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    if (prefersReducedMotion) {
      render(); // Single static render
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full select-none"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
