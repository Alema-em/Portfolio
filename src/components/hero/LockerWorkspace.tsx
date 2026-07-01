import { motion, useReducedMotion } from "motion/react";

const A = "/assets/locker";

/**
 * Figma "Desktop - 3" — layout from inspect CSS export.
 * Crop to visible locker bounds (left -273 → right 1435).
 */
const CROP_LEFT = -273;
const CROP_TOP = 0;
const CROP_W = 1708;
const CROP_H = 1126;

function figma(
  left: number,
  top: number,
  width: number,
  height: number,
  transform?: string,
): React.CSSProperties {
  return {
    left: `${((left - CROP_LEFT) / CROP_W) * 100}%`,
    top: `${((top - CROP_TOP) / CROP_H) * 100}%`,
    width: `${(width / CROP_W) * 100}%`,
    height: `${(height / CROP_H) * 100}%`,
    transformOrigin: "center center",
    ...(transform ? { transform } : {}),
  };
}

type LayerProps = {
  src: string;
  alt: string;
  z: number;
  style: React.CSSProperties;
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  whileHover?: React.ComponentProps<typeof motion.div>["whileHover"];
  transition?: React.ComponentProps<typeof motion.div>["transition"];
};

/** Figma layers use `background: url(...)` on sized absolute boxes — not <img>. */
function Layer({ src, alt, z, style, animate, whileHover, transition }: LayerProps) {
  return (
    <motion.div
      role="img"
      aria-label={alt || undefined}
      className="absolute pointer-events-none select-none bg-center bg-no-repeat"
      style={{
        zIndex: z,
        backgroundImage: `url(${src})`,
        backgroundSize: "100% 100%",
        ...style,
      }}
      animate={animate}
      whileHover={whileHover}
      transition={transition}
    />
  );
}

export function LockerWorkspace() {
  const reduce = useReducedMotion();

  return (
    <div
      className="locker-scene relative mx-auto w-[min(100%,calc(100vw-1.5rem))] aspect-[1708/1126] select-none overflow-hidden max-lg:-translate-x-[5.5%] sm:w-[min(94vw,38rem)] md:w-[min(90vw,42rem)] lg:ml-auto lg:translate-x-0 lg:h-[min(72vh,760px)] lg:w-auto lg:max-w-none xl:h-[min(76vh,820px)]"
      style={{ containerType: "size" }}
      aria-label="Alema's locker workspace — code, systems, and projects in progress"
    >
      <figure className="absolute inset-0 m-0">
        {/* locker */}
        <Layer src={`${A}/locker.png`} alt="" z={0} style={figma(-273, 3, 1688, 1125)} />

        {/* locker door */}
        <Layer
          src={`${A}/lockerdoor.png`}
          alt=""
          z={1}
          style={figma(684, 13, 751, 1126)}
          animate={reduce ? undefined : { rotate: [0.34, 0.52, 0.28, 0.34] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* current builds */}
        <Layer
          src={`${A}/current-builds.png`}
          alt="Current builds"
          z={2}
          style={figma(48, 318, 613, 409)}
        />

        {/* stickynote 1 */}
        <Layer
          src={`${A}/stickynote.png`}
          alt="Sticky note"
          z={3}
          style={figma(374, 326, 376, 251)}
          whileHover={reduce ? undefined : { rotate: [0, 2, -1, 0] }}
          transition={{ duration: 0.35 }}
        />

        {/* potrait 1 */}
        <Layer
          src={`${A}/portrait.png`}
          alt="Polaroid portrait"
          z={4}
          style={figma(558, 377, 363, 242)}
          animate={reduce ? undefined : { rotate: [0, 1.5, -1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* lamp */}
        <Layer
          src={`${A}/lamp.png`}
          alt="Desk lamp"
          z={5}
          style={figma(-11.61, 499.41, 534.52, 353.56, "rotate(0.34deg)")}
        />

        {/* laptop 1 */}
        <Layer
          src={`${A}/laptop.png`}
          alt="Laptop"
          z={6}
          style={figma(312, 523, 521, 347)}
          animate={reduce ? undefined : { opacity: [1, 0.94, 1, 0.97, 1] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* bottle */}
        <Layer
          src={`${A}/bottle.png`}
          alt="Water bottle"
          z={7}
          style={figma(634.55, 560.71, 384.65, 254.43, "rotate(0.34deg)")}
        />

        {/* penholder 1 */}
        <Layer
          src={`${A}/penholder.png`}
          alt="Pen holder"
          z={8}
          style={figma(527, 815, 267, 178)}
        />

        {/* notepad 1 */}
        <Layer src={`${A}/notepad.png`} alt="Notepad" z={9} style={figma(225, 647, 326, 217)} />

        {/* plant 1 */}
        <Layer
          src={`${A}/plant.png`}
          alt="Desk plant"
          z={10}
          style={figma(558, 631, 384, 256)}
          animate={reduce ? undefined : { rotate: [0, 1.2, -0.8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* camera */}
        <Layer
          src={`${A}/camera.png`}
          alt="Camera"
          z={11}
          style={figma(87, 798, 382.17, 252.79, "rotate(0.34deg)")}
        />

        {/* books 1 */}
        <Layer src={`${A}/books.png`} alt="Books" z={12} style={figma(92, 120, 376, 251)} />

        {/* headphone 1 */}
        <Layer
          src={`${A}/headphone.png`}
          alt="Headphones"
          z={13}
          style={figma(245, 100, 363, 243, "matrix(-1, 0, 0, 1, 0, 0)")}
        />

        {/* mug 1 */}
        <Layer src={`${A}/mug.png`} alt="Coffee mug" z={14} style={figma(502, 112, 363, 242)} />

        {/* calculator 1 */}
        <Layer
          src={`${A}/calculator.png`}
          alt="Calculator"
          z={15}
          style={figma(625, 109, 328.75, 219.16, "rotate(-7.43deg)")}
        />

        {/* duck */}
        <Layer
          src={`${A}/duck.png`}
          alt="Rubber duck"
          z={16}
          style={figma(305, 835, 287.47, 190.15, "rotate(0.34deg)")}
        />

        {/* mini tv */}
        <Layer src={`${A}/mini-tv.png`} alt="Mini TV" z={17} style={figma(627, 815, 333, 222)} />

        {/* airpodes 1 */}
        <Layer src={`${A}/airpodes.png`} alt="AirPods" z={18} style={figma(614, 907, 180, 120)} />
      </figure>

      {/* Rectangle 1 — wide enough for text (165+239 − 152 = 252) */}
      <div
        className="absolute z-[19] box-border border border-black bg-[#ffbf00] pointer-events-none"
        style={figma(152, 71, 252, 29)}
        aria-hidden
      />

      {/* ALEMA EMRAN — Figma text layer */}
      <p
        className="absolute z-[20] m-0 flex items-center text-black pointer-events-none whitespace-nowrap"
        style={{
          ...figma(165, 68, 239, 26),
          fontFamily: '"Intel One Mono", monospace',
          fontWeight: 400,
          fontSize: `calc(100cqh * ${24 / CROP_H})`,
          lineHeight: `${33 / 24}`,
        }}
        aria-hidden
      >
        ALEMA EMRAN
      </p>
    </div>
  );
}
