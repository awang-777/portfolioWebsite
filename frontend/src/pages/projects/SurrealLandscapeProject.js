import './Project.css';

function SurrealLandscapeProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Surreal Landscape</p>
        <p className="project-meta">Collaborative 3D environment · Group of 3</p>
        <p className="project-description">A surreal banquet of dream and decay. The project draws from the dislocated logic of Alice in Wonderland and the uneasy, flower-drenched daylight of Midsommar. Our goal was to create a feast that feels both ceremonial and abandoned. The scene was built as a three-person collaboration. I led the hero assets — the objects across the banquet table, the butterfly suspended in the background, and the fish moving through the surrounding water. The aim was to make each piece "almost real," recognizable as glassware, florals, and creatures, but rendered with a strangeness that keeps them from settling into the ordinary. A second collaborator developed the rolling terrain and palm-dotted treeline, and a third built the architectural structures rising along the horizon.</p>
      </div>

      <div className="gallery">
        <div className="project-photo">
          <img src="/photos/surrealLandscape.jpg" alt="Surreal Landscape" className="project-photo" />
        </div>
        <div className="project-photo">
          <img src="/photos/followtheLight.png" alt="Follow the Light" className="project-photo" />
        </div>
      </div>

    </div>
  );
}

export default SurrealLandscapeProject;
