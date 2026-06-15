import { event } from "@/lib/event";
import { IgniteLogo, CoHostLockup } from "./Brand";

export function Footer() {
  return (
    <footer className="bg-navy-ink text-cream">
      {/* Final CTA strip */}
      <div className="border-b border-cream/10">
        <div className="ignite-container flex flex-col items-center gap-6 py-14 text-center">
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
            The stage is set. Will you be there?
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
      </div>

      {/* Footer body */}
      <div className="ignite-container py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <IgniteLogo light />
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              {event.tagline} A live student-founder showcase at{" "}
              {event.venue.name}, {event.venue.org}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h3 className="eyebrow text-gold">Event</h3>
              <ul className="mt-4 space-y-2.5 text-cream/70">
                <li>{event.dateLabel}</li>
                <li>{event.doorsLabel}</li>
                <li>
                  {event.venue.name}, {event.venue.cityState}
                </li>
                <li>{event.venue.capacity} seats · Free entry</li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-gold">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-cream/70">
                <li>
                  <a href="#about" className="focus-ring rounded transition-colors hover:text-cream">
                    The show
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="focus-ring rounded transition-colors hover:text-cream">
                    Run of show
                  </a>
                </li>
                <li>
                  <a href="#register" className="focus-ring rounded transition-colors hover:text-cream">
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${event.social.email}`}
                    className="focus-ring rounded transition-colors hover:text-cream"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
