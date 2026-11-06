import ProjectTitle from './ProjectTitle';
import './Project.css';

function Visionaries() {
  return (
    <div className="project-page">
      <div className="project-info">
        <ProjectTitle>Proximity</ProjectTitle>
        <p className="project-meta">Interactive Experience · 2026 · TouchDesigner · Arduino</p>
        <p className="project-description">
          Distance sensor interactive experience, created and showcased at{' '}
          <a
            href="https://www.instagram.com/visionariesproject/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Visionaries 2026
          </a>.
        </p>
        <p className="project-description">
          An ultrasonic sensor tracks the distance between the viewer and the work, and the
          on-screen visuals shift through a series of moving forms as they approach or step
          away. The system is also audio reactive: glow, growth, decay, fades, and blur
          respond in real time to the frequencies of the accompanying track.
        </p>
        <p className="project-description">
          Hardware: ELEGOO HC-SR04 Ultrasonic Distance Sensor, ELEGOO UNO R3 Microcontroller Board
        </p>
      </div>

      <div className="gallery">
        <img src="/photos/visionaries.jpg" alt="Proximity" className="project-photo" />
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/proximity.mp4?v=2#t=0.1"
          controls
          preload="metadata"
          playsInline
          className="project-video project-video--wide"
        />
        <img src="/photos/proximity1.jpg" alt="Proximity" className="project-photo" />
        <img src="/photos/proximity2.jpg" alt="Proximity" className="project-photo" />
        <img src="/photos/proximity3.jpg" alt="Proximity" className="project-photo" />
        <img src="/photos/proximity4.jpg" alt="Proximity" className="project-photo" />
      </div>

    </div>
  );
}

export default Visionaries;
