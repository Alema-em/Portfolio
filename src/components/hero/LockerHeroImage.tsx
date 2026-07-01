import lockerHeroImg from "@/assets/locker-hero.png";
import { motion } from "motion/react";

export function LockerHeroImage() {
  return (
    <figure className="relative m-0 w-full">
      {/* ambient glow behind locker */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12%] left-[8%] right-[2%] bottom-[18%] rounded-[40%] bg-[var(--cobalt)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[4%] left-[6%] right-0 h-[14%] rounded-[50%] bg-[var(--ink)]/28 blur-2xl"
      />
      <motion.img
        src={lockerHeroImg}
        alt="Alema's open locker — books, code, sketches, and shipping notes from four years of building"
        width={1024}
        height={1280}
        decoding="async"
        fetchPriority="high"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative z-[1] w-full h-auto block select-none"
        style={{
          filter:
            "drop-shadow(16px 22px 0 rgba(13, 19, 33, 0.2)) drop-shadow(0 32px 48px rgba(13, 19, 33, 0.12))",
        }}
      />
    </figure>
  );
}
