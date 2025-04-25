const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { RichText } = wp.blockEditor;

registerBlockType('ruslan/editable-block', {
    title: 'Ruslan Editable Block',
    icon: 'edit',
    category: 'widgets',
    attributes: {
        title: {
            type: 'string',
            default: 'НГТУ'
        },
        items: {
            type: 'array',
            default: [
                { text: 'современный' },
                { text: 'крутой' },
                { text: 'образовательный' },
                { text: 'интернациональный' }
            ]
        }
    },

    edit({ attributes, setAttributes }) {
        const { title, items } = attributes;

        const onChangeTitle = (newTitle) => {
            setAttributes({ title: newTitle });
        };

        const updateItemText = (index, newText) => {
            const updated = [...items];
            updated[index].text = newText;
            setAttributes({ items: updated });
        };

        const addItem = () => {
            setAttributes({ items: [...items, { text: '' }] });
        };

        const removeItem = (index) => {
            const updated = items.filter((_, i) => i !== index);
            setAttributes({ items: updated });
        };

        return createElement(
            'div',
            {
                className: 'ruslan-editable-block',
                style: {
                    backgroundColor: '#f0f8ff',
                    border: '2px solid #007cba',
                    padding: '20px',
                    borderRadius: '8px'
                }
            },
            [
                // Заголовок
                createElement(RichText, {
                    tagName: 'h2',
                    value: title,
                    onChange: onChangeTitle,
                    placeholder: 'Введите заголовок...',
                    style: { fontSize: '24px', color: '#333', marginBottom: '15px' }
                }),

                // Список
                ...items.map((item, index) =>
                    createElement('div', {
                        key: index,
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '8px'
                        }
                    }, [
                        createElement(RichText, {
                            tagName: 'span',
                            value: item.text,
                            onChange: (newText) => updateItemText(index, newText),
                            placeholder: 'Введите текст...'
                        }),
                        createElement('button', {
                            onClick: () => removeItem(index),
                            style: {
                                backgroundColor: '#ff4d4f',
                                color: '#fff',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }
                        }, 'Удалить')
                    ])
                ),

                // Кнопка добавления
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
            ]
        );
    },

    save({ attributes }) {
        const { title, items } = attributes;

        return createElement(
            'div',
            {
                className: 'ruslan-editable-block',
                style: {
                    backgroundColor: '#f0f8ff',
                    border: '2px solid #007cba',
                    padding: '20px',
                    borderRadius: '8px'
                }
            },
            [
                createElement('h2', {
                    style: { fontSize: '24px', color: '#333', marginBottom: '15px' }
                }, title),
                createElement('ul', {
                    style: { fontSize: '18px', paddingLeft: '20px' }
                }, items.map((item, index) =>
                    createElement('li', { key: index }, item.text)
                ))
            ]
        );
    }
});
