"use client";

export const SHUFFLE_DURATION_MS = 3000;

export function RandomizeButton({
  label,
  shuffling,
  onClick,
}: {
  label: string;
  shuffling: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={shuffling}
      className={[
        "group relative w-full rounded-full px-6 py-4 text-base font-semibold tracking-tight transition sm:text-lg",
        "bg-black text-white hover:bg-black/85 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-white/85",
        shuffling ? "cursor-not-allowed opacity-70" : "cursor-pointer",
      ].join(" ")}
      style={shuffling ? { cursor: "not-allowed" } : undefined}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {shuffling ? (
          <>
            <span className="inline-block animate-spin">↻</span>
            Picking…
          </>
        ) : (
          label
        )}
      </span>
    </button>
  );
}
