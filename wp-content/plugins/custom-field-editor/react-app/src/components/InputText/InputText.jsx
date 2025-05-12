import React, { useEffect, useRef } from 'react';
import './InputText.css';

const InputText = ({ title, description, value = '', onChangeImmediate, onChangeDebounced, onlyPositiveInteger = false }) => {
    const debounceRef = useRef(null);

    const handleChange = (e) => {
      let newValue = e.target.value;
  
      if (onlyPositiveInteger) {
        // Удаляем всё, кроме цифр
        newValue = newValue.replace(/[^0-9]/g, '');
      }
  
      onChangeImmediate?.(newValue);
  
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
  
      debounceRef.current = setTimeout(() => {
        onChangeDebounced?.(newValue);
      }, 2000);
    };
  
    useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);
  
    return (
      <div className="cfe-inputtest-block">
        <p className="cfe-inputtest-title">{title}</p>
        <input
          className="cfe-inputtest-input"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <p className="cfe-inputtest-description">{description}</p>
      </div>
    );
  };
  
  export default InputText;