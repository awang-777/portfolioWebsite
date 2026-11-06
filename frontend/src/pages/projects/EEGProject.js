import './Project.css';

function EEGProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">The Mind Has No Straight Lines</p>
        <p className="project-meta">EEG · TouchDesigner · 2026</p>
        <p className="project-description">
          Chaotic mathematical systems shaped by the chaos of thought itself!
        </p>
        <p className="project-description">
          An EEG-data driven TouchDesigner installation that lets you abstractly visualize your brain waves when listening to your favorite song.
          Presented at the IMD 2026 capstone showcase at the University of Maryland, this work translates brain activity into generative form. Participants enter a room alone, fitted with an Emotiv EPOC X — a 14-channel wireless EEG headset — where the system samples alpha, beta, and theta wave power every three seconds and routes the values into TouchDesigner via OSC. These values then drive the parameters of strange attractors rendered in real time. The main visuals are built from Thomas and Lorenz attractors; the intro sequence uses a De Jong attractor. 
        </p>
        <p className="project-description">
          <a
            href="https://docs.google.com/document/d/1nw6Xr_PFXYzcpIaI3y05Ig-SejTZFhNSQBq3BaU-h3E/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            click here for more project info
          </a>
        </p>
      </div>

      <div className="gallery">
        <figure className="project-figure">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/EEGInterview.mp4"
            controls
            className="project-video"
          />
          <figcaption className="project-description project-caption">
            A special thank you to <strong>Seth Johnson</strong> for capturing and editing this look into my work
          </figcaption>
        </figure>
        <div className="project-photo project-photo--zoom">
          <img src="/photos/eeg.jpg" alt="The Mind Has No Straight Lines" className="project-photo" />
        </div>
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/EEG.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="project-video"
        />
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/EEG3.mp4"
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

export default EEGProject;
