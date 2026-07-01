import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** True on devices with a precise pointer (mouse/trackpad), not touch-only. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

export function HeroLockerStage({ children, className }: Props) {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 140, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 22 });
  const scale = useSpring(1, { stiffness: 200, damping: 26 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !finePointer || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(x * 16);
    rotateX.set(-y * 12);
    scale.set(1.02);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  if (reduce || !finePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ perspective: 1400 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          opacity: 1,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        className="relative w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
