import type { Meal, Mode } from "./data";

export function buildSearchUrl(mode: Mode, hint: string, meal?: Meal): string {
  const trimmed = hint.trim();
  let query: string;
  switch (mode) {
    case "eatOut":
      query = `restaurants near me ${trimmed}`;
      break;
    case "orderIn":
      query = `food delivery near me ${trimmed}`;
      break;
    case "cook":
      query = `easy ${meal ?? "dinner"} recipe ${trimmed}`;
      break;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;
}
