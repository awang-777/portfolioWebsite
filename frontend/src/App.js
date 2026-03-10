import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

import TapeProject from './pages/projects/TapeProject';
import GearsProject from './pages/projects/GearsProject';
import DragonflyProject from './pages/projects/DragonflyProject';
import CastleProject from './pages/projects/CastleProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/dragonfly" element={<DragonflyProject />} />
        <Route path="/projects/tape" element={<TapeProject />} />
        <Route path="/projects/gears" element={<GearsProject />} />
        <Route path="/projects/castle" element={<CastleProject />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
