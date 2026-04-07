import './Project.css';

function EEGProject() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">The Mind Has No Straight Lines</p>
        <p className="project-meta">EEG, TouchDesigner</p>
        <p className="project-description">
          An EEG-data driven TouchDesigner installation that lets you abstractly visualize your brain waves when listening to your favorite song or music.
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
