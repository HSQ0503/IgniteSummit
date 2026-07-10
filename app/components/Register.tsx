"use client";

import { useEffect, useState, type FormEvent } from "react";
import { event } from "@/lib/event";
import { SectionHeading } from "./SectionHeading";
import { SparkGlyph } from "./Brand";

type Tab = "attend" | "speak";
type Status = "idle" | "submitting" | "success" | "error";

// "Add to Google Calendar" link, built from the single source of truth.
function calendarUrl() {
  const start = new Date(event.startsAtISO);
  const end = new Date(start.getTime() + 90 * 60_000);
  const stamp = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: event.tagline,
    location: `${event.venue.address}, ${event.venue.cityState}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const summary = [
  event.dateLabel,
  event.doorsLabel,
  `${event.venue.address}, ${event.venue.cityState}`,
  `Free entry · ${event.venue.capacity} seats`,
];

export function Register() {
  const [tab, setTab] = useState<Tab>("attend");

  // Let the #speak anchor open the speaker tab.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#speak") setTab("speak");
      if (window.location.hash === "#register") setTab("attend");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="register" className="relative scroll-mt-20 bg-cream py-20 sm:py-28">
      {/* Anchor target for "apply to speak" links */}
      <span id="speak" className="absolute -top-20" aria-hidden />

      <div className="ignite-container">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading folio="05" eyebrow="Save your spot">
            Be in the <em className="font-semibold italic">room</em>
          </SectionHeading>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Registration is free. Reserve a seat to attend, or apply to take the
            stage as a student leader.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left rail — the ticket stub: event facts at the point of action */}
          <aside className="ticket overflow-hidden lg:sticky lg:top-24">
            <div className="ticket-flame" />
            <div className="p-6 sm:p-7">
              <div className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ember">
                Admit One · {event.name}
              </div>
              <ul className="mt-5 space-y-3.5">
                {summary.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-sm text-body"
                  >
                    <SparkGlyph className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="ticket-seam mt-6 border-t-2 border-dashed pt-5">
                <p className="text-sm leading-relaxed text-muted">
                  Four to five student leaders, one live audience. Reserve your
                  seat — it&apos;s free.
                </p>
              </div>
            </div>
          </aside>

          {/* Right — tabs + form */}
          <div>
            <div
              role="tablist"
              aria-label="Registration type"
              className="relative flex rounded-full border border-navy/15 bg-white p-1.5"
            >
              <span
                aria-hidden
                className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-full bg-navy transition-transform duration-300"
                style={{
                  transform: tab === "speak" ? "translateX(100%)" : "translateX(0)",
                }}
              />
              {(
                [
                  { id: "attend", label: "Reserve a seat" },
                  { id: "speak", label: "Apply to speak" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`focus-ring relative z-10 flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                    tab === t.id ? "text-cream" : "text-body hover:text-navy"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === "attend" ? <AttendForm /> : <SpeakForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared form chrome ---------- */

function useSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setError(
          data?.errors?.[0]?.message ??
            "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  return { status, error, submit };
}

function SuccessCard({
  children,
  showEvent = true,
}: {
  children: React.ReactNode;
  showEvent?: boolean;
}) {
  return (
    <div className="card flex flex-col items-center p-8 text-center sm:p-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green-deep">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="m5 13 4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-navy">
        You&apos;re in!
      </h3>
      <p className="mt-2 max-w-sm text-body">{children}</p>

      {showEvent && (
        <>
          <div className="mt-6 w-full max-w-xs rounded-xl border border-navy/10 bg-cream p-4 text-left">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <SparkGlyph className="h-3.5 w-3.5 shrink-0" />
              {event.dateLabel}
            </div>
            <div className="mt-1 pl-6 text-sm text-muted">
              {event.doorsLabel} · {event.venue.cityState}
            </div>
          </div>
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline focus-ring mt-5"
          >
            Add to calendar
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
              <path
                d="M6 2v3m8-3v3M3 8h14M4.5 5h11a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </>
      )}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mb-4 rounded-lg border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember"
    >
      {message}
    </p>
  );
}

function Reassurance({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-muted">
      {items.map((x, i) => (
        <span key={x} className="inline-flex items-center gap-3">
          {i > 0 && <SparkGlyph className="h-2 w-2 shrink-0" />}
          {x}
        </span>
      ))}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="field focus-ring"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      <select id={id} name={name} required={required} defaultValue="" className="field focus-ring">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({
  label,
  name,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={4}
        className="field focus-ring resize-y"
      />
    </div>
  );
}

function SubmitButton({ status, children }: { status: Status; children: string }) {
  return (
    <button
      type="submit"
      disabled={status === "submitting"}
      className="btn btn-flame focus-ring w-full disabled:cursor-not-allowed disabled:opacity-70"
    >
      {status === "submitting" ? "Sending…" : children}
    </button>
  );
}

/* ---------- Attend form ---------- */

function AttendForm() {
  const { status, error, submit } = useSubmit();

  if (status === "success") {
    return (
      <SuccessCard>
        Your seat is reserved. We&apos;ll email you the details before the show —
        see you at Windermere Prep.
      </SuccessCard>
    );
  }

  return (
    <form onSubmit={submit} className="card p-7 sm:p-9">
      <input type="hidden" name="_subject" value="New Ignite Summit registration" />
      <input type="hidden" name="form_type" value="attendee" />
      <ErrorBanner message={status === "error" ? error : ""} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        <SelectField
          label="I am a…"
          name="role"
          required
          options={[
            "High school student",
            "College student",
            "Educator / Teacher",
            "Mentor / Professional",
            "Parent / Guardian",
            "Other",
          ]}
        />
        <Field label="School / Organization" name="organization" />
        <Field label="Grade / Year" name="grade" placeholder="Optional" />
      </div>
      <div className="mt-5">
        <SelectField
          label="How many seats?"
          name="seats"
          required
          options={["1", "2", "3", "4", "5+"]}
        />
      </div>
      <div className="mt-5">
        <TextArea
          label="What are you hoping to get out of the night?"
          name="goals"
          placeholder="Optional — networking, inspiration, finding collaborators…"
        />
      </div>

      <div className="mt-7">
        <SubmitButton status={status}>Reserve my seat</SubmitButton>
        <Reassurance items={["Free entry", "2-minute form", "No spam, ever"]} />
      </div>
    </form>
  );
}

/* ---------- Speak form ---------- */

function SpeakForm() {
  const { status, error, submit } = useSubmit();

  if (status === "success") {
    return (
      <SuccessCard showEvent={false}>
        Application received. Our team will review it and reach out about the next
        steps. Thanks for putting yourself out there!
      </SuccessCard>
    );
  }

  return (
    <form onSubmit={submit} className="card p-7 sm:p-9">
      <input type="hidden" name="_subject" value="New Ignite Summit speaker application" />
      <input type="hidden" name="form_type" value="speaker" />
      <ErrorBanner message={status === "error" ? error : ""} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        <Field label="School / College" name="school" required />
        <Field label="Grade / Year" name="grade" />
        <Field label="Business / venture name" name="business" required />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          label="Website or social"
          name="link"
          placeholder="Optional — link to your work"
        />
        <SelectField
          label="Stage of your business"
          name="stage"
          required
          options={[
            "Just an idea",
            "Building it now",
            "Launched",
            "Making revenue",
          ]}
        />
      </div>

      <div className="mt-5 space-y-5">
        <TextArea
          label="What are you building?"
          name="pitch"
          required
          placeholder="In a few sentences — what's your business and who's it for?"
        />
        <TextArea
          label="What would you talk about on stage?"
          name="talk"
          required
          placeholder="The story, lesson, or idea you'd share with the audience."
        />
      </div>

      <div className="mt-7">
        <SubmitButton status={status}>Submit my application</SubmitButton>
        <Reassurance items={["Rolling review", "We reply by email"]} />
      </div>
    </form>
  );
}
