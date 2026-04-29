"use client";

export const SHUFFLE_DURATION_MS = 2000;

export function RandomizeButton({
  label,
  shuffling,
  onClick,
  gradient,
}: {
  label: string;
  shuffling: boolean;
  onClick: () => void;
  gradient?: string;
}) {
  const grad = gradient ?? "from-rose-500 via-orange-500 to-amber-500";
  return (
    <button
      onClick={onClick}
      disabled={shuffling}
      className={[
        "group relative w-full overflow-hidden rounded-full px-6 py-4 text-base font-bold tracking-tight transition sm:text-lg",
        "bg-gradient-to-r",
        grad,
        "text-white shadow-lg shadow-black/10 hover:shadow-xl active:scale-[0.98]",
        shuffling ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:brightness-110",
      ].join(" ")}
      style={shuffling ? { cursor: "not-allowed" } : undefined}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {shuffling ? (
          <>
            <span className="inline-block animate-spin">🍳</span>
            <span>Picking…</span>
          </>
        ) : (
          <>
            <span className="text-xl">🎲</span>
            <span>{label}</span>
          </>
        )}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </button>
  );
}
