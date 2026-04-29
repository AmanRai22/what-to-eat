"use client";

import { useEffect, useState } from "react";

export type ResultDisplay = {
  name: string;
  subtitle?: string;
  emoji?: string;
  badge?: string;
  preferred?: boolean;
};

export function ResultCard({
  title,
  titleEmoji,
  result,
  shuffling,
  shufflingItems,
  filteredByHint,
  onReroll,
  size = "lg",
  gradient,
  glow,
}: {
  title?: string;
  titleEmoji?: string;
  result: ResultDisplay | null;
  shuffling: boolean;
  shufflingItems?: ResultDisplay[];
  filteredByHint?: string | null;
  onReroll?: () => void;
  size?: "lg" | "md";
  gradient?: string;
  glow?: string;
}) {
  const [shuffleIdx, setShuffleIdx] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    if (!shuffling || !shufflingItems || shufflingItems.length === 0) return;
    const id = setInterval(() => {
      setShuffleIdx((i) => (i + 1) % shufflingItems.length);
    }, 1000 / 6);
    return () => clearInterval(id);
  }, [shuffling, shufflingItems]);

  useEffect(() => {
    if (!shuffling) setFadeKey((k) => k + 1);
  }, [shuffling, result?.name]);

  const display: ResultDisplay | null = shuffling
    ? shufflingItems && shufflingItems.length > 0
      ? shufflingItems[shuffleIdx % shufflingItems.length]
      : result
    : result;

  const nameClass = size === "lg" ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl";
  const subClass = size === "lg" ? "text-base sm:text-lg" : "text-sm";
  const emojiClass = size === "lg" ? "text-7xl sm:text-8xl" : "text-5xl";

  const bgGrad = gradient ?? "from-rose-100 via-orange-50 to-amber-100 dark:from-rose-950/40 dark:via-orange-950/30 dark:to-amber-950/40";
  const ring = glow ?? "shadow-rose-500/10";

  return (
    <div
      className={[
        "relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border bg-gradient-to-br px-6 py-8 text-center shadow-xl",
        bgGrad,
        ring,
        "border-black/5 dark:border-white/10",
        size === "lg" ? "min-h-[280px] sm:min-h-[340px]" : "min-h-[200px]",
      ].join(" ")}
    >
      {title && (
        <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-black/60 dark:text-white/70">
          {titleEmoji && <span className="text-base">{titleEmoji}</span>}
          {title}
        </div>
      )}

      {onReroll && (
        <button
          aria-label={`Re-roll ${title ?? ""}`}
          onClick={onReroll}
          disabled={shuffling}
          className={[
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 text-black/70 transition hover:scale-110 hover:bg-white hover:text-black disabled:opacity-40 dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20",
            shuffling ? "cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
          title="Re-roll just this card"
        >
          <span className={shuffling ? "inline-block animate-spin" : "inline-block"}>↻</span>
        </button>
      )}

      <div
        key={fadeKey}
        className={[
          "flex flex-col items-center gap-3",
          shuffling ? "opacity-95" : "animate-pop-in",
        ].join(" ")}
      >
        <div className={`${emojiClass} ${shuffling ? "animate-wobble" : "animate-float"} drop-shadow-lg`}>
          {display?.emoji ?? "🍴"}
        </div>
        <div className={`${nameClass} font-extrabold tracking-tight text-black dark:text-white`}>
          {display?.name ?? "—"}
        </div>
        {display?.subtitle && (
          <div className={`${subClass} font-medium text-black/60 dark:text-white/70`}>
            {display.subtitle}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {!shuffling && display?.preferred && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-300/60 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30">
            ⭐ favourite
          </span>
        )}
        {!shuffling && filteredByHint && (
          <span className="inline-flex max-w-[14rem] items-center gap-1 rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/70 dark:bg-white/15 dark:text-white/80">
            🔍 <span className="truncate">{filteredByHint}</span>
          </span>
        )}
      </div>
    </div>
  );
}
