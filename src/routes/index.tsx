import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "motion/react";
import { Preloader } from "@/components/Preloader";
import { MascotDirector } from "@/components/mascot";
import { Locker3D } from "@/components/hero/Locker3D";
import { LockerWorkspace } from "@/components/hero/LockerWorkspace";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { HeroCursorLight } from "@/components/hero/HeroCursorLight";
import { HeroWatermark } from "@/components/hero/HeroWatermark";
import { HeroLockerStage } from "@/components/hero/HeroLockerStage";
import { HeroParticles } from "@/components/hero/HeroParticles";
import { HeroIntroBurst } from "@/components/hero/HeroIntroBurst";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { ChapterFlash } from "@/components/effects/ChapterFlash";
import { CONTACT } from "@/data/contact";
import { PROJECTS, PROJECT_IMAGES, type Project } from "@/data/projects";
import { SITE } from "@/data/site";

/** Toggle to swap between the illustrated PNG and the CSS locker diorama. */
const USE_CSS_LOCKER = false;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.ogDescription },
    ],
  }),
  component: Portfolio,
});

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Preloader />
      <MascotDirector />
      <Nav />
      <Hero />
      <ChapterFlash />
      <FeaturedProject />
      <TechIdentity />
      <DeploymentLog />
      <Footer />
    </div>
  );
}

