const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useBlockProps, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { useState, useEffect } = wp.element;
const { Button, SelectControl, PanelBody, PanelRow } = wp.components;

import './style.scss';
import './editor.scss';

const defaultItem = () => ({ 
  id: Date.now(), 
  label: '', 
  url: '', 
  target: '_self',
  submenu: [] 
});

const defaultSubItem = () => ({
  id: Date.now() + Math.random(),
  label: '',
  url: '',
  target: '_self'
});

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
    const [expandedItems, setExpandedItems] = useState([]);

    useEffect(() => {
      setAttributes({ items, position });
    }, [items, position]);

    const updateItem = (id, field, value) => {
      setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => setItems([...items, defaultItem()]);
    const removeItem = (id) => setItems(items.filter(item => item.id !== id));

    const addSubItem = (parentId) => {
      setItems(items.map(item => 
        item.id === parentId 
          ? { ...item, submenu: [...item.submenu, defaultSubItem()] } 
          : item
      ));
      if (!expandedItems.includes(parentId)) {
        setExpandedItems([...expandedItems, parentId]);
      }
    };

    const removeSubItem = (parentId, subItemId) => {
      setItems(items.map(item => 
        item.id === parentId 
          ? { ...item, submenu: item.submenu.filter(sub => sub.id !== subItemId) } 
          : item
      ));
    };

    const updateSubItem = (parentId, subItemId, field, value) => {
      setItems(items.map(item => 
        item.id === parentId 
          ? { 
              ...item, 
              submenu: item.submenu.map(sub => 
                sub.id === subItemId ? { ...sub, [field]: value } : sub
              ) 
            } 
          : item
      ));
    };

    const toggleSubmenu = (itemId) => {
      if (expandedItems.includes(itemId)) {
        setExpandedItems(expandedItems.filter(id => id !== itemId));
      } else {
        setExpandedItems([...expandedItems, itemId]);
      }
    };

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
                    <div className="menu-item-header">
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
                      <div className="menu-item-actions">
                        <Button 
                          className="is-secondary"
                          onClick={() => removeItem(item.id)}
                          icon="trash"
                          label={__('Удалить пункт')}
                        />
                        <Button 
                          className="is-secondary"
                          onClick={() => addSubItem(item.id)}
                          icon="plus"
                          label={__('Добавить подпункт')}
                        />
                        {item.submenu.length > 0 && (
                          <Button 
                            className="is-secondary"
                            onClick={() => toggleSubmenu(item.id)}
                            icon={expandedItems.includes(item.id) ? "arrow-up" : "arrow-down"}
                            label={__('Показать/скрыть подпункты')}
                          />
                        )}
                      </div>
                    </div>
                    
                    {item.submenu.length > 0 && (
                      <ul className="submenu" style={{ 
                        display: expandedItems.includes(item.id) ? 'block' : 'none',
                        opacity: expandedItems.includes(item.id) ? 1 : 0,
                        visibility: expandedItems.includes(item.id) ? 'visible' : 'hidden',
                        transform: expandedItems.includes(item.id) ? 'translateY(0)' : 'translateY(10px)'
                      }}>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.id} className="submenu-item">
                            <RichText
                              tagName="div"
                              placeholder={__('Название подпункта')}
                              value={subItem.label}
                              onChange={(value) => updateSubItem(item.id, subItem.id, 'label', value)}
                            />
                            <input
                              type="text"
                              placeholder={__('URL ссылки')}
                              value={subItem.url}
                              onChange={(e) => updateSubItem(item.id, subItem.id, 'url', e.target.value)}
                            />
                            <select
                              value={subItem.target}
                              onChange={(e) => updateSubItem(item.id, subItem.id, 'target', e.target.value)}
                            >
                              <option value="_self">{__('Текущая вкладка')}</option>
                              <option value="_blank">{__('Новая вкладка')}</option>
                            </select>
                            <Button 
                              className="is-secondary"
                              onClick={() => removeSubItem(item.id, subItem.id)}
                              icon="trash"
                              label={__('Удалить подпункт')}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                <Button 
                  className="is-primary"
                  onClick={addItem}
                  icon="plus"
                >
                  {__('Добавить пункт меню')}
                </Button>
              </div>
            </div>

            <div className={`mobile-menu-container ${mobileMenuOpen ? 'active' : ''}`}>
              <ul className="mobile-menu-items">
                {items.map((item) => (
                  <li key={`mobile-${item.id}`} className="mobile-menu-item">
                    <a href={item.url} target={item.target}>
                      {item.label}
                    </a>
                    {item.submenu.length > 0 && (
                      <ul className="mobile-submenu">
                        {item.submenu.map((subItem) => (
                          <li key={`mobile-sub-${subItem.id}`} className="mobile-submenu-item">
                            <a href={subItem.url} target={subItem.target}>
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
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
              <li key={item.id} className="menu-item has-submenu">
                <a href={item.url} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : ''}>
                  {item.label}
                  {item.submenu.length > 0 && <span className="dropdown-arrow">▼</span>}
                </a>
                {item.submenu.length > 0 && (
                  <ul className="submenu">
                    {item.submenu.map(subItem => (
                      <li key={subItem.id} className="submenu-item">
                        <a href={subItem.url} target={subItem.target} rel={subItem.target === '_blank' ? 'noopener noreferrer' : ''}>
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
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
                {item.submenu.length > 0 && (
                  <ul className="mobile-submenu">
                    {item.submenu.map(subItem => (
                      <li key={`mobile-sub-${subItem.id}`} className="mobile-submenu-item">
                        <a href={subItem.url} target={subItem.target} rel={subItem.target === '_blank' ? 'noopener noreferrer' : ''}>
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
});