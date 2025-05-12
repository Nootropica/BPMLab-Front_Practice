import React, {useState} from 'react';
import './GroupSettingsHeader.css';

const GroupSettingsHeader = ({ addDataMap, currentSection, setCurrentSection }) => {
  const [activeTab, setActiveTab] = useState('fields');

  const handleFieldsClick = () => {
    setActiveTab('fields');
    setCurrentSection("Fields");
  };
  
  const handleSettingsClick = () => {
      setActiveTab('settings');
      setCurrentSection("Settings");
  };
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