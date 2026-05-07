import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-body-wrapper">
        <img src="/photos/headshot.jpg" alt="Amanda Wang" className="about-headshot" />
        <div className="about-divider" />
        <div className="about-content">
        <p className="about-body">
          Amanda Wang is a multimedia artist interested in the space between the subconscious and the natural world. She works in 3D, real-time environments, and interactive systems — building surreal worlds you can step into. She studies Immersive Media Design and Sustainability Studies at the University of Maryland.
        </p>
      </div>
      </div>
    </div>
  );
}

export default About;
