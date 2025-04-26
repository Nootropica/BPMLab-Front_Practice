const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useBlockProps, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { useState, useEffect } = wp.element;
const { Button, SelectControl } = wp.components;

import './style.scss';
import './editor.scss';

const defaultItem = () => ({ id: Date.now(), label: '', url: '', target: '_self' });

registerBlockType('create-block/menu', {
  title: __('Меню'),
  icon: 'menu',
  category: 'design',
  
  attributes: {
    items: {
      type: 'array',
      default: [defaultItem()]
    },
    position: {
      type: 'string',
      default: 'top'
    },
    logoId: {
      type: 'number',
      default: 0
    },
    logoUrl: {
      type: 'string',
      default: ''
    }
  },

  edit: ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps({
      className: `wp-block-create-block-menu menu-${attributes.position}`
    });
    
    const [items, setItems] = useState(attributes.items);
    const [position, setPosition] = useState(attributes.position);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      setAttributes({ items, position });
    }, [items, position]);

    const updateItem = (id, field, value) => {
      setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => setItems([...items, defaultItem()]);
    const removeItem = (id) => setItems(items.filter(item => item.id !== id));

    const onSelectLogo = (media) => {
      setAttributes({
        logoId: media.id,
        logoUrl: media.url
      });
    };

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
      <div {...blockProps}>
        <div className="menu-editor">
          <h3>{__('Редактирование меню')}</h3>

          <div className="menu-controls">
            <SelectControl
              label={__('Позиция меню:')}
              value={position}
              options={[
                { value: 'top', label: __('Вверху') },
                { value: 'bottom', label: __('Внизу') },
                { value: 'left', label: __('Слева') },
                { value: 'right', label: __('Справа') },
              ]}
              onChange={(value) => setPosition(value)}
            />

            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectLogo}
                allowedTypes={['image']}
                value={attributes.logoId}
                render={({ open }) => (
                  <div className="logo-upload">
                    <Button onClick={open} isSecondary>
                      {attributes.logoUrl ? __('Заменить логотип') : __('Выбрать логотип')}
                    </Button>
                    {attributes.logoUrl && (
                      <div className="logo-preview">
                        <img src={attributes.logoUrl} alt={__('Логотип')} />
                      </div>
                    )}
                  </div>
                )}
              />
            </MediaUploadCheck>
          </div>

          <div className={`menu-preview ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <div className="menu-content">
              {attributes.logoUrl && (
                <div className="menu-logo">
                  <img src={attributes.logoUrl} alt={__('Логотип')} />
                </div>
              )}
              
              <button 
                className="mobile-menu-toggle" 
                onClick={toggleMobileMenu}
                aria-label={__('Переключить меню')}
              >
                <span className="hamburger"></span>
              </button>
              
              <div className="menu-items-list">
                {items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <RichText
                      tagName="div"
                      placeholder={__('Название пункта')}
                      value={item.label}
                      onChange={(value) => updateItem(item.id, 'label', value)}
                    />
                    <input
                      type="text"
                      placeholder={__('URL ссылки')}
                      value={item.url}
                      onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                    />
                    <select
                      value={item.target}
                      onChange={(e) => updateItem(item.id, 'target', e.target.value)}
                    >
                      <option value="_self">{__('Текущая вкладка')}</option>
                      <option value="_blank">{__('Новая вкладка')}</option>
                    </select>
                    <button 
                      className="components-button is-secondary"
                      onClick={() => removeItem(item.id)}
                    >
                      {__('Удалить')}
                    </button>
                  </div>
                ))}
                <button 
                  className="components-button is-primary"
                  onClick={addItem}
                >
                  {__('Добавить пункт меню')}
                </button>
              </div>
            </div>

            <div className={`mobile-menu-container ${mobileMenuOpen ? 'active' : ''}`}>
              <ul className="mobile-menu-items">
                {items.map((item) => (
                  <li key={`mobile-${item.id}`} className="mobile-menu-item">
                    <a href={item.url} target={item.target}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },

  save: ({ attributes }) => {
    const blockProps = useBlockProps.save({
      className: `wp-block-create-block-menu menu-${attributes.position}`
    });

    return (
      <nav {...blockProps}>
        <div className="menu-content">
          {attributes.logoUrl && (
            <div className="menu-logo">
              <a href="/">
                <img src={attributes.logoUrl} alt="Логотип" />
              </a>
            </div>
          )}
          
          <button className="mobile-menu-toggle" aria-label="Переключить меню">
            <span className="hamburger"></span>
          </button>
          
          <ul className="menu-items">
            {attributes.items.map(item => (
              <li key={item.id} className="menu-item">
                <a href={item.url} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : ''}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mobile-menu-container">
          <ul className="mobile-menu-items">
            {attributes.items.map(item => (
              <li key={`mobile-${item.id}`} className="mobile-menu-item">
                <a href={item.url} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : ''}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
});