import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GroupField from '../../pages/GroupField/GroupField';
import SettingsGroup from '../../pages/SettingsGroup/SettingsGroup';
import './ExtraPanel.css';

const ExtraPanel = ({ onAddPage }) => {
    const location = useLocation();
    const currentPath = location.pathname + location.search;
    console.log(currentPath);

    const [checkboxes, setCheckboxes] = useState({
        description: true,
        status: true,
        key: true,
        location: true,
        fields: true
    });

    let content;
    switch (currentPath) {
        case '/':
            content = <GroupField onAddPage={onAddPage} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
            break;
        case '/cfe-settings-group':
            content = <SettingsGroup/>
            break;
    }   
    return <div className="cfe_ExtraPanel">{content}</div>;
};

export default ExtraPanel;