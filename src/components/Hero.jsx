import React, { useEffect } from "react";

const subtitleText =
  "Orchestral power, dark atmospheres and hybrid scoring crafted for immersive worlds";

const Hero = () => {

  // ⭐ This prevents the flashing of the first words
  useEffect(() => {
    requestAnimationFrame(() => {
      const el = document.querySelector(".hf-hero-subtitle");
      if (el) el.classList.add("hf-subtitle-ready");
    });
  }, []);

  return (
    <header className="hf-hero">
      <div className="hf-hero-overlay" />

      <div className="hf-hero-content">
        <p className="hf-hero-tagline">
          CINEMATIC MUSIC COMPOSER FOR GAMES, TRAILERS &amp; FILM
        </p>

        <h1 className="hf-hero-title">HUGO FIGUERA</h1>

        {/* SUBTITLE */}
        <p className="hf-hero-subtitle" aria-label={subtitleText}>
          {(() => {
            const words = subtitleText.split(" ");
            let globalIndex = 0;
            const baseDelay = 0.10;
            const step = 0.045;

            return words.map((word, wIndex) => (
              <span
                key={wIndex}
                className="hf-hero-word"
                style={{
                  marginRight: wIndex === words.length - 1 ? 0 : "0.35em",
                }}
              >
                {Array.from(word).map((char, cIndex) => {
                  const delay = baseDelay + globalIndex * step;
                  globalIndex += 1;

                  return (
                    <span
                      key={`${wIndex}-${cIndex}`}
                      className="hf-hero-subletter"
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {char}
                    </span>
                  );
                })}
               {" "}
              </span>
            ));
          })()}
        </p>

<a
  href="#showreel"
  className="hf-audio-button"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("showreel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
>
  <span className="hf-audio-button__glow"></span>

  <span className="hf-audio-button__waves" aria-hidden="true">
    <span className="bar bar-1"></span>
    <span className="bar bar-2"></span>
    <span className="bar bar-3"></span>
    <span className="bar bar-4"></span>
    <span className="bar bar-5"></span>
    <span className="bar bar-6"></span>
    <span className="bar bar-7"></span>
    <span className="bar bar-8"></span>
    <span className="bar bar-9"></span>
  </span>

  <span className="hf-audio-button__label">Listen to the showreel</span>
</a>
      </div>
    </header>
  );
};

export default Hero;
