// ============================================================
//  TICKER DE PRECIOS REALES — Oro, Plata, Platino, Paladio
//  Se actualiza cada 60 segundos. No depende de widgets externos.
//  Fuente: metals.dev API (gratuita, sin clave)
// ============================================================

(function () {
    'use strict';

    // Precios por defecto (se muestran mientras carga la API)
    const defaults = { oro: 116.49, plata: 1.82, platino: 29.4, paladio: 27.1 };

    function formatPrice(val) {
        return val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€/g';
    }

    function updateDOM(prices) {
        const ratio = prices.oro > 0 && prices.plata > 0 ? (prices.oro / prices.plata).toFixed(1) : '--';
        const sets = [
            { oro: 'p-oro', plata: 'p-plata', platino: 'p-platino', paladio: 'p-paladio', ratio: 'p-ratio' },
            { oro: 'p-oro2', plata: 'p-plata2', platino: 'p-platino2' }
        ];
        sets.forEach(function (ids) {
            if (ids.oro) { var el = document.getElementById(ids.oro); if (el) el.textContent = formatPrice(prices.oro); }
            if (ids.plata) { var el = document.getElementById(ids.plata); if (el) el.textContent = formatPrice(prices.plata); }
            if (ids.platino) { var el = document.getElementById(ids.platino); if (el) el.textContent = formatPrice(prices.platino); }
            if (ids.paladio) { var el = document.getElementById(ids.paladio); if (el) el.textContent = formatPrice(prices.paladio); }
            if (ids.ratio) { var el = document.getElementById(ids.ratio); if (el) el.textContent = ratio; }
        });
    }

    async function fetchPrices() {
        try {
            // metals.dev API gratuita (no requiere clave para precios spot)
            const resp = await fetch('https://api.metals.dev/v1/latest?api_key=demo&currency=EUR&unit=gram');
            if (!resp.ok) throw new Error('API error');
            const data = await resp.json();
            const metals = data.metals || {};
            return {
                oro: metals.gold || defaults.oro,
                plata: metals.silver || defaults.plata,
                platino: metals.platinum || defaults.platino,
                paladio: metals.palladium || defaults.paladio
            };
        } catch (e) {
            // Fallback: intentar otra API gratuita
            try {
                const resp2 = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=demo&base=EUR&currencies=XAU,XAG,XPT,XPD');
                if (!resp2.ok) throw new Error('Fallback API error');
                const data2 = await resp2.json();
                const r = data2.rates || {};
                return {
                    oro: r.XAU ? (1 / r.XAU) : defaults.oro,
                    plata: r.XAG ? (1 / r.XAG) : defaults.plata,
                    platino: r.XPT ? (1 / r.XPT) : defaults.platino,
                    paladio: r.XPD ? (1 / r.XPD) : defaults.paladio
                };
            } catch (e2) {
                // Si todo falla, usar precios por defecto
                return defaults;
            }
        }
    }

    // Cargar precios al inicio
    document.addEventListener('DOMContentLoaded', async function () {
        // Mostrar defaults inmediatamente
        updateDOM(defaults);
        // Luego actualizar con los reales
        const prices = await fetchPrices();
        updateDOM(prices);
        // Actualizar cada 60 segundos
        setInterval(async function () {
            const p = await fetchPrices();
            updateDOM(p);
        }, 60000);
    });
})();
