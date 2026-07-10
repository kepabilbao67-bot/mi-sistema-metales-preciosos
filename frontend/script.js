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
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = form.elements.name ? form.elements.name.value.trim() : "";
            const email = form.elements.email ? form.elements.email.value.trim() : "";
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !emailOk) {
                feedback.style.color = "#e07a7a";
                feedback.textContent = "Por favor, completa tu nombre y un email valido.";
                return;
            }

            // Deshabilitar botón durante envío
            const submitBtn = form.querySelector('[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            feedback.style.color = "var(--gray)";
            feedback.textContent = "Enviando...";

            try {
                const res = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { "Accept": "application/json" }
                });

                if (res.ok) {
                    feedback.style.color = "";
                    feedback.textContent = "Gracias. Hemos recibido tu solicitud y te contactaremos pronto.";
                    form.reset();
                } else {
                    feedback.style.color = "#e07a7a";
                    feedback.textContent = "No se pudo enviar. Inténtalo de nuevo o contacta por WhatsApp.";
                }
            } catch (err) {
                feedback.style.color = "#e07a7a";
                feedback.textContent = "No se pudo enviar. Inténtalo de nuevo o contacta por WhatsApp.";
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
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
       7. Ticker de precios orientativos (proxy /api/prices)
    --------------------------------------------------------- */
    const tickerEl = document.getElementById("metals-ticker");
    if (tickerEl) {
        // Inicializar con texto de carga en lugar de "--"
        ["ticker-oro", "ticker-plata", "ticker-platino", "ticker-paladio"].forEach((id) => {
            const el = document.getElementById(id);
            if (el && el.textContent === "--") el.textContent = "cargando...";
        });

        function fmtPrice(val) {
            return val.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " \u20ac/g";
        }

        async function updateTicker() {
            const statusEl = document.getElementById("ticker-status");
            try {
                const r = await fetch("/api/prices");
                if (!r.ok) throw new Error("API error");
                const data = await r.json();

                const allNull = data.oro === null && data.plata === null && data.platino === null && data.paladio === null;

                if (allNull) {
                    if (statusEl) statusEl.textContent = "Precios orientativos no disponibles temporalmente";
                    ["ticker-oro", "ticker-plata", "ticker-platino", "ticker-paladio"].forEach((id) => {
                        const el = document.getElementById(id);
                        if (el) el.textContent = "n/d";
                    });
                    return;
                }

                if (statusEl) statusEl.textContent = "";

                const set = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = val !== null ? fmtPrice(val) : "n/d";
                };

                set("ticker-oro", data.oro);
                set("ticker-plata", data.plata);
                set("ticker-platino", data.platino);
                set("ticker-paladio", data.paladio);

                const timeEl = document.getElementById("ticker-time");
                if (timeEl && data.updatedAt) {
                    const d = new Date(data.updatedAt);
                    timeEl.textContent = "Act. " + d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
                }
            } catch (e) {
                const statusEl = document.getElementById("ticker-status");
                if (statusEl) statusEl.textContent = "Precios orientativos no disponibles temporalmente";
                ["ticker-oro", "ticker-plata", "ticker-platino", "ticker-paladio"].forEach((id) => {
                    const el = document.getElementById(id);
                    if (el && el.textContent === "cargando...") el.textContent = "n/d";
                });
            }
        }

        updateTicker();
        setInterval(updateTicker, 60000);
    }

    /* ---------------------------------------------------------
       8. Widget IA — Asistente sobre oro y plata (/api/chat)
    --------------------------------------------------------- */
    const chatWidget = document.getElementById("ai-chat");
    if (chatWidget) {
        const toggleBtn   = document.getElementById("ai-chat-toggle");
        const closeBtn    = document.getElementById("ai-chat-close");
        const panel       = document.getElementById("ai-chat-panel");
        const form        = document.getElementById("ai-chat-form");
        const input       = document.getElementById("ai-chat-input");
        const messages    = document.getElementById("ai-chat-messages");
        const quickBtns   = document.getElementById("ai-chat-quick-btns");
        const sendBtn     = form ? form.querySelector(".ai-chat__send") : null;
        let questionCount = 0;
        const MAX_QUESTIONS = 5;
        let panelOpen = false;

        /* — Abrir / cerrar panel — */
        function openPanel() {
            panel.hidden = false;
            toggleBtn.style.display = "none";
            panelOpen = true;
            // Foco en el input al abrir
            setTimeout(() => { if (input) input.focus(); }, 80);
        }

        function closePanel() {
            panel.hidden = true;
            toggleBtn.style.display = "inline-flex";
            panelOpen = false;
        }

        toggleBtn.addEventListener("click", openPanel);
        closeBtn.addEventListener("click", closePanel);

        // Cerrar con tecla Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && panelOpen) closePanel();
        });

        // Cerrar al hacer click fuera del widget
        document.addEventListener("click", (e) => {
            if (panelOpen && !chatWidget.contains(e.target)) closePanel();
        });

        /* — Mensajes — */
        function addMessage(text, sender) {
            const div = document.createElement("div");
            div.className = "ai-chat__msg ai-chat__msg--" + sender;
            div.textContent = text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
            return div;
        }

        /* — Botones rápidos — */
        if (quickBtns) {
            quickBtns.querySelectorAll(".ai-chat__quick-btn:not(.ai-chat__quick-btn--cta)").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const text = btn.textContent.trim();
                    if (!text) return;
                    quickBtns.style.display = "none";
                    sendMessage(text);
                });
            });
        }

        /* — Enviar pregunta — */
        async function sendMessage(text) {
            if (!text) return;

            if (questionCount >= MAX_QUESTIONS) {
                addMessage("Has alcanzado el límite de preguntas. Para continuar, habla directamente con Kepa por WhatsApp: +34 611 918 310", "bot");
                if (input) input.disabled = true;
                if (sendBtn) sendBtn.disabled = true;
                return;
            }

            addMessage(text, "user");
            if (input) { input.value = ""; input.disabled = true; }
            if (sendBtn) sendBtn.disabled = true;
            questionCount++;

            // Estado "Consultando..."
            const loadingMsg = addMessage("Consultando…", "loading");

            try {
                const r = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text })
                });

                // Eliminar mensaje de carga
                if (loadingMsg && loadingMsg.parentNode) loadingMsg.remove();

                // Manejar 503 — IA no configurada
                if (r.status === 503) {
                    addMessage("Ahora mismo el asistente no está configurado. Puedes hablar directamente con Kepa por WhatsApp: +34 611 918 310", "bot");
                } else {
                    const data = await r.json();
                    const reply = data.reply || "No he podido responder en este momento.";
                    addMessage(reply, "bot");
                }
            } catch (err) {
                if (loadingMsg && loadingMsg.parentNode) loadingMsg.remove();
                addMessage("No he podido conectar con el asistente. Puedes contactar con Kepa directamente por WhatsApp: +34 611 918 310", "bot");
            } finally {
                // Reactivar input y botón siempre
                if (input && questionCount < MAX_QUESTIONS) input.disabled = false;
                if (sendBtn && questionCount < MAX_QUESTIONS) sendBtn.disabled = false;
                if (input) input.focus();
            }

            if (questionCount >= MAX_QUESTIONS) {
                addMessage("Si quieres continuar informándote, Kepa puede atenderte directamente: +34 611 918 310", "bot");
                if (input) input.disabled = true;
                if (sendBtn) sendBtn.disabled = true;
            }
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input ? input.value.trim() : "";
            if (!text) return;
            if (quickBtns) quickBtns.style.display = "none";
            sendMessage(text);
        });
    }
});