/* ───────────────────────── NAV ───────────────────────── */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Work", "#work"],
    ["System", "#system"],
    ["Log", "#log"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-8"
      style={{ paddingTop: scrolled ? "0.5rem" : "0.75rem" }}
      animate={{ paddingTop: scrolled ? "0.5rem" : "0.75rem" }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="relative mx-auto max-w-7xl flex items-center justify-between bg-[var(--paper)]/85 backdrop-blur-md border-2 border-[var(--ink)] rounded-full px-3 sm:px-4 md:px-6"
        animate={{
          paddingTop: scrolled ? "0.4rem" : "0.55rem",
          paddingBottom: scrolled ? "0.4rem" : "0.55rem",
          boxShadow: scrolled ? "4px 4px 0 0 var(--ink)" : "0px 0px 0 0 transparent",
        }}
        transition={{ duration: 0.25 }}
      >
        <a href="#top" className="flex items-center gap-2 font-display text-lg sm:text-xl min-w-0">
          <span className="w-7 h-7 shrink-0 rounded-full bg-[var(--cobalt)] border-2 border-[var(--ink)] grid place-items-center text-[var(--paper)] text-xs font-mono font-bold">
            AE
          </span>
          <span className="hidden sm:inline truncate">Alema Emran</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="px-3 py-1.5 rounded-full hover:bg-[var(--lime)] transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.cvUrl}
            download={CONTACT.cvFilename}
            className="hidden sm:inline-flex text-[10px] sm:text-xs font-mono uppercase tracking-wider border-2 border-[var(--ink)] text-[var(--ink)] px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-[var(--butter)] transition-colors"
          >
            CV
          </a>
          <a
            href="#contact"
            className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider bg-[var(--ink)] text-[var(--paper)] px-3 md:px-4 py-1.5 rounded-full hover:bg-[var(--cobalt)] transition-colors whitespace-nowrap"
          >
            Say hi →
          </a>
          <button
            type="button"
            className="md:hidden flex flex-col justify-center gap-1 w-9 h-9 rounded-full border-2 border-[var(--ink)]"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`block h-0.5 w-4 bg-[var(--ink)] mx-auto transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-4 bg-[var(--ink)] mx-auto transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-4 bg-[var(--ink)] mx-auto transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {menuOpen ? (
          <nav
            className="md:hidden absolute left-0 right-0 top-[calc(100%+0.5rem)] bg-[var(--paper)] border-2 border-[var(--ink)] rounded-2xl p-2 shadow-[6px_6px_0_0_var(--ink)]"
            aria-label="Mobile"
          >
            {links.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--lime)] transition-colors"
              >
                {l}
              </a>
            ))}
            <a
              href={CONTACT.cvUrl}
              download={CONTACT.cvFilename}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-wider hover:bg-[var(--butter)] transition-colors"
            >
              Download CV
            </a>
          </nav>
        ) : null}
      </motion.div>
    </motion.header>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lockerY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const t = () => {
      const d = new Date();
      const dxb = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Dubai" }));
      setTime(
        dxb.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    t();
    const id = setInterval(t, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-0 lg:min-h-[100vh] pt-20 md:pt-24 lg:pt-24 pb-12 md:pb-14 px-4 md:px-6 lg:px-10 xl:px-12 overflow-hidden paper-grain bg-gradient-to-br from-[var(--butter)]/18 via-[var(--paper)] to-[var(--lilac)]/22"
    >
      <HeroIntroBurst />
      <HeroWatermark />
      <HeroAtmosphere />
      <HeroParticles />
      <HeroCursorLight />

      <div className="relative z-20 mx-auto max-w-[1560px] lg:min-h-[calc(100vh-10rem)]">
        <div className="relative flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-x-1 xl:gap-x-2 2xl:gap-x-3 lg:items-center lg:min-h-[calc(100vh-10rem)]">
          {/* Copy */}
          <motion.div
            style={{ y: reduce ? 0 : headlineY }}
            variants={reduce ? undefined : heroStagger}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="relative z-20 order-1 w-full lg:max-w-[44rem] xl:max-w-[48rem] 2xl:max-w-[52rem] lg:py-2 xl:py-3 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <motion.div variants={reduce ? undefined : heroFadeUp}>
                <StatusChip time={time} />
              </motion.div>

              <motion.h1
                variants={reduce ? undefined : heroFadeUp}
                className="mt-3 lg:mt-4 font-display text-[clamp(2.35rem,7.4vw,5.85rem)] xl:text-[clamp(3.75rem,6.6vw,7.35rem)] leading-[0.86] tracking-[-0.02em]"
              >
                I turn{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 italic">ideas</span>
                  <span
                    className="absolute left-[-2%] right-[-1%] bottom-[0.08em] h-[0.42em] bg-[var(--lime)] -z-0 rotate-[-0.8deg] animate-pulse"
                    aria-hidden
                  />
                </span>{" "}
                into things <span className="text-shimmer">people</span> want to{" "}
                <span className="inline-flex items-baseline gap-2">
                  use
                  <span className="text-[var(--coral)]">.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={reduce ? undefined : heroFadeUp}
                className="mt-3 lg:mt-3.5 text-[1.5rem] md:text-[1.7rem] xl:text-[2.1rem] text-[var(--ink)]/78 max-w-[28ch] sm:max-w-xl font-medium leading-[1.34]"
              >
                From APIs to interfaces — I build systems end to end.
              </motion.p>

              <motion.div
                variants={reduce ? undefined : heroFadeUp}
                className="mt-4 flex flex-wrap gap-3"
              >
                <MagneticLink
                  href="#work"
                  className="group relative inline-flex items-center gap-2 bg-[var(--cobalt)] text-[var(--paper)] text-[0.95rem] md:text-base font-medium px-6 py-4 xl:px-7 xl:py-[1.1rem] rounded-full border-2 border-[var(--ink)]"
                  style={{ boxShadow: "5px 5px 0 0 var(--ink)" }}
                >
                  Explore my work
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </MagneticLink>
                <MagneticLink
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[var(--paper)] text-[var(--ink)] text-[0.95rem] md:text-base font-medium px-6 py-4 xl:px-7 xl:py-[1.1rem] rounded-full border-2 border-[var(--ink)] hover:bg-[var(--butter)]"
                  style={{ boxShadow: "5px 5px 0 0 var(--ink)" }}
                >
                  Let&apos;s build something
                </MagneticLink>
              </motion.div>

              <motion.div
                variants={reduce ? undefined : heroFadeUp}
                className="mt-4 lg:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5"
              >
                <Ticket color="lilac">CS @ BITS Pilani</Ticket>
                <Ticket color="coral">Backend · APIs · Systems</Ticket>
                <Ticket color="butter" subtle>
                  Full-stack engineer
                </Ticket>
              </motion.div>
            </div>
          </motion.div>

          {/* Locker — locked; do not redesign */}
          <div className="relative z-30 order-2 mt-6 sm:mt-8 lg:mt-0 w-full max-lg:-mx-4 max-lg:w-[calc(100%+2rem)] max-lg:flex max-lg:justify-center max-lg:items-center lg:mx-0 lg:w-full lg:justify-end lg:-ml-6 xl:-ml-8 2xl:-ml-10 lg:-mr-2 xl:-mr-4 pointer-events-none">
            <div className="relative max-lg:mx-auto max-lg:w-[min(100%,calc(100vw-1.5rem))] max-lg:flex max-lg:justify-center lg:w-full lg:max-w-none">
              <div
                className="pointer-events-none absolute z-30 w-0 h-0"
                data-mascot-anchor="lane-locker"
                style={{ left: "50%", bottom: "11%" }}
                aria-hidden
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 left-[8%] right-[8%] h-10 rounded-[50%] bg-[var(--ink)]/8 blur-2xl lg:left-[10%] lg:right-[4%]"
              />
              <HeroLockerStage className="relative w-[min(100%,calc(100vw-1.5rem))] max-lg:mx-auto lg:w-full lg:flex lg:justify-end lg:mx-0 pointer-events-auto">
                <motion.div
                  style={{ y: reduce ? 0 : lockerY }}
                  initial={false}
                  className="relative w-[min(100%,calc(100vw-1.5rem))] max-lg:mx-auto lg:w-full lg:flex lg:justify-end lg:mx-0"
                >
                  {USE_CSS_LOCKER ? (
                    <div className="relative w-full mx-auto lg:mx-0 lg:ml-auto">
                      <Locker3D />
                    </div>
                  ) : (
                    <LockerWorkspace />
                  )}
                </motion.div>
              </HeroLockerStage>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-14 md:mt-16 lg:mt-12 xl:mt-14 -mx-4 md:-mx-6 lg:-mx-10 xl:-mx-12 border-y-2 border-[var(--ink)] bg-[var(--midnight)] text-[var(--paper)] overflow-hidden shadow-[inset_0_0_80px_rgba(215,255,53,0.08)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--lime)]/10 via-transparent to-[var(--cobalt)]/10"
        />
        <div className="marquee-track py-4 whitespace-nowrap font-display text-3xl md:text-5xl [text-shadow:0_0_40px_rgba(215,255,53,0.15)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 pr-8">
              <span>Architect</span>
              <Dot color="lime" />
              <span className="italic">Build</span>
              <Dot color="coral" />
              <span>Ship</span>
              <Dot color="butter" />
              <span className="italic">Scale</span>
              <Dot color="lilac" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span className="inline-block w-3 h-3 rounded-full" style={{ background: `var(--${color})` }} />
  );
}

function StatusChip({ time }: { time: string }) {
  return (
    <div className="inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] rounded-full pl-2 pr-4 py-1.5 font-mono text-xs tracking-wider uppercase">
      <span className="flex items-center gap-1.5 bg-[var(--lime)] text-[var(--ink)] rounded-full px-2 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] blink" />
        Online
      </span>
      <span>{time || "--:--"}</span>
      <span className="opacity-60">·</span>
      <span>2026 · Open to internships</span>
    </div>
  );
}

function Ticket({
  color,
  subtle = false,
  children,
}: {
  color: "lilac" | "coral" | "butter" | "lime";
  subtle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 border-2 border-[var(--ink)] font-mono uppercase tracking-wider ${
        subtle
          ? "px-2.5 py-1 text-[0.62rem] sm:text-[0.68rem] opacity-80"
          : "px-3 py-1.5 text-[0.68rem] sm:text-xs"
      }`}
      style={{
        background: `var(--${color})`,
        clipPath:
          "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
      {children}
    </span>
  );
}

/* ───────────────────────── FEATURED PROJECT ───────────────────────── */
function FeaturedProject() {
  const [activeId, setActiveId] = useState<string>("brandforge");
  const [openCase, setOpenCase] = useState<string | null>(null);
  const project = PROJECTS.find((p) => p.id === activeId)!;
  const idx = PROJECTS.findIndex((p) => p.id === activeId);
  const shippedCount = PROJECTS.length;
  const liveCount = PROJECTS.filter((p) => !!p.liveUrl).length;
  const integrationCount = PROJECTS.reduce((sum, p) => sum + p.stack.length, 0);

  return (
    <SectionReveal
      id="work"
      className="relative px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 border-y-2 border-[var(--ink)] overflow-hidden paper-grain transition-colors duration-500"
      style={{ background: `var(--${project.bg})` }}
    >
      <div
        className="pointer-events-none absolute left-10 md:left-14 top-[48%] w-0 h-0"
        data-mascot-anchor="lane-work"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink)]/60 mb-3">
              Chapter 01 · Featured artefact · 0{idx + 1} / 04
            </div>
            <h2 className="font-display text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] md:text-[clamp(2.75rem,6vw,5rem)] leading-[0.95]">
              From the locker: <span className="italic">a tape labelled</span>{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[var(--ink)] text-[var(--paper)] px-3 inline-block rotate-[-1.5deg]"
                >
                  {project.name}
                </motion.span>
              </AnimatePresence>
            </h2>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/65">
              {shippedCount} shipped projects · {liveCount} live demos · {integrationCount}+ stack
              integrations
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-wider bg-[var(--paper)] border-2 border-[var(--ink)] px-3 py-1.5">
            0{idx + 1} / 04 unlocked
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Preview card */}
            <div className="lg:col-span-7 relative bg-[var(--paper)] border-[3px] border-[var(--ink)] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "14px 14px 0 0 var(--ink)" }}
                aria-hidden
              />
              <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[var(--ink)] bg-[var(--butter)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[var(--coral)] border border-[var(--ink)]" />
                  <span className="w-3 h-3 rounded-full bg-[var(--butter)] border border-[var(--ink)]" />
                  <span className="w-3 h-3 rounded-full bg-[var(--lime)] border border-[var(--ink)]" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest truncate">
                  {project.id}.case — 0{idx + 1} / 04
                </div>
                <div className="flex items-center gap-1.5">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--lime)]"
                    >
                      Live
                    </a>
                  ) : (
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]/60">
                      Demo req
                    </span>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--cobalt)] hover:text-[var(--paper)]"
                  >
                    Code
                  </a>
                </div>
              </div>

              <div className="relative">
                <ProjectPreview preview={project.preview} />
                <div className="absolute top-4 right-4 -rotate-6 bg-[var(--lime)] border-2 border-[var(--ink)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest">
                  In the locker
                </div>
                <div
                  className="absolute -bottom-3 left-6 rotate-[-2deg] border-2 border-[var(--ink)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--paper)]"
                  style={{ background: `var(--${project.accent})` }}
                >
                  {project.category}
                </div>
              </div>

              <div className="grid grid-cols-3 border-t-2 border-[var(--ink)] font-mono text-[10px] uppercase tracking-widest">
                {[
                  ["Stack", project.stack.slice(0, 2).join(" · ")],
                  ["Role", project.role.split("+")[0].trim()],
                  ["Status", "Open in case study →"],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-3 border-r-2 border-[var(--ink)] last:border-r-0">
                    <div className="text-[var(--ink)]/50">{k}</div>
                    <div className="mt-1 text-[var(--ink)] normal-case tracking-normal text-sm font-sans font-medium">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[var(--paper)] border-[3px] border-[var(--ink)] rounded-2xl p-6 md:p-8 relative tape">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60">
                  The brief
                </div>
                <p className="mt-2 font-display text-2xl md:text-3xl leading-tight italic">
                  &ldquo;{project.brief}&rdquo;
                </p>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60">
                  Outcome
                </div>
                <p className="mt-2 text-[var(--ink)]/85 leading-relaxed">{project.outcome}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 bg-[var(--paper)] border-2 border-[var(--ink)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <ProjectLinks project={project} />
              </div>

              <div className="bg-[var(--ink)] text-[var(--paper)] border-[3px] border-[var(--ink)] rounded-2xl p-6 md:p-8 relative">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 grid place-items-center bg-[var(--cobalt)] border-2 border-[var(--paper)] rounded-md p-1 font-mono text-lg font-bold text-[var(--paper)]">
                    AE
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--lime)]">
                      Role on this one
                    </div>
                    <p className="mt-1 font-display text-xl leading-snug">{project.role}.</p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, boxShadow: "6px 6px 0 0 var(--paper)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOpenCase(project.id);
                    window.dispatchEvent(new CustomEvent("mascot:case-open"));
                  }}
                  className="mt-6 inline-flex w-full items-center justify-between bg-[var(--lime)] text-[var(--ink)] font-medium px-5 py-3 rounded-full border-2 border-[var(--paper)] hover:bg-[var(--paper)] transition-colors group"
                  style={{ boxShadow: "4px 4px 0 0 var(--paper)" }}
                >
                  <span>Open the case study</span>
                  <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project tabs */}
        <div className="mt-12">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/70 mb-3">
            Switch tape →
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECTS.map((p, i) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="group text-left px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-mono text-xs uppercase tracking-widest transition-all"
                  style={{
                    background: isActive ? "var(--ink)" : "var(--paper)",
                    color: isActive ? "var(--paper)" : "var(--ink)",
                    boxShadow: isActive ? "5px 5px 0 0 var(--paper)" : "4px 4px 0 0 var(--ink)",
                    transform: isActive ? "translate(-1px,-1px)" : "none",
                  }}
                >
                  <span className="block text-[9px] opacity-60">Tape · 0{i + 1}</span>
                  <span className="text-sm normal-case tracking-normal font-display">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <CaseStudyModal
        project={openCase ? PROJECTS.find((p) => p.id === openCase)! : null}
        onClose={() => setOpenCase(null)}
        onSwitch={(id) => setOpenCase(id)}
      />
    </SectionReveal>
  );
}

