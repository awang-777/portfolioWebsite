import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProjects = location.pathname === '/projects';

  return (
    <nav className="navbar" style={isProjects ? { backgroundColor: '#ffffff' } : undefined}>
      <span className="navbar-title" onClick={() => navigate('/')}>Amanda Wang</span>
      <div className="navbar-links">
        <span className="navbar-link" onClick={() => navigate('/projects')}>Projects</span>
        <span className="navbar-link" onClick={() => navigate('/about')}>About</span>
        <span className="navbar-link" onClick={() => navigate('/contact')}>Contact</span>
      </div>
    </nav>
  );
}

export default NavBar;
