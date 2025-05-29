/**
 * ============================================================================
 *  TopMain.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Верхняя «шапка» интерфейса плагина.
 *
 *  Два режима работы (определяются по URL):
 *
 *    •  “/” (root) – список групп.
 *        ├─ Кнопка «Создать группу»
 *        ├─ “Настройки таблицы” (выпадающий блок + чек-боксы столбцов)
 *        └─ Получаем / сохраняем настройки отображения через REST.
 *
 *    •  “/cfe-settings-group” – страница конкретной группы.
 *        ├─ Инпут «Название группы» (debounce-сохранение пока заглушка)
 *        └─ Кнопка «Сохранить изменения» (переход назад на “/”)
 *
 *  Пропы:
 *    onAddPage?      – кастомный callback, вызывается ДО обращения к API
 *    checkboxes      – объект настроек видимости столбцов
 *    setCheckboxes   – сеттер из родителя (верхний state lifting)
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TopMain.css';

const TopMain = ({ onAddPage, checkboxes, setCheckboxes }) => {
    /* ───────── маршрутизация ───────── */
    const navigate = useNavigate();
    const location = useLocation();
    /* ───────── локальный UI-state ───────── */
    const [showSettingsBlock, setShowSettingsBlock] = useState(false);
    const [settingsOpenAnimation, setSettingsOpenAnimation] = useState(false);
    const currentPath = location.pathname + location.search;

    /* =========================================================================
     *  1.  ПОЛУЧАЕМ  НАСТРОЙКИ  ТАБЛИЦЫ (root path only)
     * ====================================================================== */
    useEffect(() => {
        if (currentPath === '/') {
            fetch(cfeSettings.settings_url, {
                method: 'GET',
                headers: {
                    'X-WP-Nonce': cfeSettings.nonce,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setCheckboxes(data);
                })
                .catch((err) => {
                    console.error('Error for load settings:', err);
                });
        }
    }, [currentPath]);

    /* =========================================================================
     *  2.  HANDLERS
     * ====================================================================== */
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        const newState = {
            ...checkboxes,
            [name]: checked,
        };

        setCheckboxes(newState);

        fetch(cfeSettings.settings_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': cfeSettings.nonce,
            },
            body: JSON.stringify(newState),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Save:', data);
            })
            .catch((err) => {
                console.error('Error for save:', err);
            });
    };

    const handleAddGroupClick = async () => {
        if (onAddPage) onAddPage();

        try {
            const response = await fetch(cfeSettings.post_group_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': cfeSettings.nonce,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();

            console.log('Post created:', data);
            navigate('/cfe-settings-group', { state: { blockId: data.id } });

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    const handleSettingsClick = () => {
        if (!showSettingsBlock) {
            setShowSettingsBlock(true);
            setTimeout(() => {
                setSettingsOpenAnimation(true);
            }, 10);
        } else {
            setSettingsOpenAnimation(false);
            setTimeout(() => {
                setShowSettingsBlock(false);
            }, 10);
        }
    };

    /* ───────── дебаунс для инпута (режим settings-group) ───────── */
    const [inputValue, setInputValue] = useState('');
    const [timer, setTimer] = useState(null);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputValue(value);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            sendRequest(value);
        }, 1000);

        setTimer(newTimer);
    };

    const sendRequest = (data) => {
        console.log('Request was sent successfully: ', data);
    };

    /* сохранить → вернуться на список */
    const handleSaveChangeClick = () => {
        navigate(`/`);
    };

    /* =========================================================================
     *  3.  RENDER  (switch по pathname)
     * ====================================================================== */
    let content;
    switch (currentPath) {
        /* ─────────────────────────────────────────────── root ("/") ───────── */
        case '/':
            content = (
                <>
                    <div className="cfe_topmain">
                        {/* ───────── кнопка «Создать группу» ───────── */}
                        <button
                            className="cfe_topmain_main_button"
                            onClick={handleAddGroupClick}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17Z" fill="#F5F7FA"/>
                                <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Zm0-2c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8Z" fill="#F5F7FA"/>
                            </svg>
                            Создать группу
                        </button>

                        {/* декоративный «эффект растекания» (слева) */}
                        <div className="cfe_topmain_spreading-effect-block">
                            <div
                                className={`cfe_topmain_spreading-effect cfe_topmain_spreading-effect-left ${settingsOpenAnimation ? 'activ' : ''}`}
                            />
                        </div>

                        {/* ───────── кнопка «Настройки таблицы» ───────── */}
                        <button
                            className={`cfe_topmain_button_settings ${settingsOpenAnimation ? 'active' : ''}`}
                            onClick={handleSettingsClick}
                        >
                            <svg
                                className={settingsOpenAnimation ? 'rotated' : ''}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path d="M12 15L7 10H17L12 15Z" fill="#1D1B20" />
                            </svg>
                            Настройки таблицы
                        </button>
                        {/* декоративный «эффект растекания» (справа) */}
                        <div className="cfe_topmain_spreading-effect-block">
                            <div
                                className={`cfe_topmain_spreading-effect cfe_topmain_spreading-effect-right ${settingsOpenAnimation ? 'activ' : ''}`}
                            />
                        </div>
                    </div>

                    {/* ───────── выпадающий блок настроек колонок ───────── */}
                    {showSettingsBlock && (
                        <div className={`cfe_settings_block ${settingsOpenAnimation ? 'open' : ''}`}>
                            <h4 className="cfe_settings_block_title">Столбцы</h4>
                            <div className="cfe_settings_checkboxes">
                                {[{ name: "description", label: "Описание" }, { name: "status", label: "Статус" }, { name: "key", label: "Ключ" }, { name: "location", label: "Расположение" }, { name: "fields", label: "Поля" }].map(({ name, label }) => (
                                    <label key={name}>
                                        <input
                                            type="checkbox"
                                            name={name}
                                            checked={checkboxes[name]}
                                            onChange={handleCheckboxChange}
                                            className="cfe_custom_checkbox_input"
                                        />
                                        {/* кастомная иконка чек-бокса */}
                                        <span className={`cfe_custom_checkbox_icon ${checkboxes[name] ? 'checked' : ''}`}>
                                            {checkboxes[name] && (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5Z" fill="#3858E9"/>
                                                </svg>
                                            )}
                                        </span>
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            );
            break;

        /* ────────────────────────────── страница группы ("/cfe-settings-group") ───────── */
        case '/cfe-settings-group':
            content =(
                <>
                    <div className="cfe_topmain cfe_topmain_settings_group" >
                        <input
                            className="cfe_topmain_input"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Название группы"
                        />
                        <button
                            className="cfe_topmain_main_button cfe_topmain_button_save"
                            onClick={handleSaveChangeClick}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </>
            );
             break;
        /* ────────────────────────────── fallback ───────── */
        default:
            content = null;
    }

    return <>{content}</>;
};

export default TopMain;
