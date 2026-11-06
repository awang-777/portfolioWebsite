import { Link, useOutletContext } from 'react-router-dom';
import Typewriter from '../components/Typewriter';
import About from './About';
import Contact from './Contact';
import './Home.css';

const PROJECTS = [
  { src: '/photos/hoang.png', title: 'sabai x hoang', path: '/projects/hoang', tag: 'tour visuals', year: 2026 },
  { src: '/photos/visionaries.jpg', title: 'proximity', path: '/projects/visionaries', tag: 'distance sensor interactive experience', year: 2026 },
  { src: '/photos/eeg3.jpg', title: 'the mind has no straight lines', path: '/projects/eeg', tag: 'bio-data interactive experience', year: 2026 },
  { src: '/photos/surreal.jpg', title: 'surreal landscape', path: '/projects/surreal-landscape', tag: '3d environment', year: 2026 },
  { src: 'https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/mocapCover.mp4', title: 'insomnia', path: '/projects/mocap', tag: 'motion capture', year: 2026 },
];

const INTRO =
  'new media artist and creative technologist making 3d, motion, and interactive work, ' +
  'from immersive experiences to visuals for artists and events.';

function Home() {
  const { revealed } = useOutletContext();

  return (
    <div className="home-page">
      <section className="home-intro">
        <Typewriter text={INTRO} start={revealed} className="home-intro-text" />
      </section>

      <section id="work" className="home-work">
        <p className="home-label">selected work</p>

        <div className="home-projects">
          {PROJECTS.map((p) => (
            <Link key={p.path} to={p.path} className="home-project-card">
              <div className="home-project-media">
                {p.src.endsWith('.mp4') ? (
                  <video src={p.src} autoPlay loop muted playsInline />
                ) : (
                  <img src={p.src} alt={p.title} />
                )}
              </div>
              <div className="home-project-caption">
                <span className="home-project-title">{p.title}</span>
                <span className="home-project-sub">{p.tag}, {p.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <About />
      <Contact />
    </div>
  );
}

export default Home;
