/**
 * POST /api/contact — forward contact/report submissions to the inbox via
 * Resend (same approach as the moreach project).
 *
 * Reads RESEND_API_KEY from the environment (set it in the Vercel dashboard).
 * Never hardcode the key — this repo is public. Sends from a verified Resend
 * domain; reply-to is the visitor so you can reply straight from Gmail.
 */
import { NextResponse } from "next/server";

const TO_EMAIL = "wkwunju@gmail.com";
const FROM = "Discover China <hello@moreach.ai>"; // moreach.ai is verified in Resend

function esc(s: unknown): string {
  return String(s ?? "").replace(
    /[&<>]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string,
  );
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Email not configured (set RESEND_API_KEY)" },
      { status: 500 },
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      about = "General",
      type = "Feedback",
      email = "",
      message = "",
    } = body || {};

    if (!String(message).trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const subject = `[Discover China] ${String(type).slice(0, 60)} — ${String(
      about,
    ).slice(0, 80)}`;
    const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#222">
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9a9a9a;margin:0 0 8px">New message · Discover China</p>
      <p style="font-size:14px;margin:0 0 4px"><b>Type:</b> ${esc(type)}</p>
      <p style="font-size:14px;margin:0 0 4px"><b>About:</b> ${esc(about)}</p>
      <p style="font-size:14px;margin:0 0 18px"><b>From:</b> ${
        email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : "(not given)"
      }</p>
      <p style="font-size:15px;line-height:1.7;white-space:pre-wrap;color:#333">${esc(
        message,
      )}</p>
    </div>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO_EMAIL],
        subject,
        html,
        reply_to: email || undefined,
      }),
    });

    if (!r.ok) {
      const detail = (await r.text()).slice(0, 200);
      return NextResponse.json({ error: "send failed", detail }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
