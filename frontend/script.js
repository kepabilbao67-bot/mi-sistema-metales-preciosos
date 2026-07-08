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

    /* ---------------------------------------------------------
       7. Ticker de precios orientativos (Swissquote, sin API key)
    --------------------------------------------------------- */
    const tickerEl = document.getElementById("metals-ticker");
    if (tickerEl) {
        const OZ_TO_GRAM = 31.1035;
        const symbols = { oro: "XAU", plata: "XAG", platino: "XPT", paladio: "XPD" };

        function fmtPrice(val) {
            return val.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " \u20ac/g";
        }

        async function fetchPrice(symbol) {
            try {
                const r = await fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/" + symbol + "/EUR");
                if (!r.ok) return null;
                const d = await r.json();
                return d[0].spreadProfilePrices[0].bid / OZ_TO_GRAM;
            } catch (e) { return null; }
        }

        async function updateTicker() {
            const results = await Promise.all([
                fetchPrice(symbols.oro),
                fetchPrice(symbols.plata),
                fetchPrice(symbols.platino),
                fetchPrice(symbols.paladio)
            ]);

            const [oro, plata, platino, paladio] = results;
            const allFailed = results.every(r => r === null);
            const statusEl = document.getElementById("ticker-status");

            if (allFailed) {
                if (statusEl) statusEl.textContent = "Precios no disponibles temporalmente";
                return;
            }

            if (statusEl) statusEl.textContent = "";

            const set = (id, val) => {
                const el = document.getElementById(id);
                if (el && val !== null) el.textContent = fmtPrice(val);
            };

            set("ticker-oro", oro);
            set("ticker-plata", plata);
            set("ticker-platino", platino);
            set("ticker-paladio", paladio);

            const timeEl = document.getElementById("ticker-time");
            if (timeEl) {
                const now = new Date();
                timeEl.textContent = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
            }
        }

        updateTicker();
        setInterval(updateTicker, 60000);
    }
});
