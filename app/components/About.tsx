import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const features = [
  {
    title: "It's a show, not a seminar",
    body: "Part TED talk, part late-night couch. Our emcee sits down with each founder — so it feels like a conversation, not a lecture.",
    accent: "ember",
    icon: (
      <path
        d="M4 5h16v10H4zM8 19h8M12 15v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Real student founders",
    body: "Four to five high school and college entrepreneurs take the stage to share the businesses they're actually building — wins, lessons, and all.",
    accent: "green",
    icon: (
      <path
        d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 18.2 8 12.7l-4-3.9L9.5 8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Built for networking",
    body: "Thirty minutes of mingling before, thirty after. Meet other student entrepreneurs, mentors, and collaborators in the room.",
    accent: "gold",
    icon: (
      <path
        d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6M3 19v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M16 14h1a4 4 0 0 1 4 4v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const accentColor: Record<string, string> = {
  ember: "var(--color-ember)",
  green: "var(--color-green-deep)",
  gold: "#d9ae00",
};

export function About() {
  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="ignite-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading folio="01" eyebrow="What is Ignite Summit?">
            One night. The next generation of founders,{" "}
            <em className="font-semibold italic">live.</em>
          </SectionHeading>
          <p className="mt-5 text-lg leading-relaxed text-body">
            BizBuild and Empower Teens United are joining forces to put student
            entrepreneurs in front of a live, 500-seat audience — to present what
            they&apos;re building and connect with the people who&apos;ll build the
            future with them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120} as="article">
              <div
                className="card card-accent h-full p-7"
                style={{ "--accent": accentColor[f.accent] } as CSSProperties}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${accentColor[f.accent]}, transparent 88%)`,
                    color: accentColor[f.accent],
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-body">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
