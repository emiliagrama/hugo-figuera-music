import React, { useState } from "react";

const About = () => {
  const [expanded, setExpanded] = useState(false);
    const bioParagraphs = [
    "I'm a music composer, specialized in cinematic and interactive media. With a focus on video games, trailers, and film, I create emotionally driven scores blending orchestral power, dark atmospheres, and hybrid sound design.",
    "Whether it’s an epic trailer, a sci-fi narrative, or a high-intensity gameplay moment, I aim to elevate each project’s storytelling and impact through music.",
    "Recent work includes projects for AAA games, epic dark trailers and sci-fi RTS campaigns."
    ];

  return (
    <section className="hf-bio" id="about">
        <div className="hf-section-shell">
            <div className="hf-section-title">
                <h2>About</h2>
            <div className="hf-title-glow"></div>
        </div>

        <div className="hf-bio-text">
                {bioParagraphs.map((paragraph, index) => (
                    <p key={index} className="hf-bio-intro">
                        {paragraph}
                    </p>
                ))}
        </div>

            <div className={"hf-bio-extra" + (expanded ? " is-open" : "")}>
          <ul className="hf-links">
              <a
                href="https://www.linkedin.com/in/hugo-figuera-85266574/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              </ul>
             <div className="hf-availability-layout">

            <div className="hf-availability-text"> 
                    <h3>Available for</h3>
                    <ul className="hf-services">
                        <li>Game audio &amp; adaptive music</li>
                        <li>Trailer music (original, remix or hybrid)</li>
                        <li>Film / TV scoring</li>
                        <li>Music licensing &amp; bespoke sound design</li>
                    </ul>
            </div>

            <div className="hf-availability-photo">
                <img
                src="/images/hugo profile.png"
                alt="Hugo Figuera"
                />
            </div>

            </div>
                        <p>
                I also release dark drum &amp; bass under the name{" "}
                <strong>Katharsys</strong> and perform internationally, with over 20
                years of experience in the electronic music scene.
            </p>
          <p>You can explore more of my work as Katharsys here:</p>
          <ul className="hf-links">
              <a
                href="https://soundcloud.com/katharsys"
                target="_blank"
                rel="noreferrer"
              >
                SoundCloud
              </a>
          </ul>
        </div>

        <button
          type="button"
          className="hf-link-button"
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </section>
  );
};

export default About;
