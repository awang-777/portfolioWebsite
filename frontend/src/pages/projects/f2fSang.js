import './Project.css';

function F2fSang() {
  return (
    <div className="project-page">
      <div className="project-info">
        <p className="project-title">SANG — F2F Show </p>
        <p className="project-meta">Show Visuals · 2026 · TouchDesigner · Adobe After Effects · Blender</p>
        <p className="project-description">
          Rendered visuals for{' '}
          <a
            href="https://www.instagram.com/andrewsangha/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            SANG
          </a>
          's Face to Face show, commissioned by the artist. Two 8-foot holographic fans stand on opposite sides of the venue, projecting the red vs blue visuals at each other in a face-off across the crowd.
          <br />
          All assets are original except the Anubis character, a base model by{' '}
          <a
            href="https://www.cgtrader.com/3d-models/character/fantasy-character/anubis-5bce8c9b-9ce5-49b4-b692-bacf284f0b60"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            nurlyumitpa
          </a>{' '}
          used at the artist's request. All character animation is my own.
        </p>
      </div>

      <div className="gallery">
        <div className="project-row">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/redAnubis.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/redAnubisOG.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/blueAnubis.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/blueAnubisOG.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
        </div>
        <div className="project-row">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/welcome.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/fight.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/face.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
        </div>
        <div className="project-row">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/AnubisRedTD.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <img src="/photos/redAnubis.png" alt="Red Anubis" className="project-photo" />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/AnubisBlueTD.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <img src="/photos/blueAnubis.png" alt="Blue Anubis" className="project-photo" />
        </div>
        <div className="project-row">
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/orbit.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
          <video
            src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/bullseye.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          />
        </div>
      </div>

    </div>
  );
}

export default F2fSang;
