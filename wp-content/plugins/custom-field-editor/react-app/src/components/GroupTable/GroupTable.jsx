import React, { useState, useEffect } from 'react';
import StatusIcon from './StatusIcon';
import './GroupTable.css';

const GroupTable = ({ checkboxes, onSelectedIdsChange }) => {
  const [selectedAll, setSelectedAll] = useState(false); 
  const [checkboxStates, setCheckboxStates] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  const [data, setData] = useState([
    {
      id: 1,
      title: 'Карта товара',
      description: 'Заполнение информации для карты товара',
      status: true,
      key: 'group_sd34qyr098q340y',
      location: 'Записи',
      fields: '52',
    },
    {
      id: 2,
      title: 'Карта продукта',
      description: 'Заполнение информации для карты продукта я не знаю что ещё сюда можно написать, но мы пишем вообще лютое описание, чтобы пользователь вообще афигел от такого',
      status: false,
      key: 'group_sd34qyr0983454',
      location: 'Записи',
      fields: '2',
    },
    {
      id: 3,
      title: 'Карта товара',
      description: 'Заполнение информации для карты товара',
      status: true,
      key: 'group_sd34qyr098q340y',
      location: 'Записи',
      fields: '52',
    },
    {
      id: 4,
      title: 'Карта продукта',
      description: 'Заполнение информации для карты продукта я не знаю что ещё сюда можно написать, но мы пишем вообще лютое описание, чтобы пользователь вообще афигел от такого',
      status: false,
      key: 'group_sd34qyr0983454',
      location: 'Записи',
      fields: '2',
    },
    {
      id: 5,
      title: 'Карта товара',
      description: 'Заполнение информации для карты товара',
      status: true,
      key: 'group_sd34qyr098q340y',
      location: 'Записи',
      fields: '52',
    },
    {
      id: 6,
      title: 'Карта продукта',
      description: 'Заполнение информации для карты продукта я не знаю что ещё сюда можно написать, но мы пишем вообще лютое описание, чтобы пользователь вообще афигел от такого',
      status: false,
      key: 'group_sd34qyr0983454',
      location: 'Записи',
      fields: '2',
    },
    {
      id: 7,
      title: 'Карта товара',
      description: 'Заполнение информации для карты товара',
      status: true,
      key: 'group_sd34qyr098q340y',
      location: 'Записи',
      fields: '52',
    },
    {
      id: 8,
      title: 'Карта продукта',
      description: 'Заполнение информации для карты продукта я не знаю что ещё сюда можно написать, но мы пишем вообще лютое описание, чтобы пользователь вообще афигел от такого',
      status: false,
      key: 'group_sd34qyr0983454',
      location: 'Записи',
      fields: '2',
    },
    {
      id: 9,
      title: 'Карта товара',
      description: 'Заполнение информации для карты товара',
      status: true,
      key: 'group_sd34qyr098q340y',
      location: 'Записи',
      fields: '52',
    },
    {
      id: 10,
      title: 'Карта продукта',
      description: 'Заполнение информации для карты продукта я не знаю что ещё сюда можно написать, но мы пишем вообще лютое описание, чтобы пользователь вообще афигел от такого',
      status: false,
      key: 'group_sd34qyr0983454',
      location: 'Записи',
      fields: '2',
    },
  ]);

  useEffect(() => {
    const initialCheckboxStates = {};
    data.forEach((item) => {
      initialCheckboxStates[item.id] = false;
    });
    setCheckboxStates(initialCheckboxStates);
  }, [data]);

  const toggleAllCheckboxes = () => {
    const newState = !selectedAll;
    setSelectedAll(newState);
    
    const updatedCheckboxStates = {};
    const newSelectedIds = [];
    
    data.forEach((item) => {
      updatedCheckboxStates[item.id] = newState;
      if (newState) {
        newSelectedIds.push(item.id);
      }
    });
    
    setCheckboxStates(updatedCheckboxStates);
    setSelectedIds(newSelectedIds);

    if (onSelectedIdsChange) {
      onSelectedIdsChange(newSelectedIds);
    }
  };

  const toggleSingleCheckbox = (id) => {
    const updatedCheckboxStates = { ...checkboxStates };
    updatedCheckboxStates[id] = !updatedCheckboxStates[id];
    setCheckboxStates(updatedCheckboxStates);

    setSelectedIds(prevSelectedIds => {
      let newSelectedIds;
      if (updatedCheckboxStates[id]) {
        newSelectedIds = [...prevSelectedIds, id];
      } else {
        newSelectedIds = prevSelectedIds.filter(itemId => itemId !== id);
      }
      
      if (onSelectedIdsChange) {
        onSelectedIdsChange(newSelectedIds);
      }
      
      return newSelectedIds;
    });
  };

  useEffect(() => {
    const allSelected = data.every((item) => checkboxStates[item.id]);
    setSelectedAll(allSelected);
    
    const newSelectedIds = [];
    for (const id in checkboxStates) {
      if (checkboxStates[id]) {
        newSelectedIds.push(Number(id));
      }
    }
    setSelectedIds(newSelectedIds);
    
    if (onSelectedIdsChange) {
      onSelectedIdsChange(newSelectedIds);
    }
  }, [checkboxStates, data]);

  const handleEdit = (id) => {
    alert(`Редактировать запись с id: ${id}`);
  };

  const handleToggleStatus = (id) => {
    alert(`Изменить статус записи с id: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Удалить запись с id: ${id}`);
  };

  return (
    <div className="cfe-grouptable-wrapper">
      <div className="cfe-grouptable-scrollable">
        <table className="cfe-grouptable-data-table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={toggleAllCheckboxes}
                    className="cfe_custom_checkbox_input"
                  />
                  <span className={`cfe_custom_checkbox_icon ${selectedAll ? 'checked' : ''}`}>
                    {selectedAll && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5Z" fill="#3858E9"/>
                      </svg>
                    )}
                  </span>
                </label>
              </th>
              <th className="cfe-grouptable-header-title">Название</th>
              {checkboxes.description && <th className="cfe-grouptable-header-description">Описание</th>}
              {checkboxes.status && <th className="cfe-grouptable-header-status">Статус</th>}
              {checkboxes.key && <th className="cfe-grouptable-header-key">Ключ</th>}
              {checkboxes.location && <th className="cfe-grouptable-header-location">Расположение</th>}
              {checkboxes.fields && <th className="cfe-grouptable-header-fields">Поля</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="cfe-grouptable-row">
                <td className="cfe-grouptable-cell-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxStates[item.id]}
                      onChange={() => toggleSingleCheckbox(item.id)}
                      className="cfe_custom_checkbox_input"
                    />
                    <span className={`cfe_custom_checkbox_icon ${checkboxStates[item.id] ? 'checked' : ''}`}>
                      {checkboxStates[item.id] && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5Z" fill="#3858E9"/>
                        </svg>
                      )}
                    </span>
                  </label>
                </td>
                <td className="cfe-grouptable-cell-title">
                  <div className="cfe-grouptable-item-title">
                    {item.title}
                    <div className="cfe-grouptable-item-buttons">
                      <button 
                        className="cfe-grouptable-button cfe-grouptable-button-edit"
                        onClick={() => handleEdit(item.id)}
                      >
                        <span>Изменить</span>
                      </button>
                      <button 
                        className={`cfe-grouptable-button cfe-grouptable-button-status ${item.status ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleStatus(item.id)}
                      >
                        <span>{item.status ? 'Деактивировать' : 'Активировать'}</span>
                      </button>
                      <button 
                        className="cfe-grouptable-button cfe-grouptable-button-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        <span>Удалить</span>
                      </button>
                    </div>
                  </div>
                </td>
                {checkboxes.description && <td className="cfe-grouptable-cell-description">{item.description}</td>}
                {checkboxes.status && <td className="cfe-grouptable-cell-status"><StatusIcon status={item.status} /></td>}
                {checkboxes.key && <td className="cfe-grouptable-cell-key">{item.key}</td>}
                {checkboxes.location && <td className="cfe-grouptable-cell-location">{item.location}</td>}
                {checkboxes.fields && <td className="cfe-grouptable-cell-fields">{item.fields}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTable;
