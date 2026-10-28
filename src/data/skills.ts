/**
 * Skill chips for the System panel — no percentage bars.
 * Each chip lists the featured project(s) that use it (from projects.ts).
 */
export type SkillGroupId =
  | "Languages"
  | "Backend"
  | "Frontend"
  | "AI & Data"
  | "Tooling";

export type SkillChip = {
  name: string;
  projects: string[];
};

export type SkillGroup = {
  id: SkillGroupId;
  accent: "coral" | "lime" | "cobalt" | "lilac" | "butter";
  chips: SkillChip[];
};

/** Verified against stack tags in src/data/projects.ts only. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "Languages",
    accent: "coral",
    chips: [
      { name: "Python", projects: ["BrandKit AI", "PlantOS"] },
      { name: "TypeScript", projects: ["Lama OS"] },
      { name: "JavaScript", projects: ["BrandKit AI"] },
      // TODO: confirm Java / C / SQL project attribution before adding chips
    ],
  },
  {
    id: "Backend",
    accent: "lime",
    chips: [
      { name: "Flask", projects: ["BrandKit AI", "PlantOS"] },
      { name: "Firebase", projects: ["MarketMate"] },
      { name: "MySQL", projects: ["PlantOS"] },
      { name: "Cloud storage", projects: ["BTF Photo Booth"] },
    ],
  },
  {
    id: "Frontend",
    accent: "cobalt",
    chips: [
      { name: "React", projects: ["Lama OS", "BTF Photo Booth"] },
      { name: "Next.js", projects: ["MarketMate", "BTF Photo Booth"] },
      { name: "Tailwind", projects: ["BTF Photo Booth"] },
      { name: "Recharts", projects: ["MarketMate"] },
    ],
  },
  {
    id: "AI & Data",
    accent: "lilac",
    chips: [
      { name: "Ollama", projects: ["BrandKit AI"] },
      { name: "Gemini AI", projects: ["MarketMate"] },
      { name: "EasyOCR", projects: ["PlantOS"] },
      { name: "Pandas", projects: ["PlantOS"] },
    ],
  },
  {
    id: "Tooling",
    accent: "butter",
    chips: [
      { name: "Local-first storage", projects: ["Lama OS"] },
      { name: "Charts", projects: ["Lama OS"] },
      // TODO: add Docker / AWS chips only after they appear in a shipped project stack
    ],
  },
];
