// ============================================================
//  TICKER DE PRECIOS REALES — Oro, Plata, Platino, Paladio
//  Se actualiza cada 60 segundos. No depende de widgets externos.
// ============================================================
(function () {
    'use strict';
    var defaults = { oro: 116.49, plata: 1.82, platino: 29.4, paladio: 27.1 };

    function fmt(val) { return val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€/g'; }

    function updateDOM(p) {
        var ratio = p.oro > 0 && p.plata > 0 ? (p.oro / p.plata).toFixed(1) : '--';
        var ids = [['p-oro','p-plata','p-platino','p-paladio','p-ratio'],['p-oro2','p-plata2','p-platino2']];
        ids[0].forEach(function(id,i){
            var el=document.getElementById(id); if(!el) return;
            if(i===0) el.textContent=fmt(p.oro);
            if(i===1) el.textContent=fmt(p.plata);
            if(i===2) el.textContent=fmt(p.platino);
            if(i===3) el.textContent=fmt(p.paladio);
            if(i===4) el.textContent=ratio;
        });
        ids[1].forEach(function(id,i){
            var el=document.getElementById(id); if(!el) return;
            if(i===0) el.textContent=fmt(p.oro);
            if(i===1) el.textContent=fmt(p.plata);
            if(i===2) el.textContent=fmt(p.platino);
        });
    }

    async function fetchPrices() {
        try {
            var r = await fetch('https://api.metals.dev/v1/latest?api_key=demo&currency=EUR&unit=gram');
            if (!r.ok) throw new Error('err');
            var d = await r.json();
            var m = d.metals || {};
            return { oro: m.gold||defaults.oro, plata: m.silver||defaults.plata, platino: m.platinum||defaults.platino, paladio: m.palladium||defaults.paladio };
        } catch(e) { return defaults; }
    }

    document.addEventListener('DOMContentLoaded', async function () {
        updateDOM(defaults);
        var prices = await fetchPrices();
        updateDOM(prices);
        setInterval(async function () { updateDOM(await fetchPrices()); }, 60000);
    });
})();
