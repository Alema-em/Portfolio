import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  text: string;
  visible: boolean;
  below?: boolean;
};

function MascotCaptionInner({ text, visible, below = false }: Props) {
  return (
    <AnimatePresence mode="wait">
      {visible && text ? (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: below ? -3 : 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: below ? 2 : -2 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={
            below
              ? "absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--ink)]/25 bg-[var(--paper)]/95 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--ink)]/80 backdrop-blur-sm"
              : "absolute left-full top-1/2 z-10 ml-2.5 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--ink)]/25 bg-[var(--paper)]/95 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--ink)]/80 backdrop-blur-sm sm:block"
          }
        >
          {text}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export const MascotCaption = memo(MascotCaptionInner);
