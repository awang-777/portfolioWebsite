import './Project.css';

function SurrealLandscapeProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Surreal Landscape</p>
        <p className="project-meta">Collaborative 3D environment · Group of 3</p>
        <p className="project-description">A surreal banquet inspired by Alice in Wonderland and Midsommar. </p>
      </div>

      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/Oasis_Banquet_HD.mp4"
          controls
          className="project-video"
        />
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
