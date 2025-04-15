/*
Блок Хедера, с добавлением дополнительных страниц если необходимо
процесс навигации происходит без перехода на новую страницу
*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ pages }) => {
  //контроль локации пользователя
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.search;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [delayedActiveIndex, setDelayedActiveIndex] = useState(-1);

  useEffect(() => {
    const index = pages.findIndex(page => page.url === currentPath);
  
    setActiveIndex(index);
  
    setDelayedActiveIndex(-1);
  
    const timeout = setTimeout(() => {
      setDelayedActiveIndex(index);
    }, 100);
  
    return () => clearTimeout(timeout);
  }, [currentPath, pages]);
  // Возвращаем содержимое страницы
  return (
    <header className="cfe_header">
      <div className="cfe_header-title">CFE</div>
      <div className="cfe_header_pages">
        {/* Создаём столько страниц сколько в таблице лежит */}
        {pages.map((page, index) => {
          const isActive = index === activeIndex;
          const isDelayedActive = index === delayedActiveIndex;

          return (
            <React.Fragment key={index}>
              <div className="cfe_header_spreading-effect-block">
                <div
                  className={`cfe_header_spreading-effect cfe_header_spreading-effect-left ${
                    isDelayedActive ? 'activ' : ''
                  }`}
                ></div>
              </div>

              <button
                className={`cfe_header-page ${isActive ? 'cfe_header-page-activ' : ''}`}
                onClick={() => navigate(page.url)}
              >
                {page.name}
              </button>

              <div className="cfe_header_spreading-effect-block">
              <div
                className={`cfe_header_spreading-effect cfe_header_spreading-effect-right ${
                  isDelayedActive ? 'activ' : ''
                }`}
              />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
