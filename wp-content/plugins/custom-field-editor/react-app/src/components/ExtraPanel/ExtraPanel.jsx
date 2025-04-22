import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GroupField from '../../pages/GroupField/GroupField';
import './ExtraPanel.css';

const ExtraPanel = ({ onAddPage }) => {
    const location = useLocation();
    const currentPath = location.pathname + location.search;
    
    const [checkboxes, setCheckboxes] = useState({
        description: true,
        status: true,
        key: true,
        location: true,
        fields: true
    });

    let content;
    switch (currentPath) {
        case '/wp-admin/admin.php?page=cfe-main':
            content = <GroupField onAddPage={onAddPage} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
            break;
        case '/wp-admin/admin.php?page=cfe-settings-group':
            content = <div>asdasdasd</div>
            break;
        default:
            content = (
              <>
                <h3>Добро пожаловать</h3>
                <p>Выберите пункт в меню слева.</p>
              </>
            );
    }   
    return <div className="cfe_ExtraPanel">{content}</div>;
};

export default ExtraPanel;