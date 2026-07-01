export type ProjectPreviewId = "brandforge" | "lamaos" | "marketmate" | "plant";

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
  outcome: string;
  bullets: { title: string; body: string }[];
  preview: ProjectPreviewId;
  image: string;
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
    brief: "Founders needed on-brand identity direction fast, without long agency cycles.",
    outcome:
      "Built an end-to-end AI brand workflow that turns a one-line prompt into a production-ready identity kit in minutes.",
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
        title: "Measurable result",
        body: "Reduced concept-to-direction time from days to minutes and made handoff usable immediately via PDF/social-ready exports.",
      },
    ],
    preview: "brandforge",
    image: "/assets/projects/brandforge.png",
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
    outcome:
      "Built a local-first personal dashboard that unifies goals, habits and health with instant load and offline reliability.",
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
        title: "Measurable result",
        body: "Achieved instant first interaction and zero-network core flows, improving reliability for everyday usage.",
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
    outcome:
      "Built a full-stack fintech dashboard with live quotes, portfolio analytics and an educational AI copilot.",
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
        title: "Measurable result",
        body: "Delivered live P/L and portfolio insights in one dashboard with demo-ready onboarding and fast data refresh cycles.",
      },
    ],
    preview: "marketmate",
    image: "/assets/projects/marketmate.png",
    liveUrl: "https://market-mate-beta.vercel.app",
    repoUrl: "https://github.com/Alema-em/MarketMate",
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
    outcome:
      "Built a Flask inventory system with Excel + OCR ingestion, low-stock tracking and multi-workspace organization.",
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
        title: "Measurable result",
        body: "Cut manual data entry steps and made low-stock visibility immediate across greenhouse/client inventories.",
      },
    ],
    preview: "plant",
    image: "/assets/projects/plant-inventory.png",
    repoUrl: "https://github.com/Alema-em",
  },
];

export const PROJECT_IMAGES: Record<ProjectPreviewId, string> = {
  brandforge: "/assets/projects/brandforge.png",
  lamaos: "/assets/projects/lama-os.png",
  marketmate: "/assets/projects/marketmate.png",
  plant: "/assets/projects/plant-inventory.png",
};
