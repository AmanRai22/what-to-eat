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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Hint (optional) — e.g., 'somewhere with beer', 'something light', 'no rice'"
        className="w-full rounded-full border border-black/10 bg-white px-5 py-3 pr-10 text-sm text-black outline-none placeholder:text-black/40 focus:border-black/30 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/30"
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
