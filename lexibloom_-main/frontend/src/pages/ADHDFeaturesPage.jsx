import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import TextToSpeech from '../components/TextToSpeech';
import EyeTracking from '../components/EyeTracking';
import FlashcardGenerator from '../components/FlashcardGenerator'; // ✅ Include this
import PomodoroContainer from '../components/PomodoroContainer';
import '../styles/features.css'; // Ensure this exists

const ADHDFeaturesPage = () => {
  return (
    <div className="adhd-mode dark">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>ADHD-Focused Tools</h1>
          <p>
            Stay engaged and reduce distractions with features designed for attention support.
          </p>
        </div>
      </section>

      {/* Text to Speech */}
      <section className="feature-section" id="text-to-speech">
        <div className="feature-header">
          <div className="feature-info">
            <h2>🔊 Text-to-Speech</h2>
            <p>
              Let LexiBloom read the text aloud for you! Upload or enter text and
              listen to it spoken clearly—ideal for users with attention or reading difficulties.
            </p>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-content">🔊</div>
          </div>
        </div>
        <TextToSpeech />
      </section>
      
      {/* Pomodoro Learner */}
<section className="feature-section" id="pomodoro-learner">
  <div className="feature-header">
    <div className="feature-info">
      <h2>Pomodoro Learner</h2>
      <p>
        Stay focused with ADHD-friendly Pomodoro learning sessions, integrated with a task list, streak tracker, and minimal mode.
      </p>
    </div>
    <div className="feature-visual">
      <div className="feature-visual-content">⏳</div>
    </div>
  </div>
  <PomodoroContainer />
</section>


      {/* Eye Tracking */}
      <section className="feature-section" id="eye-tracking">
        <div className="feature-header">
          <div className="feature-info">
            <h2>👁 Eye Tracking & Focus Detection</h2>
            <p>
              LexiBloom uses webcam-based eye-tracking to monitor focus and maintain attention during reading.
            </p>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-content">👁</div>
          </div>
        </div>
        <EyeTracking />
      </section>

      {/* Flashcard Generator */}
      <section className="feature-section" id="flashcards">
        <div className="feature-header">
          <div className="feature-info">
            <h2>🧠 Flashcard Generator</h2>
            <p>
              Enter a topic or paragraph and generate quick study flashcards to improve memory retention.
            </p>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-content">🃏</div>
          </div>
        </div>
        <FlashcardGenerator />
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ADHDFeaturesPage;
