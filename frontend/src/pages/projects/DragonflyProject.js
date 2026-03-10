import './Project.css';

function DragonflyProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Wings, 2026</p>
        <p className="project-meta">Real-time body tracking, TouchDesigner, Blender</p>
        <p className="project-description">
            Growing up, whenever anyone asked me what superpower I'd want, my answer was always to fly. No hesitation! Since it's been about 15 years and nobody's made that happen yet, I figured I'd just do it myself. Using the Lorenz attractor to generate particle wings and MediaPipe to track the body and gestures in real time, I built myself a prototype for whenever someone figures out the hard part. The wings are anchored to the midpoint of my back — between the left and right shoulder coordinates — while my hand rotation and pinch distance control the constants of the equation.
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
