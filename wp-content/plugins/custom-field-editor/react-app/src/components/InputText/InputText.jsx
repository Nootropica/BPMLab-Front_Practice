/**
 * ============================================================================
 *  InputText.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Поле ввода с заголовком и подписью + опциональный дебаунс-callback.
 *
 *  Пропы:
 *    title                : string   – заголовок над инпутом
 *    description?         : string   – мелкий текст-подсказка под полем
 *    value                : string   – текущее значение (controlled!)
 *
 *    onChangeImmediate?   : fn(val)  – вызывается на каждом onChange
 *    onChangeDebounced?   : fn(val)  – вызывается через 2 сек. после
 *                                      последнего ввода (debounce 2 000 ms)
 *
 *    onlyPositiveInteger  : boolean  – true → пропускаем лишь цифры 0-9
 *
 *  Внутри хранится только ref-таймер для дебаунса.
 *  Компонент «чистый»: состояние значения контролируется родителем.
 * ============================================================================
 */

import React, { useEffect, useRef } from 'react';
import './InputText.css';

const InputText = ({ title, description, value = '', onChangeImmediate, onChangeDebounced, onlyPositiveInteger = false }) => {
  /* ref → id таймера для debounce */  
  const debounceRef = useRef(null);

   /* ───────── обработчик ввода ───────── */
  const handleChange = (e) => {
    let newValue = e.target.value;

    /*  опция «только положительное целое»  */
    if (onlyPositiveInteger) {
      newValue = newValue.replace(/[^0-9]/g, '');
    }

    onChangeImmediate?.(newValue); // мгновенный callback

    /*  перезапускаем debounce-таймер  */
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChangeDebounced?.(newValue); // «ленивый» callback
    }, 2000);
  };

  /* ───────── очистка таймера на unmount ───────── */
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  /* ───────── render ───────── */
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