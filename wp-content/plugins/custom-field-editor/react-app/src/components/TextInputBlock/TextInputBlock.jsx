/**
 * ============================================================================
 *  TextInputBlock.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Универсальный «лейбл + текстовый инпут» в одну строку.
 *
 *  Пропы:
 *    label        : string   – подпись слева от поля
 *    initialValue : string   – стартовое значение
 *    onChange?    : function – (val:string) => void  — callback при изменении
 *
 *  Компонент хранит своё локальное состояние (`text`) и считается
 *  «controlled-inside». Родитель получает изменения только через onChange.
 *  Если нужно полностью контролировать значение снаружи — вместо `initialValue`
 *  передайте `value` и обрабатывайте onChange на верхнем уровне.
 * ============================================================================
 */

import React, { useState } from 'react';
import './TextInputBlock.css';

const TextInputBlock = ({ label, initialValue, onChange }) => {
    /* локальное состояние поля */
    const [text, setText] = useState(initialValue);

    /* при вводе текста обновляем state + прокидываем наверх */
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
