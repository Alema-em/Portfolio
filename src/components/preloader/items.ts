import {
  SKILL_ICON_IDS,
  SKILL_ICON_SIZES,
  SKILL_ICON_URLS,
} from "@/components/preloader/skill-icons";

export type AssemblyPhase = "gather" | "lock" | "blast";

export type FlyingItem =
  | {
      id: string;
      kind: "locker";
      src: string;
      from: { angle: number; distanceMul: number; rotate: number };
      orbit: { angle: number; ring: number; rotate: number };
      arriveAt: number;
      size: number;
    }
  | {
      id: string;
      kind: "skill";
      icon: string;
      from: { angle: number; distanceMul: number; rotate: number };
      orbit: { angle: number; ring: number; rotate: number };
      arriveAt: number;
      size: number;
    }
  | {
      id: string;
      kind: "chip";
      label: string;
      color: "lime" | "coral" | "lilac" | "butter" | "cobalt";
      from: { angle: number; distanceMul: number; rotate: number };
      orbit: { angle: number; ring: number; rotate: number };
      arriveAt: number;
    };

const A = "/assets/locker";

/** Visible at distance — spread out when they land. */
const LOCKER_PIECES: { id: string; src: string; size: number }[] = [
  { id: "duck", src: `${A}/duck.png`, size: 112 },
  { id: "mug", src: `${A}/mug.png`, size: 118 },
  { id: "books", src: `${A}/books.png`, size: 122 },
  { id: "laptop", src: `${A}/laptop.png`, size: 138 },
  { id: "stickynote", src: `${A}/stickynote.png`, size: 114 },
  { id: "camera", src: `${A}/camera.png`, size: 120 },
  { id: "plant", src: `${A}/plant.png`, size: 116 },
  { id: "headphone", src: `${A}/headphone.png`, size: 112 },
  { id: "bottle", src: `${A}/bottle.png`, size: 110 },
  { id: "notepad", src: `${A}/notepad.png`, size: 108 },
  { id: "lamp", src: `${A}/lamp.png`, size: 124 },
  { id: "calculator", src: `${A}/calculator.png`, size: 106 },
  { id: "penholder", src: `${A}/penholder.png`, size: 102 },
  { id: "mini-tv", src: `${A}/mini-tv.png`, size: 108 },
  { id: "airpodes", src: `${A}/airpodes.png`, size: 96 },
  { id: "portrait", src: `${A}/portrait.png`, size: 114 },
  { id: "current-builds", src: `${A}/current-builds.png`, size: 128 },
];

const CHIPS: {
  id: string;
  label: string;
  color: "lime" | "coral" | "lilac" | "butter" | "cobalt";
}[] = [
  { id: "ship", label: "SHIP IT", color: "lime" },
  { id: "bits", label: "BITS Pilani", color: "lilac" },
  { id: "v32", label: "v3.2", color: "coral" },
  { id: "build", label: "BUILD", color: "butter" },
  { id: "fullstack", label: "FULL STACK", color: "cobalt" },
];

/** Ring tier 0–2 — actual radius computed from viewport in PreloaderAssembly. */
export const ORBIT_RING_TIERS = [0.68, 0.86, 1] as const;

function fromEdge(angle: number, index: number, distanceMul: number) {
  const spin = ((index % 7) - 3) * 5;
  return {
    angle,
    distanceMul,
    rotate: (angle * 180) / Math.PI + spin,
  };
}

function buildFlyingItems(): FlyingItem[] {
  const skills = SKILL_ICON_IDS.map((id) => ({
    id,
    kind: "skill" as const,
    icon: SKILL_ICON_URLS[id],
    size: SKILL_ICON_SIZES[id],
  }));

  const raw: Omit<FlyingItem, "from" | "orbit" | "arriveAt">[] = [
    ...LOCKER_PIECES.map((p) => ({
      id: p.id,
      kind: "locker" as const,
      src: p.src,
      size: p.size,
    })),
    ...skills,
    ...CHIPS.map((c) => ({
      id: c.id,
      kind: "chip" as const,
      label: c.label,
      color: c.color,
    })),
  ];

  const total = raw.length;

  return raw.map((item, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const ring = i % ORBIT_RING_TIERS.length;
    const arriveAt = Math.min(96, Math.floor(4 + (i / total) * 92));
    const fromAngle = angle + Math.PI * 0.85;
    const from = fromEdge(fromAngle, i, 2.35 + (i % 4) * 0.14);

    return {
      ...item,
      from: { ...from, rotate: from.rotate + (i % 2 === 0 ? 6 : -6) },
      orbit: {
        angle,
        ring,
        rotate: ((i % 5) - 2) * 3,
      },
      arriveAt,
    } as FlyingItem;
  });
}

export const FLYING_ITEMS = buildFlyingItems();

export const STATUS_STEPS = [
  { at: 0, label: "Scanning the hallway" },
  { at: 18, label: "Gathering locker gear" },
  { at: 42, label: "Loading skill stickers" },
  { at: 68, label: "Locking the orbit" },
  { at: 88, label: "Opening the portal" },
] as const;

export function statusForProgress(p: number) {
  let label: (typeof STATUS_STEPS)[number]["label"] = STATUS_STEPS[0].label;
  for (const step of STATUS_STEPS) {
    if (p >= step.at) label = step.label;
  }
  return label;
}

export const CHIP_CLASS = {
  lime: "bg-[var(--lime)] text-[var(--ink)]",
  coral: "bg-[var(--coral)] text-[var(--paper)]",
  lilac: "bg-[var(--lilac)] text-[var(--ink)]",
  butter: "bg-[var(--butter)] text-[var(--ink)]",
  cobalt: "bg-[var(--cobalt)] text-[var(--paper)]",
} as const;

export const LOCKER_ASSET_URLS = LOCKER_PIECES.map((p) => p.src);
