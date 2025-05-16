// Импорт React-подобных хуков и createElement под псевдонимом el
import { createElement as el, useState } from '@wordpress/element';

// Компонент выбора иконки
function IconPicker({ value, color, position, onChange, onColorChange, onPositionChange }) {
    // Категории иконок
    const iconCategories = {
        'Университет': ['fa-university', 'fa-graduation-cap', 'fa-book', 'fa-users', 'fa-chalkboard-teacher', 'fa-building-columns'],
        'Технологии': ['fa-laptop', 'fa-code', 'fa-cogs', 'fa-cloud', 'fa-rocket', 'fa-microchip', 'fa-wifi'],
        'Общие': ['fa-user', 'fa-star', 'fa-plane', 'fa-calendar', 'fa-heart', 'fa-lightbulb', 'fa-comment', 'fa-check'],
        'Наука': ['fa-atom', 'fa-flask', 'fa-dna', 'fa-microscope', 'fa-vial']
    };

    // Предустановленные цвета для быстрого выбора
    const predefinedColors = [
        ['#34D1BF', 'Бирюзовый (lending-ngtu)'],
        ['#FF5470', 'Розовый (lending-ngtu)'],
        ['#FDE24F', 'Жёлтый (lending-ngtu)'],
        ['#00214D', 'Тёмно-синий (lending-ngtu)']
    ];

    // Локальное состояние для управления временными значениями
    const [showPicker, setShowPicker] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Университет');
    const [tempIcon, setTempIcon] = useState(value || '');
    const [tempColor, setTempColor] = useState(color || '#000000');
    const [tempPosition, setTempPosition] = useState(position || 'left');

    const icons = iconCategories[selectedCategory] || [];

    // Если окно выбора иконки скрыто — отображается кнопка открытия и текущая иконка
    if (!showPicker) {
        return el('div', {
            style: { marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }
        }, [
            el('button', {
                onClick: () => setShowPicker(true)
            }, value ? 'Изменить иконку' : 'Добавить иконку'),

            value && el('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }
            }, [
                el('span', { style: { fontSize: '14px' } }, 'Текущая иконка:'),
                el('i', {
                    className: `fa ${value}`,
                    style: {
                        fontSize: '24px',
                        color: color
                    }
                })
            ])
        ]);
    }

    // Полный интерфейс выбора иконки
    return el('div', { className: 'icon-picker-wrapper' }, [

        // Выбор категории иконок
        el('label', {}, 'Категория иконки:'),
        el('select', {
            value: selectedCategory,
            onChange: e => setSelectedCategory(e.target.value)
        }, Object.keys(iconCategories).map(cat =>
            el('option', { key: cat, value: cat }, cat)
        )),

        // Селектор иконки из выбранной категории
        el('label', {}, 'Выберите иконку:'),
        el('select', {
            value: tempIcon,
            onChange: e => setTempIcon(e.target.value)
        }, [
            el('option', { value: '' }, 'Без иконки'),
            ...icons.map(icon =>
                el('option', { key: icon, value: icon }, icon.replace('fa-', ''))
            )
        ]),

        // Блок предустановленных цветов
        el('label', {}, 'Цвет иконки:'),
        el('div', {
            style: { display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }
        }, predefinedColors.map(([colorCode, name]) =>
            el('button', {
                key: colorCode,
                type: 'button',
                onClick: () => setTempColor(colorCode),
                title: name,
                style: {
                    width: '24px',
                    height: '24px',
                    backgroundColor: colorCode,
                    border: tempColor === colorCode ? '2px solid black' : '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            })
        )),

        // Поле выбора произвольного цвета
        el('input', {
            type: 'color',
            value: tempColor,
            onChange: e => setTempColor(e.target.value)
        }),

        // Расположение иконки
        el('label', {}, 'Расположение иконки:'),
        el('select', {
            value: tempPosition,
            onChange: e => setTempPosition(e.target.value)
        }, [
            el('option', { value: 'left' }, 'Слева'),
            el('option', { value: 'right' }, 'Справа')
        ]),

        // Кнопки управления
        el('div', { className: 'button-row' }, [
            el('button', {
                onClick: () => {
                    onChange(tempIcon);
                    onColorChange(tempColor);
                    onPositionChange(tempPosition);
                    setShowPicker(false);
                }
            }, 'Сохранить'),

            el('button', {
                onClick: () => setShowPicker(false)
            }, 'Отмена')
        ])
    ]);
}

// Экспорт компонента
export default IconPicker;