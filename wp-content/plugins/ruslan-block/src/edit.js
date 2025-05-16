// Импортируем необходимые функции из WordPress и компоненты
import { createElement, Fragment } from '@wordpress/element'; // createElement для JSX-подобного синтаксиса
import { RichText, useBlockProps } from '@wordpress/block-editor'; // RichText для редактируемого текста и useBlockProps для получения свойств блока
import { BlockInspector } from './inspector'; // Панель настроек блока, импортируем из файла inspector.js
import IconPicker from './components/icon-picker'; // Компонент для выбора иконки

// Основная функция редактирования блока
export function Edit({ attributes, setAttributes }) {
    // Проверка и подготовка массива элементов
    const safeItems = Array.isArray(attributes.items) ? attributes.items : [];

    // Функция для обновления данных элемента в массиве (по индексу и ключу)
    const updateItem = (index, key, value) => {
        const updated = [...safeItems]; // Делаем копию массива элементов
        updated[index][key] = value; // Обновляем значение по индексу и ключу
        setAttributes({ items: updated }); // Обновляем атрибуты блока
    };

    // Функция для добавления нового элемента в массив
    const addItem = () => setAttributes({
        items: [...safeItems, { text: '', icon: '', iconPosition: 'left', iconColor: '#000000' }]
    });

    // Функция для удаления элемента по индексу
    const removeItem = index =>
        setAttributes({ items: safeItems.filter((_, i) => i !== index) }); // Отфильтровываем элемент с указанным индексом

    // Рендеринг одного элемента списка
    const renderItem = (item, index) =>
        createElement('li', {
            key: index,
            style: { 
                // Стили для каждого элемента
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                alignItems: 'center',
                padding: attributes.blockPadding,
                backgroundColor: attributes.itemBackground,
                marginBottom: '8px',
                borderStyle: attributes.borderStyle,
                borderColor: attributes.borderColor,
                borderWidth: attributes.borderWidth,
                borderRadius: attributes.borderRadius
            }
        }, [
            // Компонент выбора иконки
            createElement(IconPicker, {
                value: item.icon || '', // Значение иконки по умолчанию
                color: item.iconColor || '#000000', // Цвет иконки
                position: item.iconPosition || 'left', // Позиция иконки (слева или справа)
                onChange: icon => updateItem(index, 'icon', icon), // Обновление иконки
                onColorChange: color => updateItem(index, 'iconColor', color), // Обновление цвета иконки
                onPositionChange: pos => updateItem(index, 'iconPosition', pos) // Обновление позиции иконки
            }),
            // Компонент для редактирования текста элемента
            createElement(RichText, {
                tagName: 'span', // Используем span для текста
                value: item.text, // Значение текста
                onChange: text => updateItem(index, 'text', text), // Обновление текста
                placeholder: 'Введите текст...' // Плейсхолдер
            }),
            // Кнопка для удаления элемента
            createElement('button', {
                onClick: () => removeItem(index), // Удаление элемента по индексу
                style: {
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer'
                }
            }, 'Удалить')
        ]);

    return createElement(Fragment, null, [
        // Вставляем Inspector для отображения панели настроек
        createElement(BlockInspector, { attributes, setAttributes }),

        // Основной блок с редактируемым содержимым
        createElement('div', useBlockProps({
            className: 'ruslan-editable-block',
            style: {
                '--ruslan-font-size': attributes.fontSize,
                '--ruslan-font-family': attributes.fontFamily,
                '--ruslan-text-color': attributes.textColor,
                width: attributes.blockWidth
            }
        }), [
            // Редактируемый заголовок блока
            createElement(RichText, {
                tagName: 'h2', // Заголовок будет в теге h2
                value: attributes.title, // Значение заголовка
                onChange: newTitle => setAttributes({ title: newTitle }), // Обновление заголовка
                placeholder: 'Введите заголовок...' // Плейсхолдер
            }),

            // Список элементов
            createElement('ul', {}, safeItems.map(renderItem)), // Отображаем все элементы списка

            // Кнопка для добавления нового элемента
            createElement('button', {
                onClick: addItem,
                style: {
                    marginTop: '10px',
                    backgroundColor: '#007cba',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            }, 'Добавить элемент')
        ])
    ]);
}