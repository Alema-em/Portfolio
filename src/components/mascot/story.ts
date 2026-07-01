export type StoryBeat = {
  id: string;
  lane: string;
  idle: import("@/components/mascot/types").MascotAnimation;
  caption: string;
  /** Document scroll progress 0–1 where this beat peaks */
  at: number;
};

/** Scroll journey — mascot follows these beats as you move down the page. */
export const STORY_BEATS: StoryBeat[] = [
  {
    id: "arrival",
    lane: "lane-hero",
    idle: "wave",
    caption: "hey — welcome in",
    at: 0.04,
  },
  {
    id: "locker",
    lane: "lane-hero",
    idle: "typing",
    caption: "setting up the locker",
    at: 0.1,
  },
  {
    id: "work",
    lane: "lane-work",
    idle: "point",
    caption: "this tape — open the case study",
    at: 0.32,
  },
  {
    id: "system",
    lane: "lane-system",
    idle: "coffee",
    caption: "fueling up on coffee",
    at: 0.52,
  },
  {
    id: "skills",
    lane: "lane-system",
    idle: "thinking",
    caption: "mapping the toolkit",
    at: 0.58,
  },
  {
    id: "log",
    lane: "lane-log",
    idle: "thinking",
    caption: "reading the deployment log",
    at: 0.72,
  },
  {
    id: "march",
    lane: "lane-log-end",
    idle: "walk-right",
    caption: "missions shipped",
    at: 0.8,
  },
  {
    id: "rest",
    lane: "lane-contact",
    idle: "sleep",
    caption: "save point reached",
    at: 0.94,
  },
];

export const INTRO_KEY = "mascot-intro-v2";
