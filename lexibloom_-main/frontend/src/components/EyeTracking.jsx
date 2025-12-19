import React, { useState, useEffect, useRef } from 'react';
import '../styles/features.css'; 

function EyeTracking() {
  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState({ x: null, y: null });
  const [focusLost, setFocusLost] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedText, setUploadedText] = useState('');
  const [currentWord, setCurrentWord] = useState('--');
  const intervalRef = useRef(null);
  const lastSeenRef = useRef(Date.now());
  const readingBoxRef = useRef(null);

  const screenBounds = {
    xMin: window.innerWidth * 0.1,
    xMax: window.innerWidth * 0.9,
    yMin: window.innerHeight * 0.1,
    yMax: window.innerHeight * 0.9,
  };

  const startTracking = async () => {
    try {
      if (window.webgazer) {
        await window.webgazer.setRegression('ridge')
          .setGazeListener((data) => {
            if (data) {
              const x = Math.round(data.x);
              const y = Math.round(data.y);
              setCoords({ x, y });

              const insideScreen =
                x > screenBounds.xMin &&
                x < screenBounds.xMax &&
                y > screenBounds.yMin &&
                y < screenBounds.yMax;

              if (insideScreen) {
                lastSeenRef.current = Date.now();
                setFocusLost(false);
              }

              if (readingBoxRef.current) {
                const elements = readingBoxRef.current.querySelectorAll('span[data-word]');
                elements.forEach(el => {
                  const rect = el.getBoundingClientRect();
                  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    setCurrentWord(el.innerText);
                  }
                });
              }
            }
          });

        await window.webgazer.begin();
        window.webgazer.showVideoPreview(true);
        window.webgazer.showPredictionPoints(true);
        window.webgazer.showFaceOverlay(true);
        setTracking(true);

        intervalRef.current = setInterval(async () => {
          const prediction = await window.webgazer.getCurrentPrediction();
          const gazeLost = !prediction;
          const tooLong = Date.now() - lastSeenRef.current > 4000;

          if (gazeLost || tooLong) {
            setFocusLost(true);
            setShowPopup(true);
          }
        }, 1000);
      }
    } catch (err) {
      console.error('WebGazer start failed:', err);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFocusLost(false);
    lastSeenRef.current = Date.now();
  };

  const stopTracking = () => {
    clearInterval(intervalRef.current);

    ['webgazerVideoFeed', 'webgazerFaceOverlay', 'webgazerFaceFeedback'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.remove) el.remove();
    });

    if (window.webgazer) {
      try {
        window.webgazer.clearGazeListener();
        window.webgazer.pause();
        window.webgazer.end();
      } catch (error) {
        console.warn("webgazer.end() error:", error.message);
      }
    }

    const leftoverVideo = document.querySelector('video');
    if (leftoverVideo && leftoverVideo.srcObject) {
      leftoverVideo.srcObject.getTracks().forEach(track => track.stop());
      leftoverVideo.remove();
    }

    setCoords({ x: null, y: null });
    setFocusLost(false);
    setTracking(false);
    setCurrentWord('--');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => setUploadedText(reader.result);
      reader.readAsText(file);
    }
  };

  const renderReadingText = () => {
    return uploadedText.split(/\s+/).map((word, i) => (
      <span key={i} data-word style={{ marginRight: '0.3rem' }}>{word} </span>
    ));
  };

  useEffect(() => {
    return () => stopTracking();
  }, []);

  return (  <div className="eye-tracking-container">
      <label className="upload-label">
        📘 Upload Text File:
        <input type="file" accept=".txt" onChange={handleFileUpload} />
      </label>
     

      {uploadedText && (
        <div className="reading-box" ref={readingBoxRef}>
          {renderReadingText()}
        </div>
      )} 

      <h3>Eye Tracking & Focus Detection</h3>
      <p>Click start to begin webcam-based attention tracking.</p>

      <div className="eye-tracking-buttons">
        {!tracking ? (
          <button className="start-btn" onClick={startTracking}>▶️ Start Eye Tracking</button>
        ) : (
          <button className="stop-btn" onClick={stopTracking}>⏹️ Stop Eye Tracking</button>
        )}
      </div>

      {tracking && (
        <div className="tracking-info">
          <p><strong>Currently reading:</strong> {currentWord}</p>
          {focusLost && <p className="focus-lost">⚠️ Focus Lost!</p>}
        </div>
      )}

      {showPopup && (
        <div className="focus-popup">
          <div className="popup-content">
            <h2>👁️ Hey! We noticed you lost focus…</h2>
            <p>
              Want help with this section? You can simplify it, listen to it, or just take a moment and come back when you're ready.
            </p>
            <button onClick={handleClosePopup}>✅ I’m back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EyeTracking;
