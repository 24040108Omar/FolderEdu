// ═══════════════════════════════════════════════════════════
// JAVASCRIPT COMPLETO PARA UNIDAD 2
// TODO INCLUIDO: Acordeones, Modales, Scroll, Animaciones
// ═══════════════════════════════════════════════════════════

console.log('✅ u2.js cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM cargado - Inicializando funcionalidades...');

    // ═══════════════════════════════════════════════════════════
    // 1. FUNCIONALIDAD DE ACORDEONES
    // ═══════════════════════════════════════════════════════════
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    console.log(`📂 Acordeones encontrados: ${accordionBtns.length}`);

    accordionBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log(`🔘 Click en acordeón ${index + 1}`);
            
            // Obtener el contenido del acordeón
            const content = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            
            // Toggle del acordeón actual
            this.classList.toggle('active');
            
            // Cambiar el icono y altura
            if (this.classList.contains('active')) {
                icon.textContent = '−';
                content.style.maxHeight = content.scrollHeight + 'px';
                console.log(`✅ Acordeón ${index + 1} ABIERTO`);
            } else {
                icon.textContent = '+';
                content.style.maxHeight = '0';
                console.log(`✅ Acordeón ${index + 1} CERRADO`);
            }
        });
    });

    // ═══════════════════════════════════════════════════════════
    // 2. FUNCIONALIDAD DE MODALES
    // ═══════════════════════════════════════════════════════════
    
    // Función genérica para manejar modales
    function inicializarModal(btnId, modalId, cerrarId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const cerrar = document.getElementById(cerrarId);

        if (!btn || !modal || !cerrar) {
            console.warn(`⚠️ Modal ${modalId} no encontrado`);
            return;
        }

        console.log(`✅ Modal ${modalId} inicializado`);

        // Abrir modal
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log(`📂 Modal ${modalId} ABIERTO`);
        });

        // Cerrar modal con botón X
        cerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log(`✖️ Modal ${modalId} CERRADO`);
        });

        // Cerrar modal clickeando fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                console.log(`✖️ Modal ${modalId} CERRADO (click fuera)`);
            }
        });
    }

    // Inicializar modales
    inicializarModal('btnModalTema1', 'modalTema1', 'cerrarModalTema1');
    inicializarModal('btnModalTema2', 'modalTema2', 'cerrarModalTema2');
    inicializarModal('btnModalTema3', 'modalTema3', 'cerrarModalTema3');
    inicializarModal('btnModalTema4', 'modalTema4', 'cerrarModalTema4');

    // ═══════════════════════════════════════════════════════════
    // 3. CERRAR MODALES CON TECLA ESC
    // ═══════════════════════════════════════════════════════════
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modalesAbiertos = document.querySelectorAll('.modal');
            let cerrados = 0;
            
            modalesAbiertos.forEach(function(modal) {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    cerrados++;
                }
            });
            
            if (cerrados > 0) {
                console.log(`✖️ ${cerrados} modal(es) cerrado(s) con ESC`);
            }
        }
    });

    // ═══════════════════════════════════════════════════════════
    // 4. SCROLL SUAVE PARA ANCLAS
    // ═══════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            const el = document.querySelector(href);
            if (!el) return;

            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            console.log(`🔗 Scroll suave hacia: ${href}`);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // 5. TRANSICIÓN ENTRE PÁGINAS (FADE IN / FADE OUT)
    // ═══════════════════════════════════════════════════════════
    const main = document.querySelector(".page-transition");
    if (main) {
        // Entrada suave
        requestAnimationFrame(() => {
            main.classList.add("is-ready");
            console.log('✅ Transición de entrada aplicada');
        });

        // Interceptar clicks para salida suave
        document.addEventListener("click", (e) => {
            const a = e.target.closest("a");
            if (!a) return;

            const href = a.getAttribute("href");
            const target = a.getAttribute("target");

            // Ignorar casos especiales
            if (!href) return;
            if (target === "_blank") return;
            if (href.startsWith("#")) return;
            if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
            if (a.hasAttribute("download")) return;

            // Solo links internos (.html)
            const isInternalPage = href.endsWith(".html") || href.includes(".html#");
            if (!isInternalPage) return;

            e.preventDefault();

            // Salida suave
            main.classList.add("is-leaving");
            console.log(`🔄 Transición de salida hacia: ${href}`);

            // Navegar después de la animación
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    }

    // ═══════════════════════════════════════════════════════════
    // 6. ANIMACIÓN FADE-UP PARA ELEMENTOS
    // ═══════════════════════════════════════════════════════════
    const fadeUpElements = document.querySelectorAll('.fade-up');
    console.log(`🎨 Elementos fade-up encontrados: ${fadeUpElements.length}`);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos fade-up
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    // ═══════════════════════════════════════════════════════════
    // 7. ANIMACIÓN PARA LAS INFO CARDS
    // ═══════════════════════════════════════════════════════════
    const infoCards = document.querySelectorAll('.info-card');
    console.log(`🃏 Cards encontradas: ${infoCards.length}`);
    
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });

    // ═══════════════════════════════════════════════════════════
    // 8. SCROLL REVEAL PARA ELEMENTOS .reveal
    // ═══════════════════════════════════════════════════════════
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
        console.log(`👁️ Elementos reveal encontrados: ${reveals.length}`);
        
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
        revealOnScroll(); // Ejecutar al cargar
    }

    console.log('🎉 Todas las funcionalidades inicializadas correctamente');

});

// ═══════════════════════════════════════════════════════════
// FIN DEL SCRIPT
// ═══════════════════════════════════════════════════════════