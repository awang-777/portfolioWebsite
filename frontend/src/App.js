import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

import EEGProject from './pages/projects/EEGProject';
import SurrealLandscapeProject from './pages/projects/SurrealLandscapeProject';
import Hoang from './pages/projects/Hoang';
import MocapFinal from './pages/projects/mocapFinal';
import Fox from './pages/projects/fox';
import F2fSang from './pages/projects/f2fSang';
import Visionaries from './pages/projects/visionaries';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/eeg" element={<EEGProject />} />
          <Route path="/projects/surreal-landscape" element={<SurrealLandscapeProject />} />
          <Route path="/projects/hoang" element={<Hoang />} />
          <Route path="/projects/mocap" element={<MocapFinal />} />
          <Route path="/projects/fox" element={<Fox />} />
          <Route path="/projects/f2f-sang" element={<F2fSang />} />
          <Route path="/projects/visionaries" element={<Visionaries />} />
          {/* About and contact are sections of the home page; keep the old links working */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
