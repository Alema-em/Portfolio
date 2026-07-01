export const MASCOT_ANIMATIONS = [
  "idle",
  "walk-right",
  "walk-left",
  "wave",
  "typing",
  "thinking",
  "point",
  "sit",
  "coffee",
  "celebrate",
  "peek",
  "sleep",
] as const;

export type MascotAnimation = (typeof MASCOT_ANIMATIONS)[number];

export type AnimationClip = {
  sheet: string;
  frames: number;
  frameWidth?: number;
  frameHeight?: number;
  loop?: boolean;
  fps?: number;
  flipX?: boolean;
  /** When set, mirrors another clip instead of loading its own sheet. */
  mirrorOf?: MascotAnimation;
};

export type MascotManifest = {
  frameWidth: number;
  frameHeight: number;
  defaultFps: number;
  defaultScale: number;
  animations: Record<MascotAnimation, AnimationClip>;
};

export type MascotProps = {
  animation: MascotAnimation;
  fps?: number;
  loop?: boolean;
  scale?: number;
  fitHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  onReady?: () => void;
};
