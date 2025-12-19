import React, { useEffect, useState } from 'react';

const ContrastToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');

  useEffect(() => {
    document.body.classList.remove('theme-default', 'theme-dark', 'theme-contrast');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="accessibility-panel">
      <label>Theme:</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="contrast">High Contrast</option>
      </select>
    </div>
  );
};

export default ContrastToggle;
