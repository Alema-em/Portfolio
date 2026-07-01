import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function HeroCursorLight() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    const section = el?.closest("#top");
    if (!el || !section) return;

    const onMove = (e: Event) => {
      const mouse = e as MouseEvent;
      const r = section.getBoundingClientRect();
      const x = ((mouse.clientX - r.left) / r.width) * 100;
      const y = ((mouse.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--lx", `${x}%`);
      el.style.setProperty("--ly", `${y}%`);
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    return () => section.removeEventListener("mousemove", onMove);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] opacity-80 mix-blend-soft-light"
      style={{
        background:
          "radial-gradient(600px circle at var(--lx, 70%) var(--ly, 40%), rgba(106,76,255,0.35), transparent 55%), radial-gradient(400px circle at var(--lx, 70%) var(--ly, 40%), rgba(215,255,53,0.12), transparent 50%)",
      }}
    />
  );
}
