import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name?.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email?.trim() || !isValidEmail(email)) {
      return res.status(400).json({ error: "Valid email is required." });
    }

    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    const result = await resend.emails.send({
      from: "Hugo Website <contact@emiliagrama.com>",
      to: process.env.HUGO_CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `New contact message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
}