import { CircuitCategory } from "./types";

export const GLYPHS_BY_CATEGORY: Record<CircuitCategory, string[]> = {
  ai: ["tensor", "loss", "conv2d", "weights", "grad", "relu", "token"],
  backend: ["200_OK", "0x7F", "async", "ptr*", "socket", "REST", "heap"],
  frontend: ["()=>", "<div/>", "{...}", "state", "useMemo", "DOM", "props"],
  default: [
    "0x1F",
    "()=>",
    "{...}",
    "ptr*",
    "200_OK",
    "tensor",
    "&&",
    "0110",
    "git",
    "await",
  ],
};

export const COLORS_BY_CATEGORY: Record<CircuitCategory, string> = {
  ai: "#c084fc", // Refined violet
  backend: "#10b981", // Crisp emerald / teal
  frontend: "#06b6d4", // Electric cyan
  default: "#00f5d4", // Bright mint accent
};

// Activity energy thresholds (0.0 to 1.0)
export const ACTIVITY_IDLE = 0.08;
export const ACTIVITY_MOUSE = 0.32;
export const ACTIVITY_SCROLL = 0.52;
export const ACTIVITY_HOVER = 0.68;
export const ACTIVITY_CLICK = 1.0;

// Maximum object limits per device tier
export const MAX_SIGNALS_DESKTOP = 8;
export const MAX_SIGNALS_TABLET = 4;
export const MAX_SIGNALS_MOBILE = 2;

export const MAX_AMBIENT_NODES_DESKTOP = 20;
export const MAX_AMBIENT_NODES_TABLET = 12;
export const MAX_AMBIENT_NODES_MOBILE = 6;

export const MAX_MOUSE_TRACES = 4;
export const MAX_CLICK_PULSES = 3;

// Timing constants (ms)
export const NODE_COOLDOWN_MS = 500;
export const SIGNAL_LIFETIME_MS = 1050;
export const MOUSE_TRACE_LIFETIME_MS = 480;
export const CLICK_PULSE_LIFETIME_MS = 480;
export const SCROLL_SIGNAL_LIFETIME_MS = 850;
export const AMBIENT_PULSE_LIFETIME_MS = 2200;
