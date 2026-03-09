import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Projects.css';

const categories = ['All', 'Generative', 'Interactive', '3D'];

const projects = [
  { src: '/photos/dragonfly1.png', alt: 'Dragonfly', path: '/projects/dragonfly' },
  { src: '/photos/tape.png', alt: 'Tape', path: '/projects/tape' },
  { src: '/photos/gears.png', alt: 'Gears', path: '/projects/gears' },
];

function Projects() {
  const navigate = useNavigate();
  const [active, setActive] = useState('All');

  return (
    <div className="projects-page">
      {/* Category bar */}
      <div className="projects-category-bar">
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setActive(cat)}
            className={`category-item${active === cat ? ' active' : ''}`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="projects-grid">
        {projects.map((p) => (
          <div
            key={p.path}
            onClick={() => navigate(p.path)}
            className="project-card"
            onMouseEnter={e => e.currentTarget.querySelector('img').style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.opacity = '1'}
          >
            <img src={p.src} alt={p.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
