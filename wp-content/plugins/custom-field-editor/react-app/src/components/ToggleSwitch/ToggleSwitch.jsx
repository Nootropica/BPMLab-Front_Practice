/**
 * ============================================================================
 *  ToggleSwitch.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Кастомный тумблер «on / off».
 *
 *  Пропы:
 *    label   : string   – текст слева от переключателя (default: «Активно»)
 *    checked : boolean  – состояние (true → включено)
 *    onChange: function – callback (newState:boolean) → void
 *
 *  Чистый «тупой» компонент: не хранит внутренний state,
 *  полностью контролируется родительским компонентом.
 * ============================================================================
 */

import './ToggleSwitch.css';

const ToggleSwitch = ({ label = 'Активно', checked, onChange }) => {
  return (
    <div className="cfe-toggle-wrapper">
      {/* подпись */}
      <span className="cfe-toggle-label">{label}</span>
      
      {/* сам инпут + стилизованный слайдер */}
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