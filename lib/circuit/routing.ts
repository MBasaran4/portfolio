import { CircuitCategory, CircuitSignal, ClickPulse, MouseTrace, Point } from "./types";
import {
  CLICK_PULSE_LIFETIME_MS,
  COLORS_BY_CATEGORY,
  GLYPHS_BY_CATEGORY,
  MOUSE_TRACE_LIFETIME_MS,
  SCROLL_SIGNAL_LIFETIME_MS,
  SIGNAL_LIFETIME_MS,
} from "./constants";

export function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
}

export function calculatePathMetrics(points: Point[]): {
  segmentLengths: number[];
  totalLength: number;
} {
  const segmentLengths: number[] = [];
  let totalLength = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const len = Math.hypot(dx, dy);
    segmentLengths.push(len);
    totalLength += len;
  }

  return { segmentLengths, totalLength };
}

export function getPointAtDistance(
  points: Point[],
  segmentLengths: number[],
  totalLength: number,
  distance: number
): { point: Point; tangent: Point } {
  if (points.length === 0) {
    return { point: { x: 0, y: 0 }, tangent: { x: 1, y: 0 } };
  }
  if (points.length === 1 || totalLength <= 0) {
    return { point: points[0], tangent: { x: 1, y: 0 } };
  }

  const d = Math.max(0, Math.min(totalLength, distance));
  let accumulated = 0;

  for (let i = 0; i < segmentLengths.length; i++) {
    const len = segmentLengths[i];
    if (d <= accumulated + len || i === segmentLengths.length - 1) {
      const segD = d - accumulated;
      const t = len > 0 ? segD / len : 0;
      const p1 = points[i];
      const p2 = points[i + 1];
      const x = p1.x + (p2.x - p1.x) * t;
      const y = p1.y + (p2.y - p1.y) * t;

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const mag = Math.hypot(dx, dy) || 1;

      return {
        point: { x, y },
        tangent: { x: dx / mag, y: dy / mag },
      };
    }
    accumulated += len;
  }

  const last = points[points.length - 1];
  return { point: last, tangent: { x: 1, y: 0 } };
}

export function drawSubPath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  segmentLengths: number[],
  totalLength: number,
  startDist: number,
  endDist: number
): void {
  if (startDist >= endDist || points.length < 2 || totalLength <= 0) return;

  const pStart = getPointAtDistance(
    points,
    segmentLengths,
    totalLength,
    startDist
  ).point;
  const pEnd = getPointAtDistance(
    points,
    segmentLengths,
    totalLength,
    endDist
  ).point;

  ctx.beginPath();
  ctx.moveTo(pStart.x, pStart.y);

  let accumulated = 0;
  for (let i = 0; i < segmentLengths.length; i++) {
    accumulated += segmentLengths[i];
    if (accumulated > startDist && accumulated < endDist) {
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
    }
  }

  ctx.lineTo(pEnd.x, pEnd.y);
}

type Side = "left" | "right" | "top" | "bottom";

