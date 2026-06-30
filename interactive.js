// ============================================================
//  INTERACTIVE.JS — Cursor inteligente + reacciones al ratón
//  Da un toque premium (oro/plata) a la web de Kepa.
//  Se desactiva solo en móviles/táctiles (no hay ratón).
// ============================================================

(function () {
    'use strict';

    // Solo en dispositivos con ratón real (no táctiles)
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    document.addEventListener('DOMContentLoaded', initInteractive);
    if (document.readyState !== 'loading') initInteractive();

    let started = false;
    function initInteractive() {
        if (started) return;
        started = true;

        // ---------- 1) CURSOR PERSONALIZADO (punto dorado + anillo plateado) ----------
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(ring);
        document.body.appendChild(dot);
        document.documentElement.classList.add('has-custom-cursor');

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;

        window.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
        }, { passive: true });

        // El anillo plateado sigue al ratón con un suave retardo (efecto "inteligente")
        (function animateRing() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
            requestAnimationFrame(animateRing);
        })();

        // El cursor "crece" y se vuelve dorado sobre elementos interactivos
        const interactiveSel = 'a, button, input, select, textarea, label, .plan-card, .advantage-card, .gallery-item, .faq-question, .quick-btn, .chart-card';
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(interactiveSel)) ring.classList.add('cursor-ring--big');
        });
        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(interactiveSel)) ring.classList.remove('cursor-ring--big');
        });

        // Ocultar el cursor cuando el ratón sale de la ventana
        document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; ring.style.opacity = '0'; });
        document.addEventListener('mouseenter', function () { dot.style.opacity = '1'; ring.style.opacity = '1'; });

        // ---------- 2) TARJETAS QUE REACCIONAN AL RATON (brillo + inclinación 3D) ----------
        const tiltCards = document.querySelectorAll('.plan-card, .advantage-card, .sec-item, .chart-card, .testimonial-card');
        tiltCards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = (e.clientY - r.top) / r.height;
                card.style.setProperty('--gx', (x * 100) + '%');
                card.style.setProperty('--gy', (y * 100) + '%');
                const rotX = (0.5 - y) * 6;
                const rotY = (x - 0.5) * 6;
                card.style.transform = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });

        // ---------- 3) BOTONES MAGNETICOS (se acercan ligeramente al raton) ----------
        const magnets = document.querySelectorAll('.btn-primary, .btn-submit, .btn-header');
        magnets.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width / 2);
                const y = e.clientY - (r.top + r.height / 2);
                btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.35) + 'px)';
            });
            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });

        // ---------- 4) FOCO DE LUZ DORADO QUE SIGUE AL RATON EN SECCIONES OSCURAS ----------
        const spotlightSections = document.querySelectorAll('.hero, .performance, .live-prices');
        spotlightSections.forEach(function (sec) {
            sec.classList.add('has-spotlight');
            sec.addEventListener('mousemove', function (e) {
                const r = sec.getBoundingClientRect();
                sec.style.setProperty('--sx', (e.clientX - r.left) + 'px');
                sec.style.setProperty('--sy', (e.clientY - r.top) + 'px');
            });
        });
    }
})();
