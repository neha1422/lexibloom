import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import '../styles/features.css';
import OCRContainer from '../components/OCRContainer';
import EyeTracking from '../components/EyeTracking';
import TextToSpeech from '../components/TextToSpeech';

const FeaturesPage = () => {
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(1);
  const [wordSpacing, setWordSpacing] = useState(2);
  const [fontFamily, setFontFamily] = useState('Default');
  const [theme, setTheme] = useState('dark');

  const location = useLocation();

  useEffect(() => {
    const anchor = location.hash?.substring(1);
    if (anchor) {
      const section = document.getElementById(anchor);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('text')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a plain text (.txt) file.');
    }
  };

  const formattedStyle = {
    fontSize: `${fontSize}px`,
    lineHeight,
    letterSpacing: `${letterSpacing}px`,
    wordSpacing: `${wordSpacing}px`,
    fontFamily:
      fontFamily === 'Default'
        ? 'sans-serif'
        : fontFamily === 'OpenDyslexic'
        ? 'OpenDyslexic, sans-serif'
        : `${fontFamily}, sans-serif`,
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem',
  };

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Powerful Accessibility Features</h1>
          <p>
            Discover how Lexibloom's AI-powered tools transform digital content into accessible,
            engaging experiences.
          </p>
        </div>
      </section>

      <section className="features-nav">
        <div className="features-nav-container">
          <ul className="features-nav-list">
            <li><a href="#dyslexia-reader">Dyslexia Reader</a></li>
            <li>
              <a
                href='https://6d6ae154a718.ngrok-free.app/'
                target="_blank"
                rel="noopener noreferrer"
              >
                Text Simplifier
              </a>
            </li>
            <li><a href="#text-to-speech">Text-to-Speech</a></li>
            <li><a href="#ocr-technology">OCR Technology</a></li>
            <li><a href="#eye-tracking">Eye Tracking</a></li>
            <li><a href="#smart-adaptation">Smart Adaptation</a></li>
          </ul>
        </div>
      </section>

      <div className="features-container">
        <section className="feature-section" id="dyslexia-reader">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Dyslexia-Friendly Reader</h2>
              <p>
                A distraction-free, customizable reading interface for users with dyslexia.
                Adjust fonts, spacing, and contrast. Upload text files or paste content
                to personalize your reading experience.
              </p>
            </div>
            <div className="feature-visual">
              <div className="feature-visual-content">📚</div>
            </div>
          </div>

          <div className="dyslexia-tools-section">
            <h3 className="section-heading">📄 Upload File or Paste Text</h3>

            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              style={{ marginBottom: '10px' }}
            />

            <textarea
              rows="5"
              placeholder="Or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ width: '100%', borderRadius: '5px', padding: '10px' }}
            />

            <div className="tool-controls">
              <label><strong>Font Family:</strong>
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                  <option value="Default">Default (Sans-serif)</option>
                  <option value="OpenDyslexic">OpenDyslexic</option>
                  <option value="Arial">Arial</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </label>

              <label><strong>Font Size:</strong>
                <input
                  type="range"
                  min="14"
                  max="30"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
              </label>

              <label><strong>Line Height:</strong>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(e.target.value)}
                />
              </label>

              <label><strong>Letter Spacing:</strong>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(e.target.value)}
                />
              </label>

              <label><strong>Word Spacing:</strong>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={wordSpacing}
                  onChange={(e) => setWordSpacing(e.target.value)}
                />
              </label>
            </div>

            <div className="formatted-output-section">
              <h3>🧠 Formatted Output</h3>
              <div style={formattedStyle}>
                {inputText || 'Your formatted content will appear here...'}
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section" id="text-to-speech">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Text-to-Speech</h2>
              <p>
                Let LexiBloom read the text aloud for you! Upload or enter text and
                listen to it spoken clearly, helping users with reading difficulties or for convenience.
              </p>
            </div>
            <div className="feature-visual">
              <div className="feature-visual-content">🔊</div>
            </div>
          </div>
          <TextToSpeech />
        </section>

        <section className="feature-section" id="ocr-technology">
          <div className="feature-header">
            <div className="feature-info">
              <h2>OCR Technology</h2>
              <p>
                LexiBloom leverages advanced Optical Character Recognition (OCR) to extract text from images.
              </p>
            </div>
            <div className="feature-visual">
              <div className="feature-visual-content">📷</div>
            </div>
          </div>
          <OCRContainer />
        </section>

        <section className="feature-section" id="eye-tracking">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Eye Tracking & Focus Detection</h2>
              <p>
                LexiBloom uses camera-based eye-tracking to monitor your gaze and attention while reading.
              </p>
            </div>
          
            <div className="feature-visual">
              <div className="feature-visual-content">👁️</div>
            </div>
          </div>
          
          <EyeTracking />
        </section>
      </div>

      <CTASection />
      <Footer />
    </>
  );
};

export default FeaturesPage;
