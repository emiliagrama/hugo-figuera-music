function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    return res.status(500).json({ error: "Form service is not configured." });
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

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `New message from ${name.trim()}`,
        from_name: "Hugo Site",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        replyto: email.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Web3Forms error:", data);
      return res.status(500).json({
        error: data.message || "Failed to send message.",
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