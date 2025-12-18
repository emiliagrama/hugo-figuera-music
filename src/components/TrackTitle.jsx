export default function TrackTitle({ title, underline = false }) {
  const parts = title.split("|");
  const left = parts[0]?.trim();
  const right = parts.slice(1).join("|").trim();

  return (
    <span className={`hf-track-title ${underline ? "hf-title-underline-fade" : ""}`}>
      <span className="hf-track-title-main">{left}</span>

      {right && (
        <>
          <span className="hf-track-title-pipe"> | </span>
          <span className="hf-track-title-rest">{right}</span>
        </>
      )}
    </span>
  );
}
