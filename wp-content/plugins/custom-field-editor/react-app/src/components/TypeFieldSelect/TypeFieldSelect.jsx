/**
 * ============================================================================
 *  TypeFieldSelect.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Дроп-даун «Тип поля» с кастомным оформлением.
 *
 *  Как работает:
 *    •  Отображает текущий `activeValue` (иконка + подпись).
 *    •  По клику раскрывает список допустимых `fields`.
 *    •  При выборе → вызов колбэка `onChange(value)` и закрытие списка.
 *    •  Клик вне компонента закрывает выпадашку (useEffect + mousedown).
 *
 *  Пропы:
 *    activeValue : string   – выбранный тип ('text' / 'number' / …)
 *    onChange    : function – (value) => void
 *
 *  NB: пока в массиве `fields` оставлен только 'text'. Раскомментируйте
 *      остальные типы, когда появится логика работы с ними.
 * ============================================================================
 */

import React, { useState, useRef, useEffect } from 'react';
import IconTextType from './IconTextType';
import './TypeFieldSelect.css';

/*  Справочник возможных типов поля  */
const fields = ['text']; // ['text', 'number', 'image', 'file'] – будущие варианты

const TypeFieldSelect = ({ activeValue, onChange }) => {
  /* ───────── локальное состояние ───────── */
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  /* =========================================================================
   * 1.  КЛИК ВНЕ  →  ЗАКРЫВАЕМ ДРОП-ДАУН
   * ====================================================================== */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* =========================================================================
   * 2.  R E N D E R
   * ====================================================================== */
  return (
    <>
      <p className="cfe-typefieldselect-title">Тип поля</p>
      <div className="custom-select-wrapper" ref={selectRef}>

        {/* ───────── текущий выбранный элемент ───────── */}
        <div className="custom-select-selected" onClick={() => setOpen(!open)}>
          <div className="icon-wrapper">
            <IconTextType value={activeValue} iconSize={26}/>
          </div>
          {/* стрелочка */}
          <svg
            className={`custom-select-arrow ${open ? 'rotated' : ''}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 14.975C11.8667 14.975 11.7417 14.9544 11.625 14.913C11.5084 14.8717 11.4 14.8007 11.3 14.7L6.70005 10.1C6.51672 9.91672 6.42505 9.68338 6.42505 9.40005C6.42505 9.11671 6.51672 8.88338 6.70005 8.70005C6.88338 8.51672 7.11672 8.42505 7.40005 8.42505C7.68338 8.42505 7.91672 8.51672 8.10005 8.70005L12 12.6L15.9 8.70005C16.0834 8.51672 16.3167 8.42505 16.6 8.42505C16.8834 8.42505 17.1167 8.51672 17.3 8.70005C17.4834 8.88338 17.575 9.11671 17.575 9.40005C17.575 9.68338 17.4834 9.91672 17.3 10.1L12.7 14.7C12.6 14.8 12.4917 14.871 12.375 14.913C12.2584 14.955 12.1334 14.9757 12 14.975Z"
              fill="#50575E"
            />
          </svg>
        </div>
  
        {/* ───────── выпадающий список ───────── */}
        {open && (
          <div className="custom-select-dropdown">
            {fields.map((value) => (
              <div
                key={value}
                className="custom-select-option"
                onClick={() => {
                  onChange(value);
                  setOpen(false);
                }}
              >
                <IconTextType value={value} iconSize={26} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TypeFieldSelect;
