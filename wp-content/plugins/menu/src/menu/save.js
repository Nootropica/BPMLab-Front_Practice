import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
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
        
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            aria-label="Переключить меню"
          >
            <span className="hamburger"></span>
          </button>
        
        <ul className="menu-items">
          {attributes.items.map(item => (
            <li key={item.id} className={`menu-item ${item.submenu.length > 0 ? 'has-submenu' : ''}`}>
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
                {item.submenu.length > 0 && <span className="dropdown-arrow">▼</span>}
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