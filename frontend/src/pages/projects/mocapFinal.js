import ProjectTitle from './ProjectTitle';
import './Project.css';

function MocapFinal() {
  return (
    <div className="project-page">
      <div className="project-info">
        <ProjectTitle>Insomnia</ProjectTitle>
        <p className="project-meta">Motion Capture · 2026 · Blender </p>
        <p className="project-description">
          An atmospheric short animation created as part of my Immersive Media Design coursework at the University of Maryland. My aim was to focus on environment, lighting, sound, and wordless storytelling. Final compositing done in After Effects. Motion data was recorded using both marker-based Vicon and markerless Captury systems.
          <br />
          Due to copyright issues, audio is unavailable. Please{' '}
          <a
            href="https://www.instagram.com/reel/DYX3jQ0RJum/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            click here
          </a>{' '}
          to view the full version on Instagram.
        </p>
      </div>

      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/mocalFinal.mp4"
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

export default MocapFinal;
