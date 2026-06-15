/* Brand marks for Ignite Summit + co-host wordmarks.
   Built as inline SVG so they stay crisp and theme-aware. */

/* All shared SVG gradient defs, mounted once in layout so every
   FlameMark / SparkGlyph instance references a single valid id
   (avoids duplicate-id fills blanking out across the page). */
export function SparkDefs() {
  return (
    <svg width={0} height={0} aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="5%" stopColor="#FCCC00" />
          <stop offset="95%" stopColor="#FF6A2C" />
        </linearGradient>
        {/* Co-host spark: BizBuild green fused into the flame */}
        <linearGradient id="sparkGradCohost" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#00CC99" />
          <stop offset="50%" stopColor="#FCCC00" />
          <stop offset="100%" stopColor="#FF6A2C" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="4" y1="22" x2="20" y2="2">
          <stop offset="0%" stopColor="#FF6A2C" />
          <stop offset="55%" stopColor="#FF8A3D" />
          <stop offset="100%" stopColor="#FCCC00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* The signature ember-star — the site's ownable mark and punctuation. */
export function SparkGlyph({
  className = "",
  title,
  cohost = false,
}: {
  className?: string;
  title?: string;
  cohost?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path
        d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z"
        fill={cohost ? "url(#sparkGradCohost)" : "url(#sparkGrad)"}
      />
    </svg>
  );
}

export function FlameMark({
  className = "",
  live = false,
}: {
  className?: string;
  live?: boolean;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        className={live ? "flame-live" : undefined}
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        fill="url(#flameGrad)"
        stroke="#0a3146"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IgniteLogo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <FlameMark live className="h-7 w-7 shrink-0" />
      <span
        className="font-display text-xl font-bold leading-none tracking-tight"
        style={{ color: light ? "var(--color-cream)" : "var(--color-navy)" }}
      >
        Ignite <span className="flame-text">Summit</span>
      </span>
    </span>
  );
}

/* Co-host lockup — BizBuild × Empower Teens United.
   Uses each org's brand color as a nod to both identities. */
export function CoHostLockup({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const etuColor = light ? "var(--color-gold)" : "var(--color-navy)";
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg font-bold leading-none ${className}`}
    >
      <span style={{ color: light ? "var(--color-green)" : "var(--color-green-deep)" }}>
        BizBuild
      </span>
      <SparkGlyph cohost className="h-4 w-4 shrink-0" />
      <span style={{ color: etuColor }}>Empower Teens United</span>
    </div>
  );
}
