import { AmbientBusLine, AmbientNode, Point } from "./types";
import { calculatePathMetrics } from "./routing";
import { AMBIENT_PULSE_LIFETIME_MS, GLYPHS_BY_CATEGORY } from "./constants";

export function generateAmbientBusLines(
  width: number,
  height: number
): AmbientBusLine[] {
  const lines: AmbientBusLine[] = [];
  let id = 1;

  // 1. Top subtle horizontal highway
  const y1 = Math.round(height * 0.18);
  const pts1: Point[] = [
    { x: Math.round(width * 0.05), y: y1 },
    { x: Math.round(width * 0.35), y: y1 },
    { x: Math.round(width * 0.35), y: y1 + 35 },
    { x: Math.round(width * 0.65), y: y1 + 35 },
  ];
  const m1 = calculatePathMetrics(pts1);
  lines.push({ id: id++, points: pts1, segmentLengths: m1.segmentLengths, totalLength: m1.totalLength });

  // 2. Left vertical peripheral bus
  const x2 = Math.round(width * 0.08);
  const pts2: Point[] = [
    { x: x2, y: Math.round(height * 0.3) },
    { x: x2, y: Math.round(height * 0.65) },
    { x: x2 + 45, y: Math.round(height * 0.65) },
  ];
  const m2 = calculatePathMetrics(pts2);
  lines.push({ id: id++, points: pts2, segmentLengths: m2.segmentLengths, totalLength: m2.totalLength });

  // 3. Right vertical peripheral bus
  const x3 = Math.round(width * 0.92);
  const pts3: Point[] = [
    { x: x3, y: Math.round(height * 0.25) },
    { x: x3 - 40, y: Math.round(height * 0.25) },
    { x: x3 - 40, y: Math.round(height * 0.72) },
    { x: x3, y: Math.round(height * 0.72) },
  ];
  const m3 = calculatePathMetrics(pts3);
  lines.push({ id: id++, points: pts3, segmentLengths: m3.segmentLengths, totalLength: m3.totalLength });

  // 4. Mid-lower horizontal bus
  const y4 = Math.round(height * 0.82);
  const pts4: Point[] = [
    { x: Math.round(width * 0.25), y: y4 },
    { x: Math.round(width * 0.55), y: y4 },
    { x: Math.round(width * 0.55), y: y4 - 30 },
    { x: Math.round(width * 0.85), y: y4 - 30 },
  ];
  const m4 = calculatePathMetrics(pts4);
  lines.push({ id: id++, points: pts4, segmentLengths: m4.segmentLengths, totalLength: m4.totalLength });

  return lines;
}

export function createAmbientNodePool(
  width: number,
  height: number,
  count: number
): AmbientNode[] {
  const nodes: AmbientNode[] = [];
  const colors = ["#06b6d4", "#00f5d4", "#14b8a6"];

  for (let i = 0; i < count; i++) {
    const speed = 0.12 + Math.random() * 0.18;
    const angle = Math.random() * Math.PI * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx,
      vy,
      baseVx: vx,
      baseVy: vy,
      radius: 1.1 + Math.random() * 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.15 + Math.random() * 0.18,
    });
  }

  return nodes;
}

export function triggerAmbientMicroPulse(
  buses: AmbientBusLine[],
  now: number
): void {
  if (buses.length === 0) return;

  // Pick an idle bus line
  const idleBuses = buses.filter(
    (b) => !b.pulseCreatedAt || now - b.pulseCreatedAt > (b.pulseLifetime || AMBIENT_PULSE_LIFETIME_MS)
  );

  if (idleBuses.length === 0) return;

  const target = idleBuses[Math.floor(Math.random() * idleBuses.length)];
  const glyphs = GLYPHS_BY_CATEGORY.default;
  const shouldHaveGlyph = Math.random() > 0.45; // 45% pure energy, 55% micro glyph

  target.pulseCreatedAt = now;
  target.pulseLifetime = AMBIENT_PULSE_LIFETIME_MS;
  target.pulseColor = Math.random() > 0.5 ? "#06b6d4" : "#00f5d4";
  target.pulseGlyph = shouldHaveGlyph
    ? glyphs[Math.floor(Math.random() * glyphs.length)]
    : undefined;
}
