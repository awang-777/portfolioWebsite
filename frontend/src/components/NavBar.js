import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        <span className="navbar-title">Amanda Wang</span>
        <span className="navbar-subtitle">Multimedia Artist | Creative Technologist</span>
      </div>
      <div className="navbar-links">
        <span className="navbar-link" onClick={() => navigate('/about')}>About</span>
        <span className="navbar-link" onClick={() => navigate('/contact')}>Contact</span>
      </div>
    </nav>
  );
}

export default NavBar;
