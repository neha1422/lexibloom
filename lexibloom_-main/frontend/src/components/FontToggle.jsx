import React, { useState, useEffect } from 'react';

const FontToggle = () => {
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'default');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '16');

  useEffect(() => {
    document.body.style.fontFamily =
      fontFamily === 'dyslexic' ? 'OpenDyslexic, sans-serif' : fontFamily;
    document.body.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontSize', fontSize);
  }, [fontFamily, fontSize]);

  return (
    <div className="accessibility-panel">
      <label>Font Family:</label>
      <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
        <option value="default">Default</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="dyslexic">OpenDyslexic</option>
      </select>

      <label>Font Size:</label>
      <input
        type="range"
        min="12"
        max="28"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
      />
    </div>
  );
};

export default FontToggle;
