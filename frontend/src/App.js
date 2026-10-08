import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import GearsProject from './pages/projects/GearsProject';
import DragonflyProject from './pages/projects/DragonflyProject';
import EEGProject from './pages/projects/EEGProject';
import SurrealLandscapeProject from './pages/projects/SurrealLandscapeProject';
import Hoang from './pages/projects/Hoang';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/dragonfly" element={<DragonflyProject />} />
          <Route path="/projects/gears" element={<GearsProject />} />
          <Route path="/projects/eeg" element={<EEGProject />} />
          <Route path="/projects/surreal-landscape" element={<SurrealLandscapeProject />} />
          <Route path="/projects/hoang" element={<Hoang />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
