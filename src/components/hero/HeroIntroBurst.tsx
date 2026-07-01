import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export const PRELOADER_DONE_EVENT = "portfolio:preloader-done";

export function HeroIntroBurst() {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const onDone = () => {
      setBurst(true);
      window.setTimeout(() => setBurst(false), 900);
    };

    window.addEventListener(PRELOADER_DONE_EVENT, onDone);
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
  }, [reduce]);

  if (reduce || !burst) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[25] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <motion.div
        className="absolute left-1/2 top-[38%] h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(215,255,53,0.55) 0%, rgba(49,85,255,0.35) 28%, transparent 62%)",
        }}
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: 1.15, opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-[var(--lime)]/20 mix-blend-screen"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}
