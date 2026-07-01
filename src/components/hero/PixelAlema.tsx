import { motion } from "motion/react";

const PA_H = "#1a1428";
const PA_S = "#c79073";
const PA_E = "#1a1428";
const PA_J = "#3155ff";
const PA_W = "#f5f1ea";
const PA_P = "#0e0e14";
const PA_K = "#1a1428";
const PA__ = "";

const PIXEL_ALEMA: string[] = [
  PA__,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA__,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA_H,
  PA_S,
  PA_S,
  PA_S,
  PA_S,
  PA_S,
  PA_H,
  PA_H,
  PA_S,
  PA_E,
  PA_S,
  PA_E,
  PA_S,
  PA_H,
  PA_H,
  PA_S,
  PA_S,
  PA_S,
  PA_S,
  PA_S,
  PA_H,
  PA__,
  PA_H,
  PA_S,
  PA_E,
  PA_E,
  PA_S,
  PA_H,
  PA__,
  PA__,
  PA_S,
  PA_S,
  PA_S,
  PA__,
  PA__,
  PA__,
  PA_J,
  PA_J,
  PA_W,
  PA_J,
  PA_J,
  PA__,
  PA_J,
  PA_J,
  PA_J,
  PA_W,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA__,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA_J,
  PA__,
  PA__,
  PA_P,
  PA_P,
  PA__,
  PA_P,
  PA_P,
  PA__,
  PA__,
  PA_K,
  PA_K,
  PA__,
  PA_K,
  PA_K,
  PA__,
];

export function PixelAlema({
  small = false,
  waving = false,
  idle = false,
}: {
  small?: boolean;
  waving?: boolean;
  idle?: boolean;
}) {
  const px = small ? 3 : 4;
  return (
    <motion.div
      className="relative inline-block"
      aria-hidden
      animate={idle && !waving ? { y: [0, -1.5, 0], rotate: [0, -1.5, 0.5, 0] } : undefined}
      transition={
        idle && !waving ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(7, ${px}px)`,
          gridAutoRows: `${px}px`,
          filter: "drop-shadow(1px 2px 0 rgba(0,0,0,0.55))",
        }}
      >
        {PIXEL_ALEMA.map((c, i) => (
          <span key={i} style={{ background: c || "transparent" }} />
        ))}
      </div>
      {waving && (
        <motion.span
          className="absolute"
          style={{
            left: `${px * 6}px`,
            top: `${px * 3}px`,
            width: `${px}px`,
            height: `${px}px`,
            background: "#e8b48a",
            transformOrigin: "0% 100%",
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -45, 10, -30, 0] }}
          transition={{ duration: 1.1, delay: 1.1, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
