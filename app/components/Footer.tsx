import { event } from "@/lib/event";
import { IgniteLogo, CoHostLockup, FlameMark } from "./Brand";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${event.venue.address}, ${event.venue.cityState}`,
)}`;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-ink text-cream">
      {/* Final CTA strip */}
      <div className="ignite-container flex flex-col items-center gap-6 py-14 text-center">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
          The stage is set. Will you be{" "}
          <span className="flame-text">there?</span>
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#register" className="btn btn-flame focus-ring">
            Reserve your seat
          </a>
          <a
            href="#speak"
            className="btn focus-ring border-2 border-cream/30 text-cream hover:border-cream"
          >
            Apply to speak
          </a>
        </div>
      </div>

      <div className="ignite-container">
        <div aria-hidden className="heat-divider" />
      </div>

      {/* Footer body */}
      <div className="ignite-container py-12">
        <div className="flex items-center justify-between">
          <IgniteLogo light />
          <a
            href="#top"
            className="focus-ring group inline-flex items-center gap-1.5 rounded font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cream/60 transition-colors hover:text-cream"
          >
            Back to top
            <svg
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 16V4m0 0-5 5m5-5 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Brand + social */}
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-cream/60">
              {event.tagline} A live student-leader showcase by BizBuild &amp;
              Empower Teens United.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.14em]">
              <a
                href={`mailto:${event.social.email}`}
                className="focus-ring rounded text-cream/70 transition-colors hover:text-gold"
              >
                Email
              </a>
              <a
                href={event.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded text-cream/70 transition-colors hover:text-gold"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Location — mappable */}
          <div>
            <h3 className="eyebrow text-gold">Location</h3>
            <address className="mt-4 space-y-1.5 font-mono text-[0.78rem] not-italic leading-relaxed text-cream/70">
              <div>{event.venue.org}</div>
              <div>{event.venue.address}</div>
              <div>{event.venue.cityState}</div>
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-3 inline-flex items-center gap-1 rounded text-sm font-semibold text-flame transition-colors hover:text-gold"
            >
              Get directions
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <path
                  d="M7 13 13 7m0 0H8m5 0v5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Event micro-data + nav */}
          <div>
            <h3 className="eyebrow text-gold">Event</h3>
            <dl className="mt-4 space-y-2.5 font-mono text-[0.78rem] text-cream/70">
              <div>
                <dt className="text-cream/40">Date</dt>
                <dd>{event.dateLabel}</dd>
              </div>
              <div>
                <dt className="text-cream/40">Check-in</dt>
                <dd>{event.doorsLabel}</dd>
              </div>
              <div>
                <dt className="text-cream/40">Entry</dt>
                <dd>Free · {event.venue.capacity} seats</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a href="#about" className="focus-ring rounded text-cream/70 transition-colors hover:text-cream">
                The show
              </a>
              <a href="#schedule" className="focus-ring rounded text-cream/70 transition-colors hover:text-cream">
                Run of show
              </a>
              <a href="#register" className="focus-ring rounded text-cream/70 transition-colors hover:text-cream">
                Register
              </a>
            </div>
          </div>
        </div>

        {/* Oversized wordmark — the dark anchor */}
        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none select-none font-display font-bold leading-[0.8] tracking-tight text-cream/[0.07]"
            style={{ fontSize: "clamp(2.75rem, 14vw, 9rem)" }}
          >
            Ignite Summit
          </div>
          <FlameMark live className="absolute -top-3 right-1 h-8 w-8 opacity-80" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <CoHostLockup light />
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} Ignite Summit. A joint venture of
            BizBuild &amp; Empower Teens United.
          </p>
        </div>
      </div>
    </footer>
  );
}
