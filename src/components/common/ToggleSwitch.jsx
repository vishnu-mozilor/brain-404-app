import React, { useState } from 'react';
import '../../assets/css/ToggleSwitch.css'; // Create a CSS file for styling

const ToggleSwitch = ({ label, onToggle }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onToggle(!isToggled);
  };

  return (
    <div className="toggle-switch">
      <label>
        {label}
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch; 