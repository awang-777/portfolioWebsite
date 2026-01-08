// ADD MORE ROUTES HERE AS NEEDED

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Project1 from './pages/projects/Project1';
import Project2 from './pages/projects/Project2';
import Project3 from './pages/projects/Project3';
import Project4 from './pages/projects/Project4';
import Experiments from './pages/Experiments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/project1" element={<Project1 />} />
        <Route path="/projects/project2" element={<Project2 />} />
        <Route path="/projects/project3" element={<Project3 />} />
        <Route path="/projects/project4" element={<Project4 />} />
        <Route path="/experiments" element={<Experiments />} />
      </Routes>
    </Router>
  );
}

export default App;
