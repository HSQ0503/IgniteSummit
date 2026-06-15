// Single source of truth for all event details.
// Edit these values — everything on the page reads from here.

export const event = {
  name: "Ignite Summit",
  tagline: "Where student founders take the stage.",
  // The live-show pitch, in one breath.
  intro:
    "A live showcase of student entrepreneurs — part TED talk, part late-night show. Real founders, a real audience, and an emcee keeping the energy high.",

  // ⚠️ PLACEHOLDER — set the real event date/time here (ISO 8601, local time).
  // The countdown and date labels are generated from this.
  startsAtISO: "2026-08-16T18:00:00-04:00",
  dateLabel: "Sunday, August 16, 2026",
  doorsLabel: "Doors 6:00 PM",

  venue: {
    name: "The Cypress Center",
    org: "Windermere Preparatory School",
    cityState: "Windermere, FL",
    capacity: 500,
  },

  hosts: [
    {
      key: "bizbuild",
      name: "BizBuild",
      blurb:
        "A nonprofit empowering the next generation of entrepreneurs through mentorship, competition, and hands-on experience.",
      site: "https://bizbuild.org",
    },
    {
      key: "etu",
      name: "Empower Teens United",
      blurb:
        "Free mentorship, leadership, and emotional-wellness programs that equip teens with confidence and purpose.",
      site: "#",
    },
  ],

  // Run of show — the night, start to finish.
  schedule: [
    {
      time: "6:00 PM",
      title: "Doors & Networking",
      duration: "30 min",
      body: "Arrive early. Meet founders, students, and mentors over refreshments outside the auditorium.",
      kind: "network",
    },
    {
      time: "6:30 PM",
      title: "The Show",
      duration: "60 min",
      body: "Four to five student founders take the stage — pitching, presenting, and trading stories with our emcee in front of a live audience.",
      kind: "show",
    },
    {
      time: "7:30 PM",
      title: "Closing Networking",
      duration: "30 min",
      body: "Keep the conversations going. Connect with speakers, swap contacts, and find your next collaborator.",
      kind: "network",
    },
  ],

  stats: [
    { value: 500, suffix: "", label: "Seats in the Cypress Center" },
    { value: 5, suffix: "", label: "Student founders on stage" },
    { value: 2, suffix: "", label: "Nonprofits, one night" },
    { value: 120, suffix: "min", label: "Of talks + networking" },
  ],

  // ⚠️ PLACEHOLDER — paste your Formspree form IDs (https://formspree.io).
  // Each form's "endpoint" looks like https://formspree.io/f/abcdwxyz — use just the id.
  // Prefer a Google Form / Tally iframe instead? Swap the <RegistrationForm/> for an
  // <iframe> in app/components/Register.tsx — the section wrapper stays the same.
  forms: {
    registerId: "YOUR_FORMSPREE_REGISTER_ID",
    speakerId: "YOUR_FORMSPREE_SPEAKER_ID",
  },

  social: {
    instagram: "#",
    email: "hello@ignitesummit.org",
  },
} as const;

export const formspreeUrl = (id: string) => `https://formspree.io/f/${id}`;
