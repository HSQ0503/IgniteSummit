import type { CSSProperties, ReactNode } from "react";

// Pure-CSS entrance stagger for above-the-fold content (no observer,
// runs even without hydration). Reduced-motion handled in globals.css.
export function HeroReveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`h-in ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
