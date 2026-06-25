import { SparkGlyph } from "./Brand";

// Alternate Fraunces-italic phrases with mono micro-data for an editorial mix.
const items: { text: string; kind: "phrase" | "data" }[] = [
  { text: "Student leaders", kind: "phrase" },
  { text: "Aug 16", kind: "data" },
  { text: "Live on stage", kind: "phrase" },
  { text: "300 seats", kind: "data" },
  { text: "Real businesses", kind: "phrase" },
  { text: "Free entry", kind: "data" },
  { text: "Pitch, present, connect", kind: "phrase" },
  { text: "Windermere, FL", kind: "data" },
  { text: "Part talk, part late-night", kind: "phrase" },
  { text: "Est. 2026", kind: "data" },
];

export function Marquee() {
  // Doubled list so the -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div
      aria-hidden
      className="marquee-mask overflow-hidden border-y py-4"
      style={{
        background:
          "linear-gradient(180deg, var(--color-navy-deep), var(--color-navy) 50%, var(--color-navy-deep))",
        borderColor: "color-mix(in srgb, var(--color-gold), transparent 85%)",
      }}
    >
      <div className="marquee-track items-center gap-6">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-6">
            <span
              className={
                it.kind === "phrase"
                  ? "font-display text-lg font-medium italic text-cream"
                  : "font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold/90"
              }
            >
              {it.text}
            </span>
            <SparkGlyph className="h-4 w-4 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
