import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Projects.css';

// ── Config ──────────────────────────────────────────────────────────────────

const HIGHLIGHT_PROJECTS = [
  { video: 'https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/eeg.mp4', alt: 'EEG', title: 'The Mind Has No Straight Lines', path: '/projects/eeg' },
];

const SECTION_CATEGORIES = [
  {
    label: '3D Enviornments and Objects',
    projects: [
      { src: '/photos/templeinthesky.JPG', alt: 'Castle', path: '/projects/castle' },
      { src: '/photos/tape.png',   alt: 'Tape',   path: '/projects/tape' },
    ],
  },
  {
    label: 'Body as Interface',
    projects: [
      { src: '/photos/gears.png',      alt: 'Gears',     path: '/projects/gears' },
      { src: '/photos/dragonfly1.png', alt: 'Dragonfly', path: '/projects/dragonfly' },
    ],
  },
  {
    label: 'Live Visuals & Performance',
    projects: [],
  },
];

// ── Component ────────────────────────────────────────────────────────────────

function Projects() {
  const navigate = useNavigate();
  const [highlightIndex, setHighlightIndex] = useState(0);

  const current = HIGHLIGHT_PROJECTS[highlightIndex];

  return (
    <div className="projects-page">

      {/* highlight section */}
      <div className="projects-highlight">
        <div className="highlight-content">
          {current.video ? (
            <video
              key={current.video}
              src={current.video}
              className="highlight-image"
              onClick={() => navigate(current.path)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              className="highlight-image"
              onClick={() => navigate(current.path)}
            />
          )}
          <div className="highlight-info">
            <h2 className="highlight-title">{current.title}</h2>
            <p className="highlight-desc">An EEG-data driven Touchdesigner installation that lets you abstractly visualize your brain waves when listening to your favorite song/music.</p>
          </div>
          <div className="highlight-dots">
            {HIGHLIGHT_PROJECTS.map((_, i) => (
              <button
                key={i}
                className={`highlight-dot${i === highlightIndex ? ' active' : ''}`}
                onClick={() => setHighlightIndex(i)}
                aria-label={`Show ${HIGHLIGHT_PROJECTS[i].title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* category sections */}
      {SECTION_CATEGORIES.map((section) => (
        <div key={section.label} className="projects-section">
          <h3 className="section-label">{section.label}</h3>
          <div className="section-grid">
            {section.projects.map((p) => (
              <div
                key={p.path}
                className="project-card"
                onClick={() => navigate(p.path)}
              >
                <img src={p.src} alt={p.alt} />
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}

export default Projects;
