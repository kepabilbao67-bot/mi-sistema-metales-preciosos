// Vercel Serverless Function — Proxy de precios de metales preciosos
// Fuente: Swissquote (pública, sin API key)
// Resuelve CORS: el servidor llama a Swissquote y devuelve JSON limpio al frontend

const OZ_TO_GRAM = 31.1035;
const BASE_URL = "https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument";

async function fetchMetal(symbol) {
    try {
        const res = await fetch(`${BASE_URL}/${symbol}/EUR`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return null;
        const bid = data[0].spreadProfilePrices[0].bid;
        return Math.round((bid / OZ_TO_GRAM) * 100) / 100;
    } catch (e) {
        return null;
    }
}

module.exports = async function handler(req, res) {
    try {
        const [oro, plata, platino, paladio] = await Promise.all([
            fetchMetal("XAU"),
            fetchMetal("XAG"),
            fetchMetal("XPT"),
            fetchMetal("XPD")
        ]);

        res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({
            oro,
            plata,
            platino,
            paladio,
            currency: "EUR/g",
            updatedAt: new Date().toISOString()
        });
    } catch (e) {
        res.status(500).json({
            oro: null,
            plata: null,
            platino: null,
            paladio: null,
            currency: "EUR/g",
            updatedAt: new Date().toISOString()
        });
    }
};
