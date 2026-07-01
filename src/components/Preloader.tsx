import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { PRELOADER_DONE_EVENT } from "@/components/hero/HeroIntroBurst";
import { PreloaderAssembly } from "@/components/preloader/PreloaderAssembly";
import {
  LOCKER_ASSET_URLS,
  statusForProgress,
  type AssemblyPhase,
} from "@/components/preloader/items";
import { SKILL_ICON_URLS } from "@/components/preloader/skill-icons";

const MIN_MS = 2800;
const MAX_WAIT_MS = 5500;

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<AssemblyPhase>("gather");
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  const springProgress = useSpring(0, { stiffness: 85, damping: 20, mass: 0.65 });
  const barWidth = useTransform(springProgress, (v) => `${v}%`);
  const [displayPct, setDisplayPct] = useState("0%");

  const statusLabel = useMemo(() => statusForProgress(progress), [progress]);

  useEffect(() => {
    springProgress.set(progress);
    setDisplayPct(`${Math.floor(progress)}%`);
  }, [progress, springProgress]);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }

    for (const src of [...LOCKER_ASSET_URLS, ...Object.values(SKILL_ICON_URLS)]) {
      const img = new Image();
      img.src = src;
    }

    const start = Date.now();
    let loaded = document.readyState === "complete";
    let raf = 0;
    let finished = false;

    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      window.setTimeout(() => setPhase("lock"), 120);
      window.setTimeout(() => {
        setPhase("blast");
        window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      }, 520);
      window.setTimeout(() => setDone(true), 1350);
    };

    const tick = () => {
      const elapsed = Date.now() - start;
      const minReached = elapsed >= MIN_MS;
      const timedOut = elapsed >= MAX_WAIT_MS;

      let target: number;
      if (loaded) {
        const loadEase = 1 - Math.pow(1 - Math.min(elapsed / MIN_MS, 1), 2.2);
        target = minReached ? 100 : 10 + loadEase * 84;
      } else {
        const waitEase = 1 - Math.pow(1 - Math.min(elapsed / MAX_WAIT_MS, 1), 1.7);
        target = 6 + waitEase * 80;
      }

      if ((loaded && minReached) || timedOut) {
        finish();
        return;
      }

      setProgress((prev) => {
        const next = prev + (target - prev) * 0.11;
        return Math.min(next, 99.1);
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [reduce]);

  useEffect(() => {
    if (done) {
      window.dispatchEvent(new CustomEvent("mascot:ready"));
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          data-preloader="active"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] h-[100dvh] overflow-hidden overscroll-none touch-none bg-[var(--midnight)] text-[var(--paper)]"
        >
          {/* hallway grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(106, 76, 255, 0.22) 0%, transparent 42%), radial-gradient(circle at 50% 120%, rgba(215, 255, 53, 0.08) 0%, transparent 35%)",
            }}
          />

          {/* portal blast wash */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[30] bg-[var(--paper)]"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={
              phase === "blast"
                ? { opacity: [0, 0.85, 0], scale: [0.2, 1.4, 2.2] }
                : { opacity: 0, scale: 0.2 }
            }
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "50% 50%" }}
          />

          <div className="relative z-10 flex h-full min-h-0 flex-col px-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-4 sm:pb-6 sm:pt-10">
            <div className="flex min-h-0 flex-1 items-center justify-center max-sm:py-2 sm:py-2">
              <div className="relative h-[min(68svh,calc(100vw-1.25rem))] w-[calc(100vw-1.25rem)] max-w-[520px] sm:h-full sm:w-full">
                <PreloaderAssembly progress={progress} phase={phase} reduceMotion={!!reduce} />
              </div>
            </div>

            <div className="relative z-20 mx-auto w-full max-w-md shrink-0 px-1 sm:px-0">
              <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[9px] tracking-[0.18em] text-[var(--paper)]/55 uppercase sm:text-[10px] sm:tracking-[0.22em]">
                <span className="truncate">Alema&apos;s locker · Assembly</span>
                <span className="shrink-0">{displayPct}</span>
              </div>

              <div className="relative h-2 w-full overflow-hidden rounded-full border border-[var(--paper)]/20 bg-[var(--midnight)]">
                <motion.div
                  className="relative h-full rounded-full bg-[var(--lime)]"
                  style={{
                    width: barWidth,
                    boxShadow: "0 0 14px rgba(215, 255, 53, 0.4)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    animate={{ x: ["-100%", "220%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>

              <div className="mt-3 text-center sm:mt-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusLabel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="font-display text-lg leading-snug text-[var(--paper)] italic sm:text-xl md:text-2xl"
                  >
                    {statusLabel}
                    <motion.span
                      aria-hidden
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      …
                    </motion.span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
