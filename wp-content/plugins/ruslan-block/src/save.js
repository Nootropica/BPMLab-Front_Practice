// Импортируем необходимые функции для работы с элементами и блоками
import { createElement } from '@wordpress/element'; // Для создания элементов с использованием JSX-подобного синтаксиса
import { RichText, useBlockProps } from '@wordpress/block-editor'; // Для работы с редактируемым текстом и блоковыми свойствами
import { getBlockProps } from './utils'; // Вспомогательная функция для получения свойств блока

// Функция для сохранения блока (отображение на фронтенде)
export function Save({ attributes }) {
    // Проверяем, что элементы списка — это массив, иначе используем пустой массив
    const safeItems = Array.isArray(attributes.items) ? attributes.items : [];

    // Рендерим сохранённый контент блока
    return createElement('div', useBlockProps.save(getBlockProps(attributes)), [
        // Заголовок блока
        createElement('h2', {}, attributes.title),

        // Список элементов (все элементы из attributes.items)
        createElement('ul', {}, safeItems.map((item, index) => {
            // Если элемент пустой или не имеет текста, пропускаем его
            if (!item || !item.text) return null;

            // Рендерим элемент списка
            return createElement('li', {
                key: index, // Уникальный ключ для каждого элемента списка
                style: {
                    // Стили для каждого элемента списка
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: attributes.blockPadding, // Отступы внутри элемента
                    backgroundColor: attributes.itemBackground || '#fff', // Цвет фона элемента
                    borderStyle: attributes.borderStyle, // Стиль границы
                    borderColor: attributes.borderColor, // Цвет границы
                    borderWidth: attributes.borderWidth, // Ширина границы
                    borderRadius: attributes.borderRadius // Радиус скругления углов
                }
            }, [
                // Если есть иконка, рендерим её с цветом и позиционированием
                item.icon && createElement('i', {
                    className: `fa ${item.icon}`, // Класс иконки (Font Awesome)
                    style: {
                        order: item.iconPosition === 'right' ? 1 : 0, // Позиция иконки (слева или справа)
                        color: item.iconColor || '#000000' // Цвет иконки
                    }
                }),

                // Текст элемента списка, с учётом позиции иконки
                createElement('span', {
                    style: {
                        order: item.iconPosition === 'right' ? 0 : 1 // Меняем порядок текста в зависимости от позиции иконки
                    }
                }, item.text) // Текст элемента
            ]);
        }))
    ]);
}