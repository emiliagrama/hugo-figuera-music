import React, { useRef, useState, useEffect } from "react";

const tracks = [
  {
    id: 1,
    title: "Tension / build-up",
    src: "/audio/Dark Sci-fi Demo01 - Hugo Figuera.wav",
  },
  {
    id: 2,
    title: "Action / movement",
    src: "/audio/Dark Sci-fi Demo02 - Hugo Figuera.wav",
  },
  {
    id: 3,
    title: "Atmospheric depth",
    src: "/audio/Dark Sci-fi demo09 - Hugo Figuera.wav",
  },
];

// helper to display mm:ss
const formatTime = (sec) => {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const ShowreelSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const deckRef = useRef(null);
  const progressRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentTrack = tracks[currentIndex];

  // Sync <audio> with current track + playing state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load(); // load new source when index changes
    setCurrentTime(0); // reset progress

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          // all good
        })
        .catch((err) => {
          console.error("Failed to play:", currentTrack.src, err);
          setIsPlaying(false); // reset UI if something goes wrong
        });
    } else {
      audio.pause();
    }
  }, [currentIndex, isPlaying, currentTrack.src]);

  // Track duration + progress updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);

  // Observer for the “coming out of the screen” animation
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

  const handleSeek = (event) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);
    const newTime = ratio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="hf-player" id="showreel">
      <div className="hf-section-title">
        <h2>Showreel</h2>
        <div className="hf-title-glow"></div>
      </div>

      <p className="hf-player-text">
        Short selection of dark sci-fi demos for cinematic and interactive
        projects.
      </p>

      {/* Static studio photo background */}
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

          {/* PROGRESS BAR */}
          <div className="hf-player-progress">
            <div className="hf-progress-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div
              className="hf-progress-track"
              ref={progressRef}
              onClick={handleSeek}
            >
              <div
                className="hf-progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="hf-progress-handle"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
          </div>

          <audio ref={audioRef}>
            <source src={currentTrack.src} type="audio/wav" />
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
