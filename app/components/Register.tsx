"use client";

import { useEffect, useState, type FormEvent } from "react";
import { event, formspreeUrl } from "@/lib/event";
import { SectionHeading } from "./SectionHeading";

type Tab = "attend" | "speak";
type Status = "idle" | "submitting" | "success" | "error";

function isPlaceholder(id: string) {
  return id.startsWith("YOUR_");
}

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
            stage as a student founder.
          </p>
        </div>

        {/* Tab switch */}
        <div className="mx-auto mt-10 flex max-w-md rounded-full border border-navy/15 bg-white p-1.5">
          {(
            [
              { id: "attend", label: "Reserve a seat" },
              { id: "speak", label: "Apply to speak" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`focus-ring flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                tab === t.id
                  ? "bg-navy text-cream"
                  : "text-body hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          {tab === "attend" ? <AttendForm /> : <SpeakForm />}
        </div>
      </div>
    </section>
  );
}

/* ---------- shared form chrome ---------- */

function useFormspree(formId: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (isPlaceholder(formId)) {
      setStatus("error");
      setError(
        "This form isn't connected yet. Add your Formspree form ID in lib/event.ts.",
      );
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(formspreeUrl(formId), {
        method: "POST",
        headers: { Accept: "application/json" },
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

function SuccessCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center p-10 text-center">
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
  const { status, error, submit } = useFormspree(event.forms.registerId);

  if (status === "success") {
    return (
      <SuccessCard>
        Your seat is reserved. We&apos;ll email you the details before the show —
        see you at the Cypress Center.
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
        <p className="mt-3 text-center text-xs text-muted">
          Free to attend · We&apos;ll only email you about Ignite Summit.
        </p>
      </div>
    </form>
  );
}

/* ---------- Speak form ---------- */

function SpeakForm() {
  const { status, error, submit } = useFormspree(event.forms.speakerId);

  if (status === "success") {
    return (
      <SuccessCard>
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
        <p className="mt-3 text-center text-xs text-muted">
          Applications are reviewed on a rolling basis.
        </p>
      </div>
    </form>
  );
}
