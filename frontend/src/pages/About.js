import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-body-wrapper">
        <img src="/photos/headshot.jpg" alt="Amanda Wang" className="about-headshot" />
        <div className="about-divider" />
        <div className="about-content">
        <p className="about-body">
          Amanda Wang is a new media artist and creative technologist based in Baltimore, Maryland. She holds a BA in Immersive Media Design with a minor in Sustainability Studies from the University of Maryland. She creates 3D and motion work in Blender, real-time generative systems in TouchDesigner, and immersive interactive installations. She also produces visuals for artists, musicians, and live events.
Her personal work often draws inspiration from the natural world. More of her sketches and experiments can be found on Instagram at @m3ii.22.
        </p>
        <p className="about-body">
          <a
            href="/AmandaWangResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            {/* Document icon, same line style as the Instagram icon on Contact */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="13" y2="17" />
            </svg>
            Resume
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}

export default About;
