import React from "react";

const Hero = () => {
  const scrollToShowreel = () => {
    const el = document.getElementById("showreel");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const subtitleText =
    "Orchestral power, dark atmospheres and hybrid sound design crafted for immersive worlds.";
  
  return (
    <header className="hf-hero">
      <div className="hf-hero-overlay" />

      <div className="hf-hero-content">
        <p className="hf-hero-tagline">
          CINEMATIC MUSIC &amp; SOUND DESIGN FOR GAMES, TRAILERS &amp; FILM
        </p>

        <h1 className="hf-hero-title">HUGO FIGUERA</h1>

 <p className="hf-hero-subtitle">
  {(() => {
    const words = subtitleText.split(" "); // split into words

    return words.map((word, wIndex) => (
      <span
        key={wIndex}
        className="hf-hero-word"
        style={{ marginRight: wIndex === words.length - 1 ? 0 : "0.35em" }} // visual space
      >
        {Array.from(word).map((char, cIndex) => (
          <span
            key={`${wIndex}-${cIndex}`}
            className="hf-hero-subletter"
            style={{
              animationDelay: `${(wIndex * 6 + cIndex) * 0.04}s`,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  })()}
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
