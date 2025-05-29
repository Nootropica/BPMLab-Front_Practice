/**
 * ============================================================================
 *  GroupSettingsHeader.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Таб-навигация внутри страницы «Настройки группы».
 *
 *  Показывает две кнопки-вкладки:
 *      • «Поля»      – секция со списком полей группы
 *      • «Настройки» – секция общих параметров группы
 *
 *  Пропы:
 *    addDataMap?       : fn        – не используется прямо здесь, оставлен
 *                                   «про запас» (например, чтобы родитель
 *                                   мог добавить в Map ref-ы на DOM-узлы).
 *    currentSection    : string    – какая секция выбрана (‘Fields’ | ‘Settings’)
 *    setCurrentSection : fn        – переключатель секции в родителе
 *
 *  Локальный state:
 *    activeTab – строка-идентификатор (‘fields’ | ‘settings’) исключительно
 *                для смены CSS-класса .active. Секция в родителе меняется
 *                через setCurrentSection().
 * ============================================================================
 */

import React, {useState} from 'react';
import './GroupSettingsHeader.css';

const GroupSettingsHeader = ({ addDataMap, currentSection, setCurrentSection }) => {
  /* ─────────────────── какая вкладка подсвечена? ─────────────────── */
  const [activeTab, setActiveTab] = useState('fields');

  /* ─────────────────── click-handlers ─────────────────── */
  const handleFieldsClick = () => {
    setActiveTab('fields');
    setCurrentSection("Fields");
  };
  
  const handleSettingsClick = () => {
      setActiveTab('settings');
      setCurrentSection("Settings");
  };
  /* ─────────────────── render ─────────────────── */
  return (
    <>
    <div className='cfe-groupsettingsheader-contaner'>
        <button
        className={`cfe-groupsettingsheader-button ${activeTab === 'fields' ? 'active' : ''}`}
        onClick={handleFieldsClick}
        >
            Поля
        </button>
        <button
        className={`cfe-groupsettingsheader-button ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={handleSettingsClick}
        >
            Настройки
        </button>
    </div>
    </>
  );
};

export default GroupSettingsHeader;