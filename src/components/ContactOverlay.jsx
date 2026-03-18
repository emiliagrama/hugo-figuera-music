import { useEffect, useState } from "react";

export default function ContactOverlay({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function validate(values) {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please write a message.";
    } else if (values.message.trim().length < 12) {
      nextErrors.message = "Your message is too short.";
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      website: form.website,
    };

    const validationErrors = validate(trimmedForm);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedForm),
      });

      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        message: "",
        website: "",
      });
      setErrors({});
      setServerError("");
    } catch (error) {
      setServerError(error.message || "Failed to send message.");
    } finally {
      setIsSending(false);
    }
  }

  function handleClose() {
    if (isSending) return;
    onClose();
  }

  return (
    <div className="contactOverlay">
      <div className="contactOverlay__backdrop" onClick={handleClose} />

      <div className="contactOverlay__panel">
        <button
          className="contactOverlay__close"
          onClick={handleClose}
          type="button"
          disabled={isSending}
          aria-label="Close contact form"
        >
          ✕
        </button>

        <div className="contactOverlay__content">
          {!submitted ? (
            <>
              <h2>Let’s work together</h2>
              <p className="contactOverlay__intro">
                Tell me about your project. I’ll get back to you shortly.
              </p>

              <form
                className="contactOverlay__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "is-error" : ""}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="contactOverlay__error">{errors.name}</p>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "is-error" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="contactOverlay__error">{errors.email}</p>
                )}

                <textarea
                  name="message"
                  rows="5"
                  spellCheck={false}
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "is-error" : ""}
                />
                {errors.message && (
                  <p className="contactOverlay__error">{errors.message}</p>
                )}

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="contactOverlay__honeypot"
                  aria-hidden="true"
                />

                {serverError && (
                  <p className="contactOverlay__error">{serverError}</p>
                )}

                <button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send message"}
                </button>
              </form>

              <p className="contactOverlay__alt">or contact directly:</p>
              <a
                href="mailto:contact@hugofigueramusic.com"
                className="contactOverlay__email"
              >
                contact@hugofigueramusic.com
              </a>
            </>
          ) : (
            <div className="contactOverlay__success">
              <p className="contactOverlay__eyebrow">MESSAGE SENT</p>
              <h2>Thanks — your message has been sent.</h2>
              <p>
                Hugo received your message and will get back to you shortly.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    message: "",
                    website: "",
                  });
                  setErrors({});
                  setServerError("");
                }}
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}