import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const tracks = [
  // STYLE 1 – Scoring
  {
    id: 1,
    style: "Scoring",
    title: "Emotional resolve",
    length: "1:54",
    src: "/audio/Dark Sci-fi Demo01 - Hugo Figuera.mp3",
  },
  {
    id: 2,
    style: "Scoring",
    title: "Noir tension",
    length: "2:10",
    src: "/audio/Dark Sci-fi Demo02 - Hugo Figuera.mp3",
  },

  // STYLE 2 – Trailers
  {
    id: 3,
    style: "Trailers",
    title: "Pulse ignition",
    length: "1:46",
    src: "/audio/Dark Sci-fi Demo03 - Hugo Figuera.wav",
  },
  {
    id: 4,
    style: "Trailers",
    title: "Impact fragments",
    length: "2:03",
    src: "/audio/Dark Sci-fi Demo04 - Hugo Figuera.wav",
  },

  // STYLE 3 – Video game
  {
    id: 5,
    style: "Video game",
    title: "Sector breach",
    length: "1:58",
    src: "/audio/Dark Sci-fi Demo05 - Hugo Figuera.wav",
  },
  {
    id: 6,
    style: "Video game",
    title: "Neon outpost",
    length: "2:21",
    src: "/audio/Dark Sci-fi Demo06 - Hugo Figuera.wav",
  },
];

// give each track its global index (0–5)
const tracksWithIndex = tracks.map((track, index) => ({ ...track, index }));

// order of the 3 sections
const STYLES = ["Scoring", "Trailers", "Video game"];

const groupedTracks = STYLES.map((style) => ({
  style,
  tracks: tracksWithIndex.filter((t) => t.style === style),
}));

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
  const autoplayRef = useRef(false);
  const deckRef = useRef(null);
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  const currentTrack = tracks[currentIndex];

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

  // Create the main WaveSurfer instance once
  useEffect(() => {
    if (!isVisible) return;
    if (!waveformRef.current) return;
    if (waveSurferRef.current) return; // already created

    const ws = WaveSurfer.create({
  container: waveformRef.current,
  url: currentTrack.src,

  // HEIGHT
  height: 80,              // try 70–90 until you like it

  // IMPORTANT: continuous waveform, not bars
  barWidth: 0,             // <– remove bars
  barGap: null,            // <– make sure no gaps
  cursorWidth: 0,

  // COLORS – tweak to taste
  waveColor: "rgba(10, 55, 115, 0.45)",      // soft navy/teal blend
progressColor: "rgba(18, 110, 175, 0.88)", // richer mid-blue highlight
                 // played part (bright)
  normalize: true,
  interact: true,
  
});


    waveSurferRef.current = ws;
ws.on("error", (error) => {
  if (error?.name === "AbortError") return; // ignore fetch aborts (normal)
  console.error("WaveSurfer error:", error);
});
    ws.on("ready", (dur) => {
  setDuration(dur || 0);
  setCurrentTime(0);

  // AUTO PLAY IF TRACK WAS CLICKED
  if (autoplayRef.current) {
    ws.play();
    autoplayRef.current = false;
  }
});


    ws.on("timeupdate", (time) => {
      setCurrentTime(time || 0);
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));

    return () => {
      ws.destroy();
      waveSurferRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // When the current track changes, load it into WaveSurfer
  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws) return;

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    ws.load(currentTrack.src);
  }, [currentTrack.src]);

  const togglePlay = () => {
    const ws = waveSurferRef.current;
    if (!ws) return;
    ws.playPause();
  };

  const handleSelectTrack = (index) => {
  const ws = waveSurferRef.current;

  // If user clicks the already-selected track,
  // just toggle play/pause on the existing WaveSurfer instance
  if (index === currentIndex && ws) {
    if (isPlaying) {
      ws.pause();
    } else {
      ws.play();
    }
    return; // stop here, no need to change track
  }

  // User selected a different track → load it and autoplay when ready
  autoplayRef.current = true;   // tell WaveSurfer to autoplay next "ready"
  setCurrentIndex(index);
};



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
        {/* Glass deck + playlist */}
        <div
          ref={deckRef}
          className={
            "hf-player-deck hf-player-anim" + (isVisible ? " is-visible" : "")
          }
        >
          {/* MAIN PLAYER BAR */}
          <button
            type="button"
            className={"hf-player-play" + (isPlaying ? " is-playing" : "")}
            onClick={togglePlay}
          >
            <span className="hf-icon">
    {isPlaying ? "" : "►"}
  </span>
          </button>

          <div className="hf-player-info">
            <h3>{currentTrack.title}</h3>
            <p className="hf-player-style">{currentTrack.style}</p>
          </div>

          {/* WAVEFORM PROGRESS BAR */}
          <div className="hf-player-progress">
            <div className="hf-progress-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="hf-progress-wave" ref={waveformRef} />
          </div>

          {/* 3 SECTIONS BY STYLE, WITHOUT INDIVIDUAL WAVES */}
          <div className="hf-style-groups">
            {groupedTracks.map((group) => (
              <section className="hf-style-group" key={group.style}>
                <header className="hf-style-header">
                  <h4 className="hf-style-title">{group.style}</h4>
                </header>

                <ul className="hf-style-tracklist">
                  {group.tracks.map((track) => (
                    <li
                      key={track.id}
                      className={
                        "hf-style-track" +
                        (track.index === currentIndex ? " is-active" : "")
                      }
                      onClick={() => handleSelectTrack(track.index)}
                    >
                      <span className="hf-style-track-title">
                        {track.title}
                      </span>
                      <span className="hf-style-track-length">
                        {track.length}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
