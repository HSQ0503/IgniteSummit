import { event } from "@/lib/event";
import { FlameMark, SparkGlyph } from "./Brand";
import { TicketStub } from "./TicketStub";
import { HeroReveal } from "./HeroReveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-28 pb-20 sm:pt-32 sm:pb-28"
    >
      {/* Ambient flame glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,106,44,0.14), transparent 70%), radial-gradient(50% 40% at 85% 20%, rgba(252,204,0,0.16), transparent 70%), radial-gradient(45% 45% at 10% 30%, rgba(0,204,153,0.10), transparent 70%)",
        }}
      />

      <div className="ignite-container relative z-10">
        {/* Co-host eyebrow */}
        <HeroReveal delay={0} className="flex justify-center">
          <span className="sticker">
            <FlameMark live className="h-4 w-4" />
            <span>BizBuild</span>
            <SparkGlyph cohost className="h-3 w-3" />
            <span>Empower Teens United</span>
          </span>
        </HeroReveal>

        {/* Title */}
        <HeroReveal delay={0}>
          <h1
            className="mx-auto mt-7 max-w-4xl text-center font-display font-bold leading-[0.92] tracking-tight text-navy"
            style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
          >
            <span className="flame-text">Ignite</span> Summit
          </h1>
        </HeroReveal>

        <HeroReveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-body sm:text-xl">
            {event.intro}
          </p>
        </HeroReveal>

        {/* Ticket (date / venue / seats / countdown) */}
        <HeroReveal delay={160} className="mt-9 flex justify-center">
          <TicketStub />
        </HeroReveal>

        {/* CTAs */}
        <HeroReveal
          delay={320}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#register" className="btn btn-flame focus-ring w-full sm:w-auto">
            Reserve your seat
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
          <a href="#speak" className="btn btn-outline focus-ring w-full sm:w-auto">
            Apply to speak
          </a>
        </HeroReveal>

        <HeroReveal delay={320}>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-muted">
            <span>Free to attend</span>
            <SparkGlyph className="h-2.5 w-2.5" />
            <span>{event.doorsLabel}</span>
            <SparkGlyph className="h-2.5 w-2.5" />
            <span>{event.venue.cityState}</span>
          </p>
        </HeroReveal>
      </div>
    </section>
  );
}
