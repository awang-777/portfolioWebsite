import './Project.css';

function Fox() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">Interactive Environment</p>
        <p className="project-meta">Collaborative 3D environment · Blender · Autodesk Maya · Unity · Procreate · Group of 2 · 2026</p>
        <p className="project-description">
          A collaborative first-person interactive environment built in Unity, where viewers can freely walk through and explore the scene using keyboard input. 3D assets were modeled and textured in Autodesk Maya and Blender, with 2D assets hand-painted in Procreate. The fox was rigged and animated in Blender, and player movement was scripted in C# within Unity.
        </p>
        <div className="project-description project-credits">
          <p><strong>Amanda Wang</strong>: 3D Modeling, Texturing, Rigging, Animation &amp; Scene Assembly<br />
          Fox house, fox, trees, fish, and fireflies</p>
          <p><strong>Christina Kwon</strong>: 2D Assets, 3D Modeling, Scripting &amp; Shading<br />
          Plants, cattails, lily pads, crystals, character movement in C#, and water shader</p>
        </div>
      </div>

      <div className="gallery">
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/fox.mp4?v=2"
          autoPlay
          loop
          muted
          playsInline
          className="project-video project-video--wide"
        />
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/foxHouse.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="project-video project-video--wide"
        />
      </div>

    </div>
  );
}

export default Fox;
