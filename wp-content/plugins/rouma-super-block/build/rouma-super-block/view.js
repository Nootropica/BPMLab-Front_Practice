/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/rouma-super-block/view.js ***!
  \***************************************/
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Инициализация
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease, padding-top 0.3s ease';
    question.addEventListener('click', function () {
      // Переключаем класс active
      item.classList.toggle('active');

      // Анимация раскрытия
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        setTimeout(() => {
          answer.style.overflow = 'visible';
        }, 300);
      } else {
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map