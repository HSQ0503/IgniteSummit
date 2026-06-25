// Single source of truth for all event details.
// Edit these values — everything on the page reads from here.

export const event = {
  name: "Ignite Summit",
  tagline: "Where student leaders take the stage.",
  // The live-show pitch, in one breath.
  intro:
    "A live showcase of entrepreneurs and social impact leaders — part conversation, part late-night show. Real leaders, a real audience, and an emcee keeping the energy high.",

  // Event date/time (ISO 8601, local time). Check-in opens 5:45 PM;
  // the show starts 6:30 PM. The countdown and date labels read from this.
  startsAtISO: "2026-08-16T18:30:00-04:00",
  dateLabel: "Sunday, August 16, 2026",
  doorsLabel: "Check-in 5:45–6:25 PM",

  venue: {
    name: "The Cypress Center",
    org: "Windermere Preparatory School",
    address: "6189 Winter Garden Vineland Rd",
    cityState: "Windermere, FL 34786",
    capacity: 300,
  },

  hosts: [
    {
      key: "bizbuild",
      name: "BizBuild",
      blurb:
        "A nonprofit empowering the next generation of entrepreneurs through mentorship, competition, and hands-on experience.",
      site: "https://bizbuild.org",
      tags: ["Mentorship", "Competition", "Hands-on"],
    },
    {
      key: "etu",
      name: "Empower Teens United",
      blurb:
        "Empower Teens United equips students and families to understand educational pathways, access mentorship, and pursue leadership and career opportunities.",
      site: "#",
      tags: ["Pathways", "Mentorship", "Leadership"],
    },
  ],

  // Run of show — the night, start to finish.
  schedule: [
    {
      time: "5:45 PM",
      title: "Check-in & Networking",
      duration: "40 min",
      body: "Check in between 5:45 and 6:25. Meet leaders, students, and mentors over refreshments outside the auditorium.",
      kind: "network",
    },
    {
      time: "6:30 PM",
      title: "The Show",
      duration: "60 min",
      body: "Four to five student leaders take the stage — pitching, presenting, and trading stories with our emcee in front of a live audience.",
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
    { value: 300, suffix: "", label: "Seats in the room" },
    { value: 5, suffix: "", label: "Student leaders on stage" },
    { value: 2, suffix: "", label: "Nonprofits, one night" },
    { value: 130, suffix: "min", label: "Of talks + networking" },
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
