import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png.jpeg';
import '../styles/home.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'dark'
  );

  const [mode, setMode] = useState(() => {
    const path = location.pathname;
    if (path.includes('adhd')) return 'adhd';
    if (path.includes('low-vision')) return 'low-vision';
    if (path.includes('features')) return 'dyslexia';
    return null; // 🏠 homepage
  });


  useEffect(() => {
    // Set theme class on <body>
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('adhd')) {
      setMode('adhd');
      localStorage.setItem('mode', 'adhd');
    } else if (path.includes('low-vision')) {
      setMode('low-vision');
      localStorage.setItem('mode', 'low-vision');
    } else if (path.includes('features')) {
      setMode('dyslexia');
      localStorage.setItem('mode', 'dyslexia');
    } else {
      setMode(null);
      localStorage.removeItem('mode');
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/home') {
      navigate('/home');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getFeaturesPath = () => {
    if (mode === 'adhd') return '/adhd-features';
    if (mode === 'low-vision') return '/low-vision-features';
    return '/features';
  };

 const handleStartKeyboard = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://127.0.0.1:5000/start-keyboard");
    const data = await response.json();
    if (data.status === "success") {
      alert(data.message);
    } else {
      alert("Failed to start keyboard");
    }
  } catch (error) {
    console.error(error);
    alert("Error connecting to backend");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    return () => {
      if (toggle && navLinks) {
        toggle.removeEventListener('click', () => {
          navLinks.classList.toggle('active');
        });
      }
    };
  }, []);

  const renderModeIndicator = () => {
    switch (mode) {
      case 'adhd':
        return '🧠 ADHD Mode';
      case 'low-vision':
        return '👓 Low Vision Mode';
      case 'dyslexia':
        return '📘 Dyslexia Mode';
      default:
        return '';
    }
  };

  return (
    <nav id="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <img src={logoIcon} alt="Lexibloom logo" className="logo-img" />
          <Link to="/" className="logo">Lexibloom</Link>
        </div>

        <ul className="nav-links" id="navLinks">
          <li><Link to="/home">Home</Link></li>
          <li><button className="link-btn" onClick={() => scrollToSection('mode-selector')}>Modes</button></li>
          <li><button className="link-btn" onClick={() => scrollToSection('about')}>About</button></li>
          <li><button className="link-btn" onClick={() => scrollToSection('contact')}>Contact</button></li>
         <li>
            <button
              className="link-btn"
              onClick={handleStartKeyboard}
              disabled={loading}
              style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginLeft: '8px'
              }}
            >
              {loading ? 'Starting...' : 'Start Keyboard'}
            </button>
          </li>
         <li>

            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </li>
          {mode && (
            <li className="mode-indicator">{renderModeIndicator()}</li>
          )}
        </ul>

        <button className="menu-toggle" id="menuToggle">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;