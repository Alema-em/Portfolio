import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import {
  CHIP_CLASS,
  FLYING_ITEMS,
  ORBIT_RING_TIERS,
  type AssemblyPhase,
  type FlyingItem,
} from "@/components/preloader/items";

type LayoutMetrics = {
  spread: number;
  itemScale: number;
  centerY: number;
  isNarrow: boolean;
  ringW: number;
  ringH: number;
};

function useAssemblyLayout(ref: RefObject<HTMLDivElement | null>): LayoutMetrics {
  const [metrics, setMetrics] = useState<LayoutMetrics>({
    spread: 300,
    itemScale: 1,
    centerY: 0.4,
    isNarrow: false,
    ringW: 2.15,
    ringH: 1.5,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const isNarrow = viewportW < 640;

      const spread = isNarrow
        ? Math.max(128, Math.min(viewportW * 0.46, height * 0.48, width * 0.5) - 2)
        : Math.max(220, Math.min(width * 0.46, height * 0.5) - 20);

      setMetrics({
        spread,
        itemScale: isNarrow
          ? Math.min(1.08, Math.max(0.92, viewportW / 340))
          : Math.min(1.08, Math.max(0.84, spread / 290)),
        centerY: isNarrow ? 0.5 : 0.4,
        isNarrow,
        ringW: isNarrow ? 2.02 : 2.15,
        ringH: isNarrow ? 1.38 : 1.5,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return metrics;
}

function orbitPos(angle: number, radius: number, isNarrow: boolean) {
  return {
    x: Math.cos(angle) * radius * (isNarrow ? 1.02 : 1.1),
    y: Math.sin(angle) * radius * (isNarrow ? 0.68 : 0.76),
  };
}

function travelT(progress: number, arriveAt: number) {
  const start = arriveAt - 10;
  if (progress <= start) return 0;
  if (progress >= arriveAt) return 1;
  const raw = (progress - start) / (arriveAt - start);
  return 1 - Math.pow(1 - raw, 2.2);
}

function Sticker({
  item,
  progress,
  phase,
  index,
  reduceMotion,
  spread,
  itemScale,
  centerY,
  isNarrow,
}: {
  item: FlyingItem;
  progress: number;
  phase: AssemblyPhase;
  index: number;
  reduceMotion: boolean;
  spread: number;
  itemScale: number;
  centerY: number;
  isNarrow: boolean;
}) {
  const [hidden, setHidden] = useState(false);
  const incoming = progress >= item.arriveAt - 10;
  const t = travelT(progress, item.arriveAt);

  const orbitR = spread * ORBIT_RING_TIERS[item.orbit.ring];
  const { x: ox, y: oy } = orbitPos(item.orbit.angle, orbitR, isNarrow);

  const fromMul = isNarrow ? item.from.distanceMul * 0.82 : item.from.distanceMul;
  const fromR = spread * fromMul;
  const fx = Math.cos(item.from.angle) * fromR;
  const fy = Math.sin(item.from.angle) * fromR;

  const cx = fx + (ox - fx) * t;
  const cy = fy + (oy - fy) * t;
  const cr = item.from.rotate + (item.orbit.rotate - item.from.rotate) * t;

  const gather = {
    x: cx,
    y: cy,
    rotate: cr,
    scale: (isNarrow ? 0.52 + t * 0.48 : 0.18 + t * 0.82) * itemScale,
    opacity: hidden ? 0 : incoming ? (isNarrow ? 0.62 + t * 0.38 : 0.35 + t * 0.65) : 0,
  };

  const lock = { x: 0, y: 0, rotate: 0, scale: 0.06 * itemScale, opacity: hidden ? 0 : 0.9 };
  const blast = {
    x: fx * 1.55,
    y: fy * 1.55,
    rotate: item.from.rotate * 2.2,
    scale: 0,
    opacity: 0,
  };

  const target = phase === "blast" ? blast : phase === "lock" ? lock : gather;

  if (hidden && !incoming) return null;

  const assetSize =
    "size" in item ? Math.round(item.size * (isNarrow ? itemScale * 1.08 : itemScale)) : undefined;

  return (
    <motion.div
      className="absolute left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ top: `${centerY * 100}%` }}
      initial={false}
      animate={target}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : {
              type: "spring",
              stiffness: phase === "blast" ? 220 : 72,
              damping: phase === "blast" ? 20 : 14,
              mass: 0.85,
              delay: phase === "gather" ? index * 0.006 : index * 0.003,
            }
      }
    >
      {item.kind === "locker" && (
        <img
          src={item.src}
          alt=""
          draggable={false}
          width={assetSize}
          loading="eager"
          decoding="async"
          onError={() => setHidden(true)}
          className="block h-auto max-w-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.52)]"
        />
      )}

      {item.kind === "skill" && (
        <img
          src={item.icon}
          alt=""
          draggable={false}
          width={assetSize}
          height={assetSize}
          loading="eager"
          decoding="async"
          onError={() => setHidden(true)}
          className="block object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.48)]"
        />
      )}

      {item.kind === "chip" && (
        <span
          className={`inline-block rotate-[-4deg] rounded-md border-2 border-[var(--ink)] px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.08em] uppercase shadow-[2px_2px_0_0_var(--ink)] sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.1em] sm:shadow-[3px_3px_0_0_var(--ink)] ${CHIP_CLASS[item.color]}`}
        >
          {item.label}
        </span>
      )}
    </motion.div>
  );
}

type PreloaderAssemblyProps = {
  progress: number;
  phase: AssemblyPhase;
  reduceMotion: boolean;
};

export function PreloaderAssembly({ progress, phase, reduceMotion }: PreloaderAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { spread, itemScale, centerY, isNarrow, ringW, ringH } = useAssemblyLayout(containerRef);
  const locked = phase === "lock" || phase === "blast";
  const centerPct = `${centerY * 100}%`;

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden px-1 sm:px-2">
      <div className="relative h-full w-full sm:min-h-[min(66vh,580px)]">
        <motion.div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--paper)]/8"
          style={{
            top: centerPct,
            width: spread * ORBIT_RING_TIERS[0] * ringW,
            height: spread * ORBIT_RING_TIERS[0] * ringH,
          }}
          animate={{ rotate: locked ? 0 : 360, scale: locked ? 0.5 : 1 }}
          transition={{
            rotate: { duration: 34, repeat: Infinity, ease: "linear" },
            scale: { type: "spring", stiffness: 110, damping: 18 },
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--lilac)]/12"
          style={{
            top: centerPct,
            width: spread * ORBIT_RING_TIERS[1] * ringW,
            height: spread * ORBIT_RING_TIERS[1] * ringH,
          }}
          animate={{ rotate: locked ? 0 : -360, opacity: locked ? 0 : 0.45 }}
          transition={{
            rotate: { duration: 42, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.35 },
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--paper)]/5"
          style={{
            top: centerPct,
            width: spread * ORBIT_RING_TIERS[2] * ringW,
            height: spread * ORBIT_RING_TIERS[2] * ringH,
          }}
          animate={{ rotate: locked ? 0 : 360, opacity: locked ? 0 : 0.25 }}
          transition={{ rotate: { duration: 54, repeat: Infinity, ease: "linear" } }}
        />

        {FLYING_ITEMS.map((item, i) => (
          <Sticker
            key={item.id}
            item={item}
            progress={progress}
            phase={phase}
            index={i}
            reduceMotion={reduceMotion}
            spread={spread}
            itemScale={itemScale}
            centerY={centerY}
            isNarrow={isNarrow}
          />
        ))}

        <motion.div
          className="absolute left-1/2 z-[10] -translate-x-1/2 -translate-y-1/2"
          style={{ top: centerPct }}
          animate={
            phase === "blast"
              ? { scale: [1, 1.35, 2.6], opacity: [1, 1, 0] }
              : locked
                ? { scale: [1, 0.92, 1.05, 1] }
                : { scale: [1, 1.03, 1] }
          }
          transition={
            phase === "blast"
              ? { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
              : locked
                ? { duration: 0.42 }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              className="absolute -inset-6 rounded-full bg-[var(--purple-locker)]/30 blur-2xl sm:-inset-10 sm:blur-3xl"
              animate={{ opacity: [0.28, 0.65, 0.28], scale: [0.94, 1.06, 0.94] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div
              className="relative flex h-44 w-44 flex-col items-center justify-center rounded-2xl border-[3px] border-[var(--paper)] shadow-[8px_8px_0_0_var(--lime)] max-sm:h-[min(11.5rem,42vw)] max-sm:w-[min(11.5rem,42vw)] max-sm:shadow-[7px_7px_0_0_var(--lime)]"
              style={{
                background: "linear-gradient(145deg, #8b6dff 0%, #5a3eea 55%, #4a32c4 100%)",
              }}
            >
              <div className="mb-2 border border-[var(--ink)] bg-[#ffbf00] px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-[var(--ink)] sm:mb-2.5 sm:px-2.5 sm:text-[10px] sm:tracking-[0.16em]">
                ALEMA EMRAN
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[var(--paper)] bg-[var(--cobalt)] font-mono text-2xl font-bold text-[var(--paper)] shadow-[4px_4px_0_0_var(--ink)]">
                AE
              </div>
              <div className="mt-2.5 h-1.5 w-[4.75rem] overflow-hidden rounded-full border border-[var(--paper)]/35 bg-[var(--midnight)]/40 sm:w-20">
                <motion.div className="h-full bg-[var(--lime)]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        {phase === "blast" && (
          <>
            <motion.div
              className="pointer-events-none absolute left-1/2 z-[20] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--lime)]"
              style={{ top: centerPct }}
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 9, opacity: 0 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="pointer-events-none absolute left-1/2 z-[20] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lime)] mix-blend-screen"
              style={{ top: centerPct }}
              initial={{ scale: 0.15, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </>
        )}
      </div>
    </div>
  );
}
