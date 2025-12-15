import { useState } from "react";

const Footer = () => {
  const email = "contact@hugof igueramusic.com".replace(" ", ""); // or just "contact@hugofigueramusic.com"
  const gmailCompose = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`;

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      window.prompt("Copy this email:", email);
    }
  };

  return (
    <footer className="hf-footer">
      <p>Available for freelance and long-term collaborations.</p>

      {/* NEW wrapper (doesn't change your email styling) */}
      <div className="hf-footer-contact">
        <a
          className="hf-footer-email"
          href={gmailCompose}
          target="_blank"
          rel="noopener noreferrer"
        >
          {email}
        </a>

      </div>
    </footer>
  );
};

export default Footer;
