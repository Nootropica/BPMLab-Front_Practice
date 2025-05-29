/**
 * ============================================================================
 *  FieldTable.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Таблица «Поля группы» + expandable-row с формой редактирования.
 *
 *  Функциональность:
 *    1.  Отображает краткую таблицу (№ / label / name / key / type).
 *    2.  Клик по стрелке или «Изменить» разворачивает подстроку-форму
 *       (3 секции: «Общие», «Проверка», «Отображение»).
 *    3.  В форме используются переиспользуемые UI-компоненты (ToggleSwitch,
 *       InputText, LineareSelect и др.).
 *    4.  Пока всё работает только на локальном state, API-запросы
 *       эмулируются console.log — точки отмечены комментариями.
 *
 *  Пропы:
 *    data : array<{
 *            id, number, label, name, key, type
 *          }>
 * ============================================================================
 */

import React, { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import InputText from '../InputText/InputText';
import IconTextType from '../TypeFieldSelect/IconTextType';
import TypeFieldSelect from '../TypeFieldSelect/TypeFieldSelect';
import './FieldTable.css';

const FieldTable = ({ data = [] }) => {
  /* ───────── открытая строка (id поля) ───────── */
  const [openRowId, setOpenRowId] = useState(null);
  const handleEdit = (id) => {
    setOpenRowId((prevId) => (prevId === id ? null : id));
  };
  const handleDuplicate = (id) => {
    alert(`Дублирование элемента с ID: ${id}`);
  };
  const handleDelete = (id) => {
    alert(`Удаление элемента с ID: ${id}`);
  };
  /* ───────── state формы (минимально для демо) ───────── */
  const [currentSectionFuild, setCurrentSectionFuild] = useState("General");

  /* вкладка «Общие» */
  const [activeValue, setActiveValue] = useState("text");
  const [textLabel, setTextLabel] = useState('');
  const [textName, setTextName] = useState('');
  const [textDefault, setTextDefault] = useState('');

  /* вкладка «Проверка» */
  const [isRequired, setIsRequired] = useState(false);
  const [textLimitation, setTextLimitation] = useState('');

  /* вкладка «Отображение» */
  const [textInstructions, setTextInstructions] = useState('');
  const [textPreview, setTextPreview] = useState('');
  const [textAddStart, setTextAddStart] = useState('');
  const [textAddEnd, setTextAddEnd] = useState('');

  /* =========================================================================
   *  R E N D E R
   * ====================================================================== */
  return (
    <div className="cfe-field-table">
      {/* ───────── заголовок таблицы ───────── */}
      <div className="cfe-table-header">
        <table>
          <thead>
            <tr>
              <th>
              {/* … SVG «стрелка» … */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99995 16L8.17495 19.275C8.12495 19.4917 8.01661 19.6667 7.84995 19.8C7.68328 19.9333 7.48328 20 7.24995 20C6.93328 20 6.67495 19.875 6.47495 19.625C6.27495 19.375 6.21662 19.1 6.29995 18.8L6.99995 16H4.27495C3.94162 16 3.67495 15.871 3.47495 15.613C3.27495 15.355 3.21661 15.0673 3.29995 14.75C3.34995 14.5167 3.46662 14.3333 3.64995 14.2C3.83328 14.0667 4.04162 14 4.27495 14H7.49995L8.49995 10H5.77495C5.44162 10 5.17495 9.871 4.97495 9.613C4.77495 9.355 4.71662 9.06733 4.79995 8.75C4.84995 8.51667 4.96662 8.33333 5.14995 8.2C5.33328 8.06667 5.54162 8 5.77495 8H8.99995L9.82495 4.725C9.87495 4.50833 9.98328 4.33333 10.1499 4.2C10.3166 4.06667 10.5166 4 10.7499 4C11.0666 4 11.3249 4.125 11.5249 4.375C11.7249 4.625 11.7833 4.9 11.6999 5.2L10.9999 8H14.9999L15.8249 4.725C15.8749 4.50833 15.9833 4.33333 16.1499 4.2C16.3166 4.06667 16.5166 4 16.7499 4C17.0666 4 17.3249 4.125 17.5249 4.375C17.7249 4.625 17.7833 4.9 17.6999 5.2L16.9999 8H19.7249C20.0583 8 20.3249 8.129 20.5249 8.387C20.7249 8.645 20.7833 8.93267 20.6999 9.25C20.65 9.48333 20.5333 9.66667 20.3499 9.8C20.1666 9.93333 19.9583 10 19.7249 10H16.4999L15.4999 14H18.2249C18.5583 14 18.8249 14.1293 19.0249 14.388C19.2249 14.6467 19.2833 14.934 19.1999 15.25C19.1499 15.4833 19.0333 15.6667 18.8499 15.8C18.6666 15.9333 18.4583 16 18.2249 16H14.9999L14.1749 19.275C14.1249 19.4917 14.0166 19.6667 13.8499 19.8C13.6833 19.9333 13.4833 20 13.2499 20C12.9333 20 12.6749 19.875 12.4749 19.625C12.2749 19.375 12.2166 19.1 12.2999 18.8L12.9999 16H8.99995ZM9.49995 14H13.4999L14.4999 10H10.4999L9.49995 14Z" fill="#2C3338"/>
              </svg>
              </th>
              <th></th>
              <th>Этикетка</th>
              <th>Название</th>
              <th>Ключ</th>
              <th>Тип</th>
            </tr>
          </thead>
        </table>
      </div>
      {/* ───────── тело таблицы ───────── */}
      <div className="cfe-table-body">
        <table>
          <tbody>
            {data.map((item) => (
              <React.Fragment key={item.key}>
                 {/* === КОРОТКАЯ СТРОКА =================================================== */}
                <tr>
                  <td>{item.number}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)} className="svg-button">
                      <svg
                        className={`arrow-icon ${openRowId === item.id ? 'rotated' : ''}`}
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                      >
                          <path d="M12 14.975C11.8667 14.975 11.7417 14.9544 11.625 14.913C11.5084 14.8717 11.4 14.8007 11.3 14.7L6.70005 10.1C6.51672 9.91672 6.42505 9.68338 6.42505 9.40005C6.42505 9.11671 6.51672 8.88338 6.70005 8.70005C6.88338 8.51672 7.11672 8.42505 7.40005 8.42505C7.68338 8.42505 7.91672 8.51672 8.10005 8.70005L12 12.6L15.9 8.70005C16.0834 8.51672 16.3167 8.42505 16.6 8.42505C16.8834 8.42505 17.1167 8.51672 17.3 8.70005C17.4834 8.88338 17.575 9.11671 17.575 9.40005C17.575 9.68338 17.4834 9.91672 17.3 10.1L12.7 14.7C12.6 14.8 12.4917 14.871 12.375 14.913C12.2584 14.955 12.1334 14.9757 12 14.975Z" fill="#50575E"/>
                      </svg>
                    </button>
                  </td>
                  <td>
                    {item.label}
                    <div className="button-group">
                      <button onClick={() => handleEdit(item.id)}>Изменить</button>
                      <button onClick={() => handleDuplicate(item.id)}>Дублировать</button>
                      <button className="button-remove" onClick={() => handleDelete(item.id)}>Удалить</button>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.key}</td>
                  <td>
                    <IconTextType value={item.type}></IconTextType>
                  </td>
                </tr>
                {/* === РАСШИРЕННАЯ СТРОКА (editable) ===================================== */}
                {openRowId === item.id && (
                  <tr className="expanding-row">
                    <td colSpan="6" className="expanding-block">
                      <div className="expanded-content">
                        <div className="cfe-groupsettingsheader-contaner">
                          <button
                            className={`cfe-groupsettingsheader-button ${currentSectionFuild === "General" ? 'active' : ''}`}
                            onClick={() => setCurrentSectionFuild("General")}
                          >
                            Общие
                          </button>
                          <button
                            className={`cfe-groupsettingsheader-button ${currentSectionFuild === "Check" ? 'active' : ''}`}
                            onClick={() => setCurrentSectionFuild("Check")}
                          >
                            Проверка
                          </button>
                          <button
                            className={`cfe-groupsettingsheader-button ${currentSectionFuild === "Mapping" ? 'active' : ''}`}
                            onClick={() => setCurrentSectionFuild("Mapping")}
                          >
                            Отображение
                          </button>
                        </div>
                        {/* ───────── вкладка «Общие» ───────── */}
                        {currentSectionFuild === "General" && (
                          <div style={{ padding: '12px 0' }}>
                            <TypeFieldSelect activeValue={activeValue} onChange={setActiveValue}></TypeFieldSelect>
                            <InputText
                              title="Этикетка поля"
                              value={textLabel}
                              description="Имя на странице редактирования"
                              onChangeImmediate={(val) => setTextLabel(val)}
                              onChangeDebounced={(val) => {
                                console.log('Отправка на сервер:', val);
                                // отправить запрос на сервер здесь
                              }}
                            />
                            <InputText
                              title="Название поля"
                              value={textName}
                              description="Без пробелов на латинице."
                              onChangeImmediate={(val) => setTextName(val)}
                              onChangeDebounced={(val) => {
                                console.log('Отправка на сервер:', val);
                                // отправить запрос на сервер здесь
                              }}
                            />
                            <InputText
                              title="Значение по умолчанию"
                              value={textDefault}
                              description="Значение при создании новой записи"
                              onChangeImmediate={(val) => setTextDefault(val)}
                              onChangeDebounced={(val) => {
                                console.log('Отправка на сервер:', val);
                                // отправить запрос на сервер здесь
                              }}
                            />
                          </div>
                        )}
                        {/* ───────── вкладка «Проверка» ───────── */}
                        {currentSectionFuild === "Check" && (
                          <div style={{ paddingTop: '12px' }}>
                            <ToggleSwitch
                              label="Обязательное"
                              checked={isRequired}
                              onChange={(newState) => setIsRequired(newState)}
                            />
                            <InputText
                              title="Ограничение кол-ва символов"
                              value={textLimitation}
                              description="Если лимит отсутвует, оставить пустым"
                              onlyPositiveInteger={true}
                              onChangeImmediate={(val) => setTextLimitation(val)}
                              onChangeDebounced={(val) => {
                                console.log('Отправка на сервер:', val);
                                // отправить запрос на сервер здесь
                              }}
                            />
                          </div>
                        )}
                        {/* ───────── вкладка «Отображение» ───────── */}
                        {currentSectionFuild === "Mapping" && (
                          <div style={{ paddingTop: '12px' }}>
                          <InputText
                            title="Инструкции"
                            value={textInstructions}
                            description="Инструкция для редактора"
                            onChangeImmediate={(val) => setTextInstructions(val)}
                            onChangeDebounced={(val) => {
                              console.log('Отправка на сервер:', val);
                              // отправить запрос на сервер здесь
                            }}
                          />
                          <InputText
                            title="Текст предпросмотра"
                            value={textPreview}
                            description="Текст внутри поля, до начала ввода"
                            onChangeImmediate={(val) => setTextPreview(val)}
                            onChangeDebounced={(val) => {
                              console.log('Отправка на сервер:', val);
                              // отправить запрос на сервер здесь
                            }}
                          />
                          <InputText
                            title="Добавить в начало"
                            value={textAddStart}
                            description="Добавляет текст перед пользовательским вводом"
                            onChangeImmediate={(val) => setTextAddStart(val)}
                            onChangeDebounced={(val) => {
                              console.log('Отправка на сервер:', val);
                              // отправить запрос на сервер здесь
                            }}
                          />
                          <InputText
                            title="Добавить в конец"
                            value={textAddEnd}
                            description="Добавляет текст после пользовательского ввода"
                            onChangeImmediate={(val) => setTextAddEnd(val)}
                            onChangeDebounced={(val) => {
                              console.log('Отправка на сервер:', val);
                              // отправить запрос на сервер здесь
                            }}
                          />
                        </div>
                        )}
                        </div>
                    </td>
                  </tr>
                )}
                {/* === /расширенная строка ============================================== */}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldTable;
