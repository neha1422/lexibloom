import React, { useState, useEffect } from 'react';
import '../styles/TextReader.css'; // style it here

const TextReader = ({ lines }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const speakLine = () => {
    const utterance = new SpeechSynthesisUtterance(lines[currentIndex]);
    window.speechSynthesis.speak(utterance);
  };

  const nextLine = () => {
    if (currentIndex < lines.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const prevLine = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="reader-container">
      <div className="text-lines">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`line ${idx === currentIndex ? 'active-line' : 'blurred-line'}`}
          >
            {line}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={prevLine} disabled={currentIndex === 0}>🔁 Back</button>
        <button onClick={speakLine}>▶️ Speak</button>
        <button onClick={nextLine} disabled={currentIndex === lines.length - 1}>⏭️ Next</button>
      </div>
    </div>
  );
};

export default TextReader;