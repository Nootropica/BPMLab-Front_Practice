// Функция для получения свойств блока (например, классы и стили)
export const getBlockProps = (attributes) => {
    // Извлекаем необходимые атрибуты из объекта attributes
    const { fontSize, fontFamily, textColor, blockWidth } = attributes;

    // Возвращаем объект с классами и стилями для блока
    return {
        className: 'ruslan-editable-block', // Класс для блока
        style: {
            // В CSS переменные, которые будут использованы для кастомизации стилей
            '--ruslan-font-size': fontSize, // Размер шрифта
            '--ruslan-font-family': fontFamily, // Шрифт
            '--ruslan-text-color': textColor, // Цвет текста
            width: blockWidth // Ширина блока
        }
    };
};

// Функция для получения стилей каждого элемента списка
export const getItemStyle = (attributes) => {
    // Извлекаем необходимые атрибуты для стилей элементов
    const { blockPadding, itemBackground, borderStyle, borderColor, borderWidth, borderRadius } = attributes;

    // Возвращаем объект с стилями для элементов списка
    return {
        display: 'flex', // Используем flex для выравнивания элементов
        flexWrap: 'wrap', // Элементы могут переноситься на новые строки
        gap: '10px', // Расстояние между элементами
        alignItems: 'center', // Центрируем элементы по вертикали
        padding: blockPadding, // Отступы внутри элемента
        backgroundColor: itemBackground, // Цвет фона элемента
        marginBottom: '8px', // Отступ снизу для каждого элемента
        borderStyle, // Стиль границы элемента (например, сплошная, пунктирная)
        borderColor, // Цвет границы
        borderWidth, // Ширина границы
        borderRadius // Радиус скругления углов
    };
};