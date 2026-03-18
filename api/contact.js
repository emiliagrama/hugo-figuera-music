import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  if (!process.env.CONTACT_EMAIL) {
    return res.status(500).json({ error: "Contact email is not configured." });
  }

  try {
    const { name, email, message, website } = req.body || {};

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: "Invalid name." });
    }

    if (!email || !isValidEmail(email.trim())) {
      return res.status(400).json({ error: "Invalid email." });
    }

    if (!message || message.trim().length < 12) {
      return res.status(400).json({ error: "Message too short." });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

    const result = await resend.emails.send({
      from: "Hugo Site <onboarding@resend.dev>",
      to: "figuerahugo.gmail.com",
      replyTo: email.trim(),
      subject: `New message from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <div>${safeMessage}</div>
        </div>
      `,
      text: `
New message

Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}
      `.trim(),
    });

    console.log("RESEND RESULT:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("Resend error:", result.error);
      return res.status(500).json({
        error: result.error.message || "Failed to send email.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({
      error: err?.message || "Server error.",
    });
  }
}