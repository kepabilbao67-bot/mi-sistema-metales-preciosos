// ============================================================
//  TICKER DE PRECIOS REALES — Oro, Plata, Platino, Paladio
//  Fuente: Swissquote (gratis, sin clave, datos en vivo)
//  Precios en EUR/onza troy -> convertidos a EUR/gramo
//  Se actualiza cada 30 segundos
// ============================================================
(function () {
    'use strict';
    var OZ_TO_GRAM = 31.1035;
    var defaults = { oro: 114.6, plata: 1.68, platino: 31.2, paladio: 28.8 };
    var current = Object.assign({}, defaults);

    function fmt(val) {
        return val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€/g';
    }

    function updateDOM(p) {
        var ratio = p.oro > 0 && p.plata > 0 ? (p.oro / p.plata).toFixed(1) : '--';
        var map = {
            'p-oro': p.oro, 'p-oro2': p.oro,
            'p-plata': p.plata, 'p-plata2': p.plata,
            'p-platino': p.platino, 'p-platino2': p.platino,
            'p-paladio': p.paladio,
            'p-ratio': null
        };
        Object.keys(map).forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            if (id === 'p-ratio') { el.textContent = ratio; }
            else { el.textContent = fmt(map[id]); }
        });
    }

    async function fetchMetal(symbol) {
        try {
            var r = await fetch('https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/' + symbol + '/EUR');
            if (!r.ok) return null;
            var d = await r.json();
            return d[0].spreadProfilePrices[0].bid / OZ_TO_GRAM;
        } catch(e) { return null; }
    }

    async function fetchAll() {
        var results = await Promise.allSettled([
            fetchMetal('XAU'),
            fetchMetal('XAG'),
            fetchMetal('XPT'),
            fetchMetal('XPD')
        ]);
        current = {
            oro: (results[0].status === 'fulfilled' && results[0].value) ? results[0].value : current.oro,
            plata: (results[1].status === 'fulfilled' && results[1].value) ? results[1].value : current.plata,
            platino: (results[2].status === 'fulfilled' && results[2].value) ? results[2].value : current.platino,
            paladio: (results[3].status === 'fulfilled' && results[3].value) ? results[3].value : current.paladio
        };
        return current;
    }

    document.addEventListener('DOMContentLoaded', async function () {
        updateDOM(defaults);
        var prices = await fetchAll();
        updateDOM(prices);
        setInterval(async function () { updateDOM(await fetchAll()); }, 30000);
    });
})();
