/* =============================================================
   KEPA METALES PRECIOSOS - Interacciones (JavaScript puro)
   Version multi-pagina
============================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ---------------------------------------------------------
       1. Navbar: cambia de estilo al hacer scroll
    --------------------------------------------------------- */
    const navbar = document.getElementById("navbar");

    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 40) {
                navbar.classList.add("is-scrolled");
            } else {
                navbar.classList.remove("is-scrolled");
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* ---------------------------------------------------------
       2. Menu movil (abrir / cerrar)
    --------------------------------------------------------- */
    const toggle = document.getElementById("nav-toggle");
    const nav = document.querySelector(".nav");
    const navList = document.getElementById("nav-list");

    const closeMenu = () => {
        if (nav && toggle) {
            nav.classList.remove("is-open");
            toggle.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menu");
        }
    };

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");
            toggle.classList.toggle("is-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
        });
    }

    if (navList) {
        navList.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    /* ---------------------------------------------------------
       3. Animaciones "reveal" con IntersectionObserver
    --------------------------------------------------------- */
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.style.transitionDelay = ((index % 4) * 80) + "ms";
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ---------------------------------------------------------
       4. Navegacion activa segun la pagina actual
    --------------------------------------------------------- */
    const navLinks = document.querySelectorAll(".nav__link");
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("is-active");
        }
    });

    /* ---------------------------------------------------------
       5. FAQ Accordion
    --------------------------------------------------------- */
    const faqItems = document.querySelectorAll(".faq__item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");
        if (question) {
            question.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");
                faqItems.forEach((i) => i.classList.remove("is-open"));
                if (!isOpen) {
                    item.classList.add("is-open");
                }
            });
        }
    });

    /* ---------------------------------------------------------
       6. Validacion basica del formulario de contacto
    --------------------------------------------------------- */
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    if (form && feedback) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.elements.name ? form.elements.name.value.trim() : "";
            const email = form.elements.email ? form.elements.email.value.trim() : "";
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !emailOk) {
                feedback.style.color = "#e07a7a";
                feedback.textContent = "Por favor, completa tu nombre y un email valido.";
                return;
            }

            feedback.style.color = "";
            feedback.textContent = "Gracias! Hemos recibido tu solicitud. Te contactaremos muy pronto.";
            form.reset();
        });
    }

    /* ---------------------------------------------------------
       7. Ano dinamico en el pie de pagina
    --------------------------------------------------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
