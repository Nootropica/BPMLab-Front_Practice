// Импортируем необходимые функции из WordPress и компоненты
import { createElement } from '@wordpress/element'; // createElement для JSX-подобного синтаксиса
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor'; // Для панели настроек и выбора цветов
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components'; // Для отображения различных элементов управления (панели, селекторы и ползунки)

// Компонент, который рендерит панель настроек для блока
export function BlockInspector({ attributes, setAttributes }) {
    // Деструктуризация атрибутов блока
    const {
        fontSize, fontFamily, blockWidth, blockPadding,
        borderStyle, borderColor, borderWidth, borderRadius,
        textColor, itemBackground
    } = attributes;

    return createElement(InspectorControls, {}, [
        // Панель настроек для стиля блока
        createElement(PanelBody, { title: 'Настройки стиля блока' }, [
            // Селектор для размера шрифта
            createElement(SelectControl, {
                label: 'Размер шрифта',
                value: fontSize, // Значение текущего шрифта
                options: [ // Доступные варианты размеров шрифта
                    { label: '16px', value: '16px' },
                    { label: '20px', value: '20px' },
                    { label: '24px', value: '24px' },
                    { label: '28px', value: '28px' },
                    { label: '32px', value: '32px' },
                    { label: '36px', value: '36px' },
                    { label: '48px', value: '48px' }
                ],
                // При изменении размера шрифта, обновляем атрибуты
                onChange: value => setAttributes({ fontSize: value })
            }),

            // Селектор для шрифта
            createElement(SelectControl, {
                label: 'Шрифт',
                value: fontFamily,
                options: [
                    { label: 'Open Sans', value: 'Open Sans' },
                    { label: 'Arial', value: 'Arial' },
                    { label: 'Georgia', value: 'Georgia' },
                    { label: 'Verdana', value: 'Verdana' },
                    { label: 'Tahoma', value: 'Tahoma' },
                    { label: 'Times New Roman', value: 'Times New Roman' },
                    { label: 'Courier New', value: 'Courier New' }
                ],
                // При изменении шрифта, обновляем атрибуты
                onChange: value => setAttributes({ fontFamily: value })
            }),

            // Ползунок для изменения ширины блока
            createElement(RangeControl, {
                label: 'Ширина блока (px)',
                value: parseInt(blockWidth, 10), // Значение ширины блока
                min: 200, // Минимальная ширина
                max: 1200, // Максимальная ширина
                step: 10, // Шаг изменения ширины
                // При изменении ширины, обновляем атрибуты
                onChange: value => setAttributes({ blockWidth: `${value}px` })
            }),

            // Селектор для отступов внутри элемента списка
            createElement(SelectControl, {
                label: 'Отступ внутри элемента списка',
                value: blockPadding,
                options: [
                    { label: '8px', value: '8px' },
                    { label: '12px', value: '12px' },
                    { label: '20px', value: '20px' },
                    { label: '32px', value: '32px' }
                ],
                // При изменении отступа, обновляем атрибуты
                onChange: value => setAttributes({ blockPadding: value })
            })
        ]),

        // Панель настроек для границ элементов списка
        createElement(PanelBody, { title: 'Границы элементов списка', initialOpen: false }, [
            // Селектор для стиля границы
            createElement(SelectControl, {
                label: 'Стиль границы',
                value: borderStyle,
                options: [
                    { label: 'Нет', value: 'none' },
                    { label: 'Сплошная', value: 'solid' },
                    { label: 'Пунктирная', value: 'dashed' },
                    { label: 'Точечная', value: 'dotted' }
                ],
                // При изменении стиля границы, обновляем атрибуты
                onChange: value => setAttributes({ borderStyle: value })
            }),

            // Выбор цвета границы
            createElement('label', {}, 'Цвет границы:'),
            createElement('input', {
                type: 'color',
                value: borderColor,
                // При изменении цвета границы, обновляем атрибуты
                onChange: e => setAttributes({ borderColor: e.target.value })
            }),

            // Селектор для ширины границы
            createElement(SelectControl, {
                label: 'Ширина границы (CSS)',
                value: borderWidth,
                options: [
                    { label: 'Без границ', value: '0px' },
                    { label: '0 1px 1px 1px', value: '0px 1px 1px 1px' },
                    { label: '1px', value: '1px' },
                    { label: '2px', value: '2px' }
                ],
                // При изменении ширины границы, обновляем атрибуты
                onChange: value => setAttributes({ borderWidth: value })
            }),

            // Селектор для радиуса границ
            createElement(SelectControl, {
                label: 'Радиус границы',
                value: borderRadius,
                options: [
                    { label: 'Нет', value: '0px' },
                    { label: '3px', value: '3px' },
                    { label: '4px', value: '4px' },
                    { label: '8px', value: '8px' },
                    { label: '12px', value: '12px' }
                ],
                // При изменении радиуса границы, обновляем атрибуты
                onChange: value => setAttributes({ borderRadius: value })
            })
        ]),

        // Панель настроек для цветов текста и фона
        createElement(PanelColorSettings, {
            title: 'Цвета',
            colorSettings: [
                // Селектор для изменения цвета текста
                {
                    label: 'Цвет текста',
                    value: textColor,
                    onChange: value => setAttributes({ textColor: value }),
                    colors: [
                        { name: 'Белый', color: '#ffffff' },
                        { name: 'Чёрный', color: '#000000' },
                        { name: 'Бирюзовый (lending-ngtu)', color: '#34D1BF' },
                        { name: 'Розовый (lending-ngtu)', color: '#FF5470' },
                        { name: 'Жёлтый (lending-ngtu)', color: '#FDE24F' },
                        { name: 'Тёмно-синий (lending-ngtu)', color: '#00214D' }
                    ]
                },
                // Селектор для изменения цвета фона элементов списка
                {
                    label: 'Цвет фона элементов списка',
                    value: itemBackground,
                    onChange: value => setAttributes({ itemBackground: value }),
                    colors: [
                        { name: 'Белый', color: '#ffffff' },
                        { name: 'Бирюзовый (lending-ngtu)', color: '#34D1BF' },
                        { name: 'Розовый (lending-ngtu)', color: '#FF5470' },
                        { name: 'Жёлтый (lending-ngtu)', color: '#FDE24F' },
                        { name: 'Тёмно-синий (lending-ngtu)', color: '#00214D' }
                    ]
                }
            ]
        })
    ]);
}