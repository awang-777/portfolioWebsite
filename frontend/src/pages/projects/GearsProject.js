import './Project.css';

function GearsProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Augment, 2026</p>
        <p className="project-meta">Real-time body tracking, TouchDesigner, Blender</p>
        <p className="project-description">
          The body as interface — Augment explores the connection between flesh and machine, physical and virtual, through gesture-controlled mechanical adornments. Hand movements tracked via MediaPipe control a living exoskeleton of gears and ornaments rendered in real time.
        </p>
      </div>

      {/* Video */}
      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/gears1.mp4"
          controls
          playsInline
          className="project-video"
        />
        <div className="project-photo">
          <img
            src="/photos/gear1.png"
            alt="Augment photo 1"
            className="project-photo"
          />
        </div>
      </div>

    </div>
  );
}

export default GearsProject;
