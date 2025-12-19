import React from 'react';
import FontToggle from './FontToggle';
import SpacingControls from './SpacingControls';
import ContrastToggle from './ContrastToggle';


const AccessibilityBar = () => {
  return (
    <div className="accessibility-bar">
      <FontToggle />
      <SpacingControls />
      <ContrastToggle />
      
    </div>
  );
};

export default AccessibilityBar;
