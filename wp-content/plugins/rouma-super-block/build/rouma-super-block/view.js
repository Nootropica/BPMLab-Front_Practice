/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/rouma-super-block/view.js ***!
  \***************************************/
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-item__header');
      const content = item.querySelector('.faq-item__content');
      const answer = item.querySelector('.faq-item__answer');
      const arrow = item.querySelector('.faq-item__arrow');
      header.addEventListener('click', () => {
        item.classList.toggle('is-open');
        if (item.classList.contains('is-open')) {
          // Устанавливаем точную высоту для плавной анимации
          content.style.setProperty('--content-height', `${answer.scrollHeight}px`);
        } else {
          content.style.removeProperty('--content-height');
        }
      });
    });
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map