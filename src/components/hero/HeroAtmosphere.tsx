import { motion, useReducedMotion } from "motion/react";

export function HeroAtmosphere() {
  const reduce = useReducedMotion();

  const baseWash =
    "radial-gradient(ellipse 62% 58% at 88% 34%, rgba(106,76,255,0.38) 0%, transparent 62%), radial-gradient(ellipse 48% 44% at 6% 52%, rgba(215,255,53,0.22) 0%, transparent 58%), radial-gradient(ellipse 40% 36% at 42% 8%, rgba(255,214,90,0.28) 0%, transparent 55%), linear-gradient(118deg, rgba(185,167,255,0.14) 0%, transparent 38%, rgba(49,85,255,0.08) 72%, transparent 100%)";

  if (reduce) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: baseWash }}
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            baseWash,
            "radial-gradient(ellipse 64% 60% at 84% 38%, rgba(49,85,255,0.42) 0%, transparent 62%), radial-gradient(ellipse 46% 42% at 10% 50%, rgba(215,255,53,0.24) 0%, transparent 58%), radial-gradient(ellipse 38% 34% at 38% 10%, rgba(255,98,87,0.16) 0%, transparent 52%), linear-gradient(122deg, rgba(255,214,90,0.18) 0%, transparent 42%, rgba(106,76,255,0.12) 68%, transparent 100%)",
            baseWash,
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-[24%] right-[2%] h-[62vh] w-[62vh] rounded-full bg-[var(--cobalt)]/38 blur-[100px]"
        animate={{ x: [0, 32, -16, 0], y: [0, -22, 14, 0], scale: [1, 1.1, 0.96, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[4%] left-[-12%] h-[46vh] w-[46vh] rounded-full bg-[var(--lime)]/22 blur-[90px]"
        animate={{ x: [0, -28, 18, 0], y: [0, 16, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[28%] left-[38%] h-[32vh] w-[32vh] rounded-full bg-[var(--coral)]/18 blur-[80px]"
        animate={{ opacity: [0.45, 0.9, 0.5], scale: [0.88, 1.12, 0.92] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[12%] left-[8%] h-[28vh] w-[28vh] rounded-full bg-[var(--butter)]/28 blur-[72px]"
        animate={{ opacity: [0.35, 0.65, 0.4], x: [0, 18, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.48]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,19,33,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(13,19,33,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 95% 85% at 50% 42%, black 20%, transparent 72%)",
        }}
      />
      {/* Diagonal hatch */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(125deg, rgba(49,85,255,0.12) 0px, rgba(49,85,255,0.12) 1px, transparent 1px, transparent 18px)",
          maskImage: "radial-gradient(ellipse 90% 80% at 55% 45%, black 15%, transparent 70%)",
        }}
      />
      {/* Dot constellation */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(49,85,255,0.35) 0 2px, transparent 2px), radial-gradient(circle at 28% 72%, rgba(215,255,53,0.4) 0 2px, transparent 2px), radial-gradient(circle at 62% 14%, rgba(255,98,87,0.35) 0 2px, transparent 2px), radial-gradient(circle at 88% 58%, rgba(185,167,255,0.4) 0 2px, transparent 2px), radial-gradient(circle at 74% 82%, rgba(255,214,90,0.45) 0 2px, transparent 2px)",
        }}
      />
    </div>
  );
}
