const DEFAULT_SITE_URL = "https://alema-em-portfolio.alema.workers.dev";

export const SITE = {
  name: "Alema Emran",
  title: "Alema Emran — Software Engineering Intern (Summer 2027)",
  description:
    "Portfolio of Alema Emran — CS @ BITS Pilani Dubai. Seeking a software engineering internship for summer 2027 (India / Dubai / remote). Shipped full-stack projects across backends, APIs, and product UI.",
  tagline: "I turn ideas into things people want to use.",
  ogDescription:
    "Software engineering intern candidate (summer 2027) — full-stack projects, campus leadership, BITS Pilani Dubai.",
  ogImagePath: "/og-card.svg",
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || DEFAULT_SITE_URL,
  targetRole: "Software Engineering Intern, summer 2027",
} as const;

export function absoluteUrl(path: string) {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
