/**
 * ============================================================================
 *  LineareSelect.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  «Линейный селект» — группа из N-кнопок, визуально объединённых в
 *  единую капсулу. Используется там, где вариантов немного и нужен
 *  быстрый переключатель (аналог <SegmentedControl />).
 *
 *  Пропы:
 *    title       : string               – заголовок над группой
 *    value       : array<{ value,label } >  – список опций
 *    activeValue : any                  – выбранное значение
 *    onChange    : function             – (newVal) => void
 *
 *  Классы CSS:
 *    .first / .last  – скругляем углы только у крайних элементов
 *    .active         – подсветка выбранной кнопки
 * ============================================================================
 */

import React from 'react';
import './LineareSelect.css';

const LineareSelect = ({ title, value = [], activeValue, onChange }) => {
  return (
    <div className="cfe-lineare-select-block">
      {/* заголовок */}
      <p className="cfe-lineare-select-title">{title}</p>
      {/* список кнопок-опций */}
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
