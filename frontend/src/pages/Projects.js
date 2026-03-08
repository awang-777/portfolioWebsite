import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const categories = ['All', 'Generative', 'Interactive', '3D'];

const projects = [
  { src: '/photos/tape.png', alt: 'Tape', path: '/projects/tape' },
  { src: '/photos/gears.png', alt: 'Gears', path: '/projects/gears' },
];

function Projects() {
  const navigate = useNavigate();
  const [active, setActive] = useState('All');

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      border: '1px solid #d0d0cc',
      boxSizing: 'border-box',
    }}>
      {/* Category bar */}
      <div style={{
        display: 'flex',
        gap: 'clamp(16px, 3vw, 32px)',
        padding: 'clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px)',
        borderBottom: '1px solid #d0d0cc',
        fontFamily: 'Georgia, serif',
        fontSize: 'clamp(11px, 1.4vw, 13px)',
        letterSpacing: '0.1em',
        flexWrap: 'wrap',
      }}>
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              cursor: 'pointer',
              color: active === cat ? '#1a1a1a' : '#999999',
              borderBottom: active === cat ? '1px solid #1a1a1a' : '1px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.2s ease',
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '0',
      }}
        className="projects-grid"
      >
        {projects.map((p) => (
          <div
            key={p.path}
            onClick={() => navigate(p.path)}
            style={{
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: '#e8e8e4',
              borderBottom: '1px solid #d0d0cc',
            }}
            onMouseEnter={e => e.currentTarget.querySelector('img').style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.opacity = '1'}
          >
            <img
              src={p.src}
              alt={p.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.25s ease',
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

export default Projects;
