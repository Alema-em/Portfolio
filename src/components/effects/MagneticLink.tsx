import { useRef, type ComponentPropsWithoutRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props = ComponentPropsWithoutRef<typeof motion.a> & {
  strength?: number;
};

export function MagneticLink({ children, strength = 0.28, className, style, ...props }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      className={className}
      style={{ ...style, x: reduce ? 0 : springX, y: reduce ? 0 : springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
