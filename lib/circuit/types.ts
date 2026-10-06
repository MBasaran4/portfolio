export type CircuitCategory = "ai" | "backend" | "frontend" | "default";

export type InteractionMode = "idle" | "mouse" | "scroll" | "hover" | "click";

export interface Point {
  x: number;
  y: number;
}

export interface CircuitSignal {
  id: number;
  startX: number;
  startY: number;
  cornerX: number;
  cornerY: number;
  targetX: number;
  targetY: number;

  points: Point[];
  segmentLengths: number[];
  totalLength: number;

  progress: number;
  speed: number;

  glyph?: string;
  color: string;

  category?: CircuitCategory;

  createdAt: number;
  lifetime: number;
  intensity?: number;
}

export interface AmbientNode {
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

export interface AmbientBusLine {
  id: number;
  points: Point[];
  segmentLengths: number[];
  totalLength: number;
  activePulseProgress?: number;
  pulseColor?: string;
  pulseGlyph?: string;
  pulseCreatedAt?: number;
  pulseLifetime?: number;
}

export interface MouseTrace {
  id: number;
  points: Point[];
  color: string;
  createdAt: number;
  lifetime: number;
  speed: number;
}

export interface ClickPulse {
  id: number;
  x: number;
  y: number;
  category: CircuitCategory;
  color: string;
  createdAt: number;
  lifetime: number;
  signals: CircuitSignal[];
}
