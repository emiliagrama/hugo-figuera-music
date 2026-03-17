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
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL);

  try {
    const { name, email, projectType, message, website } = req.body || {};

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: "Invalid name." });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email." });
    }

    if (!message || message.trim().length < 12) {
      return res.status(400).json({ error: "Message too short." });
    }

    if (!process.env.CONTACT_EMAIL) {
      return res.status(500).json({ error: "CONTACT_EMAIL is missing." });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeProjectType = escapeHtml(projectType || "Not specified");
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New portfolio message from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New portfolio contact</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Project type:</strong> ${safeProjectType}</p>
          <p><strong>Message:</strong></p>
          <div>${safeMessage}</div>
        </div>
      `,
      text: `
New portfolio contact

Name: ${name.trim()}
Email: ${email.trim()}
Project type: ${projectType || "Not specified"}

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