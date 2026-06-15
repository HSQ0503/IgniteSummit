import type { ReactNode } from "react";
import { SparkGlyph } from "./Brand";

// Editorial section header: folio numeral + spark + eyebrow, then a
// display headline. Italicize exactly ONE word per headline via <em>.
export function SectionHeading({
  folio,
  eyebrow,
  children,
  align = "center",
  dark = false,
  cohost = false,
}: {
  folio: string;
  eyebrow: string;
  children: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  cohost?: boolean;
}) {
  const center = align === "center";
  return (
    <>
      <div
        aria-hidden
        className={`flex items-baseline gap-2.5 ${center ? "justify-center" : ""}`}
      >
        <span
          className="flame-text font-display font-semibold italic"
          style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.3rem)" }}
        >
          {folio}
        </span>
        <SparkGlyph cohost={cohost} className="h-3.5 w-3.5 self-center" />
        <span className={`eyebrow ${dark ? "text-gold" : "text-ember"}`}>{eyebrow}</span>
      </div>
      <h2
        className={`mt-4 font-display font-bold leading-[1.04] ${dark ? "text-cream" : "text-navy"}`}
        style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.018em" }}
      >
        {children}
      </h2>
    </>
  );
}
