document.addEventListener('DOMContentLoaded', () => {
	// Исправление дублирования рубля
	document.querySelectorAll('.vlad-products-block .product-price').forEach(el => {
	  let text = el.textContent.trim();
	  text = text.replace(/\s*₽\s*/g, '').trim();
	  if (text) el.textContent = text + ' ₽';
	});
  
	// Создаем оверлей, если его еще нет
	let overlay = document.querySelector('.modal-overlay');
	if (!overlay) {
	  overlay = document.createElement('div');
	  overlay.className = 'modal-overlay';
	  document.body.appendChild(overlay);
	}
  
	// Обработка кнопок для показа модального окна
	document.querySelectorAll('.vlad-products-block .product-button').forEach(button => {
	  button.addEventListener('click', (e) => {
		e.preventDefault();
		const modal = e.target.closest('.product-card').querySelector('.product-modal-content');
		
		// Закрываем другие открытые модальные окна
		document.querySelectorAll('.product-modal-content.visible').forEach(m => {
		  if (m !== modal) m.classList.remove('visible');
		});
		
		// Открываем текущее модальное окно и оверлей
		modal.classList.add('visible');
		overlay.classList.add('visible');
		document.body.style.overflow = 'hidden';
	  });
	});
  
	// Обработка закрытия
	document.addEventListener('click', (e) => {
	  // Кнопка закрытия
	  if (e.target.closest('.modal-close-button')) {
		e.preventDefault();
		closeAllModals();
	  }
	  // Клик вне модального окна (на оверлее)
	  else if (e.target === overlay) {
		closeAllModals();
	  }
	});
  
	// Закрытие по ESC
	document.addEventListener('keydown', (e) => {
	  if (e.key === 'Escape') closeAllModals();
	});
  
	function closeAllModals() {
	  document.querySelectorAll('.product-modal-content.visible').forEach(modal => {
		modal.classList.remove('visible');
	  });
	  overlay.classList.remove('visible');
	  document.body.style.overflow = '';
	}
  });