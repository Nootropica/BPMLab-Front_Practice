import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusIcon        from './StatusIcon';
import './GroupTable.css';

const GroupTable = ({ checkboxes, onSelectedIdsChange, reloadToken = 0 }) => {
	/* ───────── состояние ───────── */
	const navigate = useNavigate();

	const [data,           setData]        = useState([]);
	const [checkboxStates, setChecks]      = useState({});
	const [selectedAll,    setSelectedAll] = useState(false);

	/*!  локальный список id – его раньше не было  */
	const [selectedIds,    setSelectedIds] = useState([]);

	/* ───── загрузка данных из API ───── */
	useEffect(() => {
		wp.apiFetch({
			path   : cfeSettings.field_groups_url.replace(window.location.origin, ''),
			method : 'GET',
			headers: { 'X-WP-Nonce': cfeSettings.nonce },
		})
		.then(setData)
		.catch(err => alert(`Ошибка загрузки: ${err.message}`));
	}, [reloadToken]);

	/* после каждой новой выборки данных – переинициализируем чек-боксы */
	useEffect(() => {
		const init = {};
		data.forEach(i => (init[i.id] = false));
		setChecks(init);
		setSelectedIds([]);
		onSelectedIdsChange?.([]);
		setSelectedAll(false);
	}, [data]);

	/* пересчитываем «выбрать всё» + передаём выбранные id родителю */
	useEffect(() => {
		const allSelected = data.length && data.every(i => checkboxStates[i.id]);
		setSelectedAll(allSelected);

		const ids = Object.keys(checkboxStates)
			.filter(id => checkboxStates[id])
			.map(Number);

		setSelectedIds(ids);
		onSelectedIdsChange?.(ids);
	}, [checkboxStates, data]);

	/* ───────── чек-боксы ───────── */
	const toggleAllCheckboxes = () => {
		const newVal  = !selectedAll;
		const newMap  = {};
		const newList = [];

		data.forEach(i => {
			newMap[i.id] = newVal;
			if (newVal) newList.push(i.id);
		});

		setChecks(newMap);
		setSelectedIds(newList);
		onSelectedIdsChange?.(newList);
	};

	const toggleSingleCheckbox = id =>
		setChecks(prev => ({ ...prev, [id]: !prev[id] }));

	/* ───────── REST-хелпер ───────── */
	const cfeChangeGroupStatus = (id, target = '') => {
		const query = target ? `?target_status=${target}` : '';
		return wp.apiFetch({
			path   : `${cfeSettings.field_group_status_base}/${id}/status${query}`
			         .replace(window.location.origin, ''),
			method : 'PATCH',
			headers: { 'X-WP-Nonce': cfeSettings.nonce },
		});
	};

	/* ───────── кнопки в каждой строке ───────── */
	const handleEdit = id => navigate('/cfe-settings-group', { state: { blockId: id } });

	const handleToggleStatus = id => {
		cfeChangeGroupStatus(id)
			.then(res =>
				setData(prev =>
					prev.map(p =>
						p.id === id ? { ...p, post_status: res.new_status } : p
					)
				)
			)
			.catch(err => alert(`Ошибка: ${err.message}`));
	};

	const handleDelete = id => {
		if (!window.confirm('Удалить эту группу?')) return;

		cfeChangeGroupStatus(id, 'trash')
			.then(() => {
				setData(prev => prev.filter(p => p.id !== id));
				setChecks(prev => {
					const copy = { ...prev };
					delete copy[id];
					return copy;
				});
			})
			.catch(err => alert(`Ошибка: ${err.message}`));
	};

	/* ───────── JSX ───────── */
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
									<span className={ `cfe_custom_checkbox_icon ${ selectedAll ? 'checked' : '' }` }>
										{ selectedAll && ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5Z" fill="#3858E9" /></svg> ) }
									</span>
								</label>
							</th>
							<th className="cfe-grouptable-header-title">Название</th>
							{checkboxes.description && <th className="cfe-grouptable-header-description">Описание</th>}
							{checkboxes.status      && <th className="cfe-grouptable-header-status">Статус</th>}
							{checkboxes.key         && <th className="cfe-grouptable-header-key">Ключ</th>}
							{checkboxes.location    && <th className="cfe-grouptable-header-location">Расположение</th>}
							{checkboxes.fields      && <th className="cfe-grouptable-header-fields">Поля</th>}
						</tr>
					</thead>

					<tbody>
						{data.map(item => {
							const isActive = item.post_status === 'publish';

							return (
								<tr key={item.id} className="cfe-grouptable-row">
									{/* чекбокс */}
									<td className="cfe-grouptable-cell-checkbox">
										<label>
											<input
												type="checkbox"
												checked={!!checkboxStates[item.id]}
												onChange={() => toggleSingleCheckbox(item.id)}
												className="cfe_custom_checkbox_input"
											/>
											<span className={ `cfe_custom_checkbox_icon ${ checkboxStates[ item.id ] ? 'checked' : '' }` }>
												{ checkboxStates[ item.id ] && ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5Z" fill="#3858E9" /></svg> ) }
											</span>
										</label>
									</td>

									{/* название + кнопки */}
									<td className="cfe-grouptable-cell-title">
										<div className="cfe-grouptable-item-title">
											{item.post_title}
											<div className="cfe-grouptable-item-buttons">
												<button
													className="cfe-grouptable-button cfe-grouptable-button-edit"
													onClick={() => handleEdit(item.id)}
												>
													<span>Изменить</span>
												</button>

												<button
													className={`cfe-grouptable-button cfe-grouptable-button-status ${isActive ? 'active' : 'inactive'}`}
													onClick={() => handleToggleStatus(item.id)}
												>
													<span>{isActive ? 'Деактивировать' : 'Активировать'}</span>
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

									{/* доп-колонки */}
									{checkboxes.description && <td className="cfe-grouptable-cell-description">{item.description}</td>}
									{checkboxes.status      && <td className="cfe-grouptable-cell-status"><StatusIcon status={isActive} /></td>}
									{checkboxes.key         && <td className="cfe-grouptable-cell-key">{item.post_name}</td>}
									{checkboxes.location    && <td className="cfe-grouptable-cell-location">1</td>}
									{checkboxes.fields      && <td className="cfe-grouptable-cell-fields">1</td>}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};


export default GroupTable;