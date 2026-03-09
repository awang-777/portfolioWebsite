import './Project.css';

function TapeProject() {
  return (
    <div className="project-page project-page--centered">
      <video
        src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/tape.mp4"
        controls
        className="project-video--tape"
      />
    </div>
  );
}

export default TapeProject;
