"use client";

import { useEffect, useRef } from "react";
import {
  AmbientBusLine,
  AmbientNode,
  CircuitCategory,
  CircuitSignal,
  ClickPulse,
  InteractionMode,
  MouseTrace,
} from "@/lib/circuit/types";
import {
  ACTIVITY_CLICK,
  ACTIVITY_HOVER,
  ACTIVITY_IDLE,
  ACTIVITY_MOUSE,
  ACTIVITY_SCROLL,
  MAX_AMBIENT_NODES_DESKTOP,
  MAX_AMBIENT_NODES_MOBILE,
  MAX_AMBIENT_NODES_TABLET,
  MAX_CLICK_PULSES,
  MAX_MOUSE_TRACES,
  MAX_SIGNALS_DESKTOP,
  MAX_SIGNALS_MOBILE,
  MAX_SIGNALS_TABLET,
  NODE_COOLDOWN_MS,
} from "@/lib/circuit/constants";
import {
  createAmbientNodePool,
  generateAmbientBusLines,
  triggerAmbientMicroPulse,
} from "@/lib/circuit/network";
import {
  createClickBurst,
  createManhattanSignals,
  createMouseTrace,
  createScrollPulses,
  drawSubPath,
  getPointAtDistance,
  hexToRgba,
} from "@/lib/circuit/routing";

