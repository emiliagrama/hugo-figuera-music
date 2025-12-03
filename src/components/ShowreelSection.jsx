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

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSelectTrack = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <section className="hf-player" id="showreel">
        <div className="hf-section-shell">
      <div className="hf-section-title">
        <h2>Showreel</h2>
        <div className="hf-title-glow"></div>
      </div>

      <p className="hf-player-text">
        Short selection of themes and atmospheres for combat, exploration and
        menus.
      </p>

      <div className="hf-player-main">
        <button
          type="button"
          className={"hf-player-play" + (isPlaying ? " is-playing" : "")}
          onClick={togglePlay}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <div className="hf-player-info">
          <h3>{currentTrack.title}</h3>
          <p>{currentTrack.tag}</p>
        </div>
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
    </section>
  );
};

export default ShowreelSection;
