import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import FeaturesPage from './pages/Features';
import ADHDFeaturesPage from './pages/ADHDFeaturesPage';
import LowVisionFeaturesPage from './pages/LowVisionFeaturesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/features" element={<FeaturesPage />} /> {/* Dyslexia Mode */}
        <Route path="/adhd" element={<ADHDFeaturesPage />} />
        <Route path="/adhd-features" element={<ADHDFeaturesPage />} /> {/* Optional alias */}
        <Route path="/low-vision" element={<LowVisionFeaturesPage />} />
        <Route path="/low-vision-features" element={<LowVisionFeaturesPage />} /> {/* Optional alias */}
      </Routes>
    </Router>
  );
}

export default App;

