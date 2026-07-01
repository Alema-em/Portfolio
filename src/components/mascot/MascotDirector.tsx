import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "motion/react";
import { Mascot } from "@/components/mascot/Mascot";
import { MascotCaption } from "@/components/mascot/MascotCaption";
import { INTRO_KEY } from "@/components/mascot/story";
import { mascotSheetUrl, resolveClip } from "@/components/mascot/manifest";
import { preloadSprite } from "@/components/mascot/sprite-cache";
import type { MascotAnimation } from "@/components/mascot/types";

const MASCOT_H = 80;
const MASCOT_H_MOBILE = 56;
const MOBILE_MAX = 767;
const TRAVEL_ARRIVE = 6;
const SETTLE_MS = 500;
const SECTION_SWITCH_BIAS = 0.12;

type SectionId = "top" | "work" | "system" | "log" | "contact";

type SectionCfg = {
  lane: string;
  idle: MascotAnimation;
  caption: string;
};

type Pose = {
  x: number;
  y: number;
  idle: MascotAnimation;
  caption: string;
};

const SECTIONS: SectionId[] = ["top", "work", "system", "log", "contact"];

const SECTION_CFG: Record<SectionId, SectionCfg> = {
  top: { lane: "lane-locker", idle: "typing", caption: "" },
  work: { lane: "lane-work", idle: "point", caption: "open case study →" },
  system: { lane: "lane-system", idle: "coffee", caption: "" },
  log: { lane: "lane-log", idle: "thinking", caption: "" },
  contact: { lane: "lane-contact", idle: "sleep", caption: "save point reached" },
};

const CORE_SHEETS = [
  "typing.png",
  "walk-right.png",
  "wave.png",
  "point.png",
  "coffee.png",
  "thinking.png",
  "sleep.png",
  "celebrate.png",
];

type Anchor = "center" | "left" | "right";

function isMobileViewport() {
  return window.innerWidth <= MOBILE_MAX;
}

function useMobileViewport() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
}

function laneX() {
  const w = window.innerWidth;
  return Math.max(72, Math.min(w * 0.08, 96));
}

function clampX(x: number, minHalf = 42) {
  const w = window.innerWidth;
  return Math.max(minHalf + 10, Math.min(w - minHalf - 10, x));
}

function clampY(y: number) {
  const vh = window.innerHeight;
  const pad = MASCOT_H * 0.5;
  return Math.max(vh * 0.14 + pad, Math.min(vh * 0.9 - 10, y));
}

