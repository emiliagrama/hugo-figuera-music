import React from "react";

const Credits = () => {
  // Optional: add links if you want the cards clickable
  // If you don't want links yet, keep href as null.
  const credits = [
    {
      studio: "Creative Assembly",
      tag: "Games",
      title: "Total War: WARHAMMER 40,000",
      meta: "Composer contribution — Revealed at The Game Awards 2025",
       link: {
      label: "Watch reveal →",
      href: "https://www.youtube.com/watch?v=hsAZajeYLTI"
    }
    },
    {
      studio: "Bleeding Fingers Music (US)",
      tag: "TV / Film",
      title: "Original hybrid orchestral music compositions for film & television catalogs",
      meta: "Selected contributions — Further credits available on request",
    },
  ];

  return (
    <section className="hf-credits" id="credits">
      <div className="hf-section-shell">
        <div className="hf-section-title">
          <h2>Selected credits</h2>
          <div className="hf-title-glow"></div>
        </div>

        <div className="hf-credits-grid">
  {credits.map((c, idx) => (
  <article key={`${c.studio}-${idx}`} className="hf-credit-card">

      <div className="hf-credit-top">
        <div className="hf-credit-studio">{c.studio}</div>
        <div className="hf-credit-tag">{c.tag}</div>
      </div>

      <div className="hf-credit-title">{c.title}</div>
      <div className="hf-credit-meta">{c.meta}</div>

      {c.link?.href && (
        <div className="hf-credit-link">
          <a href={c.link.href} target="_blank" rel="noopener noreferrer">
            {c.link.label ?? "Watch →"}
          </a>
        </div>
      )}
    </article>
  ))}
</div>


        <p className="hf-credits-note">
          Additional projects not listed due to confidentiality.
        </p>
      </div>
    </section>
  );
};

export default Credits;
