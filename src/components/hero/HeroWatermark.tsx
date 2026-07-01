import { motion, useReducedMotion } from "motion/react";

const WORDS = [
  {
    text: "design",
    x: "68%",
    y: "6%",
    r: -10,
    size: "clamp(3.5rem, 9vw, 7.5rem)",
    color: "rgba(49,85,255,0.11)",
  },
  {
    text: "build",
    x: "42%",
    y: "54%",
    r: -6,
    size: "clamp(4.5rem, 12vw, 10rem)",
    color: "rgba(255,98,87,0.1)",
  },
  {
    text: "ship",
    x: "76%",
    y: "24%",
    r: 8,
    size: "clamp(4rem, 10vw, 8rem)",
    color: "rgba(215,255,53,0.12)",
  },
  {
    text: "ideas",
    x: "18%",
    y: "68%",
    r: 4,
    size: "clamp(3.5rem, 8.5vw, 7rem)",
    color: "rgba(185,167,255,0.11)",
  },
] as const;

export function HeroWatermark() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {WORDS.map((w, i) => (
        <motion.span
          key={w.text}
          className="absolute font-display italic select-none"
          style={{
            left: w.x,
            top: w.y,
            rotate: w.r,
            fontSize: w.size,
            color: w.color,
          }}
          animate={
            reduce ? undefined : { y: [0, i % 2 === 0 ? -8 : 8, 0], opacity: [0.75, 1, 0.75] }
          }
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {w.text}
        </motion.span>
      ))}
    </div>
  );
}
