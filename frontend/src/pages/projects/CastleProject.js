import './Project.css';

function CastleProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Somewhere I've Never Been, 2026</p>
        <p className="project-meta">Autodesk Maya</p>
        <p className="project-description">
          I've been to the Temple of Heaven... just not this one. This version lives entirely in my head, built from memory and imagination. Inspired by Castle in the Sky, I wanted to create a surreal landscape that pulls from something real and recognizable, then pushes it just far enough that it's unreachable.  
        </p>
      </div>

      <div className="gallery">
        <div className="project-photo">
          <img src="/photos/1.jpg" alt="Somewhere I've Never Been still 1" className="project-photo" />
        </div>
        <div className="project-photo">
          <img src="/photos/2.jpg" alt="Somewhere I've Never Been still 2" className="project-photo" />
        </div>
      </div>

    </div>
  );
}

export default CastleProject;