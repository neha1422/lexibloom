import React, { useState, useEffect } from 'react';
import '../styles/LexiBloomTitle.css';

const LexiBloomTitle = ({ text = "Lexibloom", speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        const nextChar = text.charAt(index);
        index++;
        if (index > text.length) {
          clearInterval(interval);
        }
        return prev + nextChar;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="typewriter-container">
      <h1 className="typewriter-text">
        {displayedText}
        <span className="cursor">|</span>
      </h1>
    </div>
  );
};

export default LexiBloomTitle;