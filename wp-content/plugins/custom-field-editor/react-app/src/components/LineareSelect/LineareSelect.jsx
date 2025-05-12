import React from 'react';
import './LineareSelect.css';

const LineareSelect = ({ title, value = [], activeValue, onChange }) => {
  return (
    <div className="cfe-lineare-select-block">
      <p className="cfe-lineare-select-title">{title}</p>
      <div className="cfe-lineare-select-options">
        {value.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === value.length - 1;
          const activeClass = activeValue === option.value ? 'active' : '';
          const firstClass = isFirst ? 'first' : '';
          const lastClass = isLast ? 'last' : '';

          return (
            <button
              key={option.value}
              className={`cfe-lineare-select-button ${activeClass} ${firstClass} ${lastClass}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LineareSelect;
