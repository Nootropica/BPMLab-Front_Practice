/**
 * ============================================================================
 *  ExtraPanel.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  «Внутренняя» часть интерфейса — то, что меняется в зависимости от URL.
 *  По-сути это lightweight-роутер, который монтирует нужную страницу
 *  (GroupField, SettingsGroup …) без использования <Routes />.
 *
 *  Почему так?
 *    Вся админка плагина рендерится внутри единственного React-корня,
 *    но у WordPress нет полноценного history-router. Поэтому мы слушаем
 *    `location.pathname` через useLocation() и вручную подсовываем
 *    соответствующий компонент.
 *
 *  Пропы:
 *    onAddPage : fn – callback, прокидывается в <GroupField /> для создания
 *                    новой группы (используется в Header → TopMain).
 *
 *  Локальный state:
 *    checkboxes – объект «видимость столбцов» (используется только
 *                 на странице “/” и прокидывается глубже в таблицу).
 * ============================================================================
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GroupField from '../../pages/GroupField/GroupField';
import SettingsGroup from '../../pages/SettingsGroup/SettingsGroup';
import './ExtraPanel.css';

const ExtraPanel = ({ onAddPage }) => {
    /* текущий путь */
    const location = useLocation();
    const currentPath = location.pathname + location.search;
    console.log(currentPath);

    /* чек-боксы видимости столбцов (root page only) */
    const [checkboxes, setCheckboxes] = useState({
        description: true,
        status: true,
        key: true,
        location: true,
        fields: true
    });

    /* =========================================================================
     *  SWITCH  ПО  ПУТИ
     * ====================================================================== */
    let content;
    switch (currentPath) {
        /* ─────────────────────────────  список групп  ───────── */
        case '/':
            content = <GroupField onAddPage={onAddPage} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
            break;
        /* ─────────────────────────────  страница группы  ────── */
        case '/cfe-settings-group':
            content = <SettingsGroup/>
            break;
        /* ─────────────────────────────  fallback  ───────────── */
        default:
            content = null;   // можно вывести 404-заглушку
    }
    /* =========================================================================
     *  R E N D E R
     * ====================================================================== */
    return <div className="cfe_ExtraPanel">{content}</div>;
};

export default ExtraPanel;