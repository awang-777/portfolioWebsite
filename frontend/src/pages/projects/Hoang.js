import './Project.css';

function Hoang() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Hoang — Second Chance Tour</p>
        <p className="project-meta">Tour Visuals · 2026 · TouchDesigner </p>
        <p className="project-description">
          A series of rendered loops created for producer Hoang's 2026 Second Chance Tour, designed for playback during live sets.
        </p>
      </div>

      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/hoang.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="project-video"
        />
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/HoangIntense2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="project-video"
        />
      </div>

    </div>
  );
}

export default Hoang;
