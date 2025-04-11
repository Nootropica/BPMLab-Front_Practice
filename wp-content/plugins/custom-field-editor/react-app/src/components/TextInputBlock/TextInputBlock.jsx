import React, { useState } from 'react';
import './TextInputBlock.css';

const TextInputBlock = ({ label, initialValue, onChange }) => {
    const [text, setText] = useState(initialValue);

    const handleChange = (e) => {
        setText(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="text-input-block">
            <label>{label}</label>
            <input 
                type="text" 
                value={text} 
                onChange={handleChange} 
            />
        </div>
    );
};

export default TextInputBlock;
