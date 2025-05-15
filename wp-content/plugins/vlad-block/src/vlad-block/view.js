document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.vlad-products-block .product-price').forEach(el => {
	  let text = el.textContent.trim();
	  text = text.replace(/\s*₽\s*/g, '').trim();
	  if (text) el.textContent = text + ' ₽';
	});
  
	let overlay = document.querySelector('.modal-overlay');
	if (!overlay) {
	  overlay = document.createElement('div');
	  overlay.className = 'modal-overlay';
	  document.body.appendChild(overlay);
	}
  
	document.querySelectorAll('.vlad-products-block .product-button').forEach(button => {
	  button.addEventListener('click', (e) => {
		e.preventDefault();
		const modal = e.target.closest('.product-card').querySelector('.product-modal-content');
		
		document.querySelectorAll('.product-modal-content.visible').forEach(m => {
		  if (m !== modal) m.classList.remove('visible');
		});
		
		modal.classList.add('visible');
		overlay.classList.add('visible');
		document.body.style.overflow = 'hidden';
	  });
	});
  
	document.addEventListener('click', (e) => {
	  if (e.target.closest('.modal-close-button')) {
		e.preventDefault();
		closeAllModals();
	  }
	  else if (e.target === overlay) {
		closeAllModals();
	  }
	});
  
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