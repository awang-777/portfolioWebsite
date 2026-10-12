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
        <figure className="project-figure">
          <img src="/photos/eeg.jpg" alt="The Mind Has No Straight Lines" className="project-photo" />
          <figcaption className="project-description project-caption">
            Alpha, beta, and theta wave values are normalized for easier mapping in TouchDesigner (pictured on the right corner)
          </figcaption>
        </figure>
        <figure className="project-figure">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/EEG.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <figcaption className="project-description project-caption">
            <p>The Lorenz attractor is a set of equations originally developed to model atmospheric convection. I chose it for its distinctive butterfly-like structure: two looping wings that form as points spiral around each other.</p>
            <p>dx/dt = σ(y − x)<br />
            dy/dt = x(ρ − z) − y<br />
            dz/dt = xy − βz</p>
            <p>I built the system in TouchDesigner using the POP family, with a feedback loop that feeds each point's position back through the equations every frame so the particles trace the attractor over time. Live EEG data updates every 3 seconds. The normalized alpha, beta, and theta waves (pictured above) are the values plugged into the equation.</p>
          </figcaption>
        </figure>
        <figure className="project-figure">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/EEG3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <figcaption className="project-description project-caption">
            <p>The Thomas attractor is a cyclically symmetric system of equations proposed by biologist René Thomas. I chose it for its spiraling structure, which reminds me of galaxies colliding.</p>
            <p>dx/dt = sin(y) − bx<br />
            dy/dt = sin(z) − by<br />
            dz/dt = sin(x) − bz</p>
            <p>This system in TouchDesigner follows the same logic above.</p>
          </figcaption>
        </figure>
      </div>

    </div>
  );
}

export default EEGProject;
