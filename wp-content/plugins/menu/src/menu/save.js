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