export function InteractiveBackgroundEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Runtime mutable state (Zero React re-renders during rendering)
  const activityRef = useRef(ACTIVITY_IDLE);
  const targetActivityRef = useRef(ACTIVITY_IDLE);
  const modeRef = useRef<InteractionMode>("idle");

  const ambientBusesRef = useRef<AmbientBusLine[]>([]);
  const ambientNodesRef = useRef<AmbientNode[]>([]);
  const signalsRef = useRef<CircuitSignal[]>([]);
  const mouseTracesRef = useRef<MouseTrace[]>([]);
  const clickPulsesRef = useRef<ClickPulse[]>([]);

  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    lastX: -1000,
    lastY: -1000,
    active: false,
    speed: 0,
    lastMoveTime: 0,
  });

  const lastScrollYRef = useRef(0);
  const lastScrollTriggerRef = useRef(0);
  const lastAmbientPulseRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);

  const nodeCooldownMapRef = useRef<WeakMap<Element, number>>(new WeakMap());
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const nextIdRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    let prefersReducedMotion = reducedMotionQuery.matches;
    let isCoarsePointer = coarsePointerQuery.matches;

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const onCoarsePointerChange = (e: MediaQueryListEvent) => {
      isCoarsePointer = e.matches;
    };

    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    coarsePointerQuery.addEventListener("change", onCoarsePointerChange);

    function getTierLimits() {
      const w = window.innerWidth;
      if (w < 640) {
        return {
          maxSignals: MAX_SIGNALS_MOBILE,
          maxNodes: MAX_AMBIENT_NODES_MOBILE,
        };
      }
      if (w < 1024) {
        return {
          maxSignals: MAX_SIGNALS_TABLET,
          maxNodes: MAX_AMBIENT_NODES_TABLET,
        };
      }
      return {
        maxSignals: MAX_SIGNALS_DESKTOP,
        maxNodes: MAX_AMBIENT_NODES_DESKTOP,
      };
    }

    function initLayout() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const limits = getTierLimits();
      ambientBusesRef.current = generateAmbientBusLines(width, height);
      ambientNodesRef.current = createAmbientNodePool(width, height, limits.maxNodes);
    }

    initLayout();
    window.addEventListener("resize", initLayout, { passive: true });

    function stopLoop() {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isRunningRef.current = false;
      if (ctx && canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      }
    }

    function startLoop() {
      if (isRunningRef.current || prefersReducedMotion) return;
      isRunningRef.current = true;
      rafIdRef.current = requestAnimationFrame(animate);
    }

    // -------------------------------------------------------------
    // Master Animation Frame
    // -------------------------------------------------------------
    function animate(now: number) {
      if (prefersReducedMotion) {
        stopLoop();
        return;
      }

      if (!ctx || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewW = canvas.width / dpr;
      const viewH = canvas.height / dpr;

      // Activity state interpolation & decay
      if (now - lastInteractionTimeRef.current > 380) {
        targetActivityRef.current = ACTIVITY_IDLE;
        modeRef.current = "idle";
      }
      activityRef.current +=
        (targetActivityRef.current - activityRef.current) * 0.07;
      const activity = activityRef.current;

      // Ambient micro-pulse trigger (every ~4.2s during low activity)
      if (
        now - lastAmbientPulseRef.current > 4200 &&
        activity < 0.22 &&
        !isCoarsePointer
      ) {
        triggerAmbientMicroPulse(ambientBusesRef.current, now);
        lastAmbientPulseRef.current = now;
      }

      ctx.clearRect(0, 0, viewW, viewH);

      // -----------------------------------------------------------
      // 1. Ambient Data Nodes (Living background points)
      // -----------------------------------------------------------
      const nodes = ambientNodesRef.current;
      const pointer = pointerRef.current;
      const connectDist = 85;

      // Node connection lines
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * (0.04 + activity * 0.05);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        // Cursor repulsion
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const influenceRadius = 120;

          if (dist < influenceRadius && dist > 0.1) {
            const force = (1 - dist / influenceRadius) * 0.35;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Velocity damping back to base drift
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        p.x += p.vx * (1 + activity * 0.8);
        p.y += p.vy * (1 + activity * 0.8);

        // Screen wrap
        if (p.x < -10) p.x = viewW + 10;
        if (p.x > viewW + 10) p.x = -10;
        if (p.y < -10) p.y = viewH + 10;
        if (p.y > viewH + 10) p.y = -10;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.8 + activity * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // -----------------------------------------------------------
      // 2. Virtual PCB Bus Highways & Ambient Micro-pulses
      // -----------------------------------------------------------
      const buses = ambientBusesRef.current;
      for (let i = 0; i < buses.length; i++) {
        const bus = buses[i];
        const pts = bus.points;
        if (pts.length < 2) continue;

        // Base subtle bus trace
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let ptIdx = 1; ptIdx < pts.length; ptIdx++) {
          ctx.lineTo(pts[ptIdx].x, pts[ptIdx].y);
        }
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.035 + activity * 0.03})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Terminal via pads
        const endPt = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(endPt.x, endPt.y, 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.07 + activity * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ambient micro-pulse travelling
        if (bus.pulseCreatedAt) {
          const pElapsed = now - bus.pulseCreatedAt;
          const pLifetime = bus.pulseLifetime || 2000;
          const pProgress = pElapsed / pLifetime;

          if (pProgress < 1.0) {
            let pAlpha = 1;
            if (pProgress < 0.15) pAlpha = pProgress / 0.15;
            else if (pProgress > 0.75) pAlpha = (1 - pProgress) / 0.25;

            const pColor = bus.pulseColor || "#06b6d4";
            const headDist = pProgress * bus.totalLength;
            const tailDist = Math.max(0, headDist - Math.min(28, bus.totalLength * 0.35));

            ctx.save();
            ctx.strokeStyle = pColor;
            ctx.lineWidth = 1.6;
            ctx.globalAlpha = 0.35 * pAlpha;
            drawSubPath(ctx, pts, bus.segmentLengths, bus.totalLength, tailDist, headDist);
            ctx.stroke();

            // Head micro-dot
            const headPt = getPointAtDistance(pts, bus.segmentLengths, bus.totalLength, headDist).point;
            ctx.beginPath();
            ctx.arc(headPt.x, headPt.y, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = 0.65 * pAlpha;
            ctx.fill();

            // Occasional micro-glyph
            if (bus.pulseGlyph && pProgress > 0.12 && pProgress < 0.88) {
              const glyphPt = getPointAtDistance(
                pts,
                bus.segmentLengths,
                bus.totalLength,
                Math.max(0, headDist - 24)
              ).point;
              ctx.font = '500 8.5px var(--font-geist-mono), monospace';
              ctx.fillStyle = pColor;
              ctx.globalAlpha = 0.32 * pAlpha;
              ctx.fillText(bus.pulseGlyph, glyphPt.x + 4, glyphPt.y - 4);
            }
            ctx.restore();
          } else {
            bus.pulseCreatedAt = undefined;
          }
        }
      }

      // -----------------------------------------------------------
      // 3. Mouse Manhattan Traces
      // -----------------------------------------------------------
      const mTraces = mouseTracesRef.current;
      for (let i = 0; i < mTraces.length; i++) {
        const tr = mTraces[i];
        const elapsed = now - tr.createdAt;
        const progress = elapsed / tr.lifetime;
        if (progress >= 1.0) continue;

        const fade = Math.max(0, 1 - progress);
        const pts = tr.points;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let pIdx = 1; pIdx < pts.length; pIdx++) {
          ctx.lineTo(pts[pIdx].x, pts[pIdx].y);
        }
        ctx.strokeStyle = hexToRgba(tr.color, 0.28 * fade);
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Node tip
        const lastP = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(lastP.x, lastP.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(tr.color, 0.5 * fade);
        ctx.fill();
        ctx.restore();
      }

      // -----------------------------------------------------------
      // 4. Interactive Signals (Hover, Scroll & Click Rays)
      // -----------------------------------------------------------
      const signals = signalsRef.current;
      for (let i = 0; i < signals.length; i++) {
        const s = signals[i];
        const elapsed = now - s.createdAt;
        s.progress = Math.max(0, Math.min(1, elapsed / s.lifetime));

        let alphaFade = 1;
        if (s.progress < 0.12) {
          alphaFade = s.progress / 0.12;
        } else if (s.progress > 0.72) {
          alphaFade = Math.max(0, (1 - s.progress) / 0.28);
        }

        if (alphaFade <= 0.01) continue;

        const intensity = s.intensity || 0.8;
        const pts = s.points;
        const segLens = s.segmentLengths;
        const totalLen = s.totalLength;

        // Static PCB trace line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let ptIdx = 1; ptIdx < pts.length; ptIdx++) {
          ctx.lineTo(pts[ptIdx].x, pts[ptIdx].y);
        }
        ctx.strokeStyle = hexToRgba(s.color, 0.16 * alphaFade * intensity);
        ctx.lineWidth = 1.25;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Emergence pin
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(s.color, 0.35 * alphaFade);
        ctx.fill();

        // Terminal via pad
        const targetPt = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(targetPt.x, targetPt.y, 2.6, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(s.color, 0.38 * alphaFade);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(targetPt.x, targetPt.y, 1.0, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(s.color, 0.6 * alphaFade);
        ctx.fill();
        ctx.restore();

        // Active electric pulse
        const headDist = s.progress * totalLen;
        const tailLength = Math.min(32, totalLen * 0.4);
        const tailDist = Math.max(0, headDist - tailLength);

        if (headDist > 0 && headDist < totalLen + 10) {
          ctx.save();
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 2.0;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 6;
          ctx.globalAlpha = 0.85 * alphaFade * intensity;

          drawSubPath(ctx, pts, segLens, totalLen, tailDist, headDist);
          ctx.stroke();

          // Leading bright spark
          const headInfo = getPointAtDistance(pts, segLens, totalLen, headDist);
          ctx.beginPath();
          ctx.arc(headInfo.point.x, headInfo.point.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }

        // Trailing glyph
        if (s.glyph && s.progress > 0.08 && s.progress < 0.94) {
          const glyphDist = Math.max(0, headDist - 34);
          const glyphInfo = getPointAtDistance(pts, segLens, totalLen, glyphDist);

          const isHorizontal = Math.abs(glyphInfo.tangent.x) > 0.5;
          const gx = isHorizontal ? glyphInfo.point.x - 12 : glyphInfo.point.x + 5;
          const gy = isHorizontal ? glyphInfo.point.y - 5 : glyphInfo.point.y + 3;

          ctx.save();
          ctx.font = '500 9px var(--font-geist-mono), monospace';
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 4;
          ctx.globalAlpha = 0.52 * alphaFade;
          ctx.fillText(s.glyph, gx, gy);
          ctx.restore();
        }
      }

      // -----------------------------------------------------------
      // 5. Click Shockwaves (Ephemeral origin ripple)
      // -----------------------------------------------------------
      const clickPulses = clickPulsesRef.current;
      for (let i = 0; i < clickPulses.length; i++) {
        const cp = clickPulses[i];
        const elapsed = now - cp.createdAt;
        const progress = elapsed / cp.lifetime;
        if (progress >= 1.0) continue;

        const fade = Math.max(0, 1 - progress);
        const radius = 6 + progress * 26;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(cp.color, 0.45 * fade);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.7 * fade;
        ctx.fill();
        ctx.restore();
      }

      // -----------------------------------------------------------
      // Filtering Expired Objects
      // -----------------------------------------------------------
      signalsRef.current = signals.filter((s) => now - s.createdAt < s.lifetime);
      mouseTracesRef.current = mTraces.filter((tr) => now - tr.createdAt < tr.lifetime);
      clickPulsesRef.current = clickPulses.filter((cp) => now - cp.createdAt < cp.lifetime);

      rafIdRef.current = requestAnimationFrame(animate);
    }

    // -------------------------------------------------------------
    // Input Subsystem Handlers
    // -------------------------------------------------------------

    // A. Mouse movement
    function handlePointerMove(e: PointerEvent) {
      if (prefersReducedMotion || isCoarsePointer) return;
      const now = performance.now();
      const p = pointerRef.current;

      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      const dist = Math.hypot(dx, dy);

      p.lastX = p.x;
      p.lastY = p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      p.active = true;

      const dt = Math.max(16, now - p.lastMoveTime);
      p.speed = dist / dt;
      p.lastMoveTime = now;

      // Spawn subtle Manhattan trace in cursor wake
      if (p.lastX > 0 && dist > 26) {
        const tr = createMouseTrace(
          { x: p.lastX, y: p.lastY },
          { x: p.x, y: p.y },
          () => nextIdRef.current++,
          p.speed
        );
        if (tr) {
          const currentTraces = mouseTracesRef.current;
          while (currentTraces.length >= MAX_MOUSE_TRACES) {
            currentTraces.shift();
          }
          mouseTracesRef.current = [...currentTraces, tr];
        }
      }

      targetActivityRef.current = Math.min(
        0.42,
        ACTIVITY_MOUSE + (p.speed * 0.08)
      );
      modeRef.current = "mouse";
      lastInteractionTimeRef.current = now;
      startLoop();
    }

    function handlePointerLeave() {
      pointerRef.current.active = false;
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    }

    // B. Hover interaction (Event Delegation for data-circuit-node)
    function handlePointerOver(e: PointerEvent) {
      if (prefersReducedMotion || isCoarsePointer) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const node = target.closest("[data-circuit-node]") as HTMLElement | null;
      if (!node) return;

      const now = performance.now();
      const lastTrigger = nodeCooldownMapRef.current.get(node) || 0;
      if (now - lastTrigger < NODE_COOLDOWN_MS) return;
      nodeCooldownMapRef.current.set(node, now);

      const category = (node.getAttribute("data-circuit-category") ||
        "default") as CircuitCategory;

      const limits = getTierLimits();
      const countToSpawn = window.innerWidth < 1024 ? 1 : 2;

      const newSignals = createManhattanSignals(
        node,
        category,
        () => nextIdRef.current++,
        countToSpawn
      );

      if (newSignals.length === 0) return;

      const current = signalsRef.current;
      while (current.length + newSignals.length > limits.maxSignals) {
        current.shift();
      }
      signalsRef.current = [...current, ...newSignals];

      targetActivityRef.current = ACTIVITY_HOVER;
      modeRef.current = "hover";
      lastInteractionTimeRef.current = now;
      startLoop();
    }

    // C. Click interaction (The Most Powerful Effect)
    function handlePointerDown(e: PointerEvent) {
      if (prefersReducedMotion) return;
      const now = performance.now();

      const target = e.target as HTMLElement | null;
      const node = target ? (target.closest("[data-circuit-node]") as HTMLElement | null) : null;
      const category = (node?.getAttribute("data-circuit-category") || "default") as CircuitCategory;

      const burst = createClickBurst(
        e.clientX,
        e.clientY,
        category,
        () => nextIdRef.current++
      );

      const currentClicks = clickPulsesRef.current;
      while (currentClicks.length >= MAX_CLICK_PULSES) {
        currentClicks.shift();
      }
      clickPulsesRef.current = [...currentClicks, burst];

      const currentSignals = signalsRef.current;
      const limits = getTierLimits();
      while (currentSignals.length + burst.signals.length > limits.maxSignals) {
        currentSignals.shift();
      }
      signalsRef.current = [...currentSignals, ...burst.signals];

      // Energetic spike
      activityRef.current = ACTIVITY_CLICK;
      targetActivityRef.current = ACTIVITY_CLICK;
      modeRef.current = "click";
      lastInteractionTimeRef.current = now;
      startLoop();
    }

    // D. Scroll interaction
    function handleScroll() {
      if (prefersReducedMotion) return;
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Rate limit scroll pulse generation
      if (Math.abs(deltaY) > 8 && now - lastScrollTriggerRef.current > 200) {
        lastScrollTriggerRef.current = now;
        const pulses = createScrollPulses(
          deltaY,
          window.innerWidth,
          window.innerHeight,
          () => nextIdRef.current++
        );

        const current = signalsRef.current;
        const limits = getTierLimits();
        while (current.length + pulses.length > limits.maxSignals) {
          current.shift();
        }
        signalsRef.current = [...current, ...pulses];

        targetActivityRef.current = Math.min(0.68, ACTIVITY_SCROLL + Math.abs(deltaY) * 0.003);
        modeRef.current = "scroll";
        lastInteractionTimeRef.current = now;
        startLoop();
      }
    }

    // Register passive listeners
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("resize", initLayout);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      coarsePointerQuery.removeEventListener("change", onCoarsePointerChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      aria-hidden="true"
    />
  );
}
