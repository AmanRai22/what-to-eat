"use client";

import type { Mode } from "@/lib/data";

const MODES: { id: Mode; label: string }[] = [
  { id: "eatOut", label: "Eat Out" },
  { id: "orderIn", label: "Order In" },
  { id: "cook", label: "Cook" },
];

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
      className="inline-flex w-full max-w-md rounded-full border border-black/10 bg-black/5 p-1 text-sm font-medium dark:border-white/10 dark:bg-white/5"
    >
      {MODES.map((m) => {
        const active = m.id === mode;
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={active}
            disabled={disabled}
            onClick={() => onChange(m.id)}
            className={[
              "flex-1 rounded-full px-4 py-2 transition",
              active
                ? "bg-white text-black shadow-sm dark:bg-white dark:text-black"
                : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            ].join(" ")}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
