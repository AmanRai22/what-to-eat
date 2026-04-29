"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { ResultCard, type ResultDisplay } from "@/components/ResultCard";
import { RandomizeButton, SHUFFLE_DURATION_MS } from "@/components/RandomizeButton";
import { HintInput } from "@/components/HintInput";
import {
  cookOptions,
  eatOut,
  orderIn,
  MEAL_EMOJI,
  MODE_THEME,
  type CookItem,
  type EatItem,
  type Meal,
  type Mode,
} from "@/lib/data";
import { localFilter, pickPreferred, pickRandomDifferent } from "@/lib/randomize";
import { buildSearchUrl } from "@/lib/search";

type EatResult = { item: EatItem; appliedHint: string | null } | null;
type CookMealResult = { item: CookItem; appliedHint: string | null } | null;

const MEAL_LABEL: Record<Meal, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const CARD_GRADIENTS: Record<Mode, string> = {
  eatOut:
    "from-rose-100 via-orange-100 to-amber-100 dark:from-rose-950/40 dark:via-orange-950/30 dark:to-amber-950/40",
  orderIn:
    "from-violet-100 via-fuchsia-100 to-pink-100 dark:from-violet-950/40 dark:via-fuchsia-950/30 dark:to-pink-950/40",
  cook:
    "from-emerald-100 via-teal-100 to-lime-100 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-lime-950/40",
};

const CARD_GLOWS: Record<Mode, string> = {
  eatOut: "shadow-rose-500/15",
  orderIn: "shadow-fuchsia-500/15",
  cook: "shadow-emerald-500/15",
};

async function fetchFilteredNames(
  mode: Mode,
  hint: string,
  candidates: Array<{ name: string; cuisine?: string; tags: string[] }>,
): Promise<string[]> {
  try {
    const r = await fetch("/api/filter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode, hint, candidates }),
    });
    if (!r.ok) return [];
    const data = (await r.json()) as { names?: string[] };
    return Array.isArray(data.names) ? data.names : [];
  } catch {
    return [];
  }
}

type Notice = { kind: "info"; text: string } | null;

