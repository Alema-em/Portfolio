import type { AnimationClip, MascotAnimation, MascotManifest } from "@/components/mascot/types";
import rawManifest from "@/components/mascot/mascot.manifest.json";

const BASE = "/assets/mascot";

export const MASCOT_MANIFEST = rawManifest as MascotManifest;

export function mascotSheetUrl(sheet: string) {
  return `${BASE}/${sheet}`;
}

export function resolveClip(animation: MascotAnimation): AnimationClip {
  const clip = MASCOT_MANIFEST.animations[animation];
  if (clip.mirrorOf) {
    const source = MASCOT_MANIFEST.animations[clip.mirrorOf];
    return { ...source, ...clip, sheet: source.sheet };
  }
  return clip;
}

export function allMascotSheetUrls(): string[] {
  const sheets = new Set<string>();
  for (const clip of Object.values(MASCOT_MANIFEST.animations)) {
    if (clip.mirrorOf) continue;
    sheets.add(mascotSheetUrl(clip.sheet));
  }
  return [...sheets];
}
