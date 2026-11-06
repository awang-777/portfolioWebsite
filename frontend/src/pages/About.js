import './About.css';

// Rendered as a section of the home page
function About() {
  return (
    <section id="about" className="about-section">
      <p className="home-label">about</p>

      <div className="about-text">
        <p className="about-bio">
          Amanda Wang is based in Baltimore, Maryland, and holds a BA in Immersive Media Design with a minor in Sustainability Studies from the University of Maryland, College Park. Working primarily in Blender and TouchDesigner, she draws inspiration from the natural world, often creating luminous, organic forms with a surreal quality.
        </p>

        <div className="about-links">
          <a href="/Resume.pdf?v=2" target="_blank" rel="noopener noreferrer" className="about-link">
            <span className="about-star">✦</span> resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
