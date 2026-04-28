"use client";

import { useEffect, useState } from "react";

export type ResultDisplay = {
  name: string;
  subtitle?: string;
};

export function ResultCard({
  title,
  result,
  shuffling,
  shufflingItems,
  filteredByHint,
  onReroll,
  size = "lg",
}: {
  title?: string;
  result: ResultDisplay | null;
  shuffling: boolean;
  shufflingItems?: ResultDisplay[];
  filteredByHint?: string | null;
  onReroll?: () => void;
  size?: "lg" | "md";
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

  const nameClass = size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";
  const subClass = size === "lg" ? "text-base sm:text-lg" : "text-sm";

  return (
    <div
      className={[
        "relative flex flex-col items-center justify-center rounded-3xl border border-black/10 bg-white px-6 py-10 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]",
        size === "lg" ? "min-h-[220px] sm:min-h-[260px]" : "min-h-[160px]",
      ].join(" ")}
    >
      {title && (
        <div className="mb-4 text-xs font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
          {title}
        </div>
      )}

      {onReroll && (
        <button
          aria-label={`Re-roll ${title ?? ""}`}
          onClick={onReroll}
          disabled={shuffling}
          className={[
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black/60 transition hover:bg-black/5 hover:text-black disabled:opacity-40 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white",
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
          "flex flex-col items-center gap-2",
          shuffling ? "opacity-90" : "animate-fade-in",
        ].join(" ")}
      >
        <div className={`${nameClass} font-semibold tracking-tight text-black dark:text-white`}>
          {display?.name ?? "—"}
        </div>
        {display?.subtitle && (
          <div className={`${subClass} text-black/60 dark:text-white/60`}>{display.subtitle}</div>
        )}
      </div>

      {!shuffling && filteredByHint && (
        <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs text-black/70 dark:bg-white/10 dark:text-white/70">
          <span className="truncate">filtered by: {filteredByHint}</span>
        </div>
      )}
    </div>
  );
}