/* ───────────────────────── PROJECT PREVIEWS ───────────────────────── */
function ProjectPreview({ preview }: { preview: Project["preview"] }) {
  const src = PROJECT_IMAGES[preview];
  const label = PROJECTS.find((p) => p.preview === preview)?.name ?? "Project preview";

  return (
    <img
      src={src}
      alt={`${label} preview`}
      width={1440}
      height={900}
      loading="lazy"
      decoding="async"
      className="w-full h-auto block bg-[var(--paper)]"
    />
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-2 bg-[var(--paper)] border-2 border-[var(--ink)] hover:bg-[var(--butter)] transition-colors"
        >
          Live demo →
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-2 bg-[var(--muted)] border-2 border-[var(--ink)] text-[var(--ink)]/75">
          Demo on request
        </span>
      )}
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-2 bg-[var(--paper)] border-2 border-[var(--ink)] hover:bg-[var(--butter)] transition-colors"
      >
        View code →
      </a>
    </div>
  );
}

/* ───────────────────────── CASE STUDY MODAL ───────────────────────── */
function CaseStudyModal({
  project,
  onClose,
  onSwitch,
}: {
  project: Project | null;
  onClose: () => void;
  onSwitch: (id: string) => void;
}) {
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    if (!project) return;
    setBooting(true);
    const t = window.setTimeout(() => setBooting(false), 720);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-[var(--ink)]/75 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 48, opacity: 0, scale: 0.94, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto my-6 md:my-10 max-w-5xl border-[3px] border-[var(--ink)] rounded-2xl overflow-hidden paper-grain"
            style={{ background: `var(--${project.bg})` }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} case study`}
          >
            <AnimatePresence>
              {booting ? (
                <motion.div
                  key="boot"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--lime)] pointer-events-none"
                >
                  <div className="font-mono text-sm md:text-base uppercase tracking-[0.35em] text-[var(--ink)] animate-pulse">
                    {"\u25B6"} Inserting tape · loading case study
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {/* Top bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 border-b-2 border-[var(--ink)] bg-[var(--paper)]">
              <button
                onClick={onClose}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 bg-[var(--paper)] border-2 border-[var(--ink)] hover:bg-[var(--butter)] transition-colors"
              >
                {"\u2190"} Back to locker
              </button>
              <div className="font-mono text-[10px] uppercase tracking-widest hidden md:block">
                Case study · {project.name}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 grid place-items-center font-mono border-2 border-[var(--ink)] hover:bg-[var(--coral)] hover:text-[var(--paper)] transition-colors"
              >
                {"\u00D7"}
              </button>
            </div>

            <div className="p-6 md:p-10">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink)]/60 mb-3">
                {project.category}
              </div>
              <h3 className="font-display text-4xl md:text-6xl leading-[0.95]">{project.name}</h3>
              <p className="mt-3 font-display italic text-xl md:text-2xl text-[var(--ink)]/80 max-w-2xl">
                {project.tagline}
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-widest">
                <InfoBlock k="Role" v={project.role} />
                <InfoBlock k="Stack" v={project.stack.join(" · ")} />
                <InfoBlock k="Stage" v="Active build / shipped" />
              </div>

              <ProjectLinks project={project} />

              <div className="mt-8 bg-[var(--paper)] border-[3px] border-[var(--ink)] rounded-2xl overflow-hidden">
                <ProjectPreview preview={project.preview} />
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--paper)] border-[3px] border-[var(--ink)] rounded-2xl p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60">
                    The brief
                  </div>
                  <p className="mt-2 font-display italic text-2xl leading-tight">
                    &ldquo;{project.brief}&rdquo;
                  </p>
                </div>
                <div className="bg-[var(--ink)] text-[var(--paper)] rounded-2xl p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--lime)]">
                    The outcome
                  </div>
                  <p className="mt-2 text-lg leading-relaxed">{project.outcome}</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink)]/60">
                  How it works
                </div>
                {project.bullets.map((b, i) => (
                  <div
                    key={b.title}
                    className="bg-[var(--paper)] border-2 border-[var(--ink)] rounded-xl p-5 flex gap-4"
                  >
                    <div
                      className="shrink-0 w-10 h-10 grid place-items-center font-mono text-sm border-2 border-[var(--ink)]"
                      style={{ background: `var(--${project.accent})`, color: "var(--paper)" }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <div className="font-display text-xl leading-tight">{b.title}</div>
                      <p className="mt-1 text-[var(--ink)]/80 leading-relaxed">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* footer nav */}
              <div className="mt-12 pt-6 border-t-2 border-[var(--ink)]/20 flex flex-wrap gap-2 items-center justify-between">
                <button
                  onClick={onClose}
                  className="font-mono text-[10px] uppercase tracking-widest px-4 py-2.5 bg-[var(--ink)] text-[var(--paper)] rounded-full hover:bg-[var(--cobalt)] transition-colors"
                >
                  {"\u2190"} Close case study
                </button>
                <div className="flex flex-wrap gap-2">
                  {PROJECTS.filter((p) => p.id !== project.id).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSwitch(p.id)}
                      className="font-mono text-[10px] uppercase tracking-widest px-3 py-2 bg-[var(--paper)] border-2 border-[var(--ink)] hover:bg-[var(--butter)] transition-colors"
                    >
                      Next · {p.name} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoBlock({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[var(--paper)] border-2 border-[var(--ink)] px-3 py-2.5">
      <div className="text-[var(--ink)]/50">{k}</div>
      <div className="mt-1 text-[var(--ink)] normal-case tracking-normal text-sm font-sans font-medium">
        {v}
      </div>
    </div>
  );
}

function Stat({
  k,
  v,
  color,
  light = false,
}: {
  k: string;
  v: string;
  color: string;
  light?: boolean;
}) {
  return (
    <div
      className="border-2 border-[var(--ink)] px-3 py-2.5"
      style={{
        background: `var(--${color})`,
        color: light ? "var(--paper)" : "var(--ink)",
      }}
    >
      <div className="text-[10px] opacity-80">{k}</div>
      <div className="font-display text-2xl normal-case tracking-normal">{v}</div>
    </div>
  );
}

/* ───────────────────────── TECHNICAL IDENTITY (SYSTEM PANEL) ───────────────────────── */

type Category = "Languages" | "Backend" | "Engineering" | "Frontend" | "AI" | "Design & Media";

const skills: Record<Category, { name: string; lvl: number }[]> = {
  Languages: [
    { name: "Java", lvl: 74 },
    { name: "Python", lvl: 86 },
    { name: "SQL", lvl: 72 },
    { name: "C", lvl: 68 },
    { name: "JavaScript", lvl: 90 },
    { name: "TypeScript", lvl: 84 },
  ],
  Backend: [
    { name: "Flask", lvl: 82 },
    { name: "REST APIs", lvl: 84 },
    { name: "MySQL", lvl: 78 },
    { name: "Firebase / Firestore", lvl: 80 },
    { name: "Node.js", lvl: 76 },
    { name: "Git & GitHub", lvl: 88 },
  ],
  Engineering: [
    { name: "Data Structures & Algorithms", lvl: 74 },
    { name: "Object-Oriented Programming", lvl: 76 },
    { name: "Database Management Systems", lvl: 76 },
    { name: "API Design", lvl: 80 },
    { name: "Operating Systems", lvl: 70 },
    { name: "Computer Networks", lvl: 68 },
    { name: "System Design", lvl: 72 },
  ],
  Frontend: [
    { name: "React", lvl: 88 },
    { name: "Next.js", lvl: 78 },
    { name: "HTML", lvl: 95 },
    { name: "CSS", lvl: 92 },
    { name: "Tailwind", lvl: 92 },
  ],
  AI: [
    { name: "OpenAI APIs", lvl: 82 },
    { name: "Gemini APIs", lvl: 78 },
    { name: "Ollama", lvl: 70 },
    { name: "Hugging Face", lvl: 72 },
    { name: "EasyOCR / ML pipelines", lvl: 74 },
    { name: "Prompt Engineering", lvl: 85 },
  ],
  "Design & Media": [
    { name: "Figma", lvl: 94 },
    { name: "Adobe Illustrator", lvl: 82 },
    { name: "Adobe Photoshop", lvl: 75 },
    { name: "After Effects", lvl: 70 },
    { name: "Canva", lvl: 90 },
  ],
};

const categoryColor: Record<Category, string> = {
  Languages: "coral",
  Backend: "lime",
  Engineering: "butter",
  Frontend: "cobalt",
  AI: "lilac",
  "Design & Media": "coral",
};

/* Dual craft lanes — narrative panel (replaces tool grid). */
const CRAFT_LANES = [
  {
    lane: "01",
    title: "Engineering",
    accent: "cobalt" as const,
    blurb: "Backends, APIs and the systems that stay up after launch.",
    beats: [
      "Service layers with Flask, Firebase & SQL",
      "React / Next fronts wired to real data",
      "Docker, Git & deploy-ready workflows",
      "AI pipelines integrated into product",
    ],
  },
  {
    lane: "02",
    title: "Design",
    accent: "coral" as const,
    blurb: "Brand systems and interfaces — I design them and ship the code.",
    beats: [
      "Figma systems, components & handoff specs",
      "Illustrator, Photoshop & After Effects",
      "Campaign surfaces, motion & visual identity",
      "Design → dev without losing the intent",
    ],
  },
] as const;

const craftAccentBorder: Record<(typeof CRAFT_LANES)[number]["accent"], string> = {
  cobalt: "var(--cobalt)",
  coral: "var(--coral)",
};

const craftAccentBg: Record<(typeof CRAFT_LANES)[number]["accent"], string> = {
  cobalt: "rgba(74,124,255,0.08)",
  coral: "rgba(255,107,107,0.1)",
};

function TechIdentity() {
  const [active, setActive] = useState<Category>("Backend");

  return (
    <SectionReveal
      id="system"
      className="relative px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 bg-[var(--midnight)] text-[var(--paper)] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-6 md:left-8 top-[54%] w-0 h-0"
        data-mascot-anchor="lane-system"
        aria-hidden
      />
      {/* grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--lime)] mb-3">
              Chapter 02 · System panel
            </div>
            <h2 className="font-display text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] md:text-[clamp(2.75rem,6vw,5rem)] leading-[0.95]">
              Engineering &amp; <span className="italic text-[var(--butter)]">design</span>, one
              stack.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--paper)]/70">
              I design the interface and build the system underneath — same person, same repo.
              Browse skill categories; bars reflect how often each shows up in real work.
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest bg-[var(--paper)] text-[var(--ink)] px-3 py-1.5 border-2 border-[var(--lime)]">
            HP 100 · Coffee 78%
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Categories + Current Run */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex lg:flex-col gap-2 flex-wrap">
              {(Object.keys(skills) as Category[]).map((c) => {
                const isActive = c === active;
                return (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className="text-left px-4 py-3 border-2 rounded-xl font-mono text-xs uppercase tracking-widest transition-all"
                    style={{
                      borderColor: isActive
                        ? `var(--${categoryColor[c]})`
                        : "rgba(245,241,234,0.25)",
                      background: isActive ? `var(--${categoryColor[c]})` : "transparent",
                      color: isActive ? "var(--ink)" : "var(--paper)",
                      boxShadow: isActive ? `5px 5px 0 0 var(--paper)` : "none",
                    }}
                  >
                    <span className="block text-[10px] opacity-60">
                      0{Object.keys(skills).indexOf(c) + 1}
                    </span>
                    {c}
                  </button>
                );
              })}
            </div>

            {/* CURRENT RUN */}
            <div className="rounded-2xl bg-[var(--lime)] text-[var(--ink)] border-[3px] border-[var(--paper)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                Current run
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>04 ·</span>
                  <span>Featured projects</span>
                </div>
                <div className="flex justify-between">
                  <span>02 ·</span>
                  <span>Craft lanes</span>
                </div>
                <div className="flex justify-between">
                  <span>06 ·</span>
                  <span>Skill tracks</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t-2 border-[var(--ink)] font-mono text-[10px] uppercase tracking-widest opacity-70">
                Currently shipping
              </div>
              <div className="font-display text-base leading-tight mt-0.5">PlantOS</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-70">
                Next checkpoint
              </div>
              <div className="mt-1 h-2 bg-[var(--ink)]/15 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-[var(--ink)]" />
              </div>
              <div className="mt-1 text-[10px] font-sans opacity-80">
                Internship-ready software engineer
              </div>
            </div>
          </div>

          {/* Skill grid */}
          <div className="lg:col-span-6 lg:self-start bg-[var(--paper)] text-[var(--ink)] rounded-2xl border-[3px] border-[var(--paper)] p-5 md:p-6 relative">
            <div className="flex items-center justify-between mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/60">
              <span>~/skills/{active.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral)] animate-pulse" />
                live
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {skills[active].map((s) => (
                  <div
                    key={s.name}
                    className="text-left border-2 border-[var(--ink)] p-3 rounded-lg bg-[var(--paper)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{s.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/45">
                        {s.lvl}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-[var(--ink)]/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.lvl}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full"
                        style={{ background: `var(--${categoryColor[active]})` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between font-mono text-[10px] tracking-wider text-[var(--ink)]/60">
                      <span>In rotation</span>
                      <span>{s.lvl >= 85 ? "daily" : s.lvl >= 70 ? "often" : "building"}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 pt-4 border-t-2 border-[var(--ink)]/12 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border-2 border-[var(--ink)] rounded-lg p-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/50">
                  ~/focus
                </div>
                <div className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/65">
                  Current focus
                </div>
                <ul className="mt-2 space-y-1 font-mono text-[11px] leading-snug">
                  {[
                    "Backend & API design",
                    "Design systems & handoff",
                    "Data & ML pipelines",
                    "End-to-end delivery",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-[var(--cobalt)] shrink-0">&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-2 border-[var(--ink)] rounded-lg p-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/50">
                  ~/learning
                </div>
                <div className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/65">
                  Now learning
                </div>
                <ul className="mt-2 space-y-1 font-mono text-[11px] leading-snug">
                  {["Docker", "AWS", "System Design", "Machine Learning"].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-[var(--coral)] shrink-0">~</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-2 border-[var(--ink)] rounded-lg p-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/50">
                  ~/status
                </div>
                <div className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-[var(--ink)]/65">
                  System status
                </div>
                <dl className="mt-2 space-y-1.5 font-mono text-[10px] leading-snug">
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--ink)]/50">Target Role:</dt>
                    <dd className="font-medium text-right">Software Engineer</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--ink)]/50">Current Goal:</dt>
                    <dd className="font-medium text-right">Full-stack + backend</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--ink)]/50">Location:</dt>
                    <dd className="font-medium text-right">UAE</dd>
                  </div>
                  <div>
                    <div className="flex justify-between gap-2 mb-0.5">
                      <dt className="text-[var(--ink)]/50">Curiosity:</dt>
                      <dd>100%</dd>
                    </div>
                    <div className="h-1 bg-[var(--ink)]/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[var(--cobalt)]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between gap-2 mb-0.5">
                      <dt className="text-[var(--ink)]/50">Coffee:</dt>
                      <dd>78%</dd>
                    </div>
                    <div className="h-1 bg-[var(--ink)]/10 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-[var(--coral)]" />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 pt-0.5">
                    <dt className="text-[var(--ink)]/50">Status:</dt>
                    <dd className="flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-pulse" />
                      Building...
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Craft lanes + Build Profile */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* DUAL CRAFT */}
            <div className="rounded-2xl border-2 border-[var(--paper)]/30 p-4 flex flex-col gap-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--paper)]/70">
                Dual craft
              </div>
              {CRAFT_LANES.map((lane) => (
                <div
                  key={lane.lane}
                  className="rounded-xl border-l-[3px] pl-3 py-2.5"
                  style={{
                    borderLeftColor: craftAccentBorder[lane.accent],
                    background: craftAccentBg[lane.accent],
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--paper)]/45">
                      {lane.lane}
                    </span>
                    <span className="font-display text-base leading-tight">{lane.title}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-snug text-[var(--paper)]/75 font-sans">
                    {lane.blurb}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {lane.beats.map((beat) => (
                      <li
                        key={beat}
                        className="flex items-start gap-2 font-mono text-[10px] leading-snug text-[var(--paper)]/80"
                      >
                        <span
                          style={{ color: craftAccentBorder[lane.accent] }}
                          className="shrink-0"
                        >
                          —
                        </span>
                        <span>{beat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* BUILD PROFILE */}
            <div className="rounded-2xl bg-[var(--coral)] text-[var(--ink)] border-[3px] border-[var(--paper)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                Build profile
              </div>
              <div className="font-display text-lg leading-tight mt-0.5">
                Software Engineer + Design Specialist
              </div>
              <div className="mt-3 pt-3 border-t-2 border-[var(--ink)] font-mono text-[10px] uppercase tracking-widest opacity-70">
                Current role
              </div>
              <div className="font-display text-sm leading-tight mt-0.5">
                Design &amp; Marketing Lead, Axiomaera
              </div>
              <div className="mt-3 pt-3 border-t-2 border-[var(--ink)] font-mono text-[10px] uppercase tracking-widest opacity-70">
                Studying
              </div>
              <div className="font-display text-sm leading-tight mt-0.5">
                B.E. Computer Science · BITS Pilani
              </div>
              <div className="mt-3 pt-3 border-t-2 border-[var(--ink)] font-mono text-[10px] uppercase tracking-widest opacity-70">
                Specialty
              </div>
              <div className="font-display text-sm leading-tight mt-0.5">
                Full-stack builds · brand systems · AI product surfaces
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

/* ───────────────────────── DEPLOYMENT LOG ───────────────────────── */

type DeployStatus = "ACTIVE" | "COMPLETED" | "DEPLOYED";

type Deployment = {
  id: string;
  org: string;
  role: string;
  duration: string;
  status: DeployStatus;
  accent: "lime" | "coral" | "butter" | "cobalt" | "lilac";
  bullets: string[];
  tools: string;
};

const DEPLOYMENTS: Deployment[] = [
  {
    id: "DEP-007",
    org: "Axiomaera",
    role: "Digital Media & Marketing Lead",
    duration: "February 2026 — Present",
    status: "ACTIVE",
    accent: "lime",
    bullets: [
      "Led brand systems across web, social and campaign surfaces.",
      "Shipped launch assets aligned with product and go-to-market.",
      "Directed creative while keeping output fast and measurable.",
      "Bridged design and engineering handoffs for on-brand releases.",
    ],
    tools: "Figma · Illustrator · After Effects · Canva",
  },
  {
    id: "DEP-006",
    org: "BSF Design Committee",
    role: "Executive Member",
    duration: "September 2025 — November 2025",
    status: "COMPLETED",
    accent: "coral",
    bullets: [
      "Directed sports festival visual identity across large campus programming.",
      "Aligned designers under tight deadlines without visual drift.",
      "Built reusable templates for faster recurring collateral.",
    ],
    tools: "Figma · Illustrator · Photoshop · After Effects · Canva",
  },
  {
    id: "DEP-005",
    org: "BTF",
    role: "Creative Co-Lead",
    duration: "September 2025 — November 2025",
    status: "COMPLETED",
    accent: "butter",
    bullets: [
      "Co-led brand refresh for a major student tech forum.",
      "Mentored juniors on layout, type and presentation quality.",
    ],
    tools: "Figma · Illustrator · After Effects · CapCut",
  },
  {
    id: "DEP-004",
    org: "GDG On Campus",
    role: "Creative Executive",
    duration: "August 2025 — June 2026",
    status: "DEPLOYED",
    accent: "cobalt",
    bullets: [
      "Designed dev-community campaigns for approachable tech events.",
      "Synced creative timelines with workshop and hackathon ops.",
      "Maintained a lightweight system for fast chapter comms.",
    ],
    tools: "Canva · Illustrator · CapCut",
  },
  {
    id: "DEP-003",
    org: "Jashn",
    role: "Creative Executive",
    duration: "February 2025 — April 2025",
    status: "COMPLETED",
    accent: "lilac",
    bullets: [
      "Shipped festival creatives across print, digital and on-site.",
      "Turned cultural themes into bold, readable visual directions.",
      "Kept type hierarchy strong across high-visibility touchpoints.",
    ],
    tools: "Figma · Illustrator · Photoshop · After Effects · Canva",
  },
  {
    id: "DEP-002",
    org: "BSF",
    role: "Creative Executive",
    duration: "August 2024 — November 2024",
    status: "COMPLETED",
    accent: "coral",
    bullets: [
      "Produced campaign visuals across multiple festival tracks.",
      "Iterated posters, stories and stage graphics under pressure.",
    ],
    tools: "Figma · Illustrator · Canva · After Effects",
  },
  {
    id: "DEP-001",
    org: "ICS",
    role: "Digital Media Intern",
    duration: "June 2024 — August 2024",
    status: "DEPLOYED",
    accent: "butter",
    bullets: [
      "Supported client-facing digital content and brand deliverables.",
      "Handled editing, layout and asset prep for web and social.",
      "Managed briefs, revisions and deadlines in a live pipeline.",
      "Learned production discipline across feedback and handoff cycles.",
    ],
    tools: "Photoshop · Illustrator · Canva · CapCut",
  },
];

const statusStyle: Record<DeployStatus, { color: string; label: string }> = {
  ACTIVE: { color: "var(--lime)", label: "Status" },
  COMPLETED: { color: "var(--butter)", label: "Status" },
  DEPLOYED: { color: "var(--coral)", label: "Status" },
};

function DeploymentLog() {
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6]);

  return (
    <SectionReveal
      id="log"
      className="relative px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 bg-[var(--midnight)] text-[var(--paper)] overflow-hidden border-t-2 border-[var(--ink)]"
    >
      <div
        className="pointer-events-none absolute left-6 md:left-8 top-[42%] w-0 h-0"
        data-mascot-anchor="lane-log"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--lime)] mb-3">
              Chapter 03 · Deployment log
            </div>
            <h2 className="font-display text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] md:text-[clamp(2.75rem,6vw,5rem)] leading-[0.95]">
              Career <span className="italic text-[var(--butter)]">deployments</span>.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--paper)]/70">
              A mission log of engineering and leadership roles — backend work, shipped products and
              teams built along the way.
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest bg-[var(--paper)] text-[var(--ink)] px-3 py-1.5 border-2 border-[var(--lime)]">
            7 Logged · Building
          </div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline track */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden md:block w-px -translate-x-1/2 bg-[var(--paper)]/10"
          />

          {/* Scroll-driven line fill */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 hidden md:block w-px -translate-x-1/2 origin-top"
              style={{
                height: lineHeight,
                opacity: lineGlow,
                background:
                  "linear-gradient(180deg, var(--lime) 0%, var(--cobalt) 45%, var(--coral) 100%)",
                boxShadow: "0 0 12px rgba(215,255,53,0.35)",
              }}
            />
          )}

          <div className="space-y-10 md:space-y-14">
            {DEPLOYMENTS.map((d, i) => {
              const alignLeft = i % 2 === 0;
              return (
                <motion.article
                  key={d.id}
                  initial={reduce ? false : { opacity: 0, x: alignLeft ? -48 : 48, y: 32 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{
                    duration: 0.65,
                    delay: reduce ? 0 : i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative w-full md:w-[calc(50%-2rem)] ${
                    alignLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <motion.div
                    className="rounded-2xl border-2 border-[var(--paper)]/25 bg-[var(--paper)]/5 p-4 md:p-5 backdrop-blur-sm"
                    style={{ boxShadow: `6px 6px 0 0 var(--${d.accent})` }}
                    whileHover={reduce ? undefined : { y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-widest">
                      <span
                        className="px-2 py-0.5 border border-[var(--paper)]/20"
                        style={{ color: statusStyle[d.status].color }}
                      >
                        {d.status}
                      </span>
                      <span className="text-[var(--paper)]/40">{d.duration}</span>
                    </div>

                    <h3 className="mt-3 font-display text-xl md:text-2xl leading-tight">{d.org}</h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--paper)]/60">
                      {d.role}
                    </p>

                    <div className="my-3 border-t border-[var(--paper)]/12" />

                    <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--paper)]/45 mb-2">
                      Key contributions
                    </p>
                    <ul className="space-y-1.5">
                      {d.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-[13px] text-[var(--paper)]/78 leading-snug"
                        >
                          <span className="shrink-0" style={{ color: `var(--${d.accent})` }}>
                            •
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="my-3 border-t border-[var(--paper)]/12" />

                    <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--paper)]/45 mb-1">
                      Tools
                    </p>
                    <p className="font-mono text-[10px] text-[var(--paper)]/55 leading-relaxed">
                      {d.tools}
                    </p>
                  </motion.div>

                  <motion.div
                    aria-hidden
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 22,
                      delay: reduce ? 0 : 0.12 + i * 0.06,
                    }}
                    className={`hidden md:block absolute top-8 z-10 h-3 w-3 ${
                      alignLeft ? "-right-[calc(2rem+6px)]" : "-left-[calc(2rem+6px)]"
                    }`}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[var(--paper)]/40"
                      animate={
                        reduce
                          ? undefined
                          : {
                              scale: [1, 1.8, 1],
                              opacity: [0.5, 0, 0.5],
                            }
                      }
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span
                      className="relative block h-3 w-3 rounded-full border-2 border-[var(--paper)]"
                      style={{
                        background: `var(--${d.accent})`,
                        boxShadow: `0 0 10px var(--${d.accent})`,
                      }}
                    />
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-14 font-mono text-[10px] uppercase tracking-widest text-[var(--paper)]/45 text-center">
          7 deployments logged · end of transmission
        </div>
      </div>
    </SectionReveal>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */
function Footer() {
  const contactLinks = [
    {
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      external: false,
    },
    {
      label: "LinkedIn",
      value: "alemaemran",
      href: CONTACT.linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: "Alema-em",
      href: CONTACT.github,
      external: true,
    },
    {
      label: CONTACT.phoneIndia.label,
      value: CONTACT.phoneIndia.display,
      href: CONTACT.phoneIndia.whatsapp,
      external: true,
    },
    {
      label: CONTACT.phoneDubai.label,
      value: CONTACT.phoneDubai.display,
      href: `tel:${CONTACT.phoneDubai.tel}`,
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 bg-[var(--cobalt)] text-[var(--paper)] border-t-2 border-[var(--ink)] paper-grain overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-6 md:left-8 bottom-[6%] w-0 h-0"
        data-mascot-anchor="lane-contact"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-6 opacity-80">
          End of level · Save point
        </div>
        <h2 className="font-display text-balance text-[clamp(2.35rem,6.5vw,5.5rem)] md:text-[clamp(3rem,7vw,6rem)] leading-[0.95] max-w-[14ch]">
          Let&apos;s build the <span className="italic text-[var(--butter)]">next</span> thing.
        </h2>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center justify-center gap-2 bg-[var(--paper)] text-[var(--ink)] text-sm sm:text-base font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border-2 border-[var(--ink)] hover:bg-[var(--lime)] transition-colors min-h-[44px]"
            style={{ boxShadow: "5px 5px 0 0 var(--ink)" }}
          >
            {CONTACT.email} →
          </a>
          <a
            href={CONTACT.cvUrl}
            download={CONTACT.cvFilename}
            className="inline-flex items-center justify-center gap-2 bg-[var(--butter)] text-[var(--ink)] text-sm sm:text-base font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border-2 border-[var(--ink)] hover:bg-[var(--lime)] transition-colors min-h-[44px]"
            style={{ boxShadow: "5px 5px 0 0 var(--ink)" }}
          >
            Download CV ↓
          </a>
          <a
            href="#top"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--paper)] text-sm sm:text-base font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border-2 border-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors min-h-[44px]"
          >
            Back to start
          </a>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col gap-1 rounded-xl border-2 border-[var(--paper)]/25 bg-[var(--paper)]/5 px-4 py-3.5 hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors min-h-[44px]"
            >
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest opacity-70 group-hover:opacity-90">
                {item.label}
              </span>
              <span className="text-sm sm:text-base font-medium break-all">{item.value}</span>
            </a>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 border-t border-[var(--paper)]/30 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest opacity-80">
          <span>© {new Date().getFullYear()} Alema Emran · Designed &amp; built from scratch</span>
          <span>CS @ BITS Pilani · Dubai</span>
        </div>
      </div>
    </section>
  );
}
