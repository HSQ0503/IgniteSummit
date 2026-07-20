import { Resend } from "resend";

// Organizers notified on every submission. Edit this list to change who's emailed.
const NOTIFY = [
  "ceo@empowerteensunited.org",
  "guga@bizbuild.org",
  "theyeeterboi53@gmail.com",
];

// The sender must be on a Resend-verified domain to deliver in production.
// ignitesummit2026.com is verified in the Resend account; RESEND_FROM can
// override without a code change.
const FROM = process.env.RESEND_FROM ?? "Ignite Summit <hello@ignitesummit2026.com>";

// Form plumbing we don't want to show in the notification body.
const HIDDEN = new Set(["form_type", "_subject"]);

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  role: "Role",
  organization: "School / Organization",
  grade: "Grade / Year",
  seats: "Seats requested",
  goals: "Hoping to get from the night",
  school: "School / College",
  business: "Business / venture",
  link: "Website or social",
  stage: "Business stage",
  pitch: "What they're building",
  talk: "Talk idea",
};

function labelFor(key: string) {
  return LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Row = { label: string; value: string };

function renderEmail(kind: string, name: string, rows: Row[]) {
  const cells = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 16px 10px 0;border-top:1px solid #eee7db;font:500 12px/1.4 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#6b7785;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-top:1px solid #eee7db;font:400 14px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#101820">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  return `
  <div style="background:#faf8f3;padding:24px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d6;border-radius:14px;overflow:hidden">
      <div style="height:4px;background:linear-gradient(100deg,#fccc00,#ff6a2c)"></div>
      <div style="padding:24px 28px">
        <div style="font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;color:#ff6a2c">${escapeHtml(kind)}</div>
        <h1 style="margin:8px 0 0;font:700 22px/1.2 Georgia,serif;color:#0f4566">Ignite Summit</h1>
        <p style="margin:6px 0 0;font:400 14px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#6b7785">New submission from ${escapeHtml(name)}.</p>
        <table style="width:100%;margin-top:18px;border-collapse:collapse">${cells}</table>
        <p style="margin:22px 0 0;font:400 13px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#6b7785">Reply to this email to reach ${escapeHtml(name)} directly.</p>
      </div>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { errors: [{ message: "Email isn't configured yet. Set RESEND_API_KEY." }] },
      { status: 500 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json(
      { errors: [{ message: "Invalid submission." }] },
      { status: 400 },
    );
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  if (!name || !email) {
    return Response.json(
      { errors: [{ message: "Name and email are required." }] },
      { status: 400 },
    );
  }

  const isSpeaker = String(form.get("form_type") ?? "") === "speaker";
  const kind = isSpeaker ? "Speaker application" : "Registration";

  const rows: Row[] = [];
  for (const [key, raw] of form.entries()) {
    if (HIDDEN.has(key)) continue;
    const value = String(raw).trim();
    if (value) rows.push({ label: labelFor(key), value });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: NOTIFY,
    replyTo: email,
    subject: `${kind} — ${name}`,
    html: renderEmail(kind, name, rows),
    text: rows.map((r) => `${r.label}: ${r.value}`).join("\n"),
  });

  if (error) {
    console.error("Resend send failed:", error);
    return Response.json(
      { errors: [{ message: "Couldn't send right now. Please try again." }] },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, id: data?.id });
}
