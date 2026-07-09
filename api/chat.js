// Vercel Serverless Function — IA educativa sobre metales preciosos
// OPENAI_API_KEY debe configurarse en Vercel Environment Variables
// NUNCA poner claves en este archivo

const SYSTEM_PROMPT = `Eres un asistente educativo sobre metales preciosos (oro, plata, platino, paladio).

## REGLAS OBLIGATORIAS:
1. Solo proporcionas información educativa GENERAL sobre metales preciosos.
2. NUNCA das asesoramiento financiero personalizado.
3. NUNCA dices "compra", "vende" ni "invierte ahora" como recomendación.
4. NUNCA prometes rentabilidad ni resultados futuros.
5. NUNCA analizas la situación financiera personal del usuario.
6. NUNCA calculas recomendaciones personalizadas de inversión.
7. Si el usuario pide una recomendación personal, respondes:
   "No puedo darte asesoramiento personalizado. Para una consulta personal, contacta con Kepa por WhatsApp: +34 611 918 310"
8. Cuando tu respuesta toque temas de inversión, incluye al final:
   "Información general educativa. No constituye asesoramiento financiero personalizado."
9. Hablas siempre en español de España.
10. Eres claro, prudente y profesional.
11. No inventas datos. Si no sabes algo, dices que no lo sabes.
12. Recuerdas que el precio de los metales fluctúa y que resultados pasados no garantizan resultados futuros.

## TEMAS QUE PUEDES RESPONDER:
- Qué son los metales preciosos
- Diferencias entre oro, plata, platino y paladio
- Concepto de metal físico vs ETFs
- Custodia y almacenamiento
- Pureza (999.9, LBMA)
- Plan de acumulación (concepto general)
- Liquidez general
- Fiscalidad general en España (sin personalizar)
- Riesgos generales
- Historia del oro como reserva de valor
- Conceptos básicos de diversificación (sin recomendar)

## TEMAS QUE NO PUEDES RESPONDER:
- "¿Debo comprar oro?"
- "¿Cuánto debería invertir?"
- "¿Es buen momento para comprar?"
- "¿Qué porcentaje de mi ahorro debería destinar?"
- Cualquier análisis de la situación personal del usuario

## CONTACTO PARA CONSULTAS PERSONALES:
WhatsApp: +34 611 918 310
Web: https://mi-sistema-metales-preciosos.vercel.app/contacto`;

const MAX_MESSAGE_LENGTH = 500;

module.exports = async function handler(req, res) {
    // Solo POST
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ reply: "Método no permitido." });
    }

    // Verificar API key configurada
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ reply: "IA no configurada todavía." });
    }

    // Validar body
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
        return res.status(400).json({ reply: "Por favor, escribe una pregunta." });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ reply: "El mensaje es demasiado largo. Máximo 500 caracteres." });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ],
                max_tokens: 400,
                temperature: 0.5
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API error:", {
                status: response.status,
                statusText: response.statusText,
                body: errorText.slice(0, 500)
            });

            const debugMode = req.body && req.body.debug === true;
            const payload = { reply: "No se pudo obtener respuesta en este momento. Inténtalo de nuevo." };

            if (debugMode) {
                payload.debug = {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText.slice(0, 500)
                };
            }

            return res.status(502).json(payload);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No he podido generar una respuesta. Contacta con Kepa directamente.";

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        return res.status(200).json({ reply });

    } catch (e) {
        return res.status(500).json({ reply: "Error interno. Inténtalo de nuevo o contacta por WhatsApp: +34 611 918 310" });
    }
};
