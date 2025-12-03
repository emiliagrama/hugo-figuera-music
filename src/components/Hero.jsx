import React from "react";

const Hero = () => {
  const scrollToShowreel = () => {
    const el = document.getElementById("showreel");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="hf-hero">
      <div className="hf-hero-overlay" />

      <div className="hf-hero-content">
        <p className="hf-hero-tagline">
          CINEMATIC MUSIC &amp; SOUND DESIGN FOR GAMES, TRAILERS &amp; FILM
        </p>

        <h1 className="hf-hero-title">HUGO FIGUERA</h1>

        <p className="hf-hero-subtitle">
          Orchestral power, dark atmospheres and hybrid sound design crafted for
          immersive worlds.
        </p>

        <div className="hf-btn-border">
          <button
            type="button"
            className="hf-btn-primary"
            onClick={scrollToShowreel}
          >
            <span className="hf-btn-primary-icon" />
            <span>Listen to the showreel</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
