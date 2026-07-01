import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PixelAlema } from "./PixelAlema";

function PushPin({ color = "coral" }: { color?: string }) {
  return (
    <span
      className="absolute -top-[3px] left-[10px] w-[7px] h-[7px] rounded-full border border-[var(--ink)] z-10"
      style={{
        background: `var(--${color})`,
        boxShadow: "1px 2px 0 rgba(0,0,0,0.45), inset -1px -1px 0 rgba(0,0,0,0.15)",
      }}
    />
  );
}

function WashiStrip({ className = "", color = "coral" }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute h-[7px] border border-[var(--ink)]/50 opacity-90 ${className}`}
      style={{
        background: `color-mix(in oklab, var(--${color}) 85%, transparent)`,
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 3px, rgba(0,0,0,0.12) 3px 4px)",
      }}
    />
  );
}

export function Locker3D() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setOpen(true);
      return;
    }
    const t = setTimeout(() => setOpen(true), 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div className="relative w-full select-none">
      <div style={{ perspective: "1400px" }} className="relative aspect-[10/13]">
        {/* ── LOCKER BODY ── */}
        <div
          className="absolute inset-0 rounded-[14px] border-[3px] border-[var(--ink)] overflow-hidden"
          style={{
            background:
              "linear-gradient(175deg, #7560f5 0%, #5a3eea 38%, #3f24b8 72%, #2a1580 100%)",
            boxShadow:
              "16px 20px 0 0 var(--ink), inset 0 1px 0 rgba(255,255,255,0.12), inset -4px 0 8px rgba(0,0,0,0.25)",
          }}
        >
          {/* worn metal edges */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div
            aria-hidden
            className="absolute top-[18%] right-[6%] w-8 h-[1px] bg-white/15 rotate-[22deg]"
          />
          <div
            aria-hidden
            className="absolute bottom-[22%] left-[4%] w-5 h-[1px] bg-black/30 -rotate-[18deg]"
          />

          {/* hinge bolts */}
          <div className="absolute top-[10%] right-[5px] z-30 w-[7px] h-[7px] rounded-full bg-[var(--ink)] border border-[var(--paper)]/25 shadow-[inset_-1px_-1px_0_rgba(255,255,255,0.15)]" />
          <div className="absolute bottom-[10%] right-[5px] z-30 w-[7px] h-[7px] rounded-full bg-[var(--ink)] border border-[var(--paper)]/25 shadow-[inset_-1px_-1px_0_rgba(255,255,255,0.15)]" />

          {/* nameplate — crooked on purpose */}
          <div
            className="absolute top-[7px] left-[9px] z-30 bg-[var(--lime)] border-2 border-[var(--ink)] px-2 py-[3px] font-mono text-[9px] tracking-[0.18em] uppercase rotate-[-1.5deg]"
            style={{ boxShadow: "2px 2px 0 var(--ink)" }}
          >
            A. EMRAN · 001
          </div>

          {/* ── INTERIOR CAVITY ── */}
          <div
            className="absolute inset-[11px] top-[26px] rounded-[9px] overflow-hidden border border-black/70"
            style={{
              background: "linear-gradient(180deg, #1c1248 0%, #110a30 52%, #08051a 100%)",
              boxShadow:
                "inset 0 6px 14px rgba(0,0,0,0.7), inset 8px 0 16px rgba(0,0,0,0.45), inset -3px 0 8px rgba(0,0,0,0.35)",
            }}
          >
            {/* scratched back wall */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(108deg, transparent 0 11px, rgba(255,255,255,0.035) 11px 12px)",
              }}
            />

            {/* ceiling + warm bulb */}
            <div className="absolute top-0 inset-x-[10px] h-[6px] bg-gradient-to-b from-[#3f2f82] to-[#1a1038] border-b border-black/80 z-30" />
            <motion.div
              aria-hidden
              className="absolute top-[5px] left-[14%] right-[14%] h-[4px] rounded-full bg-[var(--butter)] border border-[var(--ink)]/80 z-30"
              animate={open && !reduce ? { opacity: [0.85, 1, 0.9, 1] } : { opacity: 0.15 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                boxShadow: "0 0 10px rgba(255,214,140,0.65), 0 0 24px rgba(255,170,110,0.25)",
              }}
            />

            {/* ambient light wash */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none z-[5]"
              style={{
                background:
                  "radial-gradient(ellipse 90% 55% at 50% -8%, rgba(255,214,140,0.5) 0%, rgba(255,170,110,0.12) 40%, transparent 68%), radial-gradient(ellipse 60% 40% at 82% 95%, rgba(124,92,255,0.22) 0%, transparent 55%)",
              }}
              animate={{ opacity: open ? 1 : 0.03 }}
              transition={{ duration: 0.8, delay: open ? 0.2 : 0 }}
            />

            {/* interior scene — flex zones, scales with locker */}
            <motion.div
              className="absolute inset-0 pt-[12px] z-20 flex flex-col"
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.45, delay: open ? 0.3 : 0 }}
            >
              {/* TOP SHELF ZONE (~22%) */}
              <div className="relative h-[22%] min-h-[52px] px-[6px]">
                {/* sticky note stack */}
                <motion.div
                  whileHover={{ rotate: -4, y: -2 }}
                  className="absolute left-[4%] bottom-[18%] w-[18%] aspect-square bg-[var(--butter)] border border-[var(--ink)] -rotate-[9deg] font-mono text-[clamp(5px,1.1vw,7px)] text-[var(--ink)] p-[3px] leading-[1.05] z-[3]"
                  style={{
                    boxShadow: "2px 3px 0 rgba(0,0,0,0.45)",
                    clipPath: "polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%)",
                  }}
                >
                  ship &gt;
                  <br />
                  perfect
                </motion.div>
                <motion.div
                  whileHover={{ rotate: 7, y: -2 }}
                  className="absolute left-[14%] bottom-[8%] w-[15%] aspect-[0.85] bg-[var(--coral)] border border-[var(--ink)] rotate-[6deg] font-mono text-[clamp(4px,0.95vw,6px)] text-[var(--paper)] p-[2px] leading-[1.05] z-[4]"
                  style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.5)" }}
                >
                  call
                  <br />
                  mom!!
                </motion.div>

                {/* tear-off calendar */}
                <div className="absolute left-[32%] bottom-[6%] w-[16%] locker-paper border border-[var(--ink)]/75 rotate-[2deg] p-[3px] z-[2]">
                  <div className="font-mono text-[clamp(4px,0.9vw,6px)] uppercase tracking-wider opacity-60">
                    jun &apos;26
                  </div>
                  <div className="font-display text-[clamp(10px,2vw,14px)] leading-none mt-[1px] rotate-[-2deg]">
                    28
                  </div>
                  <div className="font-mono text-[clamp(3px,0.7vw,5px)] mt-[1px] opacity-50">
                    ship day?
                  </div>
                </div>

                {/* leaning books */}
                <div className="absolute left-[48%] bottom-0 flex items-end gap-[1px] z-[2]">
                  {[
                    { h: "78%", c: "coral", r: -7 },
                    { h: "68%", c: "lime", r: -2 },
                    { h: "88%", c: "cobalt", r: 1 },
                    { h: "58%", c: "butter", r: 5 },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="w-[clamp(8px,1.6vw,11px)] border border-[var(--ink)] origin-bottom"
                      style={{
                        height: b.h,
                        background: `var(--${b.c})`,
                        transform: `rotate(${b.r}deg)`,
                        boxShadow: "1px 2px 0 rgba(0,0,0,0.35)",
                      }}
                    >
                      <div className="w-full h-[1px] bg-[var(--paper)]/50 mt-[20%]" />
                    </div>
                  ))}
                </div>

                {/* tiny plant */}
                <div className="absolute right-[22%] bottom-[4%] z-[3]">
                  <div className="relative w-[clamp(14px,3vw,20px)] h-[clamp(18px,3.5vw,26px)]">
                    <span className="absolute left-0 top-[20%] w-[35%] h-[45%] bg-[var(--lime)] border border-[var(--ink)] rounded-full -rotate-[22deg]" />
                    <span className="absolute right-0 top-[8%] w-[35%] h-[45%] bg-[#9be53a] border border-[var(--ink)] rounded-full rotate-[18deg]" />
                    <div
                      className="absolute bottom-0 left-[15%] w-[70%] h-[28%] bg-[var(--coral)] border border-[var(--ink)]"
                      style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
                    />
                  </div>
                </div>

                {/* shortcut cheat sheet — folded paper, not a UI card */}
                <motion.div
                  whileHover={{ y: -1, rotate: -2 }}
                  className="absolute right-[3%] bottom-[12%] w-[22%] locker-paper border border-[var(--ink)]/70 -rotate-[5deg] p-[3px] z-[5]"
                >
                  <PushPin color="lilac" />
                  <div className="font-mono text-[clamp(4px,0.85vw,6px)] leading-[1.15] text-[var(--ink)]">
                    <span className="opacity-50">keys</span>
                    <br />
                    ⌘K search
                    <br />
                    ⌘S save
                    <br />
                    ⌘↵ ship
                  </div>
                </motion.div>
              </div>

              <div className="h-[3px] shrink-0 locker-shelf mx-[2px]" />

              {/* CORK ZONE (~46%) — physical bulletin, not dashboard */}
              <div className="relative flex-1 min-h-[100px] mx-[5px] my-[2px]">
                <div
                  className="absolute inset-0 rounded-[4px] border border-black/80"
                  style={{
                    background:
                      "repeating-radial-gradient(circle at 28% 38%, #c79553 0 2px, #b07d3f 2px 4px), linear-gradient(175deg, #c89656, #9a7038)",
                    boxShadow: "inset 0 3px 6px rgba(0,0,0,0.45), 0 2px 0 rgba(0,0,0,0.4)",
                  }}
                />

                {/* coffee ring */}
                <div
                  aria-hidden
                  className="absolute top-[8%] right-[12%] w-[14%] aspect-square rounded-full border-[2px] border-black/20 opacity-40"
                />
                <div
                  aria-hidden
                  className="absolute top-[11%] right-[14%] w-[8%] aspect-square rounded-full bg-black/15 blur-[1px]"
                />

                {/* shipping list — handwritten paper */}
                <motion.div
                  whileHover={{ y: -2, rotate: -2 }}
                  className="absolute top-[6%] left-[4%] w-[48%] locker-paper border border-[var(--ink)]/70 -rotate-[3deg] px-[6px] py-[5px] z-[4]"
                >
                  <PushPin />
                  <div className="font-display italic text-[clamp(8px,1.6vw,11px)] leading-tight">
                    spring builds
                  </div>
                  <div className="mt-[3px] space-y-[2px] font-mono text-[clamp(5px,1vw,7px)] leading-tight">
                    <div className="flex gap-1">
                      <span>✓</span>
                      <span>BrandForge</span>
                    </div>
                    <div className="flex gap-1 opacity-80">
                      <span>○</span>
                      <span>Lama OS</span>
                    </div>
                    <div className="flex gap-1">
                      <span>→</span>
                      <span className="underline decoration-[var(--coral)]">Plant Inv.</span>
                    </div>
                  </div>
                  <div className="mt-[4px] inline-block font-mono text-[clamp(4px,0.8vw,6px)] bg-[var(--lime)] px-[3px] py-[1px] border border-[var(--ink)]/50 rotate-[1deg]">
                    SHIPPED · v3.2
                  </div>
                </motion.div>

                {/* polaroid */}
                <motion.div
                  whileHover={{ y: -2, rotate: 5 }}
                  className="absolute top-[5%] right-[4%] w-[28%] bg-[var(--paper)] border border-[var(--ink)] p-[4px] rotate-[7deg] z-[6]"
                  style={{ boxShadow: "3px 4px 0 rgba(0,0,0,0.45), 0 8px 16px rgba(0,0,0,0.2)" }}
                >
                  <WashiStrip
                    className="top-[-3px] left-[8%] w-[70%] -rotate-[6deg]"
                    color="lilac"
                  />
                  <div className="aspect-[4/5] grid place-items-center bg-gradient-to-br from-[var(--cobalt)] via-[#5a3edc] to-[var(--coral)]">
                    <PixelAlema small />
                  </div>
                  <div className="font-mono text-[clamp(4px,0.8vw,6px)] text-center pt-[2px] rotate-[-1deg]">
                    dubai &apos;26 ♥
                  </div>
                </motion.div>

                {/* doodled mantra */}
                <div
                  className="absolute bottom-[28%] left-[6%] font-display italic text-[clamp(9px,1.8vw,13px)] text-[var(--butter)] -rotate-[5deg] z-[2]"
                  style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.8)" }}
                >
                  design → code → repeat
                </div>

                {/* achievement badge sticker */}
                <div
                  className="absolute bottom-[18%] left-[42%] w-[14%] aspect-square rounded-full border-2 border-[var(--ink)] bg-[var(--butter)] grid place-items-center rotate-[12deg] z-[3]"
                  style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.4)" }}
                >
                  <span className="font-mono text-[clamp(5px,1vw,7px)] font-bold">★</span>
                </div>

                {/* envelope with stamp */}
                <motion.div
                  whileHover={{ rotate: -3 }}
                  className="absolute bottom-[6%] right-[6%] w-[32%] h-[28%] locker-paper border border-[var(--ink)]/60 rotate-[4deg] z-[3]"
                >
                  <div className="absolute top-[18%] left-[8%] right-[8%] h-[1px] bg-[var(--ink)]/25" />
                  <div className="absolute top-[38%] left-[8%] w-[55%] h-[1px] bg-[var(--ink)]/20" />
                  <div
                    className="absolute top-[8%] right-[8%] px-[3px] py-[1px] border border-[var(--coral)] font-mono text-[clamp(4px,0.75vw,5px)] uppercase text-[var(--coral)] rotate-[-8deg]"
                    style={{ borderStyle: "dashed" }}
                  >
                    shipped
                  </div>
                </motion.div>

                {/* paperclip */}
                <div
                  aria-hidden
                  className="absolute top-[42%] left-[54%] w-[5%] h-[6%] border-2 border-[var(--paper)]/70 rounded-[2px] rotate-[24deg] z-[7]"
                />

                {/* tiny commit note */}
                <div className="absolute bottom-[8%] left-[8%] font-mono text-[clamp(4px,0.75vw,5px)] text-[var(--paper)]/45 rotate-[-8deg] z-[1]">
                  feat: hero v3.2
                </div>
              </div>

              <div className="h-[3px] shrink-0 locker-shelf mx-[2px]" />

              {/* BOTTOM SHELF (~28%) — desk clutter */}
              <div className="relative h-[28%] min-h-[62px] px-[6px] pb-[4px]">
                {/* coffee ring on shelf surface */}
                <div
                  aria-hidden
                  className="absolute bottom-[18%] left-[6%] w-[11%] aspect-square rounded-full border border-black/25 opacity-35"
                />

                {/* mug */}
                <motion.div
                  whileHover={{ rotate: -4 }}
                  className="absolute left-[3%] bottom-[8%] z-[4]"
                >
                  <div
                    aria-hidden
                    className="absolute -top-[18%] left-[35%] font-mono text-[clamp(6px,1.2vw,8px)] text-[var(--paper)]/35"
                  >
                    ~
                  </div>
                  <div
                    className="relative w-[clamp(18px,3.5vw,24px)] h-[clamp(22px,4.2vw,30px)] bg-[var(--paper)] border border-[var(--ink)] rounded-b-[3px] grid place-items-center"
                    style={{
                      boxShadow: "2px 3px 0 rgba(0,0,0,0.4), inset -2px -1px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="absolute -right-[18%] top-[22%] w-[28%] h-[38%] border border-[var(--ink)] rounded-full bg-[var(--paper)]" />
                    <span className="font-mono text-[clamp(6px,1.1vw,8px)] font-black text-[var(--coral)]">
                      ae
                    </span>
                  </div>
                </motion.div>

                {/* open sketchbook — wireframe doodles, not code editor */}
                <motion.div
                  whileHover={{ y: -1 }}
                  className="absolute left-[18%] bottom-[6%] w-[28%] z-[3]"
                >
                  <div className="aspect-[1.15] locker-paper border border-[var(--ink)] rotate-[-4deg] p-[4px]">
                    <div className="w-[55%] h-[18%] border border-[var(--ink)]/40 rounded-[1px] mb-[3px]" />
                    <div className="flex gap-[2px]">
                      <div className="flex-1 h-[1px] bg-[var(--ink)]/25 mt-[2px]" />
                      <div className="w-[22%] aspect-square border border-[var(--coral)]/60 rounded-[1px]" />
                    </div>
                    <div className="mt-[4px] w-[70%] h-[1px] bg-[var(--ink)]/20" />
                    <div className="mt-[2px] w-[45%] h-[1px] bg-[var(--ink)]/15" />
                    <div className="absolute bottom-[8%] right-[8%] font-mono text-[clamp(3px,0.65vw,5px)] opacity-40">
                      fig 01
                    </div>
                  </div>
                  <div className="absolute -right-[6%] -top-[8%] w-[3px] h-[clamp(16px,3vw,22px)] bg-[var(--cobalt)] rotate-[18deg] origin-bottom rounded-full border border-[var(--ink)]/50" />
                </motion.div>

                {/* tools cluster */}
                <div className="absolute left-[48%] bottom-[10%] flex items-end gap-[3px] z-[2]">
                  <div
                    className="w-[clamp(6px,1.2vw,8px)] h-[clamp(28px,5vw,38px)] bg-[var(--butter)] border border-[var(--ink)] flex flex-col justify-around items-center rotate-[6deg]"
                    style={{ boxShadow: "1px 2px 0 rgba(0,0,0,0.35)" }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="w-[70%] h-[1px] bg-[var(--ink)]/50" />
                    ))}
                  </div>
                  <div
                    className="w-[clamp(5px,1vw,7px)] h-[clamp(20px,3.8vw,28px)] bg-[var(--lime)] border border-[var(--ink)] rotate-[-12deg]"
                    style={{ boxShadow: "1px 2px 0 rgba(0,0,0,0.35)" }}
                  />
                  <div
                    className="w-[clamp(8px,1.5vw,10px)] h-[clamp(10px,2vw,14px)] bg-[var(--lilac)] border border-[var(--ink)] rotate-[15deg]"
                    style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.35)" }}
                    title="usb"
                  />
                </div>

                {/* field notebook */}
                <motion.div
                  whileHover={{ rotate: 3, y: -1 }}
                  className="absolute right-[24%] bottom-[8%] z-[3]"
                >
                  <div
                    className="w-[clamp(16px,3vw,22px)] h-[clamp(24px,4.5vw,32px)] bg-[var(--coral)] border border-[var(--ink)] rotate-[5deg]"
                    style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.4)" }}
                  >
                    <div className="w-[12%] h-full bg-[var(--ink)] ml-[10%]" />
                    <div className="absolute top-[22%] left-[28%] w-[55%] h-[1px] bg-[var(--paper)]/40" />
                    <div className="absolute top-[38%] left-[28%] w-[40%] h-[1px] bg-[var(--paper)]/30" />
                  </div>
                </motion.div>

                {/* pixel Alema figurine */}
                <motion.div
                  className="absolute right-[4%] bottom-[4%] z-[6]"
                  initial={{ y: 6, opacity: 0 }}
                  animate={open ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                >
                  <PixelAlema waving={open && !reduce} idle={open} />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={open ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -top-[28%] -left-[55%] locker-paper border border-[var(--ink)] px-[3px] py-[1px] font-mono text-[clamp(5px,0.9vw,7px)] rotate-[-4deg] whitespace-nowrap"
                  >
                    hi! ✿
                  </motion.div>
                </motion.div>

                {/* bookmark ribbon */}
                <div
                  aria-hidden
                  className="absolute right-[14%] top-[8%] w-[6px] h-[35%] bg-[var(--cobalt)] border border-[var(--ink)]/60 rotate-[3deg] z-[1]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)" }}
                />
              </div>
            </motion.div>

            {/* closed-state darkness */}
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black/82 pointer-events-none z-40"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* ── DOOR (hinged right) ── */}
        <motion.div
          className="absolute inset-0 rounded-[14px]"
          style={{ transformStyle: "preserve-3d", transformOrigin: "right center" }}
          initial={false}
          animate={{ rotateY: open ? 102 : 0 }}
          transition={{ type: "spring", stiffness: 48, damping: 16, mass: 1.1 }}
        >
          {/* door front */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open locker"
            className="absolute inset-0 rounded-[14px] overflow-hidden border-[3px] border-[var(--ink)] text-left cursor-pointer"
            style={{
              background:
                "linear-gradient(145deg, #8f72ff 0%, #6a4cf0 32%, #4528c4 68%, #2e1888 100%)",
              backfaceVisibility: "hidden",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="absolute top-[6px] left-[8px] bg-[var(--lime)] border-2 border-[var(--ink)] px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] uppercase rotate-[1deg]"
              style={{ boxShadow: "2px 2px 0 var(--ink)" }}
            >
              A. EMRAN · 001
            </div>

            {/* exterior stickers */}
            <div
              className="absolute top-[12%] right-[10%] px-[5px] py-[2px] bg-[var(--ink)] border border-[var(--paper)] font-mono text-[7px] text-[var(--paper)] uppercase rotate-[6deg]"
              style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.45)" }}
            >
              github
            </div>
            <div
              className="absolute top-[22%] right-[22%] px-[4px] py-[1px] bg-[var(--butter)] border border-[var(--ink)] font-mono text-[6px] rotate-[-8deg]"
              style={{ boxShadow: "1px 2px 0 rgba(0,0,0,0.4)" }}
            >
              build ship repeat
            </div>

            {/* vent slats */}
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 space-y-[6px] w-[52%]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[2px] bg-black/35 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
                  style={{ width: `${88 + (i % 3) * 4}%`, marginLeft: `${(i % 2) * 3}%` }}
                />
              ))}
            </div>

            {/* handle */}
            <div
              className="absolute top-1/2 left-[10px] -translate-y-1/2 w-[clamp(10px,2vw,14px)] h-[32%] bg-gradient-to-b from-[var(--paper)] to-[#c4bdb0] border-2 border-[var(--ink)] rounded-[3px] rotate-[1deg]"
              style={{ boxShadow: "inset 0 2px 0 rgba(0,0,0,0.12), 3px 3px 0 rgba(0,0,0,0.25)" }}
            />
            <div className="absolute top-[54%] left-[calc(10px+clamp(10px,2vw,14px)-2px)] w-[5px] h-[5px] bg-[var(--ink)] rounded-full" />

            {/* taped name */}
            <div
              className="absolute bottom-[22%] right-[8%] bg-[var(--paper)]/90 border border-[var(--ink)]/70 px-[6px] py-[2px] font-mono text-[clamp(6px,1.1vw,8px)] -rotate-[6deg]"
              style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.35)" }}
            >
              alema ♥
            </div>

            <div
              className="absolute bottom-[8px] left-1/2 -translate-x-1/2 bg-[var(--paper)] text-[var(--ink)] border-2 border-[var(--ink)] px-3 py-[3px] font-mono text-[clamp(7px,1.2vw,9px)] uppercase tracking-[0.14em] rotate-[-0.5deg]"
              style={{ boxShadow: "3px 3px 0 var(--ink)" }}
            >
              pull → peek inside
            </div>

            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/14 via-transparent to-black/35"
            />
          </button>

          {/* door interior — lived-in sticker wall */}
          <div
            className="absolute inset-0 rounded-[14px] overflow-hidden border-[3px] border-[var(--ink)]"
            style={{
              background: "linear-gradient(165deg, #4a2fc8 0%, #2e1a8a 55%, #140a52 100%)",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.04), inset 8px 0 14px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute top-0 bottom-0 right-0 w-[6px] bg-gradient-to-r from-black/55 to-black/25 border-l border-black/60" />

            {/* mirror */}
            <div
              className="absolute top-[4%] left-[5%] w-[58%] h-[22%] bg-gradient-to-br from-[#cfd6ff] via-[#a5b1e8] to-[#7a86c7] border-2 border-[var(--ink)] rounded-[3px] overflow-hidden rotate-[-1deg]"
              style={{
                boxShadow: "inset 0 4px 10px rgba(255,255,255,0.35), 3px 4px 0 rgba(0,0,0,0.45)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
              <WashiStrip className="top-[-2px] left-[15%] w-[75%] rotate-[10deg]" />
            </div>

            {(
              [
                { l: "VS CODE", x: "3%", y: "42%", c: "cobalt", fg: "paper", r: -9 },
                { l: "FIGMA", x: "24%", y: "46%", c: "coral", fg: "paper", r: 7 },
                { l: "REACT", x: "58%", y: "18%", c: "lime", fg: "ink", r: 9 },
                { l: "GIT", x: "48%", y: "4%", c: "butter", fg: "ink", r: -11 },
                { l: "PY", x: "5%", y: "60%", c: "lime", fg: "ink", r: 4 },
                { l: "BITS", x: "2%", y: "80%", c: "paper", fg: "ink", r: -6 },
                { l: "DUBAI", x: "30%", y: "82%", c: "cobalt", fg: "paper", r: 5 },
                { l: "☕", x: "58%", y: "78%", c: "coral", fg: "paper", r: 10 },
              ] as const
            ).map((s) => (
              <motion.div
                key={s.l}
                whileHover={{ rotate: s.r + 10, y: -2 }}
                className="absolute px-[5px] py-[2px] border-[1.5px] border-[var(--ink)] font-mono text-[clamp(6px,1.1vw,8px)] tracking-wider uppercase rounded-[2px]"
                style={{
                  left: s.x,
                  top: s.y,
                  background: `var(--${s.c})`,
                  color: `var(--${s.fg})`,
                  transform: `rotate(${s.r}deg)`,
                  boxShadow: "2px 3px 0 rgba(0,0,0,0.5)",
                }}
              >
                {s.l}
              </motion.div>
            ))}

            {/* pixel heart */}
            <div
              aria-hidden
              className="absolute top-[10%] left-[12%] grid grid-cols-5 gap-[1px] rotate-[-10deg]"
              style={{ filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.5))" }}
            >
              {[0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0].map(
                (b, i) => (
                  <span
                    key={i}
                    className="w-[3px] h-[3px]"
                    style={{ background: b ? "var(--coral)" : "transparent" }}
                  />
                ),
              )}
            </div>

            {/* yellow note */}
            <div
              className="absolute bottom-[32%] right-[4%] w-[38%] bg-[var(--butter)] border-2 border-[var(--ink)] px-[6px] py-[4px] rotate-[5deg] font-mono text-[clamp(6px,1.1vw,8px)] leading-[1.15] text-[var(--ink)] font-bold"
              style={{ boxShadow: "3px 4px 0 rgba(0,0,0,0.45)" }}
            >
              DESIGN →
              <br />
              CODE →
              <br />
              REPEAT
            </div>

            {/* metal pocket */}
            <div className="absolute bottom-[6px] left-[6px] right-[6px] h-[22%]">
              <div
                className="absolute inset-0 rounded-[4px] border-2 border-[var(--ink)] bg-gradient-to-b from-[#3a2580] to-[#1a0e48]"
                style={{ boxShadow: "inset 0 3px 6px rgba(0,0,0,0.55), 2px 3px 0 rgba(0,0,0,0.4)" }}
              />
              <div className="absolute inset-[6px] flex items-center gap-[4px]">
                <div
                  className="w-[14%] h-[75%] bg-[var(--ink)] border border-black grid place-items-center -rotate-[5deg]"
                  style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.45)" }}
                >
                  <span className="font-display italic text-[var(--butter)] text-[clamp(7px,1.2vw,9px)]">
                    ae
                  </span>
                </div>
                <div className="w-[18%] h-[78%] locker-paper border border-[var(--ink)] rotate-[4deg] p-[3px]">
                  <div className="w-full h-[1px] bg-[var(--ink)]/50" />
                  <div className="w-[70%] h-[1px] bg-[var(--ink)]/30 mt-[3px]" />
                  <div className="mt-[5px] w-[45%] aspect-square border border-[var(--ink)]/40 rounded-full" />
                </div>
                <div
                  className="flex-1 h-[70%] bg-[var(--cobalt)] border border-[var(--ink)] rotate-[2deg] px-[4px] py-[3px] font-mono text-[clamp(4px,0.8vw,6px)] text-[var(--paper)] leading-tight"
                  style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.45)" }}
                >
                  ALEMA EMRAN
                  <br />
                  <span className="text-[var(--lime)]">frontend · brand</span>
                </div>
              </div>

              <motion.div
                aria-hidden
                className="absolute -top-[22%] right-[12%] origin-top"
                animate={open && !reduce ? { rotate: [0, 6, -4, 2, 0] } : {}}
                transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              >
                <div className="w-[1.5px] h-[clamp(14px,2.5vw,20px)] bg-[var(--paper)]/75 mx-auto" />
                <div
                  className="w-[clamp(10px,2vw,14px)] h-[clamp(10px,2vw,14px)] bg-[var(--lime)] border border-[var(--ink)] grid place-items-center font-mono text-[clamp(5px,0.9vw,7px)] font-bold"
                  style={{ boxShadow: "1px 2px 0 rgba(0,0,0,0.45)" }}
                >
                  ae
                </div>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-[6px] right-[6px] bg-[var(--coral)] text-[var(--paper)] border-2 border-[var(--ink)] px-[6px] py-[2px] font-mono text-[clamp(6px,1.1vw,8px)] uppercase tracking-widest hover:-translate-y-0.5 transition-transform z-30"
              style={{ boxShadow: "2px 2px 0 var(--ink)" }}
            >
              close
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