export function createManhattanSignals(
  element: HTMLElement,
  category: CircuitCategory,
  idGen: () => number,
  maxToCreate: number = 1
): CircuitSignal[] {
  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return [];

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 24;

  const spaceLeft = rect.left;
  const spaceRight = viewportWidth - rect.right;
  const spaceTop = rect.top;
  const spaceBottom = viewportHeight - rect.bottom;

  const candidateSides: { side: Side; space: number }[] = [
    { side: "right", space: spaceRight },
    { side: "left", space: spaceLeft },
    { side: "bottom", space: spaceBottom },
    { side: "top", space: spaceTop },
  ];
  const candidates = candidateSides.filter((c) => c.space >= 60);

  if (candidates.length === 0) return [];

  candidates.sort((a, b) => b.space - a.space + (Math.random() * 40 - 20));

  const signals: CircuitSignal[] = [];
  const glyphPool = GLYPHS_BY_CATEGORY[category] || GLYPHS_BY_CATEGORY.default;
  const color = COLORS_BY_CATEGORY[category] || COLORS_BY_CATEGORY.default;

  const count = Math.min(maxToCreate, candidates.length);

  for (let idx = 0; idx < count; idx++) {
    const side = candidates[idx].side;
    const points: Point[] = [];

    if (side === "right") {
      const startX = Math.round(rect.right);
      const startY = Math.round(
        rect.top + rect.height * (0.2 + 0.6 * Math.random())
      );
      const maxDx = Math.min(spaceRight - margin, 150);
      const minDx = Math.min(maxDx, 65);
      const dx = Math.round(minDx + Math.random() * (maxDx - minDx));

      const maxDy = 70;
      const dyDirection = startY > viewportHeight / 2 ? -1 : 1;
      const dy = dyDirection * Math.round(25 + Math.random() * (maxDy - 25));
      const targetY = Math.max(margin, Math.min(viewportHeight - margin, startY + dy));

      points.push({ x: startX, y: startY });

      const isStepped = Math.random() > 0.4 && dx > 80;
      if (isStepped) {
        const midX = Math.round(startX + dx * 0.45);
        points.push({ x: midX, y: startY });
        points.push({ x: midX, y: targetY });
        points.push({ x: startX + dx, y: targetY });
      } else {
        points.push({ x: startX + dx, y: startY });
        points.push({ x: startX + dx, y: targetY });
      }
    } else if (side === "left") {
      const startX = Math.round(rect.left);
      const startY = Math.round(
        rect.top + rect.height * (0.2 + 0.6 * Math.random())
      );
      const maxDx = Math.min(spaceLeft - margin, 150);
      const minDx = Math.min(maxDx, 65);
      const dx = Math.round(minDx + Math.random() * (maxDx - minDx));

      const maxDy = 70;
      const dyDirection = startY > viewportHeight / 2 ? -1 : 1;
      const dy = dyDirection * Math.round(25 + Math.random() * (maxDy - 25));
      const targetY = Math.max(margin, Math.min(viewportHeight - margin, startY + dy));

      points.push({ x: startX, y: startY });

      const isStepped = Math.random() > 0.4 && dx > 80;
      if (isStepped) {
        const midX = Math.round(startX - dx * 0.45);
        points.push({ x: midX, y: startY });
        points.push({ x: midX, y: targetY });
        points.push({ x: startX - dx, y: targetY });
      } else {
        points.push({ x: startX - dx, y: startY });
        points.push({ x: startX - dx, y: targetY });
      }
    } else if (side === "bottom") {
      const startX = Math.round(
        rect.left + rect.width * (0.2 + 0.6 * Math.random())
      );
      const startY = Math.round(rect.bottom);
      const maxDy = Math.min(spaceBottom - margin, 130);
      const minDy = Math.min(maxDy, 55);
      const dy = Math.round(minDy + Math.random() * (maxDy - minDy));

      const maxDx = 70;
      const dxDirection = startX > viewportWidth / 2 ? -1 : 1;
      const dx = dxDirection * Math.round(25 + Math.random() * (maxDx - 25));
      const targetX = Math.max(margin, Math.min(viewportWidth - margin, startX + dx));

      points.push({ x: startX, y: startY });

      const isStepped = Math.random() > 0.4 && dy > 70;
      if (isStepped) {
        const midY = Math.round(startY + dy * 0.45);
        points.push({ x: startX, y: midY });
        points.push({ x: targetX, y: midY });
        points.push({ x: targetX, y: startY + dy });
      } else {
        points.push({ x: startX, y: startY + dy });
        points.push({ x: targetX, y: startY + dy });
      }
    } else {
      const startX = Math.round(
        rect.left + rect.width * (0.2 + 0.6 * Math.random())
      );
      const startY = Math.round(rect.top);
      const maxDy = Math.min(spaceTop - margin, 130);
      const minDy = Math.min(maxDy, 55);
      const dy = Math.round(minDy + Math.random() * (maxDy - minDy));

      const maxDx = 70;
      const dxDirection = startX > viewportWidth / 2 ? -1 : 1;
      const dx = dxDirection * Math.round(25 + Math.random() * (maxDx - 25));
      const targetX = Math.max(margin, Math.min(viewportWidth - margin, startX + dx));

      points.push({ x: startX, y: startY });

      const isStepped = Math.random() > 0.4 && dy > 70;
      if (isStepped) {
        const midY = Math.round(startY - dy * 0.45);
        points.push({ x: startX, y: midY });
        points.push({ x: targetX, y: midY });
        points.push({ x: targetX, y: startY - dy });
      } else {
        points.push({ x: startX, y: startY - dy });
        points.push({ x: targetX, y: startY - dy });
      }
    }

    const { segmentLengths, totalLength } = calculatePathMetrics(points);
    if (totalLength <= 10) continue;

    const shouldHaveGlyph = Math.random() > 0.35;
    const glyph = shouldHaveGlyph
      ? glyphPool[Math.floor(Math.random() * glyphPool.length)]
      : undefined;

    const start = points[0];
    const corner1 = points[1] || start;
    const target = points[points.length - 1];

    signals.push({
      id: idGen(),
      startX: start.x,
      startY: start.y,
      cornerX: corner1.x,
      cornerY: corner1.y,
      targetX: target.x,
      targetY: target.y,
      points,
      segmentLengths,
      totalLength,
      progress: 0,
      speed: 1 / SIGNAL_LIFETIME_MS,
      glyph,
      color,
      category,
      createdAt: performance.now(),
      lifetime: SIGNAL_LIFETIME_MS,
      intensity: 0.8,
    });
  }

  return signals;
}

