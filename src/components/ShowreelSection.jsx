import React, { useRef, useState, useEffect } from "react";

const tracks = [
  {
    id: 1,
    title: "Showreel 2025",
    tag: "Cinematic overview",
    src: "/audio/showreel-2025.mp3",
  },
  {
    id: 2,
    title: "Boss Fight – Titan Core",
    tag: "Combat",
    src: "/audio/boss-fight-titan-core.mp3",
  },
  {
    id: 3,
    title: "Neon City – Skyline",
    tag: "Exploration",
    src: "/audio/neon-city-skyline.mp3",
  },
  {
    id: 4,
    title: "Aurora – Main Menu",
    tag: "Menu / UI",
    src: "/audio/aurora-main-menu.mp3",
  },
];

const ShowreelSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const deckRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentTrack = tracks[currentIndex];

  // Sync <audio> with track + playing state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load(); // load new source when index changes

   if (isPlaying) {
    audio
      .play()
      .then(() => {
        // ok
        // console.log("Playing:", currentTrack.src);
      })
      .catch((err) => {
        console.error("Failed to play:", currentTrack.src, err);
        setIsPlaying(false); // reset UI if something goes wrong
      });
  } else {
    audio.pause();
  }
}, [currentIndex, isPlaying, currentTrack.src]);

  // Observer for the "coming out of the screen" animation
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsPlaying((prev) => !prev);
  };

  const handleSelectTrack = (index) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0; // restart from beginning
    }
    setCurrentIndex(index);
    setIsPlaying(true); // auto-play newly selected track
  };

  return (
    <section className="hf-player" id="showreel">
      <div className="hf-section-title">
        <h2>Showreel</h2>
        <div className="hf-title-glow"></div>
      </div>

      <p className="hf-player-text">
        Short selection of themes and atmospheres for combat, exploration and menus.
      </p>

      {/* Static photo background */}
      <div className="hf-showreel-bg">
        {/* Animated deck only */}
        <div
          ref={deckRef}
          className={
            "hf-player-deck hf-player-anim" + (isVisible ? " is-visible" : "")
          }
        >
          <button
            type="button"
            className={"hf-player-play" + (isPlaying ? " is-playing" : "")}
            onClick={togglePlay}
          >
            {isPlaying ? "‖" : "►"}
          </button>

          <div className="hf-player-info">
            <h3>{currentTrack.title}</h3>
            <p>{currentTrack.tag}</p>
          </div>

          <audio ref={audioRef}>
            <source src={currentTrack.src} type="audio/mpeg" />
          </audio>

          <ul className="hf-playlist">
            {tracks.map((track, index) => (
              <li
                key={track.id}
                className={
                  "hf-playlist-item" +
                  (index === currentIndex ? " is-active" : "")
                }
                onClick={() => handleSelectTrack(index)}
              >
                <span>{track.title}</span>
                <small>{track.tag}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;

