"use client";

import { MODE_THEME, type Mode } from "@/lib/data";

const MODES: Mode[] = ["eatOut", "orderIn", "cook"];

export function ModeToggle({
  mode,
  onChange,
  disabled,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
  disabled?: boolean;
}) {
  return (
    <div
      role="tablist"
      aria-label="Mode"
      className="inline-flex w-full max-w-xl items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-sm font-semibold shadow-md backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
    >
      {MODES.map((m) => {
        const theme = MODE_THEME[m];
        const active = m === mode;
        return (
          <button
            key={m}
            role="tab"
            aria-selected={active}
            disabled={disabled}
            onClick={() => onChange(m)}
            className={[
              "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 transition sm:px-4",
              active
                ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            ].join(" ")}
          >
            <span className="text-base sm:text-lg">{theme.emoji}</span>
            <span>{theme.label}</span>
          </button>
        );
      })}
    </div>
  );
}
