import { memo, useEffect, useMemo, useRef } from "react";
import { MASCOT_MANIFEST, mascotSheetUrl, resolveClip } from "@/components/mascot/manifest";
import { preloadSprite } from "@/components/mascot/sprite-cache";
import type { MascotAnimation, MascotProps } from "@/components/mascot/types";

type SheetMeta = { w: number; h: number };

function frameWidthPx(meta: SheetMeta, frames: number, cellW: number, scale: number) {
  if (frames > 1) return (meta.w / frames) * scale;
  return cellW * scale;
}

function MascotInner({
  animation,
  fps = MASCOT_MANIFEST.defaultFps,
  loop = true,
  fitHeight = 96,
  className,
  style,
  onComplete,
  onReady,
}: MascotProps) {
  const clip = useMemo(() => resolveClip(animation), [animation]);
  const sheetSrc = mascotSheetUrl(clip.sheet);
  const frames = clip.frames;
  const shouldLoop = loop ?? clip.loop ?? true;
  const frameFps = fps ?? clip.fps ?? MASCOT_MANIFEST.defaultFps;
  const flipX = clip.flipX ?? false;
  const isSleep = animation === "sleep";

  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<SheetMeta | null>(null);
  const frameRef = useRef(0);
  const doneRef = useRef(false);

  const cellW = clip.frameWidth ?? MASCOT_MANIFEST.frameWidth;
  const cellH = clip.frameHeight ?? MASCOT_MANIFEST.frameHeight;
  const estScale = fitHeight / cellH;
  const estW = isSleep ? (cellW / cellH) * fitHeight : cellW * estScale;

  useEffect(() => {
    frameRef.current = 0;
    doneRef.current = false;
    let cancelled = false;

    preloadSprite(sheetSrc)
      .then((img) => {
        if (cancelled) return;
        metaRef.current = { w: img.naturalWidth, h: img.naturalHeight };
        const scale = fitHeight / img.naturalHeight;
        const frameW = isSleep
          ? (img.naturalWidth / img.naturalHeight) * fitHeight
          : frameWidthPx(metaRef.current, frames, cellW, scale);
        const sheetW = isSleep ? frameW : frameW * frames;

        if (wrapRef.current) {
          wrapRef.current.style.width = `${frameW}px`;
          wrapRef.current.style.height = `${fitHeight}px`;
        }
        if (spriteRef.current) {
          const el = spriteRef.current;
          el.style.width = `${frameW}px`;
          el.style.height = `${fitHeight}px`;
          el.style.backgroundImage = `url(${sheetSrc})`;
          el.style.backgroundSize = `${sheetW}px ${fitHeight}px`;
          el.style.backgroundPosition = "0px 0px";
        }
        onReady?.();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [animation, sheetSrc, frames, fitHeight, cellW, isSleep, onReady]);

  useEffect(() => {
    if (frames <= 1) return;

    let raf = 0;
    let last = performance.now();
    const frameMs = 1000 / frameFps;

    const tick = (now: number) => {
      const meta = metaRef.current;
      const sprite = spriteRef.current;
      if (!meta || !sprite) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (now - last >= frameMs) {
        if (shouldLoop) {
          frameRef.current = (frameRef.current + 1) % frames;
        } else if (frameRef.current < frames - 1) {
          frameRef.current += 1;
        } else if (!doneRef.current) {
          doneRef.current = true;
          onComplete?.();
        }
        last = now;
      }

      const scale = fitHeight / meta.h;
      const frameW = frameWidthPx(meta, frames, cellW, scale);
      const sheetW = frameW * frames;

      if (wrapRef.current) wrapRef.current.style.width = `${frameW}px`;
      sprite.style.width = `${frameW}px`;
      sprite.style.backgroundSize = `${sheetW}px ${fitHeight}px`;
      sprite.style.backgroundPosition = `${-Math.floor(frameRef.current * frameW)}px 0px`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animation, frames, shouldLoop, frameFps, fitHeight, cellW, onComplete]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        width: estW,
        height: fitHeight,
        flexShrink: 0,
        overflow: "hidden",
        transform: flipX ? "scaleX(-1)" : undefined,
        ...style,
      }}
      aria-hidden
    >
      <div
        ref={spriteRef}
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 0",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

export const Mascot = memo(MascotInner);
