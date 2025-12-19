import React, { useEffect, useState } from 'react';

const SpacingControls = () => {
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);

  useEffect(() => {
    document.body.style.lineHeight = lineHeight;
    document.body.style.letterSpacing = `${letterSpacing}px`;
    document.body.style.wordSpacing = `${wordSpacing}px`;
  }, [lineHeight, letterSpacing, wordSpacing]);

  return (
    <div className="accessibility-panel">
      <label>Line Height:</label>
      <input type="range" min="1" max="3" step="0.1" value={lineHeight}
        onChange={(e) => setLineHeight(e.target.value)} />

      <label>Letter Spacing:</label>
      <input type="range" min="0" max="5" value={letterSpacing}
        onChange={(e) => setLetterSpacing(e.target.value)} />

      <label>Word Spacing:</label>
      <input type="range" min="0" max="10" value={wordSpacing}
        onChange={(e) => setWordSpacing(e.target.value)} />
    </div>
  );
};

export default SpacingControls;
