import './Project.css';

function EEGProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">The Mind Has No Straight Lines</p>
        <p className="project-meta">EEG, TouchDesigner</p>
        <p className="project-description">
          Chaotic mathematical systems shaped by the chaos of thought itself!
        </p>
        <p className="project-description">
          An EEG-data driven TouchDesigner installation that lets you abstractly visualize your brain waves when listening to your favorite song.
          Presented at the IMD 2026 capstone showcase at the University of Maryland, this work translates brain activity into generative form. Participants enter a room alone, fitted with an Emotiv EPOC X — a 14-channel wireless EEG headset — where the system samples alpha, beta, and theta wave power every three seconds and routes the values into TouchDesigner via OSC. These values then drive the parameters of strange attractors rendered in real time. The main visuals are built from Thomas and Lorenz attractors; the intro sequence uses a De Jong attractor. The isolation is intentional: it gives participants the intimate space to sit with their own thoughts.
        </p>
      </div>

      <div className="gallery">
        <div className="project-photo">
          <img src="/photos/eeg.jpg" alt="The Mind Has No Straight Lines" className="project-photo" />
        </div>
      </div>

    </div>
  );
}

export default EEGProject;
