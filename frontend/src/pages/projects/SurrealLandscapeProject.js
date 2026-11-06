import ProjectTitle from './ProjectTitle';
import './Project.css';

function SurrealLandscapeProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <ProjectTitle>Surreal Landscape</ProjectTitle>
        <p className="project-meta">Collaborative 3D environment · Blender · 2026</p>
        <p className="project-description">
          A surreal banquet inspired by Alice in Wonderland and Midsommar. Created as part of my Immersive Media Design coursework at the University of Maryland.
          <br />
          Selected and presented at the IMD 2026 Showcase.
        </p>
        <div className="project-description project-credits">
          <p><strong>Amanda Wang</strong>: 3D Modeling, Texturing &amp; Animation<br />
          Suspended butterfly, underwater fish, and select table elements including floral arrangements and desserts</p>
          <p><strong>Christine Nesseth</strong>: 3D Modeling, Texturing, Scene Assembly &amp; Animation<br />
          Landscape, pond, background vegetation, and select florals</p>
          <p><strong>Nick Nesseth</strong>: 3D Modeling, Texturing, Rendering &amp; Animation<br />
          Table and chairs, cutlery, towers, and tablecloth simulation</p>
        </div>
      </div>

      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/Oasis_Banquet_HD.mp4"
          controls
          className="project-video"
        />
        <div className="project-photo project-photo--zoom">
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
