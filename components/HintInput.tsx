"use client";

export function HintInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base"
      >
        ✨
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Hint — e.g., 'somewhere with beer', 'something light', 'no rice'"
        className="w-full rounded-full border border-black/10 bg-white/80 px-5 py-3 pl-11 pr-10 text-sm text-black shadow-sm outline-none placeholder:text-black/40 backdrop-blur transition focus:border-rose-400 focus:shadow-md disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/40 dark:focus:border-rose-300"
      />
      {value && !disabled && (
        <button
          aria-label="Clear hint"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-black/50 hover:bg-black/5 hover:text-black dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
        >
          ×
        </button>
      )}
    </div>
  );
}
