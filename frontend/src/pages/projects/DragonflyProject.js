import './Project.css';

function DragonflyProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Wings, 2026</p>
        <p className="project-meta">Real-time body tracking, TouchDesigner, Blender</p>
        <p className="project-description">
          The body as interface — Wings transforms the human form into something between creature and equation. Inspired by a personal dragonfly sketch, particle wings generated through the Lorenz attractor emerge from the midpoint of the shoulders, anchored to the body in real time. Using media pipe, my hand gestures shift the parameters of the equation.
        </p>
      </div>

      {/* Video */}
      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/dragonfly.mp4"
          controls
          playsInline
          className="project-video"
        />
        <div className="project-photo">
          <img
            src="/photos/dragonflySketch.jpg"
            alt="Original dragonfly sketch"
            className="project-photo"
          />
        </div>
      </div>

    </div>
  );
}

export default DragonflyProject;
