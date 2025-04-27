/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/menu/view.js ***!
  \**************************/
document.addEventListener('DOMContentLoaded', () => {
  const menus = document.querySelectorAll('.wp-block-create-block-menu');
  menus.forEach(menu => {
    const position = menu.className.match(/menu-(top|bottom|left|right)/)?.[1] || 'top';
    if (position === 'top') {
      const menuHeight = menu.offsetHeight;
      document.body.style.paddingTop = `${menuHeight + 40}px`;
    } else if (position === 'bottom') {
      const menuHeight = menu.offsetHeight;
      document.body.style.paddingBottom = `${menuHeight + 40}px`;
    } else if (position === 'left') {
      document.body.style.paddingLeft = '250px';
    } else if (position === 'right') {
      document.body.style.paddingRight = '250px';
    }
  });

  // Совместимость с WordPress admin bar
  if (document.body.classList.contains('admin-bar')) {
    const adminBar = document.getElementById('wpadminbar');
    if (adminBar) {
      const adminBarHeight = adminBar.offsetHeight;
      const topMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-top');
      const leftMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-left');
      const rightMenus = document.querySelectorAll('.wp-block-create-block-menu.menu-right');
      topMenus.forEach(menu => {
        menu.style.top = `${adminBarHeight + 20}px`;
        document.body.style.paddingTop = `${menu.offsetHeight + adminBarHeight + 40}px`;
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
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-container');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      // Блокируем прокрутку страницы при открытом меню
      if (this.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Закрываем меню при клике на ссылку
  const menuLinks = document.querySelectorAll('.mobile-menu-item a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map