function readLane(id: string) {
  const el = document.querySelector(`[data-mascot-anchor="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.5 };
}

function sectionScore(el: HTMLElement) {
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  const visTop = Math.max(0, r.top);
  const visBot = Math.min(vh, r.bottom);
  const visible = Math.max(0, visBot - visTop);
  if (visible < 64) return 0;
  let score = visible / vh;
  if (el.id === "contact") {
    if (r.top < vh * 0.45) score *= 1.45;
  }
  return score;
}

function canShowContact(el: HTMLElement) {
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  if (r.top > vh * 0.34) return false;
  const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
  if (visible / vh < 0.38) return false;

  const log = document.getElementById("log");
  if (!log) return true;
  const lr = log.getBoundingClientRect();
  return lr.bottom < vh * 0.28;
}

function pickSection(current: SectionId): SectionId {
  let best: SectionId = current;
  let bestScore = -1;

  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (id === "contact" && !canShowContact(el)) continue;

    const score = sectionScore(el);
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }

  if (best === current) return current;

  const currentEl = document.getElementById(current);
  const currentScore = currentEl ? sectionScore(currentEl) : 0;
  if (bestScore < currentScore + SECTION_SWITCH_BIAS) return current;
  return best;
}

function mobileCornerPose(section: SectionId): Pose {
  const cfg = SECTION_CFG[section];
  const vh = window.innerHeight;
  return {
    x: 12,
    y: vh - 12,
    idle: cfg.idle,
    caption: section === "work" || section === "contact" ? cfg.caption : "",
  };
}

function resolvePose(section: SectionId): Pose {
  if (isMobileViewport()) return mobileCornerPose(section);

  const cfg = SECTION_CFG[section];
  const lane = readLane(cfg.lane);
  const vh = window.innerHeight;

  if (section === "contact") {
    const x = clampX(lane?.x ?? laneX(), 32);
    return {
      x,
      y: vh - 32,
      idle: cfg.idle,
      caption: cfg.caption,
    };
  }

  const xNudge = section === "system" || section === "log" ? -28 : 0;
  const minHalf = section === "system" || section === "log" ? 30 : 42;
  const x = clampX((lane?.x ?? laneX()) + xNudge, minHalf);
  const y = lane ? clampY(lane.y) : clampY(vh * 0.72);

  if (section === "top") {
    const locker = readLane("lane-locker");
    if (locker) {
      return {
        x: clampX(locker.x),
        y: clampY(locker.y),
        idle: cfg.idle,
        caption: cfg.caption,
      };
    }
  }

  return { x, y, idle: cfg.idle, caption: cfg.caption };
}

function wait(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

export function MascotDirector() {
  const reduce = useReducedMotion();
  const isMobile = useMobileViewport();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [animation, setAnimation] = useState<MascotAnimation>("typing");
  const [loop, setLoop] = useState(true);
  const [caption, setCaption] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  const wrapRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: laneX(), y: window.innerHeight * 0.72 });
  const sectionRef = useRef<SectionId>("top");
  const travelingRef = useRef(false);
  const travelSectionRef = useRef<SectionId>("top");
  const travelGoalRef = useRef<Pose | null>(null);
  const introDone = useRef(false);
  const animRef = useRef<MascotAnimation>("typing");
  const rafRef = useRef(0);
  const lastTick = useRef(performance.now());
  const stillFor = useRef(0);
  const captionRef = useRef("");

  const setAnim = (next: MascotAnimation, nextLoop = true) => {
    if (animRef.current === next) return;
    animRef.current = next;
    setAnimation(next);
    setLoop(nextLoop);
    preloadSprite(mascotSheetUrl(resolveClip(next).sheet)).catch(() => {});
  };

  const applyTransform = (x: number, y: number, anchor: Anchor = "center") => {
    pos.current = { x, y };
    if (wrapRef.current) {
      const anchorTransform =
        anchor === "left"
          ? "translate(0,-100%)"
          : anchor === "right"
            ? "translate(-100%,-100%)"
            : "translate(-50%,-100%)";
      wrapRef.current.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0) ${anchorTransform}`;
    }
  };

  const poseAnchor = (section: SectionId): Anchor => {
    if (isMobileViewport()) return "left";
    return section === "contact" ? "left" : "center";
  };

  const settleInSection = (section: SectionId) => {
    const pose = resolvePose(section);
    applyTransform(pose.x, pose.y, poseAnchor(section));
    sectionRef.current = section;
    setActiveSection(section);
    travelingRef.current = false;
    travelGoalRef.current = null;
    setAnim(pose.idle, pose.idle !== "wave" && pose.idle !== "celebrate" && pose.idle !== "peek");
    stillFor.current = SETTLE_MS;
    if (pose.caption) {
      captionRef.current = pose.caption;
      setCaption(pose.caption);
    } else {
      captionRef.current = "";
      setCaption("");
    }
  };

  useEffect(() => {
    setMounted(true);
    for (const sheet of CORE_SHEETS) preloadSprite(mascotSheetUrl(sheet));
    const onReady = () => setReady(true);
    window.addEventListener("mascot:ready", onReady);
    const fb = window.setTimeout(() => setReady(true), 1600);
    return () => {
      window.removeEventListener("mascot:ready", onReady);
      window.clearTimeout(fb);
    };
  }, []);

  useEffect(() => {
    if (!ready || !mounted) return;
    if (sessionStorage.getItem(INTRO_KEY)) {
      introDone.current = true;
      settleInSection("top");
      return;
    }

    let cancelled = false;

    (async () => {
      const pose = resolvePose("top");
      applyTransform(pose.x, pose.y, poseAnchor("top"));

      setCaption("hey — welcome in");
      setAnim("wave", false);
      await wait(900);
      if (cancelled) return;

      setAnim("sit");
      await wait(240);
      setAnim("typing");
      await wait(300);

      sessionStorage.setItem(INTRO_KEY, "1");
      introDone.current = true;
      setCaption("");
      captionRef.current = "";
      settleInSection("top");
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, mounted]);

  useEffect(() => {
    if (!ready || !mounted) return;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTick.current) / 1000);
      lastTick.current = now;

      if (!introDone.current && !sessionStorage.getItem(INTRO_KEY)) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (!introDone.current) introDone.current = true;

      const nextSection = pickSection(sectionRef.current);

      if (!travelingRef.current && nextSection !== sectionRef.current) {
        travelingRef.current = true;
        travelSectionRef.current = nextSection;
        travelGoalRef.current = resolvePose(nextSection);
        stillFor.current = 0;
        captionRef.current = "";
        setCaption("");
      }

      if (travelingRef.current && travelGoalRef.current) {
        const goal = travelGoalRef.current;
        const cx = pos.current.x;
        const cy = pos.current.y;
        const ease = isMobileViewport() ? 1 : 1 - Math.exp(-5.5 * dt);
        const nx = cx + (goal.x - cx) * ease;
        const ny = cy + (goal.y - cy) * ease;
        const dist = Math.hypot(goal.x - nx, goal.y - ny);

        applyTransform(nx, ny, poseAnchor(travelSectionRef.current));

        if (reduce || isMobileViewport() || dist <= TRAVEL_ARRIVE) {
          settleInSection(travelSectionRef.current);
        } else {
          setAnim(nx >= cx ? "walk-right" : "walk-left");
        }
      } else {
        const pose = resolvePose(sectionRef.current);
        applyTransform(pose.x, pose.y, poseAnchor(sectionRef.current));
        setAnim(
          pose.idle,
          pose.idle !== "wave" && pose.idle !== "celebrate" && pose.idle !== "peek",
        );
        stillFor.current += dt * 1000;
        if (stillFor.current > SETTLE_MS && captionRef.current !== pose.caption) {
          captionRef.current = pose.caption;
          setCaption(pose.caption);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, mounted, reduce, isMobile]);

  useEffect(() => {
    if (!ready) return;
    const onOpen = () => {
      setAnim("celebrate", false);
      stillFor.current = 0;
      captionRef.current = "";
      setCaption("");
      window.setTimeout(() => {
        setAnim("point");
        stillFor.current = SETTLE_MS;
        captionRef.current = SECTION_CFG.work.caption;
        setCaption(SECTION_CFG.work.caption);
      }, 1000);
    };
    window.addEventListener("mascot:case-open", onOpen);
    return () => window.removeEventListener("mascot:case-open", onOpen);
  }, [ready]);

  if (!mounted || !ready) return null;

  return createPortal(
    <div
      ref={wrapRef}
      data-mascot-root
      className="pointer-events-none fixed left-0 top-0 z-[42] will-change-transform max-md:z-[35]"
      style={{
        transform: `translate3d(${pos.current.x}px,${pos.current.y}px,0) translate(-50%,-100%)`,
      }}
      aria-hidden
    >
      <div className="relative">
        <Mascot
          animation={animation}
          fps={animation === "walk-right" || animation === "walk-left" ? 10 : 8}
          loop={loop}
          fitHeight={isMobile ? MASCOT_H_MOBILE : MASCOT_H}
        />
        <MascotCaption
          text={caption}
          visible={!!caption && !isMobile}
          below={activeSection === "contact"}
        />
      </div>
    </div>,
    document.body,
  );
}
