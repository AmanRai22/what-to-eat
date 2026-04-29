import type { CookItem, EatItem } from "./data";

export type AnyItem = EatItem | CookItem;

export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickRandomDifferent<T extends { name: string }>(
  items: readonly T[],
  current: T | null,
): T {
  if (items.length <= 1) return items[0];
  let pick = pickRandom(items);
  let safety = 8;
  while (current && pick.name === current.name && safety-- > 0) {
    pick = pickRandom(items);
  }
  return pick;
}

// Bias toward items marked `preferred: true` while still allowing the
// rest of the pool through. Default: 75% draw from preferred-only.
export function pickPreferred<T extends { name: string; preferred?: boolean }>(
  items: readonly T[],
  current: T | null,
  preferredBias = 0.75,
): T {
  const preferred = items.filter((i) => i.preferred);
  if (preferred.length === 0) return pickRandomDifferent(items, current);
  const usePreferred = Math.random() < preferredBias;
  return pickRandomDifferent(usePreferred ? preferred : items, current);
}

// Substring/tag fallback when the LLM filter fails or returns empty.
// Negation prefix ("no rice" / "no-rice") drops items whose haystack
// contains the negated term.
export function localFilter<T extends { name: string; tags: string[]; cuisine?: string }>(
  items: readonly T[],
  hint: string,
): T[] {
  const q = hint.toLowerCase().trim();
  if (!q) return [...items];
  const tokens = q
    .split(/[\s,]+/)
    .map((t) => t.replace(/^no[- ]/, "no-"))
    .filter(Boolean);

  const negatives = tokens.filter((t) => t.startsWith("no-")).map((t) => t.slice(3));
  const positives = tokens.filter((t) => !t.startsWith("no-"));

  return items.filter((it) => {
    const haystack = [it.name, ...(it.tags || []), it.cuisine || ""]
      .join(" ")
      .toLowerCase();
    for (const n of negatives) {
      if (haystack.includes(n)) return false;
    }
    if (positives.length === 0) return true;
    return positives.some((p) => haystack.includes(p));
  });
}
