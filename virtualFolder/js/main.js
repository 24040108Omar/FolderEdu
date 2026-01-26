/* ===============================
   main.js (CORREGIDO)
   =============================== */

   document.addEventListener("DOMContentLoaded", () => {

    /* ===== 1) Scroll suave para anclas (Inicio / Unidades) =====
       - Funciona para links con href="#algo"
       - No interfiere con el fade-out porque el fade-out ignora #anclas
    */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
  
        const el = document.querySelector(href);
        if (!el) return;
  
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  
    /* ===== 2) Botón contacto (solo si existe y es button) =====
       - En tu index ya usas <a href="contacto.html">, entonces esto no molesta.
    */
    const btnContacto = document.getElementById("btnContacto");
    if (btnContacto) {
      btnContacto.addEventListener("click", () => {
        alert("Contacto: lo definimos después.");
      });
    }
  
    /* ===== 3) Transición entre páginas (fade in / fade out) ===== */
    const main = document.querySelector(".page-transition");
    if (main) {
      // Entrada suave
      requestAnimationFrame(() => {
        main.classList.add("is-ready");
      });
  
      // Interceptar clicks a links internos para hacer salida suave
      document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
  
        const href = a.getAttribute("href");
        const target = a.getAttribute("target");
  
        // Ignorar: externos, anclas (#), mailto/tel, nuevas pestañas, descargas
        if (!href) return;
        if (target === "_blank") return;
        if (href.startsWith("#")) return;
        if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
        if (a.hasAttribute("download")) return;
  
        // Solo links internos del proyecto (html)
        const isInternalPage = href.endsWith(".html") || href.includes(".html#");
        if (!isInternalPage) return;
  
        e.preventDefault();
  
        // Salida suave
        main.classList.add("is-leaving");
  
        // Esperar a que termine la transición y navegar
        setTimeout(() => {
          window.location.href = href;
        }, 260);
      });
    }
  
    /* ===== 4) Scroll reveal (info cards) ===== */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 120;
  
        reveals.forEach(el => {
          const revealTop = el.getBoundingClientRect().top;
          if (revealTop < windowHeight - revealPoint) {
            el.classList.add("active");
          }
        });
      };
  
      window.addEventListener("scroll", revealOnScroll);
      revealOnScroll();
    }
  
  });
  