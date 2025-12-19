// src/components/UploadAndFormat.jsx
import React, { useState } from 'react';
import FontToggle from './FontToggle';
import SpacingControls from './SpacingControls';
import ContrastToggle from './ContrastToggle';

const UploadAndFormat = () => {
  const [text, setText] = useState('');
  const [uploadedText, setUploadedText] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Replace with your OCR API call
      const extractedText = 'Sample extracted text from OCR'; // <- Replace with actual API call
      setUploadedText(extractedText);
    }
  };

  const handleTextInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="upload-format-container">
      <h2>Upload Image or Enter Text</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <textarea
        placeholder="Or paste your text here..."
        value={text}
        onChange={handleTextInput}
        rows="6"
        style={{ width: '100%', marginTop: '1rem' }}
      />

      <div style={{ marginTop: '1rem' }}>
        <FontToggle />
        <SpacingControls />
        <ContrastToggle />
      </div>

      <div className="formatted-preview">
        <h3>🧠 Formatted Output</h3>
        <div className="formatted-text">
          {uploadedText || text || 'Your formatted content will appear here...'}
        </div>
      </div>
    </div>
  );
};

export default UploadAndFormat;
