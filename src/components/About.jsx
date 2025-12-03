import React, { useState } from "react";

const About = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="hf-bio" id="about">
      <div className="hf-section-shell">
        <div className="hf-section-title">
          <h2>About</h2>
          <div className="hf-title-glow"></div>
        </div>

        <p className="hf-bio-intro">
          I'm a music composer and sound designer specialized in cinematic and
          interactive media. With a focus on video games, trailers, and film, I
          create emotionally driven scores blending orchestral power, dark
          atmospheres, and hybrid sound design.
        </p>

        
          <p>
            Whether it’s an epic trailer, a sci-fi narrative, or a high-intensity
            gameplay moment, I aim to elevate each project’s storytelling and
            impact through music.
          </p>

          <p>
            Recent work includes projects for AAA games, dark fantasy trailers and
            sci-fi RTS campaigns.
          </p>
            <div className={"hf-bio-extra" + (expanded ? " is-open" : "")}>
          

          <h3>Available for</h3>
          <ul className="hf-services">
            <li>Game audio &amp; adaptive music</li>
            <li>Trailer music (original, remix or hybrid)</li>
            <li>Film / TV scoring</li>
            <li>Music licensing &amp; bespoke sound design</li>
          </ul>
            <p>
                I also release dark drum &amp; bass under the name{" "}
                <strong>Katharsys</strong> and perform internationally, with over 20
                years of experience in the electronic music scene.
            </p>
          <p>You can explore more of my work as Katharsys here:</p>
          <ul className="hf-links">
            <li>
              <a href="https://mixcloud.com/..." target="_blank" rel="noreferrer">
                Mixcloud
              </a>
            </li>
            <li>
              <a
                href="https://soundcloud.com/..."
                target="_blank"
                rel="noreferrer"
              >
                Legacy releases on SoundCloud
              </a>
            </li>
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
