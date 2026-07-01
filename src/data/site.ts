export const SITE = {
  name: "Alema Emran",
  title: "Alema Emran — Software Engineer",
  description:
    "Portfolio of Alema Emran — full-stack software engineer. CS @ BITS Pilani. Backend systems, APIs, ML pipelines, and shipped products from database to UI.",
  tagline: "I turn ideas into things people want to use.",
  ogDescription: "Full-stack engineer — backends, APIs, systems, and interfaces.",
  ogImagePath: "/og-card.svg",
  url: import.meta.env.VITE_SITE_URL as string | undefined,
} as const;

export function absoluteUrl(path: string) {
  const base = SITE.url?.replace(/\/$/, "");
  if (!base) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
