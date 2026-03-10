import './Project.css';

function TapeProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Untitled, 2026</p>
        <p className="project-meta">Blender, TouchDesigner, Adobe After Effects</p>
        <p className="project-description">
          A meditation on liminal space — moments and places caught between states, neither fully here nor fully elsewhere.
          The footage was captured on a trip to my mother's hometown in China. Something about this particular spot stayed with me: tall modern buildings against an untouched shoreline, two realities sharing the same frame like they were never meant to. The generative forms layered over the video pushes that tension further through the contrast between the entity's fluid vs restless movement. 
        </p>
      </div>
      <div className="gallery" style={{ flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/tapee.mp4"
          controls
          className="project-video--tape"
        />
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/OGtape.mp4"
          controls  
          className="project-video--tape"
        />
        <img
          src="/photos/original_photo.png"
          alt="Original footage location"
          className="project-video--tape"
        />
      </div>
    </div>
  );
}

export default TapeProject;
