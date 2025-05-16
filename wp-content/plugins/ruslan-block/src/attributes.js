export const blockAttributes = {
    // Заголовок блока
    title: { 
        type: 'string',
        default: 'НГТУ' // Значение по умолчанию
    },

    // Элементы списка (массив объектов с текстом и иконками)
    items: {
        type: 'array', // Тип атрибута: массив
        default: [ // Значения по умолчанию
            { text: 'современный', icon: 'fa-calendar', iconPosition: 'left', iconColor: '#000000' },
            { text: 'крутой', icon: 'fa-user', iconPosition: 'left', iconColor: '#000000' },
            { text: 'образовательный', icon: 'fa-book', iconPosition: 'left', iconColor: '#000000' },
            { text: 'интернациональный', icon: 'fa-plane', iconPosition: 'left', iconColor: '#000000' }
        ]
    },

    // Размер шрифта блока
    fontSize: { 
        type: 'string', 
        default: '32px' // Значение по умолчанию
    },

    // Шрифт для текста блока
    fontFamily: { 
        type: 'string', 
        default: 'Open Sans' // Шрифт по умолчанию
    },

    // Ширина блока
    blockWidth: { 
        type: 'string', 
        default: '747px' // Ширина блока по умолчанию
    },

    // Отступы внутри блока
    blockPadding: { 
        type: 'string', 
        default: '12px' // Отступы по умолчанию
    },

    // Цвет текста блока
    textColor: { 
        type: 'string', 
        default: '#000000' // Цвет текста по умолчанию
    },

    // Цвет фона элементов списка
    itemBackground: { 
        type: 'string', 
        default: '#ffffff' // Цвет фона по умолчанию
    },

    // Стиль границы блока
    borderStyle: { 
        type: 'string', 
        default: 'solid' // Стиль границы по умолчанию (сплошная линия)
    },

    // Цвет границы блока
    borderColor: { 
        type: 'string', 
        default: '#00214D' // Цвет границы по умолчанию
    },

    // Ширина границы блока
    borderWidth: { 
        type: 'string', 
        default: '0px 1px 1px 1px' // Ширина границы по умолчанию
    },

    // Радиус границ блока
    borderRadius: { 
        type: 'string', 
        default: '3px' // Радиус углов блока по умолчанию
    }
};