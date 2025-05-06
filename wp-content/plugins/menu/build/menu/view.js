/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/menu/view.js ***!
  \**************************/
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация меню
  const menus = document.querySelectorAll('.wp-block-create-block-menu');
  menus.forEach(menu => {
    const position = menu.className.match(/menu-(top|bottom|left|right)/)?.[1] || 'top';

    // Обработка подменю
    const menuItems = menu.querySelectorAll('.menu-item.has-submenu');
    menuItems.forEach(item => {
      const submenu = item.querySelector('.submenu');
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768 && submenu) {
          submenu.style.display = 'block';
          setTimeout(() => {
            submenu.style.opacity = '1';
            submenu.style.visibility = 'visible';
            submenu.style.transform = position === 'bottom' ? 'translateY(-10px)' : 'translateY(0)';
          }, 10);
        }
      });
      item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768 && submenu) {
          submenu.style.opacity = '0';
          submenu.style.visibility = 'hidden';
          submenu.style.transform = position === 'bottom' ? 'translateY(10px)' : 'translateY(-10px)';
          setTimeout(() => {
            submenu.style.display = 'none';
          }, 300);
        }
      });
    });

    // Обработка мобильного меню
    const mobileMenuToggle = menu.querySelector('.mobile-menu-toggle');
    const mobileMenu = menu.querySelector('.mobile-menu-container');
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', e => {
        e.preventDefault();
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      });
    }
    const mobileMenuItems = menu.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
      if (item.querySelector('.mobile-submenu')) {
        const link = item.querySelector('a');
        link.addEventListener('click', e => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            const submenu = item.querySelector('.mobile-submenu');
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
          }
        });
      }
    });
  });

  // Совместимость с WordPress admin bar
  if (document.body.classList.contains('admin-bar')) {
    const adminBar = document.getElementById('wpadminbar');
    if (adminBar) {
      const adminBarHeight = adminBar.offsetHeight;
      const topMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-top');
      const bottomMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-bottom');
      const leftMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-left');
      const rightMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-right');
      topMenus.forEach(menu => {
        menu.style.top = `${adminBarHeight}px`;
      });
      bottomMenus.forEach(menu => {
        menu.style.bottom = '0';
      });
      leftMenus.forEach(menu => {
        menu.style.top = `${adminBarHeight}px`;
        menu.style.height = `calc(100vh - ${adminBarHeight}px)`;
      });
      rightMenus.forEach(menu => {
        menu.style.top = `${adminBarHeight}px`;
        menu.style.height = `calc(100vh - ${adminBarHeight}px)`;
      });
    }
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map