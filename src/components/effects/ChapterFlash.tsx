import { motion, useReducedMotion } from "motion/react";

export function ChapterFlash() {
  const reduce = useReducedMotion();
  if (reduce) return <div className="h-px bg-[var(--ink)]" aria-hidden />;

  return (
    <div className="relative z-30 overflow-hidden bg-[var(--ink)]" aria-hidden>
      <motion.div
        className="flex items-center justify-center gap-4 py-2 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--lime)]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.45 }}
      >
        <motion.span
          className="h-px w-12 bg-[var(--lime)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        level 01 loading
        <motion.span
          className="h-px w-12 bg-[var(--lime)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <motion.div
        className="h-1 bg-[var(--lime)] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  );
}
