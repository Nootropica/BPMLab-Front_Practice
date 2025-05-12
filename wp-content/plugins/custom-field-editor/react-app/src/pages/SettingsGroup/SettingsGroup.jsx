import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopMain from '../../components/TopMain/TopMain';
import InputText from '../../components/InputText/InputText';
import LineareSelect from '../../components/LineareSelect/LineareSelect';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import GroupSettingsHeader from '../../components/GroupSettingsHeader/GroupSettingsHeader';
import FieldTable from '../../components/FieldTable/FieldTable';
import './SettingsGroup.css';

const SettingsGroup = () => {
  const handleAddFuildClick = () => {
    console.log("группа создана")
  };

  const handleRemoveGroupClick = () => {
    console.log("группа удалена")
  };
  const location = useLocation();
  const { blockId } = location.state || {};

  const [blockData, setBlockData] = useState(null);

  const [pages, setPages] = useState([]);
  // const [blocks, setBlocks] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(cfeSettings.pages_url, {
      method: 'GET',
      headers: {
        'X-WP-Nonce': cfeSettings.nonce,
      },
    })
      .then(res => res.json())
      .then(data => setPages(data))
      .catch(err => console.error('Ошибка загрузки страниц:', err));
      
    fetch(cfeSettings.posts_url, {
      method: 'GET',
      headers: {
        'X-WP-Nonce': cfeSettings.nonce,
      },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Ошибка загрузки записей:', err));
  
  //   fetch(cfeSettings.blocks_url, {
  //     method: 'GET',
  //     headers: {
  //       'X-WP-Nonce': cfeSettings.nonce,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setBlocks(data))
  //     .catch(err => console.error('Ошибка загрузки блоков:', err));
  // 
  }, []);

  const [dataMap] = useState(() => new Map());
  
  const addDataMap = (key, value) => {
    dataMap.set(key, value);
  };

  const fields = [
    { number: 1, id:52, label: 'Этикетка A', name: 'Название A', key: 'key-a', type: "text" },
    { number: 2, id:53, label: 'Этикетка B', name: 'Название B', key: 'key-b', type: "image" },
    { number: 3, id:55, label: 'Этикетка C', name: 'Название C', key: 'key-c', type: "number" },
  ];

  const [currentSection, setCurrentSection] = useState("Fields");

  const [conditions, setConditions] = useState([
    { id: 1, field: 'page', operator: 'equals', value: 'post' }
  ]);

  console.log(conditions);

  const fieldOptions = [
    { value: 'page', id: 1, label: 'Страница' },
    // { value: 'blocks',id: 2, label: 'Блок' },
    { value: 'post', id: 1, label: 'Запись' },
  ];

  const operatorOptions = [
    { value: 'equals', label: 'Равно' },
    { value: 'not_equals', label: 'Не равно' },
  ];

  const valueOptions = {
    page: pages,
    // blocks: blocks,
    post: posts,
  };

  const addCondition = () => {
    const defaultField = 'page';
    const defaultValue = valueOptions[defaultField]?.[0]?.id || '';
    setConditions([
      ...conditions,
      {
        id: Date.now(),
        field: defaultField,
        operator: 'equals',
        value: defaultValue
      }
    ]);
  };

  const removeCondition = (id) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };

  const updateCondition = (id, key, newValue) => {
    setConditions(conditions.map(condition => {
      if (condition.id === id) {
        if (key === 'field') {
          const newField = newValue;
          const newValues = valueOptions[newField] || [];
          return { 
            ...condition, 
            field: newField, 
            value: newValues.length > 0 ? newValues[0].id : '' 
          };
        }
        return { ...condition, [key]: newValue };
      }
      return condition;
    }));
  };
  const [selectedLocation, setSelectedLocation] = useState('default');
  const [selectedLocationLabel, setSelectedLocationLabel] = useState('top');
  const [selectedLocationManual, setSelectedLocationManual] = useState('label');
  const [textNumber, setTextNumber] = useState('');

  const [isActive, setIsActive] = useState(true);
  const [textDescription, setTextDescription] = useState('');
  const [textIcon, setTextIcon] = useState('');

  const test = true;
  return (
    <>
      < TopMain/>
      {test ? (
        <div className="cfe-settingsgroup-content-true">
          <GroupSettingsHeader 
            addDataMap={addDataMap} 
            currentSection={currentSection} 
            setCurrentSection={setCurrentSection}
          />
          {currentSection === "Settings" ? (
            <>
              <div className="cfe-settingsgroup-settings-contaner">
                <p className="cfe-settingsgroup-settings-title">
                  Правила расположения
                </p>
              </div>
              <p className="cfe-settingsgroup-settings-show-text">Показывать группу, если:</p>
              <div className="cfe-settingsgroup-conditions-container">
                {conditions.map((condition) => (
                  <div key={condition.id} className="cfe-settingsgroup-condition-row">
                    <select
                      value={condition.field}
                      onChange={(e) => updateCondition(condition.id, 'field', e.target.value)}
                      className="cfe-settingsgroup-condition-select"
                    >
                      {fieldOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select> 
                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                      className="cfe-settingsgroup-condition-select"
                    >
                      {operatorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select> 
                    <select
                      value={condition.value}
                      onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                      className="cfe-settingsgroup-condition-select"
                    >
                      {(valueOptions[condition.field] || []).map(option => (
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeCondition(condition.id)}
                      className="cfe-settingsgroup-remove-condition-button"
                      disabled={conditions.length <= 1}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill="#F5F7FA"/>
                        <path d="M5.83332 17.5C5.37498 17.5 4.98276 17.3369 4.65665 17.0108C4.33054 16.6847 4.1672 16.2922 4.16665 15.8333V5C3.93054 5 3.73276 4.92 3.57332 4.76C3.41387 4.6 3.33387 4.40222 3.33332 4.16667C3.33276 3.93111 3.41276 3.73333 3.57332 3.57333C3.73387 3.41333 3.93165 3.33333 4.16665 3.33333H7.49998C7.49998 3.09722 7.57998 2.89944 7.73998 2.74C7.89998 2.58056 8.09776 2.50056 8.33332 2.5H11.6666C11.9028 2.5 12.1008 2.58 12.2608 2.74C12.4208 2.9 12.5005 3.09778 12.5 3.33333H15.8333C16.0694 3.33333 16.2675 3.41333 16.4275 3.57333C16.5875 3.73333 16.6672 3.93111 16.6666 4.16667C16.6661 4.40222 16.5861 4.60028 16.4266 4.76083C16.2672 4.92139 16.0694 5.00111 15.8333 5V15.8333C15.8333 16.2917 15.6703 16.6842 15.3441 17.0108C15.018 17.3375 14.6255 17.5006 14.1666 17.5H5.83332ZM14.1666 5H5.83332V15.8333H14.1666V5ZM8.33332 14.1667C8.56943 14.1667 8.76748 14.0867 8.92748 13.9267C9.08748 13.7667 9.1672 13.5689 9.16665 13.3333V7.5C9.16665 7.26389 9.08665 7.06611 8.92665 6.90667C8.76665 6.74722 8.56887 6.66722 8.33332 6.66667C8.09776 6.66611 7.89998 6.74611 7.73998 6.90667C7.57998 7.06722 7.49998 7.265 7.49998 7.5V13.3333C7.49998 13.5694 7.57998 13.7675 7.73998 13.9275C7.89998 14.0875 8.09776 14.1672 8.33332 14.1667ZM11.6666 14.1667C11.9028 14.1667 12.1008 14.0867 12.2608 13.9267C12.4208 13.7667 12.5005 13.5689 12.5 13.3333V7.5C12.5 7.26389 12.42 7.06611 12.26 6.90667C12.1 6.74722 11.9022 6.66722 11.6666 6.66667C11.4311 6.66611 11.2333 6.74611 11.0733 6.90667C10.9133 7.06722 10.8333 7.265 10.8333 7.5V13.3333C10.8333 13.5694 10.9133 13.7675 11.0733 13.9275C11.2333 14.0875 11.4311 14.1672 11.6666 14.1667Z" fill="#DC3232"/>
                      </svg>

                    </button>
                  </div>
                ))}
                <button 
                  onClick={addCondition}
                  className="cfe-settingsgroup-add-condition-button"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#F5F7FA"/>
                  </svg>
                </button>
                </div>
                <div className='cfe-settingsgroup-contaner'>
                <div className="cfe-settingsgroup-settings-contaner">
                  <p className="cfe-settingsgroup-settings-title">
                    Отображение
                  </p>
                </div>
                <LineareSelect
                  title="Расположение"
                  value={[
                    { value: 'default', label: 'Обычное (после содержимого)' },
                    { value: 'lateral', label: 'На боковой панели' }
                  ]}
                  activeValue={selectedLocation}
                  onChange={(newValue) => setSelectedLocation(newValue)}
                />
                <LineareSelect
                  title="Положение этикетки"
                  value={[
                    { value: 'top', label: 'По верхнему краю' },
                    { value: 'left', label: 'По левому краю' }
                  ]}
                  activeValue={selectedLocationLabel}
                  onChange={(newValue) => setSelectedLocationLabel(newValue)}
                />
                <LineareSelect
                  title="Положение инструкции"
                  value={[
                    { value: 'label', label: 'Под этикетками' },
                    { value: 'fuild', label: 'Под полями' }
                  ]}
                  activeValue={selectedLocationManual}
                  onChange={(newValue) => setSelectedLocationManual(newValue)}
                />
                <InputText
                  title="Порядковый номер"
                  value={textNumber}
                  description="Группы сортируются по возрастанию номеров"
                  onlyPositiveInteger={true}
                  onChangeImmediate={(val) => setTextNumber(val)}
                  onChangeDebounced={(val) => {
                    console.log('Отправка на сервер:', val);
                    // отправить запрос на сервер здесь
                  }}
                />
                </div>
                <div className='cfe-settingsgroup-contaner'>
                <div className="cfe-settingsgroup-settings-contaner">
                  <p className="cfe-settingsgroup-settings-title">
                    Настройки группы
                  </p>
                </div>
                <ToggleSwitch
                  label="Активно"
                  checked={isActive}
                  onChange={(newState) => setIsActive(newState)}
                />
                <InputText
                  title="Описание"
                  value={textDescription}
                  description="Отображается в таблице групп полей"
                  onChangeImmediate={(val) => setTextDescription(val)}
                  onChangeDebounced={(val) => {
                    console.log('Отправка на сервер:', val);
                    // отправить запрос на сервер здесь
                  }}
                />
                <InputText
                  title="Ярлык"
                  value={textIcon}
                  description=""
                  onChangeImmediate={(val) => setTextIcon(val)}
                  onChangeDebounced={(val) => {
                    console.log('Отправка на сервер:', val);
                    // отправить запрос на сервер здесь
                  }}
                />
                </div>
                <div className='cfe-settingsgroup-timeplace'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 12.175L15.25 14.425C15.4333 14.6083 15.525 14.8377 15.525 15.113C15.525 15.3883 15.4333 15.6257 15.25 15.825C15.05 16.025 14.8127 16.125 14.538 16.125C14.2633 16.125 14.0257 16.025 13.825 15.825L11.3 13.3C11.2 13.2 11.125 13.0877 11.075 12.963C11.025 12.8383 11 12.709 11 12.575V9C11 8.71667 11.096 8.47933 11.288 8.288C11.48 8.09667 11.7173 8.00067 12 8C12.2827 7.99933 12.5203 8.09533 12.713 8.288C12.9057 8.48067 13.0013 8.718 13 9V12.175ZM12 6C11.7167 6 11.4793 5.904 11.288 5.712C11.0967 5.52 11.0007 5.28267 11 5V4H13V5C13 5.28333 12.904 5.521 12.712 5.713C12.52 5.905 12.2827 6.00067 12 6ZM18 12C18 11.7167 18.096 11.4793 18.288 11.288C18.48 11.0967 18.7173 11.0007 19 11H20V13H19C18.7167 13 18.4793 12.904 18.288 12.712C18.0967 12.52 18.0007 12.2827 18 12ZM12 18C12.2833 18 12.521 18.096 12.713 18.288C12.905 18.48 13.0007 18.7173 13 19V20H11V19C11 18.7167 11.096 18.4793 11.288 18.288C11.48 18.0967 11.7173 18.0007 12 18ZM6 12C6 12.2833 5.904 12.521 5.712 12.713C5.52 12.905 5.28267 13.0007 5 13H4V11H5C5.28333 11 5.521 11.096 5.713 11.288C5.905 11.48 6.00067 11.7173 6 12ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12Z" fill="#50575E"/>
                  </svg>
                  <p className="cfe-settingsgroup-settings-time">Создано </p>
                  <p className="cfe-settingsgroup-settings-time">
                    Создано
                  </p>
                  <p className="cfe-settingsgroup-settings-time"> в </p>
                  <p className="cfe-settingsgroup-settings-time">
                    Создано
                  </p>
                </div>
                <button
                  className="cfe_settingsgroup_remove_button"
                  onClick={handleRemoveGroupClick}
                >
                  Удалить группу полей
                </button>
            </>
          ) : currentSection === "Fields" ? (
            <FieldTable
              data={fields}
            />
          ) : null}
        </div>
      ) : (
        <div className="cfe-settingsgroup-content-false">
          <div className="cfe-settingsgroup-create-block">
            <p className="cfe-settingsgroup-create-title">Создайте своё</p>
            <p className="cfe-settingsgroup-create-title">первое поле</p>
            <div className="cfe-settingsgroup-icons-contaner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20V8H4V4H20V8H14V20H10Z" fill="#50575E"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33332 16C9.15555 16 8.99999 15.9333 8.86666 15.8C8.73332 15.6667 8.66666 15.5111 8.66666 15.3333V8.66667C8.66666 8.48889 8.73332 8.33333 8.86666 8.2C8.99999 8.06667 9.15555 8 9.33332 8H14C14.3778 8 14.6947 8.128 14.9507 8.384C15.2067 8.64 15.3342 8.95644 15.3333 9.33333V10.6667C15.3333 11.0444 15.2053 11.3613 14.9493 11.6173C14.6933 11.8733 14.3769 12.0009 14 12C14.3778 12 14.6947 12.128 14.9507 12.384C15.2067 12.64 15.3342 12.9564 15.3333 13.3333V14.6667C15.3333 15.0444 15.2053 15.3613 14.9493 15.6173C14.6933 15.8733 14.3769 16.0009 14 16H9.33332ZM10.6667 11H13.3333V10H10.6667V11ZM10.6667 14H13.3333V13H10.6667V14ZM0.999999 16C0.71111 16 0.472444 15.9053 0.284 15.716C0.0955555 15.5267 0.000888888 15.288 0 15V9.33333C0 8.95555 0.128 8.63911 0.384 8.384C0.639999 8.12889 0.956443 8.00089 1.33333 8H5.33333C5.71111 8 6.02799 8.128 6.28399 8.384C6.53999 8.64 6.66755 8.95644 6.66666 9.33333V15C6.66666 15.2889 6.57199 15.528 6.38266 15.7173C6.19333 15.9067 5.95466 16.0009 5.66666 16C5.37866 15.9991 5.13999 15.9044 4.95066 15.716C4.76133 15.5275 4.66666 15.2889 4.66666 15V14H2V15C2 15.2889 1.90533 15.528 1.716 15.7173C1.52667 15.9067 1.288 16.0009 0.999999 16ZM2 12H4.66666V10H2V12ZM18.6666 16C18.2889 16 17.9724 15.872 17.7173 15.616C17.4622 15.36 17.3342 15.0436 17.3333 14.6667V9.33333C17.3333 8.95555 17.4613 8.63911 17.7173 8.384C17.9733 8.12889 18.2898 8.00089 18.6666 8H22.6666C23.0444 8 23.3613 8.128 23.6173 8.384C23.8733 8.64 24.0009 8.95644 24 9.33333V10C24 10.2889 23.9053 10.528 23.716 10.7173C23.5266 10.9067 23.288 11.0009 23 11C22.712 10.9991 22.4733 10.9044 22.284 10.716C22.0946 10.5276 22 10.2889 22 10H19.3333V14H22C22 13.7111 22.0946 13.4724 22.284 13.284C22.4733 13.0956 22.712 13.0009 23 13C23.288 12.9991 23.5271 13.0938 23.7173 13.284C23.9075 13.4742 24.0018 13.7129 24 14V14.6667C24 15.0444 23.872 15.3613 23.616 15.6173C23.36 15.8733 23.0435 16.0009 22.6666 16H18.6666Z" fill="#50575E"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.22581 9.24999H1.11291C0.791404 9.24999 0.525791 9.14349 0.316071 8.93049C0.106351 8.71749 0.000996148 8.449 6.90174e-06 8.125C-0.000982345 7.801 0.104372 7.5325 0.316071 7.3195C0.52777 7.1065 0.793383 7 1.11291 7H3.33871C3.66022 7 3.92633 7.1065 4.13704 7.3195C4.34775 7.5325 4.45261 7.801 4.45162 8.125V14.875C4.45162 15.2 4.34626 15.469 4.13555 15.682C3.92484 15.895 3.65923 16.001 3.33871 16C3.0182 15.999 2.75259 15.8925 2.54188 15.6805C2.33117 15.4685 2.22581 15.2 2.22581 14.875V9.24999ZM7.41936 14.875V12.25C7.41936 11.825 7.56181 11.469 7.84671 11.182C8.13162 10.895 8.48379 10.751 8.90323 10.75H11.871V9.24999H8.53226C8.21076 9.24999 7.94514 9.14349 7.73542 8.93049C7.5257 8.71749 7.42035 8.449 7.41936 8.125C7.41837 7.801 7.52372 7.5325 7.73542 7.3195C7.94712 7.1065 8.21273 7 8.53226 7H12.6129C13.0333 7 13.386 7.144 13.6709 7.432C13.9558 7.72 14.0978 8.076 14.0968 8.5V10.75C14.0968 11.175 13.9543 11.5315 13.6694 11.8195C13.3845 12.1075 13.0323 12.251 12.6129 12.25H9.64516V13.75H12.9839C13.3054 13.75 13.5715 13.8565 13.7822 14.0695C13.9929 14.2825 14.0978 14.551 14.0968 14.875C14.0958 15.199 13.9904 15.468 13.7807 15.682C13.571 15.896 13.3054 16.002 12.9839 16H8.53226C8.21076 16 7.94514 15.8935 7.73542 15.6805C7.5257 15.4675 7.42035 15.199 7.41936 14.875ZM21.5161 16H17.4355C17.114 16 16.8484 15.8935 16.6386 15.6805C16.4289 15.4675 16.3236 15.199 16.3226 14.875C16.3216 14.551 16.4269 14.2825 16.6386 14.0695C16.8503 13.8565 17.116 13.75 17.4355 13.75H20.7742V12.25H18.5484C18.3505 12.25 18.1774 12.175 18.029 12.025C17.8806 11.875 17.8064 11.7 17.8064 11.5C17.8064 11.3 17.8806 11.125 18.029 10.975C18.1774 10.825 18.3505 10.75 18.5484 10.75H20.7742V9.24999H17.4355C17.114 9.24999 16.8484 9.14349 16.6386 8.93049C16.4289 8.71749 16.3236 8.449 16.3226 8.125C16.3216 7.801 16.4269 7.5325 16.6386 7.3195C16.8503 7.1065 17.116 7 17.4355 7H21.5161C21.9366 7 22.2892 7.144 22.5741 7.432C22.859 7.72 23.001 8.076 23 8.5V14.5C23 14.925 22.8575 15.2815 22.5726 15.5695C22.2877 15.8575 21.9356 16.001 21.5161 16Z" fill="#50575E"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM6 17H18L14.25 12L11.25 16L9 13L6 17Z" fill="#50575E"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.025 16H13.975C14.1917 16 14.346 15.9083 14.438 15.725C14.53 15.5417 14.509 15.3667 14.375 15.2L11.95 12.025C11.9 11.9583 11.8417 11.9083 11.775 11.875C11.7083 11.8417 11.6333 11.825 11.55 11.825C11.4667 11.825 11.3917 11.8417 11.325 11.875C11.2583 11.9083 11.2 11.9583 11.15 12.025L9.65 13.975C9.6 14.0417 9.54167 14.0917 9.475 14.125C9.40833 14.1583 9.33333 14.175 9.25 14.175C9.16667 14.175 9.09167 14.1583 9.025 14.125C8.95833 14.0917 8.9 14.0417 8.85 13.975L8.1 13C8.05 12.9333 7.99167 12.8873 7.925 12.862C7.85833 12.8367 7.78333 12.8243 7.7 12.825C7.61667 12.8257 7.54167 12.8383 7.475 12.863C7.40833 12.8877 7.35 12.9333 7.3 13L5.625 15.2C5.49167 15.3667 5.471 15.5417 5.563 15.725C5.655 15.9083 5.809 16 6.025 16ZM4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H16C16.55 4 17.021 4.196 17.413 4.588C17.805 4.98 18.0007 5.45067 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8043 19.021 17.413 19.413C17.0217 19.805 16.5507 20.0007 16 20H4Z" fill="#50575E"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H9.2C9.41667 2.4 9.77933 1.91667 10.288 1.55C10.7967 1.18333 11.3673 1 12 1C12.6327 1 13.2037 1.18333 13.713 1.55C14.2223 1.91667 14.5847 2.4 14.8 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM7 17H14V15H7V17ZM7 13H17V11H7V13ZM7 9H17V7H7V9ZM12 4.25C12.2167 4.25 12.396 4.179 12.538 4.037C12.68 3.895 12.7507 3.716 12.75 3.5C12.7493 3.284 12.6783 3.105 12.537 2.963C12.3957 2.821 12.2167 2.75 12 2.75C11.7833 2.75 11.6043 2.821 11.463 2.963C11.3217 3.105 11.2507 3.284 11.25 3.5C11.2493 3.716 11.3203 3.89533 11.463 4.038C11.6057 4.18067 11.7847 4.25133 12 4.25Z" fill="#50575E"/>
              </svg>
            </div>
            <p className="cfe-settingsgroup-create-text">Добавляйте собственные поля к материалам WordPress: записям, страницам и другим типам контента.</p>
            <div className="cfe-settingsgroup-buttons-contaner">
              <button
                className="cfe_settingsgroup_main_button"
                onClick={handleAddFuildClick}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17Z" fill="#F5F7FA"/>
                  <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Zm0-2c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8Z" fill="#F5F7FA"/>
                </svg>
                Создать поле
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsGroup;