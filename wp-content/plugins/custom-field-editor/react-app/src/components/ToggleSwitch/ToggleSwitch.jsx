import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ label = 'Активно', checked, onChange }) => {
  return (
    <div className="cfe-toggle-wrapper">
      <span className="cfe-toggle-label">{label}</span>
      <label className="cfe-toggle-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="cfe-toggle-slider" />
      </label>
    </div>
  );
};

export default ToggleSwitch;