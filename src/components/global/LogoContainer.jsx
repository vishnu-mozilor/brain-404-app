import React from 'react';
import logo from "../../assets/images/brain-404-logo.png"; // Import the logo

const LogoContainer = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Brain-404 Logo" className="logo p-0" />
    </div>
  );
};

export default LogoContainer; 