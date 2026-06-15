import { event } from "@/lib/event";
import { Reveal } from "./Reveal";
import { Stats } from "./Stats";
import { SectionHeading } from "./SectionHeading";
import { SparkGlyph } from "./Brand";

const kindStyle: Record<string, { dot: string; tag: string; label: string }> = {
  network: {
    dot: "var(--color-green)",
    tag: "color-mix(in srgb, var(--color-green), transparent 85%)",
    label: "Networking",
  },
  show: {
    dot: "var(--color-ember)",
    tag: "color-mix(in srgb, var(--color-ember), transparent 82%)",
    label: "Main stage",
  },
};

export function RunOfShow() {
  return (
    <section id="schedule" className="relative overflow-hidden bg-navy-deep py-20 sm:py-28">
      {/* Stage lighting: warm/cool radials + a bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 80% 10%, rgba(255,106,44,0.16), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(0,204,153,0.12), transparent 70%), radial-gradient(120% 100% at 50% -10%, transparent 55%, rgba(6,27,41,0.55) 100%)",
        }}
      />
      {/* Faint architectural grid, masked to the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,248,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,243,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(80% 60% at 50% 30%, #000, transparent)",
          maskImage: "radial-gradient(80% 60% at 50% 30%, #000, transparent)",
        }}
      />

      <div className="ignite-container relative">
        <Reveal className="max-w-2xl">
          <SectionHeading folio="02" eyebrow="Run of show" dark align="left">
            How the night <em className="font-semibold italic">unfolds</em>
          </SectionHeading>
          <p className="mt-4 text-lg leading-relaxed text-cream/70">
            Two hours, three acts. Come early to network, stay late to keep the
            conversations going.
          </p>
        </Reveal>

        {/* Timeline */}
        <ol className="relative mt-12 space-y-7 border-l-2 border-cream/15 pl-7 sm:pl-9">
          {event.schedule.map((item, i) => {
            const k = kindStyle[item.kind];
            const [tnum, tmer] = item.time.split(" ");
            return (
              <Reveal key={item.time} as="li" delay={i * 120} className="relative">
                {/* Spark "house light" on the rail */}
                {/* Colored bloom (act type) behind the spark "house light" */}
                <span
                  aria-hidden
                  className="absolute -left-[1.65rem] top-2 h-3.5 w-3.5 rounded-full blur-[5px] sm:-left-[2.15rem]"
                  style={{ background: k.dot, opacity: 0.7 }}
                />
                <SparkGlyph className="absolute -left-[2.15rem] top-1 h-6 w-6 sm:-left-[2.65rem]" />

                <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-7">
                  <div className="flex items-baseline gap-1.5 sm:flex-col sm:items-start sm:gap-0">
                    <span
                      className="font-display font-black leading-none tracking-[-0.02em] text-cream"
                      style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
                    >
                      {tnum}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold">
                      {tmer}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-5 backdrop-blur-sm transition-colors hover:bg-cream/[0.07] sm:p-6">
                    <span
                      className="inline-block rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-cream"
                      style={{ background: k.tag }}
                    >
                      {k.label} · {item.duration}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-cream/70">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* Stats band */}
        <div className="mt-20 border-t border-cream/10 pt-14">
          <Stats />
        </div>
      </div>
    </section>
  );
}
