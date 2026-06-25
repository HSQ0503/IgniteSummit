import { event } from "@/lib/event";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SparkGlyph, FlameMark } from "./Brand";

const perks = [
  `Live audience of ${event.venue.capacity}`,
  "Real stage, real emcee",
  "Rolling applications",
];

export function Speakers() {
  return (
    <section id="speakers" className="bg-cream py-20 sm:py-28">
      <div className="ignite-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading folio="03" eyebrow="The lineup">
            Speakers announced <em className="font-semibold italic">soon</em>
          </SectionHeading>
          <p className="mt-5 text-lg leading-relaxed text-body">
            We&apos;re curating four to five standout student leaders. The full
            lineup drops closer to showtime — and one of these spots could be
            yours.
          </p>
        </Reveal>

        {/* Anticipation grid — spotlit "spots" waiting to be filled */}
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="card card-accent group relative flex aspect-[3/4] flex-col justify-between overflow-hidden p-5">
                <div className="flex items-center justify-between">
                  <span className="flame-text font-display text-lg font-semibold italic leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <SparkGlyph className="h-3.5 w-3.5 shrink-0" />
                </div>

                <div className="relative flex flex-1 items-center justify-center">
                  {/* spotlight beam from above */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-0 h-full w-20 -translate-x-1/2"
                    style={{
                      background:
                        "linear-gradient(to bottom, color-mix(in srgb, var(--color-gold), transparent 78%), transparent 62%)",
                      clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0% 100%)",
                    }}
                  />
                  {/* spotlit silhouette — the seat in the dark, waiting */}
                  <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-full ring-1 ring-navy/10 transition-all duration-300 group-hover:ring-ember/30"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--color-gold), transparent 55%), transparent 70%)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-7 w-7 text-navy/25 transition-colors duration-300 group-hover:text-navy/40"
                    >
                      <path
                        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="font-display text-lg font-semibold italic leading-tight text-navy">
                    To be announced
                  </div>
                  <div className="eyebrow mt-1 text-[0.58rem] text-muted">
                    Stay tuned
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Empty lineup → funnel: take the stage yourself */}
        <Reveal className="mt-8">
          <div className="relative overflow-hidden rounded-3xl bg-navy-deep px-6 py-10 sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 60% at 88% 8%, rgba(255,106,44,0.20), transparent 70%), radial-gradient(40% 60% at 6% 95%, rgba(0,204,153,0.12), transparent 70%), radial-gradient(50% 50% at 60% 0%, rgba(252,204,0,0.10), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2">
                  <FlameMark live className="h-4 w-4" />
                  <span className="eyebrow text-gold">Apply to speak</span>
                </span>
                <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-cream sm:text-4xl">
                  One of these spots{" "}
                  <span className="flame-text">could be yours.</span>
                </h3>
                <p className="mt-4 leading-relaxed text-cream/70">
                  We&apos;re looking for student entrepreneurs and social impact
                  leaders with a story worth the stage. No fee, no catch — just
                  bring what you&apos;re building.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cream/75"
                    >
                      <SparkGlyph className="h-3 w-3 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#speak"
                className="btn btn-flame focus-ring w-full shrink-0 sm:w-auto"
              >
                Apply to speak
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M4 10h12m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
