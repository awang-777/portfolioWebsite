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
      </div>
      </div>
    </div>
  );
}

export default About;
