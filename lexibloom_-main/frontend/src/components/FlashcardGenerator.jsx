import React, { useState } from 'react';
import '../styles/FlashcardGenerator.css';

const FlashcardGenerator = () => {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const generateFlashcards = () => {
    if (!text.trim()) {
      alert('Please enter some text.');
      return;
    }

    const sentences = text.match(/[^.!?]+[.!?]/g) || text.split('.');
    const top5 = sentences
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 5);

    const cards = top5.map((sentence, index) => {
      let question = '';

      const s = sentence.toLowerCase();

      if (s.includes('because')) {
        question = 'Why does this occur?';
      } else if (s.includes('uses') || s.includes('used')) {
        question = 'How is this used?';
      } else if (s.includes('helps') || s.includes('enables')) {
        question = 'What does this help with?';
      } else if (s.includes('causes') || s.includes('leads to')) {
        question = 'What is the consequence?';
      } else if (s.includes('also') || s.includes('in addition')) {
        question = 'What additional information is provided?';
      } else if (s.includes('is')) {
        question = 'What is being defined here?';
      } else {
        const starters = [
          'Can you summarize this?',
          'What concept is explained here?',
          'What is this sentence talking about?',
          'What can we learn from this?',
          'What does this describe?'
        ];
        question = starters[index % starters.length];
      }

      return {
        question: `Q${index + 1}: ${question}`,
        answer: sentence
      };
    });

    setFlashcards(cards);
  };

  return (
    <div className="flashcard-generator">
      <h2>Flashcard Generator</h2>
      <textarea
        rows="5"
        placeholder="Paste any paragraph here to generate flashcards..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={generateFlashcards}>Generate 3 Flashcards</button>

      <div className="flashcard-scroll-container">
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard">
            <h4>{card.question}</h4>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardGenerator;