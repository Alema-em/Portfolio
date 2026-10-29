/**
 * Skill chips for the System panel — full inventory, no percentage bars.
 * Optional project tags when a featured project clearly uses the skill.
 */
export type SkillGroupId =
  | "Languages"
  | "Backend"
  | "Engineering"
  | "Frontend"
  | "AI"
  | "Design & Media";

export type SkillChip = {
  name: string;
  /** Featured projects that use this skill, when known */
  projects?: string[];
};

export type SkillGroup = {
  id: SkillGroupId;
  accent: "coral" | "lime" | "butter" | "cobalt" | "lilac";
  chips: SkillChip[];
};

/** Restored from the previous full skill grid (names only — no %). */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "Languages",
    accent: "coral",
    chips: [
      { name: "Java" },
      { name: "Python", projects: ["BrandKit AI", "PlantOS"] },
      { name: "SQL", projects: ["PlantOS"] },
      { name: "C" },
      { name: "JavaScript", projects: ["BrandKit AI"] },
      { name: "TypeScript", projects: ["Lama OS"] },
    ],
  },
  {
    id: "Backend",
    accent: "lime",
    chips: [
      { name: "Flask", projects: ["BrandKit AI", "PlantOS"] },
      { name: "REST APIs" },
      { name: "MySQL", projects: ["PlantOS"] },
      { name: "Firebase / Firestore", projects: ["MarketMate"] },
      { name: "Node.js" },
      { name: "Git & GitHub" },
    ],
  },
  {
    id: "Engineering",
    accent: "butter",
    chips: [
      { name: "Data Structures & Algorithms" },
      { name: "Object-Oriented Programming" },
      { name: "Database Management Systems" },
      { name: "API Design" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "System Design" },
    ],
  },
  {
    id: "Frontend",
    accent: "cobalt",
    chips: [
      { name: "React", projects: ["Lama OS", "BTF Photo Booth"] },
      { name: "Next.js", projects: ["MarketMate", "BTF Photo Booth"] },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind", projects: ["BTF Photo Booth"] },
    ],
  },
  {
    id: "AI",
    accent: "lilac",
    chips: [
      { name: "OpenAI APIs" },
      { name: "Gemini APIs", projects: ["MarketMate"] },
      { name: "Ollama", projects: ["BrandKit AI"] },
      { name: "Hugging Face" },
      { name: "EasyOCR / ML pipelines", projects: ["PlantOS"] },
      { name: "Prompt Engineering" },
    ],
  },
  {
    id: "Design & Media",
    accent: "coral",
    chips: [
      { name: "Figma" },
      { name: "Adobe Illustrator" },
      { name: "Adobe Photoshop" },
      { name: "After Effects" },
      { name: "Canva" },
    ],
  },
];
