import type { CSSProperties } from "react";
import { event } from "@/lib/event";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SparkGlyph } from "./Brand";

// Each host card leans on its own brand color to honor both identities.
const brand: Record<string, { color: string; soft: string }> = {
  bizbuild: { color: "var(--color-green-deep)", soft: "rgba(0,204,153,0.10)" },
  etu: { color: "var(--color-navy)", soft: "rgba(15,69,102,0.08)" },
};

export function Hosts() {
  const [a, b] = event.hosts;
  return (
    <section id="hosts" className="bg-cream-2 py-20 sm:py-28">
      <div className="ignite-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading folio="04" eyebrow="A joint venture" cohost>
            Two nonprofits, <em className="font-semibold italic">one mission</em>
          </SectionHeading>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Ignite Summit is co-hosted by two student-led organizations on a
            shared mission: giving young people the confidence, skills, and stage
            to{" "}
            <span className="flame-text font-semibold">build what&apos;s next.</span>
          </p>
        </Reveal>

        {/* Structural duality: the two brands meet at a co-host spark. */}
        <Reveal className="mx-auto mt-14 grid max-w-4xl items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-3">
          <HostCard host={a} />
          {/* Connector — heat-line bleeds into the spark that joins them */}
          <div
            aria-hidden
            className="flex items-center justify-center gap-3 py-1 md:flex-col md:py-0"
          >
            <span
              className="h-px w-12 md:h-12 md:w-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-gold), transparent 35%))",
              }}
            />
            <SparkGlyph
              cohost
              title="BizBuild and Empower Teens United, together"
              className="h-9 w-9 shrink-0"
            />
            <span
              className="h-px w-12 md:h-12 md:w-px"
              style={{
                background:
                  "linear-gradient(to right, color-mix(in srgb, var(--color-ember), transparent 35%), transparent)",
              }}
            />
          </div>
          <HostCard host={b} />
        </Reveal>
      </div>
    </section>
  );
}

function HostCard({ host }: { host: (typeof event.hosts)[number] }) {
  const b = brand[host.key];
  return (
    <article
      className="card card-accent flex h-full flex-col overflow-hidden p-8"
      style={{ "--accent": b.color } as CSSProperties}
    >
      <span
        className="inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest"
        style={{ background: b.soft, color: b.color }}
      >
        Co-host
      </span>
      <h3 className="mt-4 font-display text-3xl font-bold" style={{ color: b.color }}>
        {host.name}
      </h3>
      <p className="mt-3 leading-relaxed text-body">{host.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {host.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em]"
            style={{
              borderColor: `color-mix(in srgb, ${b.color}, transparent 72%)`,
              color: b.color,
            }}
          >
            {t}
          </li>
        ))}
      </ul>

      <a
        href={host.site}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors"
        style={{
          borderColor: `color-mix(in srgb, ${b.color}, transparent 60%)`,
          color: b.color,
        }}
      >
        Learn more
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
          <path
            d="M4 10h12m0 0-5-5m5 5-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}
