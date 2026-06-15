import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Speakers() {
  return (
    <section id="speakers" className="bg-cream py-20 sm:py-28">
      <div className="ignite-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading folio="03" eyebrow="The lineup">
            Speakers announced <em className="font-semibold italic">soon</em>
          </SectionHeading>
          <p className="mt-5 text-lg leading-relaxed text-body">
            We&apos;re curating four to five standout student founders for the stage.
            Building something? This stage could be yours.
          </p>
        </Reveal>

        {/* Placeholder lineup cards */}
        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="card flex aspect-[3/4] flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-navy/25 text-navy/40">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    <path
                      d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  Founder #{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a href="#speak" className="btn btn-navy focus-ring">
            Apply to be a speaker
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
        </Reveal>
      </div>
    </section>
  );
}
