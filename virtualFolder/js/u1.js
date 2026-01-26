document.addEventListener("DOMContentLoaded", () => {

    /* ===== Acordeón ===== */
    document.querySelectorAll('.accordion-card').forEach(card => {
      const btn = card.querySelector('.accordion-btn');
      const content = card.querySelector('.accordion-content');
  
      if (!btn || !content) return;
  
      btn.addEventListener('click', () => {
        card.classList.toggle('active');
  
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  
    /* ===== Modal Evidencias SOA ===== */
    const modal = document.getElementById('modalEvidencias');
    const btnAbrir = document.getElementById('btnAbrirModal');
    const btnCerrar = document.getElementById('btnCerrarModal');
  
    if (modal && btnAbrir && btnCerrar) {
      btnAbrir.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'block';
      });
  
      btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
      window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  
    /* ===== Modal Tema 1 ===== */
    const modal1 = document.getElementById('modalTema1');
    const btnAbrir1 = document.getElementById('btnModalTema1');
    const btnCerrar1 = document.getElementById('cerrarModalTema1');
  
    if (modal1 && btnAbrir1 && btnCerrar1) {
      btnAbrir1.addEventListener('click', e => {
        e.preventDefault();
        modal1.style.display = 'block';
      });
  
      btnCerrar1.addEventListener('click', () => {
        modal1.style.display = 'none';
      });
    }
  
    /* ===== Modal Tema 2 ===== */
    const modal2 = document.getElementById('modalTema2');
    const btnAbrir2 = document.getElementById('btnModalTema2');
    const btnCerrar2 = document.getElementById('cerrarModalTema2');
  
    if (modal2 && btnAbrir2 && btnCerrar2) {
      btnAbrir2.addEventListener('click', e => {
        e.preventDefault();
        modal2.style.display = 'block';
      });
  
      btnCerrar2.addEventListener('click', () => {
        modal2.style.display = 'none';
      });
    }
  
    /* ===== Cerrar modales al hacer clic fuera ===== */
    window.addEventListener('click', e => {
      if (e.target === modal1) modal1.style.display = 'none';
      if (e.target === modal2) modal2.style.display = 'none';
    });
  
  });
  