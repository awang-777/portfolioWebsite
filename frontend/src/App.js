import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import TapeProject from './pages/projects/TapeProject';
import GearsProject from './pages/projects/GearsProject';
import DragonflyProject from './pages/projects/DragonflyProject';
import CastleProject from './pages/projects/CastleProject';
import EEGProject from './pages/projects/EEGProject';
import SurrealLandscapeProject from './pages/projects/SurrealLandscapeProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/dragonfly" element={<DragonflyProject />} />
          <Route path="/projects/tape" element={<TapeProject />} />
          <Route path="/projects/gears" element={<GearsProject />} />
          <Route path="/projects/castle" element={<CastleProject />} />
          <Route path="/projects/eeg" element={<EEGProject />} />
          <Route path="/projects/surreal-landscape" element={<SurrealLandscapeProject />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
