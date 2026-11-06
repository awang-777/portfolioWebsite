import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">
        amanda wang <span className="navbar-face" aria-hidden="true">𓁹‿𓁹</span>
      </Link>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/#work">work</Link></li>
          <li><Link to="/#about">about</Link></li>
          <li><Link to="/#contact">contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
