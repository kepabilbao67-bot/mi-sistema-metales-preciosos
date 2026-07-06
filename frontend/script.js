/* =============================================================
   KEPA METALES PRECIOSOS — Interacciones (JavaScript puro)
   - Navbar con efecto al hacer scroll
   - Menú móvil (hamburguesa)
   - Animaciones "reveal" al entrar en viewport
   - Resaltado del enlace de navegación activo
   - Validación básica del formulario de contacto
   - Año dinámico en el footer
============================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------------------------------------------------------
       1. Navbar: cambia de estilo al hacer scroll
    --------------------------------------------------------- */
    const navbar = document.getElementById("navbar");

    const onScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add("is-scrolled");
        } else {
            navbar.classList.remove("is-scrolled");
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------------------------------------------------------
       2. Menú móvil (abrir / cerrar)
    --------------------------------------------------------- */
    const toggle = document.getElementById("nav-toggle");
    const nav = document.querySelector(".nav");
    const navList = document.getElementById("nav-list");

    const closeMenu = () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
    };

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // Cierra el menú al pulsar cualquier enlace (útil en móvil)
    navList.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    /* ---------------------------------------------------------
       3. Animaciones "reveal" con IntersectionObserver
    --------------------------------------------------------- */
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Pequeño retardo escalonado para un efecto más elegante
                        entry.target.style.transitionDelay = `${(index % 4) * 80}ms`;
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        // Fallback: muestra todo si no hay soporte
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ---------------------------------------------------------
       4. Resaltado del enlace de navegación activo
    --------------------------------------------------------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    const setActiveLink = () => {
        const scrollPos = window.scrollY + 120;
        let currentId = "";

        sections.forEach((section) => {
            if (scrollPos >= section.offsetTop) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${currentId}`
            );
        });
    };
    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();

    /* ---------------------------------------------------------
       5. Validación básica del formulario de contacto
    --------------------------------------------------------- */
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !emailOk) {
                feedback.style.color = "#e07a7a";
                feedback.textContent =
                    "Por favor, completa tu nombre y un email válido.";
                return;
            }

            feedback.style.color = "";
            feedback.textContent =
                "¡Gracias! Hemos recibido tu solicitud. Te contactaremos muy pronto.";
            form.reset();
        });
    }

    /* ---------------------------------------------------------
       6. Año dinámico en el pie de página
    --------------------------------------------------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