export default function Home() {
  const [mode, setMode] = useState<Mode>("eatOut");
  const [hint, setHint] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notice, setNotice] = useState<Notice>(null);

  const [eatResult, setEatResult] = useState<EatResult>(null);
  const [eatShuffling, setEatShuffling] = useState(false);

  const [cook, setCook] = useState<{
    breakfast: CookMealResult;
    lunch: CookMealResult;
    dinner: CookMealResult;
  }>({ breakfast: null, lunch: null, dinner: null });
  const [cookShuffling, setCookShuffling] = useState<{
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  }>({ breakfast: false, lunch: false, dinner: false });

  const animTimers = useRef<number[]>([]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("wte-theme", next);
    } catch {}
    setTheme(next);
  }, []);

  const getEatList = useCallback(
    (m: Mode) => (m === "eatOut" ? eatOut : orderIn),
    [],
  );

  const showNotice = useCallback((text: string) => {
    setNotice({ kind: "info", text });
    window.setTimeout(() => setNotice(null), 2800);
  }, []);

  // Resolve the candidate pool from a hint (LLM → local fallback → all).
  // The returned `usePreferenceBias` flag tells the picker whether to
  // weight toward `preferred` items (only when no hint is in play).
  const resolveCandidates = useCallback(
    async <T extends { name: string; tags: string[]; cuisine?: string; preferred?: boolean }>(
      modeArg: Mode,
      list: readonly T[],
      currentHint: string,
    ): Promise<{
      pool: readonly T[];
      appliedHint: string | null;
      usePreferenceBias: boolean;
      notice?: string;
    }> => {
      const trimmed = currentHint.trim();
      if (!trimmed) return { pool: list, appliedHint: null, usePreferenceBias: true };

      const candidates = list.map((c) => ({
        name: c.name,
        cuisine: c.cuisine,
        tags: c.tags,
      }));
      const names = await fetchFilteredNames(modeArg, trimmed, candidates);
      const topN = list.filter((c) => names.includes(c.name)).slice(0, 3);
      if (topN.length > 0)
        return { pool: topN, appliedHint: trimmed, usePreferenceBias: false };

      const local = localFilter(list, trimmed).slice(0, 5);
      if (local.length > 0)
        return { pool: local, appliedHint: trimmed, usePreferenceBias: false };

      return {
        pool: list,
        appliedHint: null,
        usePreferenceBias: true,
        notice: "No matches for that hint — picking randomly",
      };
    },
    [],
  );

  const runEatAnimation = useCallback(
    async (modeArg: Mode) => {
      if (eatShuffling) return;
      setEatShuffling(true);
      const list = getEatList(modeArg);
      const { pool, appliedHint, usePreferenceBias, notice: nMsg } =
        await resolveCandidates(modeArg, list, hint);
      const chosen = usePreferenceBias
        ? pickPreferred(pool, eatResult?.item ?? null)
        : pickRandomDifferent(pool, eatResult?.item ?? null);
      const t = window.setTimeout(() => {
        setEatResult({ item: chosen, appliedHint });
        setEatShuffling(false);
        if (nMsg) showNotice(nMsg);
      }, SHUFFLE_DURATION_MS);
      animTimers.current.push(t);
    },
    [eatShuffling, getEatList, resolveCandidates, hint, eatResult, showNotice],
  );

  const runCookSingleAnimation = useCallback(
    async (meal: Meal) => {
      if (cookShuffling[meal]) return;
      setCookShuffling((s) => ({ ...s, [meal]: true }));
      const list = cookOptions[meal];
      const { pool, appliedHint, usePreferenceBias, notice: nMsg } =
        await resolveCandidates("cook", list, hint);
      const chosen = usePreferenceBias
        ? pickPreferred(pool, cook[meal]?.item ?? null)
        : pickRandomDifferent(pool, cook[meal]?.item ?? null);
      const t = window.setTimeout(() => {
        setCook((c) => ({ ...c, [meal]: { item: chosen, appliedHint } }));
        setCookShuffling((s) => ({ ...s, [meal]: false }));
        if (nMsg) showNotice(nMsg);
      }, SHUFFLE_DURATION_MS);
      animTimers.current.push(t);
    },
    [cookShuffling, resolveCandidates, hint, cook, showNotice],
  );

  const runCookAllAnimation = useCallback(async () => {
    if (cookShuffling.breakfast || cookShuffling.lunch || cookShuffling.dinner) return;
    setCookShuffling({ breakfast: true, lunch: true, dinner: true });

    const meals: Meal[] = ["breakfast", "lunch", "dinner"];
    const resolved = await Promise.all(
      meals.map(async (meal) => {
        const list = cookOptions[meal];
        return { meal, ...(await resolveCandidates("cook", list, hint)) };
      }),
    );

    const picks = resolved.map((r) => ({
      meal: r.meal,
      item: (r.usePreferenceBias
        ? pickPreferred(r.pool, cook[r.meal]?.item ?? null)
        : pickRandomDifferent(r.pool, cook[r.meal]?.item ?? null)) as CookItem,
      appliedHint: r.appliedHint,
      notice: r.notice,
    }));

    const t = window.setTimeout(() => {
      setCook({
        breakfast: { item: picks[0].item, appliedHint: picks[0].appliedHint },
        lunch: { item: picks[1].item, appliedHint: picks[1].appliedHint },
        dinner: { item: picks[2].item, appliedHint: picks[2].appliedHint },
      });
      setCookShuffling({ breakfast: false, lunch: false, dinner: false });
      const firstNotice = picks.find((p) => p.notice)?.notice;
      if (firstNotice) showNotice(firstNotice);
    }, SHUFFLE_DURATION_MS);
    animTimers.current.push(t);
  }, [cookShuffling, resolveCandidates, hint, cook, showNotice]);

  useEffect(() => {
    const timers = animTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isInput =
        tag === "input" || tag === "textarea" || target?.isContentEditable;
      if (isInput) return;
      e.preventDefault();
      if (mode === "cook") {
        runCookAllAnimation();
      } else {
        runEatAnimation(mode);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, runEatAnimation, runCookAllAnimation]);

  const eatShuffleItems: ResultDisplay[] = useMemo(
    () =>
      getEatList(mode).map((c) => ({
        name: c.name,
        subtitle: c.cuisine + (c.area ? ` · ${c.area}` : ""),
        emoji: c.emoji,
        preferred: c.preferred,
      })),
    [getEatList, mode],
  );

  const cookShuffleItems = useMemo(
    () => ({
      breakfast: cookOptions.breakfast.map((c) => ({
        name: c.name,
        emoji: c.emoji,
        preferred: c.preferred,
      })),
      lunch: cookOptions.lunch.map((c) => ({
        name: c.name,
        emoji: c.emoji,
        preferred: c.preferred,
      })),
      dinner: cookOptions.dinner.map((c) => ({
        name: c.name,
        emoji: c.emoji,
        preferred: c.preferred,
      })),
    }),
    [],
  );

  const isAnyCookRolling =
    cookShuffling.breakfast || cookShuffling.lunch || cookShuffling.dinner;

  const onChangeMode = useCallback(
    (m: Mode) => {
      if (eatShuffling || isAnyCookRolling) return;
      setMode(m);
    },
    [eatShuffling, isAnyCookRolling],
  );

  const onSearchOnline = useCallback(() => {
    const url =
      mode === "cook"
        ? buildSearchUrl(mode, hint, "dinner")
        : buildSearchUrl(mode, hint);
    window.open(url, "_blank", "noopener,noreferrer");
  }, [mode, hint]);

  const activeTheme = MODE_THEME[mode];
  const cardGrad = CARD_GRADIENTS[mode];
  const cardGlow = CARD_GLOWS[mode];

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12">
      <header className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="animate-float text-2xl sm:text-3xl">🍱</span>
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${activeTheme.gradient}`}
          >
            What to Eat Today
          </span>
        </h1>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-base shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <div className="flex justify-center">
        <ModeToggle
          mode={mode}
          onChange={onChangeMode}
          disabled={eatShuffling || isAnyCookRolling}
        />
      </div>

      {mode !== "cook" ? (
        <section className="flex flex-col gap-4">
          <ResultCard
            result={
              eatResult
                ? {
                    name: eatResult.item.name,
                    subtitle:
                      eatResult.item.cuisine +
                      (eatResult.item.area ? ` · ${eatResult.item.area}` : ""),
                    emoji: eatResult.item.emoji,
                    preferred: eatResult.item.preferred,
                  }
                : {
                    name: "Tap Randomize",
                    subtitle: "or hit space to roll the dice",
                    emoji: mode === "eatOut" ? "🍽️" : "🛵",
                  }
            }
            shuffling={eatShuffling}
            shufflingItems={eatShuffleItems}
            filteredByHint={eatResult?.appliedHint ?? null}
            gradient={cardGrad}
            glow={cardGlow}
          />
          <RandomizeButton
            label="Randomize"
            shuffling={eatShuffling}
            onClick={() => runEatAnimation(mode)}
            gradient={activeTheme.gradient}
          />
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(["breakfast", "lunch", "dinner"] as Meal[]).map((meal) => (
              <ResultCard
                key={meal}
                title={MEAL_LABEL[meal]}
                titleEmoji={MEAL_EMOJI[meal]}
                size="md"
                result={
                  cook[meal]
                    ? {
                        name: cook[meal]!.item.name,
                        emoji: cook[meal]!.item.emoji,
                        preferred: cook[meal]!.item.preferred,
                      }
                    : { name: "—", emoji: MEAL_EMOJI[meal] }
                }
                shuffling={cookShuffling[meal]}
                shufflingItems={cookShuffleItems[meal]}
                filteredByHint={cook[meal]?.appliedHint ?? null}
                onReroll={() => runCookSingleAnimation(meal)}
                gradient={cardGrad}
                glow={cardGlow}
              />
            ))}
          </div>
          <RandomizeButton
            label="Randomize all"
            shuffling={isAnyCookRolling}
            onClick={runCookAllAnimation}
            gradient={activeTheme.gradient}
          />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <HintInput
          value={hint}
          onChange={setHint}
          disabled={eatShuffling || isAnyCookRolling}
        />
        <button
          onClick={onSearchOnline}
          className={`self-start text-sm font-medium underline-offset-4 hover:underline ${activeTheme.accent}`}
        >
          🌐 Search online instead →
        </button>
      </section>

      {notice && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90%] rounded-full bg-black/90 px-4 py-2 text-sm font-medium text-white shadow-2xl backdrop-blur dark:bg-white/95 dark:text-black"
        >
          {notice.text}
        </div>
      )}

      <footer className="mt-auto flex flex-col items-center gap-1 pt-6 text-center text-xs text-black/40 dark:text-white/40">
        <div>
          Tip: press{" "}
          <kbd className="rounded border border-black/10 px-1.5 py-0.5 font-mono dark:border-white/20">
            space
          </kbd>{" "}
          to randomize · ⭐ marks your favourites
        </div>
      </footer>
    </main>
  );
}
