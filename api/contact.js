import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("API hit");
    console.log("Has API key:", !!process.env.RESEND_API_KEY);

    const { name, email, message } = req.body || {};
    console.log("Body:", { name, email, hasMessage: !!message });

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

const result = await resend.emails.send({
  from: "Hugo Site <contact@hugofigueramusic.com>",
  to: ["emiliagrama@gmail.com"],
  reply_to: email,
  subject: `New message from ${name}`,
  html: `
    <h2>New message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p>${escapeHtml(message)}</p>
  `,
});

    console.log("RESEND RESULT:", JSON.stringify(result, null, 2));

    if (!result || result.error) {
      console.error("RESEND ERROR:", result?.error);
      return res.status(500).json({
        error: result?.error?.message || "Email failed to send",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("API catch error:", err);
    return res.status(500).json({
      error: err?.message || "Server error",
    });
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}