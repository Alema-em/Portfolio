export type RoleStatus = "ACTIVE" | "COMPLETED" | "DEPLOYED";

export type RoleEntry = {
  id: string;
  org: string;
  role: string;
  duration: string;
  status: RoleStatus;
  accent: "lime" | "coral" | "butter" | "cobalt" | "lilac";
  bullets: string[];
  tools: string;
};

/** Experience — primary (shown by default). */
export const EXPERIENCE_PRIMARY: RoleEntry[] = [
  {
    id: "EXP-001",
    org: "Axiomaera",
    role: "Digital Media & Marketing Lead",
    duration: "February 2026 — July 2026",
    status: "COMPLETED",
    accent: "lime",
    bullets: [
      "Led brand systems across web, social and campaign surfaces.",
      "Shipped launch assets aligned with product and go-to-market.",
      "Directed creative while keeping output fast and measurable.",
      "Bridged design and engineering handoffs for on-brand releases.",
    ],
    tools: "Figma · Illustrator · After Effects · Canva",
  },
];

/** Experience — collapsed under More. */
export const EXPERIENCE_MORE: RoleEntry[] = [
  {
    id: "EXP-002",
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

/**
 * Leadership — primary (4 mains: GDG, BITS Sports Fest, BTF + Cyberthorn).
 * BTF and Cyberthorn are both primary under the BTF/Cyberthorn grouping.
 */
export const LEADERSHIP_PRIMARY: RoleEntry[] = [
  {
    id: "LEAD-001",
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
    id: "LEAD-002",
    org: "BITS Sports Fest",
    role: "Digital & Creative Board Head",
    duration: "September 2026 — Present",
    status: "ACTIVE",
    accent: "cobalt",
    bullets: [
      "Heading digital and creative board output for sports fest.",
      "Directing brand systems across campaigns, media and on-ground.",
      "Aligning designers under high-visibility festival deadlines.",
    ],
    tools: "Figma · Illustrator · Photoshop · After Effects · Canva",
  },
  {
    id: "LEAD-003",
    org: "BTF",
    role: "Events Head",
    duration: "August 2026 — Present",
    status: "ACTIVE",
    accent: "lime",
    bullets: [
      "Leading end-to-end event planning for campus tech programming.",
      "Coordinating ops, creative and logistics across live event cycles.",
      "Keeping schedules tight while scaling volunteer execution.",
    ],
    tools: "Discord · Google Forms · Sheets · Instagram · Canva",
  },
  {
    id: "LEAD-004",
    org: "Cyberthorn",
    role: "Events Co-Lead",
    duration: "September 2026 — Present",
    status: "ACTIVE",
    accent: "coral",
    bullets: [
      "Co-leading cyber-community events from brief to show day.",
      "Aligning speakers, workshops and engagement touchpoints.",
      "Supporting fast turnarounds across promo and operations.",
    ],
    tools: "Discord · CTFd · LinkedIn · Canva · CapCut",
  },
];

/** Leadership — collapsed under More. */
export const LEADERSHIP_MORE: RoleEntry[] = [
  {
    id: "LEAD-005",
    org: "AGCOE",
    role: "Research Lead — Blockchain",
    duration: "September 2026 — Present",
    status: "ACTIVE",
    accent: "butter",
    bullets: [
      "Leading blockchain research direction for the AGCOE cohort.",
      "Structuring research goals, reviews and knowledge sharing.",
      "Bridging technical exploration with practical campus projects.",
    ],
    tools: "Research · Documentation · Prototyping",
  },
  {
    id: "LEAD-006",
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
    id: "LEAD-007",
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
    id: "LEAD-008",
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
    id: "LEAD-009",
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
];

export const statusStyle: Record<RoleStatus, { color: string; label: string }> = {
  ACTIVE: { color: "var(--lime)", label: "Status" },
  COMPLETED: { color: "var(--butter)", label: "Status" },
  DEPLOYED: { color: "var(--coral)", label: "Status" },
};
