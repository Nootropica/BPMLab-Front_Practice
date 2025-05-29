/**
 * ============================================================================
 *  Header.jsx
 * ────────────────────────────────────────────────────────────────────────────
 *  Верхний навбар CFE-админки.
 *
 *  Особенности:
 *    •  Страницы передаются пропом `pages` в формате
 *         [{ name: 'Список групп', url: '/' }, …]
 *    •  Навигация происходит через react-router без перезагрузки.
 *    •  Если пользователь открыл URL “/cfe-settings-group”, а такой
 *       страницы ещё нет в массиве, вызываем `handleAddPage()` – родитель
 *       добавит временную вкладку («Настройки группы»).
 *
 *  Визуальный эффект:
 *    На hover/active вокруг кнопки «расплываются» псевдо-элементы.
 *    Для плавного появления используется задержанный класс .activ
 *    (см. логику с delayedActiveIndex).
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ pages, handleAddPage }) => {
  /* ─────────────────── маршрутизация ─────────────────── */
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.search;

  /* ─────────────────── локальный state ───────────────────
   * activeIndex         – вкладка, подсвеченная цветом
   * delayedActiveIndex  – вкладка, на которую через 100 мс
   *                       навешивается класс .activ для эффекта «волны»
   */
  const [activeIndex, setActiveIndex] = useState(-1);
  const [delayedActiveIndex, setDelayedActiveIndex] = useState(-1);

  /* =========================================================================
   * 1.  Если перешли на /cfe-settings-group  →  убедимся, что вкладка есть
   * ====================================================================== */
  useEffect(() => {
    if (currentPath === '/cfe-settings-group') {
      const exists = pages.some(p => p.url === '/cfe-settings-group');
      if (!exists) {
        handleAddPage();
      }
    }
  }, [currentPath, pages]);

  /* =========================================================================
   * 2.  Подсветка активной вкладки + «delayed»-класс для анимации
   * ====================================================================== */
  useEffect(() => {
    const index = pages.findIndex(page => page.url === currentPath);
  
    setActiveIndex(index);  // мгновенная подсветка
  
    /* сбрасываем и через 100 мс ставим delayedIndex,
     чтобы transition сработал каждый раз */
    setDelayedActiveIndex(-1);
    const timeout = setTimeout(() => {
      setDelayedActiveIndex(index);
    }, 100);
  
    return () => clearTimeout(timeout);
  }, [currentPath, pages]);
  
  /* =========================================================================
   * 3.  R E N D E R
   * ====================================================================== */
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
              {/* левый «блик» */}
              <div className="cfe_header_spreading-effect-block">
                <div
                  className={`cfe_header_spreading-effect cfe_header_spreading-effect-left ${
                    isDelayedActive ? 'activ' : ''
                  }`}
                ></div>
              </div>
              {/* сама кнопка-вкладка */}
              <button
                className={`cfe_header-page ${isActive ? 'cfe_header-page-activ' : ''}`}
                onClick={() => navigate(page.url)}
              >
                {page.name}
              </button>
              {/* правый «блик» */}
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
