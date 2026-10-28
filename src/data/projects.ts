export type ProjectPreviewId =
  | "brandforge"
  | "lamaos"
  | "marketmate"
  | "btfphotobooth"
  | "plant";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  bg: string;
  accent: string;
  ink: string;
  role: string;
  stack: string[];
  brief: string;
  /** 3–4 line architecture overview for case studies */
  architecture: string;
  outcome: string;
  /** One measurable result — use TODO comment in source if unverified */
  measurable: string;
  bullets: { title: string; body: string }[];
  preview: ProjectPreviewId;
  image: string;
  /** Omit when there is no public demo — UI shows GitHub only (never "Demo on request") */
  liveUrl?: string;
  repoUrl: string;
};

export const PROJECTS: Project[] = [
  {
    id: "brandforge",
    name: "BrandKit AI",
    tagline: "Brand identity, on tap.",
    category: "AI · Backend · Full Stack",
    bg: "lilac",
    accent: "cobalt",
    ink: "ink",
    role: "Full-stack engineering · AI pipelines & UI",
    stack: ["Python", "Flask", "Ollama", "Vanilla JS"],
    brief: "Founders need usable brand assets fast not weeks-long agency process.",
    architecture:
      "Flask API wraps a local Ollama generation pipeline. Vanilla JS client drives guided prompts, live previews, and export of identity artifacts. Prompt state stays on the server between follow-up turns.",
    outcome:
      "Built an end-to-end AI brand workflow that turns a one-line prompt into a production-ready identity kit in minutes.",
    // TODO: replace with a verified metric (time-to-kit, export count, etc.)
    measurable: "TODO: add one verified measurable result for BrandKit AI.",
    bullets: [
      {
        title: "Problem",
        body: "Brand discovery took too long and users dropped off before getting usable output.",
      },
      {
        title: "What I built",
        body: "A Flask + Ollama generation pipeline with guided follow-ups, live previews and export-ready identity artifacts.",
      },
      {
        title: "Architecture",
        body: "Flask service + Ollama models; browser UI for prompt loops and downloadable brand kits.",
      },
    ],
    preview: "brandforge",
    image: "/assets/projects/brandforge.png",
    // TODO: add liveUrl when a public demo is available
    repoUrl: "https://github.com/Alema-em/BrandkitAI",
  },
  {
    id: "lama-os",
    name: "Lama OS",
    tagline: "A calm OS for one human life.",
    category: "Full Stack · Local-first · Product",
    bg: "butter",
    accent: "coral",
    ink: "ink",
    role: "Full-stack engineering · AI pipelines & UI",
    stack: ["React", "TypeScript", "Local-first storage", "Charts"],
    brief:
      "Existing productivity tools were noisy and fragmented across habits, study and health.",
    architecture:
      "React + TypeScript SPA with local-first persistence so core flows work offline. Chart views roll up habits and goals from client-side stores without a required backend round-trip.",
    outcome:
      "Built a local-first personal dashboard that unifies goals, habits and health with instant load and offline reliability.",
    measurable: "Core flows run with zero network dependency after first load.",
    bullets: [
      {
        title: "Problem",
        body: "Users had to switch between multiple apps and lost cross-context visibility.",
      },
      {
        title: "What I built",
        body: "A React + TypeScript local-first app with unified tracking views, streak charts and quick daily/weekly rollups.",
      },
      {
        title: "Architecture",
        body: "Client-side store + chart layer; no mandatory cloud for day-to-day use.",
      },
    ],
    preview: "lamaos",
    image: "/assets/projects/lama-os.png",
    liveUrl: "https://lama-os.vercel.app",
    repoUrl: "https://github.com/Alema-em/LamaOs",
  },
  {
    id: "marketmate",
    name: "MarketMate",
    tagline: "Your portfolio, simplified.",
    category: "Fintech · Backend · Full Stack",
    bg: "coral",
    accent: "cobalt",
    ink: "paper",
    role: "Full-stack engineering · AI pipelines & UI",
    stack: ["Next.js", "Firebase", "Recharts", "Gemini AI"],
    brief:
      "Retail investors needed a simpler way to monitor holdings without spreadsheet-heavy workflows.",
    architecture:
      "Next.js app with Firebase for auth/data and server routes that fetch/cache market quotes. Recharts renders portfolio analytics; Gemini powers an educational copilot chat layered on holdings context.",
    outcome:
      "Built a full-stack fintech dashboard with live quotes, portfolio analytics and an educational AI copilot.",
    // TODO: replace with a verified metric (refresh latency, demo conversion, etc.)
    measurable: "TODO: add one verified measurable result for MarketMate.",
    bullets: [
      {
        title: "Problem",
        body: "Portfolio tracking felt slow and confusing, especially with stale data and cluttered interfaces.",
      },
      {
        title: "What I built",
        body: "A Next.js + Firebase app with secure quote routes, cached market data, charts and Gemini-powered education chat.",
      },
      {
        title: "Architecture",
        body: "Next.js + Firebase + quote API routes + Recharts + Gemini chat.",
      },
    ],
    preview: "marketmate",
    image: "/assets/projects/marketmate-dashboard.png",
    liveUrl: "https://market-mate-beta.vercel.app",
    repoUrl: "https://github.com/Alema-em/MarketMate",
  },
  {
    id: "btf-photobooth",
    name: "BTF Photo Booth",
    tagline: "A self photo studio for the first day that matters.",
    category: "Product · Event Tech · Full Stack",
    bg: "butter",
    accent: "coral",
    ink: "ink",
    role: "Full-stack engineering · Product build for live events",
    stack: ["Next.js", "React", "Tailwind", "Cloud storage"],
    brief:
      "Freshers Orientation needed more than flyers — a stall experience new students would keep and share.",
    architecture:
      "Fullscreen Next.js kiosk captures four frames, lets the user pick three, composes a branded strip, and stores assets in the cloud. A QR handoff moves the PNG to the phone for download and Instagram Stories.",
    outcome:
      "Shipped a live kiosk photobooth for BITS Tech Fest that composed branded strips with QR handoff — 84 strips went home on day one.",
    measurable: "84 branded strips taken home during Freshers Orientation 2026.",
    bullets: [
      {
        title: "Problem",
        body: "Orientation stalls fade fast; there was no durable, shareable memento from the first campus day.",
      },
      {
        title: "What I built",
        body: "A fullscreen Next.js kiosk: four shots, pick three, branded BTF strip compose, QR download, and Instagram story export.",
      },
      {
        title: "Architecture",
        body: "Kiosk UI → camera capture → strip compose → cloud storage → QR handoff.",
      },
    ],
    preview: "btfphotobooth",
    image: "/assets/projects/btf-photobooth.png",
    liveUrl: "https://btf-photobooth.vercel.app",
    repoUrl: "https://github.com/Alema-em/btf-photobooth",
  },
  {
    id: "plant-inventory",
    name: "PlantOS",
    tagline: "A care system for the plants you keep alive.",
    category: "Backend · Data · Full Stack",
    bg: "lime",
    accent: "midnight",
    ink: "ink",
    role: "Full-stack engineering · AI pipelines & UI",
    stack: ["Flask", "MySQL", "EasyOCR", "Pandas"],
    brief: "Nursery teams needed accurate inventory updates without repetitive manual entry.",
    architecture:
      "Flask app over MySQL for multi-workspace inventory. Excel import and EasyOCR intake feed Pandas cleaning before CRUD and low-stock views in the dashboard.",
    outcome:
      "Built a Flask inventory system with Excel + OCR ingestion, low-stock tracking and multi-workspace organization.",
    // TODO: replace with a verified metric (entry time saved, workspaces, etc.)
    measurable: "TODO: add one verified measurable result for PlantOS.",
    bullets: [
      {
        title: "Problem",
        body: "Manual updates were error-prone and too time-consuming across multiple plant inventories.",
      },
      {
        title: "What I built",
        body: "A Flask + MySQL dashboard with OCR-assisted intake, spreadsheet import, CRUD and per-inventory workspace separation.",
      },
      {
        title: "Architecture",
        body: "Flask + MySQL + OCR/Excel ingestion + low-stock dashboard.",
      },
    ],
    preview: "plant",
    image: "/assets/projects/plant-inventory.png",
    // TODO: add liveUrl when a public demo is available
    repoUrl: "https://github.com/Alema-em/plantos",
  },
];

export const PROJECT_IMAGES: Record<ProjectPreviewId, string> = {
  brandforge: "/assets/projects/brandforge.png",
  lamaos: "/assets/projects/lama-os.png",
  marketmate: "/assets/projects/marketmate-dashboard.png",
  btfphotobooth: "/assets/projects/btf-photobooth.png",
  plant: "/assets/projects/plant-inventory.png",
};

/** Truthful counters for hero / featured strip — derived from PROJECTS only. */
export function projectStats() {
  const shipped = PROJECTS.length;
  const live = PROJECTS.filter((p) => !!p.liveUrl).length;
  const stackTags = new Set(PROJECTS.flatMap((p) => p.stack)).size;
  return { shipped, live, stackTags };
}
