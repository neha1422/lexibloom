import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection';
import LexiBloomTitle from '../components/LexiBloomTitle';
import logo from '../assets/logo.png.jpeg';
const cardStyle = (borderColor) => ({
  flex: '1 1 300px',
  padding: '2rem',
  borderRadius: '16px',
  backgroundColor: '#1f2937',
  color: '#fff',
  textAlign: 'center',
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25)',
  borderLeft: `6px solid ${borderColor}`,
  transition: 'transform 0.3s',
});

const cardHeadingStyle = {
  fontSize: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: '600',
};

const HomePage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.add('dark');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
        });
      });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });

    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
      });
      button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('active');
      }
    });

    document.querySelectorAll('a, button').forEach(element => {
      element.addEventListener('focus', function () {
        this.style.outline = '2px solid #60a5fa';
        this.style.outlineOffset = '2px';
      });
      element.addEventListener('blur', function () {
        this.style.outline = 'none';
      });
    });
  }, []);

  return (
    <div className={theme}>
      <Navbar />

<section className="hero" id="home">
  <div className="hero-content">
    <LexiBloomTitle />
    <p>
      Empowering digital accessibility with AI-powered tools that make content readable,
      understandable, and engaging for everyone.
    </p>
    
  </div>
</section>


<section className="mode-selector" id="mode-selector" style={{ marginTop: '5rem', textAlign: 'center' }}>
  <h2 style={{
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#ffffff'
  }}>
    Choose Your Accessibility Mode
  </h2>
  <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: '#d1d5db' }}>
    Select the mode that best fits your needs to explore personalized tools and features.
  </p>

  <div className="mode-grid" style={{
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0 1rem'
  }}>
    <Link to="/features" className="mode-card dyslexia" style={cardStyle('#3b82f6')}>
      <h3 style={cardHeadingStyle}> Dyslexia Mode</h3>
      <p>Customized fonts, spacing, and text-to-speech for easier reading.</p>
    </Link>

    <Link to="/adhd-features" className="mode-card adhd" style={cardStyle('#facc15')}>
      <h3 style={cardHeadingStyle}> ADHD Mode</h3>
      <p>Focus tools, distraction minimizers, and guided reading support.</p>
    </Link>

    <Link to="/low-vision-features" className="mode-card low-vision" style={cardStyle('#10b981')}>
      <h3 style={cardHeadingStyle}> Low Vision Mode</h3>
      <p>High contrast themes, zoom, and screen reader optimizations.</p>
    </Link>
  </div>
</section>

    <section className="features" id="features">
  <h2>Accessibility Features</h2>
  <div className="features-grid">
    <Link to="/features#dyslexia-friendly-reader">
      <FeatureCard icon="👁️" title="Dyslexia-Friendly Reader" desc="Specially designed reading interface with customizable fonts, spacing, and colors." />
    </Link>

    <a href="https://6d6ae154a718.ngrok-free.app/" target="_blank" rel="noopener noreferrer">
      <FeatureCard icon="✨" title="Text Simplifier" desc="AI-powered text simplification that breaks down complex sentences." />
    </a>

    <Link to="/features#text-to-speech">
      <FeatureCard icon="🔊" title="Text-to-Speech" desc="Natural-sounding voice synthesis that reads aloud with adjustable speed." />
    </Link>

    <Link to="/features#ocr-technology">
      <FeatureCard icon="📷" title="OCR Technology" desc="Advanced OCR extracts text from images and printed material." />
    </Link>

    <Link to="/features#eye-tracking">
      <FeatureCard icon="👀" title="Eye-Tracking" desc="Monitors focus and suggests simplification based on user engagement." />
    </Link>

    <Link to="/features#smart-adaptation">
      <FeatureCard icon="🎯" title="Smart Adaptation" desc="Content adapts layout based on your reading patterns and needs." />
    </Link>

    <Link to="/low-vision">
  <FeatureCard icon="🕶️" title="Low Vision Support" desc="Enlarged text and high contrast mode to reduce visual strain." />
</Link>


    <Link to="/adhd#flashcards">
      <FeatureCard icon="🧠" title="Flashcard Generator" desc="Create flashcards from any paragraph or topic to boost memory retention." />
    </Link>

    <Link to="/adhd#pomodoro-learner">
  <FeatureCard icon="⏲️" title="Pomodoro Learner" desc="ADHD-friendly learning sessions with streak tracker and focus tools." />
</Link>

  </div>
</section>


      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2>About Us</h2>
            <p>LexiBloom is an AI-powered accessibility platform designed to support differently abled users by tailoring the digital experience to their unique cognitive and visual needs.</p>
<p>With dedicated modes for Dyslexia, ADHD, Low Vision, and Cognitive Disabilities, LexiBloom offers a personalized toolkit that includes features like a dyslexia-friendly reader, intelligent text simplification, text-to-speech, OCR, visual focus aids (blurring, eye-tracking), high-contrast low vision mode, flashcard-based revision, and Pomodoro timers for focused learning sessions. Our mission is to make digital content more readable, understandable, and engaging for everyone.</p>

          </div>
          <div className="about-visual">
            <div className="about-visual-content">
              <img src={logo} alt="Lexibloom Logo" className="about-logo" />
            </div>
          </div>
        </div>
      </section>

 <div className="feature-benefits">
  <h3>Benefits for Cognitive and Dyslexic Users</h3>
  <div className="benefits-grid">
    <div className="benefit-item">
      📚
      <h4>Accessible Text Formats</h4>
      <p>Custom fonts, spacing, and high-contrast layouts enhance readability for all users.</p>
    </div>
    <div className="benefit-item">
      🧠
      <h4>Smart Simplification</h4>
      <p>AI reduces language complexity to support better comprehension and retention.</p>
    </div>
    <div className="benefit-item">
      🗣️
      <h4>Text-to-Speech Support</h4>
      <p>Natural-sounding voice playback boosts fluency and assists users with decoding difficulties.</p>
    </div>
    <div className="benefit-item">
      👁️‍🗨️
      <h4>Visual Focus Enhancements</h4>
      <p>Blurring, highlighting, and eye-tracking minimize distractions and direct attention effectively.</p>
    </div>
    <div className="benefit-item">
      🧩
      <h4>Interactive Learning Tools</h4>
      <p>Flashcards and Pomodoro sessions improve focus, memory, and productivity through structured learning.</p>
    </div>
  </div>
</div>

      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
