import './Project.css';

function MocapFinal() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Insomnia</p>
        <p className="project-meta">Motion Capture · 2026 · Blender </p>
        <p className="project-description">
          An atmospheric short animation about restlessness and the struggle to fall asleep - created as part of my Immersive Media Design coursework at the University of Maryland. My aim was to make a mundane moment feel cinematic through environment, lighting, sound, and wordless storytelling. The scene was modeled by hand in Blender, with select environment assets from Blenderkit, and kept minimal so the focus stays on the character. Final compositing done in After Effects. Motion data was recorded using both marker-based Vicon and markerless Captury systems.
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
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/mocapFinal.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="project-video"
        />
        <figure className="project-figure">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/mocapTimelapse.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video project-video--wide"
          />
          <figcaption className="project-description project-caption">
            Behind the scenes: calibrating the cameras for markerless Captury by moving a patterned board through the space. Ensures system can map each camera's position before recording.
            <br />
            A special thank you to <strong>Maia Lee</strong> for being my motion capture performer.
          </figcaption>
        </figure>
        <figure className="project-figure">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/mocapWalk.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video project-video--wide"
          />
          <figcaption className="project-description project-caption">
            Example of captured data (.fbx) before rigging to character
          </figcaption>
        </figure>
        <div className="project-photo">
          <img src="/photos/mocapScene.jpg" alt="Insomnia scene" className="project-photo project-video--wide" />
        </div>
      </div>

    </div>
  );
}

export default MocapFinal;
