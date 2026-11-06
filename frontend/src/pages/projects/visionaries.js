import './Project.css';

function Visionaries() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Visionaries</p>
        <p className="project-meta">Interactive Installation · 2026 · TouchDesigner · Arduino</p>
        <p className="project-description">
          Distance sensor interactive installation.
        </p>
      </div>

      <div className="gallery">
        <img src="/photos/visionaries.jpg" alt="Visionaries" className="project-photo" />
      </div>

    </div>
  );
}

export default Visionaries;