// Mouse wake Manhattan trail segment
export function createMouseTrace(
  from: Point,
  to: Point,
  idGen: () => number,
  speed: number
): MouseTrace | null {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 15) return null;

  // Form a neat 90-degree orthogonal bend
  const elbow: Point =
    Math.random() > 0.5 ? { x: to.x, y: from.y } : { x: from.x, y: to.y };

  const points: Point[] = [
    { x: Math.round(from.x), y: Math.round(from.y) },
    { x: Math.round(elbow.x), y: Math.round(elbow.y) },
    { x: Math.round(to.x), y: Math.round(to.y) },
  ];

  return {
    id: idGen(),
    points,
    color: speed > 1.2 ? "#00f5d4" : "#06b6d4",
    createdAt: performance.now(),
    lifetime: MOUSE_TRACE_LIFETIME_MS,
    speed,
  };
}

// Scroll mode data flow pulses
export function createScrollPulses(
  deltaY: number,
  viewportWidth: number,
  viewportHeight: number,
  idGen: () => number
): CircuitSignal[] {
  const signals: CircuitSignal[] = [];
  const isDown = deltaY > 0;
  const count = 1;

  for (let i = 0; i < count; i++) {
    const startX = Math.round(
      viewportWidth * (0.15 + 0.7 * Math.random())
    );
    const startY = isDown ? Math.round(viewportHeight * 0.15) : Math.round(viewportHeight * 0.85);
    const lengthY = Math.round(80 + Math.random() * 80);
    const targetY = isDown ? startY + lengthY : startY - lengthY;
    const bendX = startX + (Math.random() > 0.5 ? 40 : -40);

    const points: Point[] = [
      { x: startX, y: startY },
      { x: startX, y: targetY },
      { x: bendX, y: targetY },
    ];

    const { segmentLengths, totalLength } = calculatePathMetrics(points);
    if (totalLength <= 10) continue;

    const glyphs = GLYPHS_BY_CATEGORY.default;
    const glyph = Math.random() > 0.5 ? glyphs[Math.floor(Math.random() * glyphs.length)] : undefined;

    signals.push({
      id: idGen(),
      startX: points[0].x,
      startY: points[0].y,
      cornerX: points[1].x,
      cornerY: points[1].y,
      targetX: points[2].x,
      targetY: points[2].y,
      points,
      segmentLengths,
      totalLength,
      progress: 0,
      speed: 1 / SCROLL_SIGNAL_LIFETIME_MS,
      glyph,
      color: "#06b6d4",
      createdAt: performance.now(),
      lifetime: SCROLL_SIGNAL_LIFETIME_MS,
      intensity: 0.65,
    });
  }

  return signals;
}

// Click shockwave pulse burst (The Most Powerful Interaction)
export function createClickBurst(
  x: number,
  y: number,
  category: CircuitCategory,
  idGen: () => number
): ClickPulse {
  const color = COLORS_BY_CATEGORY[category] || COLORS_BY_CATEGORY.default;
  const glyphPool = GLYPHS_BY_CATEGORY[category] || GLYPHS_BY_CATEGORY.default;
  const signals: CircuitSignal[] = [];

  // Emit 2 to 3 Manhattan rays radiating outward from click origin
  const angles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
  const chosenAngles = angles.sort(() => Math.random() - 0.5).slice(0, 3);

  for (const angle of chosenAngles) {
    const dirX = Math.round(Math.cos(angle));
    const dirY = Math.round(Math.sin(angle));
    const leg1 = Math.round(35 + Math.random() * 45);
    const leg2 = Math.round(25 + Math.random() * 35);

    const p1: Point = { x: Math.round(x), y: Math.round(y) };
    const p2: Point = { x: p1.x + dirX * leg1, y: p1.y + dirY * leg1 };
    // Turn 90 degrees
    const turnX = dirY !== 0 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    const turnY = dirX !== 0 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    const p3: Point = { x: p2.x + turnX * leg2, y: p2.y + turnY * leg2 };

    const points = [p1, p2, p3];
    const { segmentLengths, totalLength } = calculatePathMetrics(points);
    if (totalLength <= 10) continue;

    const glyph = Math.random() > 0.4 ? glyphPool[Math.floor(Math.random() * glyphPool.length)] : undefined;

    signals.push({
      id: idGen(),
      startX: p1.x,
      startY: p1.y,
      cornerX: p2.x,
      cornerY: p2.y,
      targetX: p3.x,
      targetY: p3.y,
      points,
      segmentLengths,
      totalLength,
      progress: 0,
      speed: 1 / CLICK_PULSE_LIFETIME_MS,
      glyph,
      color,
      category,
      createdAt: performance.now(),
      lifetime: CLICK_PULSE_LIFETIME_MS,
      intensity: 1.0,
    });
  }

  return {
    id: idGen(),
    x,
    y,
    category,
    color,
    createdAt: performance.now(),
    lifetime: CLICK_PULSE_LIFETIME_MS,
    signals,
  };
}
