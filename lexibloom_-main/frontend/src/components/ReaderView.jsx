import React, { useState } from 'react';

const ReaderView = ({ children }) => {
  const [isReader, setIsReader] = useState(false);

  return (
    <div>
      <button className="accessibility-button" onClick={() => setIsReader(!isReader)}>
        {isReader ? 'Exit Reader Mode' : 'Enter Reader Mode'}
      </button>
      <div className={isReader ? 'reader-mode' : ''}>
        {children}
      </div>
    </div>
  );
};

export default ReaderView;

