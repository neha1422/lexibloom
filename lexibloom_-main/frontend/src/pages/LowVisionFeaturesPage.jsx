import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import '../styles/accessibility.css'; // Make sure the path is correct
import UploadText from '../components/UploadText';

const LowVisionFeaturesPage = () => {
  // Enable both modes on load
  const [enlargedText] = useState(true);
  const [highContrast] = useState(true);

  // Combine classes
  const combinedClass = `${enlargedText ? 'low-vision-mode' : ''} ${highContrast ? 'high-contrast' : ''}`;

  return (
    <div className="low-vision-page dark" style={{ minHeight: '100vh' }}>
      {/* ✅ Keep navbar untouched */}
      <Navbar />

      {/* ✅ Apply modes only to the main content area */}
      <main className={combinedClass} style={{ padding: '2rem' }}>
        <section className="hero">
          <div className="hero-content">
            <h1>Low Vision Support</h1>
            <h4>Read more comfortably with enlarged text and high contrast display.</h4>
          </div>
        </section>

        <div>
        <h2 style={{ textAlign: 'center' }}>Let's get started</h2>
          <UploadText />
        </div>

        <CTASection />
        <Footer />
      </main>

    </div>
  );
};

export default LowVisionFeaturesPage;