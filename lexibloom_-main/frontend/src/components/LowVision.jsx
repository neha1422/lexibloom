import React, { useState } from 'react';
import '../styles/accessibility.css'; // make sure path is correct

function LowVisionMode() {
  const [lowVision, setLowVision] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Combine both modes into one CSS class string
  const combinedClass = `${lowVision ? 'low-vision-mode' : ''} ${highContrast ? 'high-contrast' : ''}`;

  return (
    <div className={combinedClass} style={{ minHeight: '100vh', padding: '1rem' }}>
      <h2>👓 Low Vision Mode</h2>

      <button onClick={() => setLowVision(!lowVision)} style={{ marginRight: '1rem' }}>
        {lowVision ? '🔎 Normal Size' : '🔎 Enlarge Text & UI'}
      </button>

      <button onClick={() => setHighContrast(!highContrast)}>
        {highContrast ? '🌗 Normal Contrast' : '🌗 High Contrast Mode'}
      </button>

      <p style={{ marginTop: '2rem' }}>
        This text will appear larger and more visible when Low Vision Mode and High Contrast are turned on.
      </p>
    </div>
  );
}

export default LowVisionMode;
