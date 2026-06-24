// ========== CHATBOT CON IA REAL (OpenAI API) ==========
// 
// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Consigue tu API Key en https://platform.openai.com/api-keys
// 2. Sustituye 'TU-API-KEY-AQUI' por tu clave real
// 3. IMPORTANTE: En producción, NUNCA pongas la API key en el frontend.
//    Usa un backend (Node.js/Vercel Function) para protegerla.
//    Abajo incluyo versión con backend seguro.
//
// COSTE ESTIMADO: ~0,01-0,03€ por conversación (GPT-3.5-turbo)
// Con 100 conversaciones/mes ≈ 1-3€/mes total

const CHATBOT_CONFIG = {
    // === CONFIGURACIÓN ===
    apiKey: 'TU-API-KEY-AQUI', // Cámbiala por tu key real
    model: 'gpt-3.5-turbo', // Más barato. Usa 'gpt-4o-mini' para mejor calidad
    maxTokens: 500,
    temperature: 0.7,
    
    // === PERSONALIZACIÓN ===
    partnerName: 'Kepa Bilbao', // Pon tu nombre real
    whatsappNumber: '34611918310', // Tu número sin + ni espacios
    whatsappMessage: 'Hola! Me interesa el ahorro en oro', // Mensaje predeterminado
    
    // === SISTEMA PROMPT (el "cerebro" de tu IA) ===
    systemPrompt: `Eres el "Asistente de Oro", un experto en ahorro en metales preciosos que trabaja para un colaborador oficial de AUVESTA Edelmetalle AG. Tu objetivo es INFORMAR y GENERAR INTERÉS para que el visitante contacte con el asesor humano.

## TU PERSONALIDAD:
- Amigable, profesional pero cercano
- Hablas SIEMPRE en español de España
- Usas datos concretos para convencer
- Nunca presionas, pero generas curiosidad
- Si no sabes algo, dices "Te paso con mi compañero [nombre] que te lo explica mejor"
- Siempre ofreces el contacto por WhatsApp como siguiente paso

## DATOS CLAVE QUE DEBES USAR:
- AUVESTA Edelmetalle AG: empresa alemana fundada en 2009
- +200.000 inversores activos en 134 países
- +500 millones € de facturación total
- 17+ años de experiencia
- Certificada Trusted Shops, lingotes LBMA

## PRODUCTO:
- Plan de ahorro en oro/plata/platino/paladio FÍSICO
- Desde 25€/mes o compras puntuales desde 1€
- Se compran fracciones de lingotes grandes → hasta 15% más barato
- 100% propiedad del cliente (lingotes con número de serie)
- Sin permanencia, sin obligación mensual, sin preaviso
- Almacenamiento en cámaras: Zúrich, Londres, Frankfurt, Múnich, Singapur
- Garantía de recompra 100%
- Venta online al instante
- Envío a domicilio desde 1g oro

## TARIFAS:
- S-3: Entrada 300€, sin descuento extra (principiantes)
- M-6: Entrada 600€, 1% descuento, bonus 600€ (más popular)
- L-12: Entrada 1.200€, 3% descuento, bonus 1.200€, Switch Pilot
- XL-24: Entrada 2.400€, 6% descuento, bonus 2.400€, Switch Pilot Plus

## RENDIMIENTO:
- Oro: +144% en 5 años (jun 2021 → jun 2026)
- 100€ invertidos en 2021 = 243,99€ en 2026
- Con Ratio & Switch: +42,61% beneficio adicional
- Precio actual oro: ~116€/gramo

## FISCALIDAD ESPAÑA:
- Oro de inversión: EXENTO de IVA
- Plata/platino/paladio: exentos en depósito franco
- Al vender con beneficio: IRPF (19-27% según tramo)
- Modelo 720 si oro fuera de España >50.000€

## SEGURIDAD:
- Cámaras LBMA alta seguridad
- Asegurado contra robo/incendio
- Auditorías trimestrales independientes
- Inventario publicado online cada día
- Lingotes con número de serie asignado al cliente

## REGLAS IMPORTANTES:
1. NUNCA digas que garantizas rentabilidad futura
2. SIEMPRE aclara que rendimiento pasado no garantiza futuro
3. Si preguntan sobre comisiones del colaborador, di que no tienes esa info y pasa a WhatsApp
4. No inventes datos — usa solo los de arriba
5. Respuestas CORTAS (máximo 4-5 líneas) a menos que pidan detalle
6. Usa emojis con moderación (1-2 por respuesta)
7. Al final de cada respuesta, sugiere la siguiente pregunta o el contacto por WhatsApp
8. Si detectas intención de compra, redirige SIEMPRE a WhatsApp con el asesor humano`
};

// ========== MOTOR DEL CHATBOT ==========

class AuvestaChatbotAI {
    constructor(config) {
        this.config = config;
        this.conversationHistory = [];
        this.fallbackMode = false;
        
        // Inicializar con system prompt
        this.conversationHistory.push({
            role: 'system',
            content: config.systemPrompt
        });
    }

    // Respuesta con IA real (OpenAI)
    async getAIResponse(userMessage) {
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: this.conversationHistory.slice(-10), // Últimos 10 mensajes para contexto
                    max_tokens: this.config.maxTokens,
                    temperature: this.config.temperature
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;

            this.conversationHistory.push({
                role: 'assistant',
                content: assistantMessage
            });

            return assistantMessage;

        } catch (error) {
            console.error('Error con OpenAI API:', error);
            // Si falla la API, usar respuestas locales
            return this.getLocalResponse(userMessage);
        }
    }

    // Respuesta local (fallback sin API)
    getLocalResponse(userMessage) {
        const q = userMessage.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const responses = {
            funciona: "Es muy sencillo: te registras gratis, eliges cuánto ahorrar (desde 25€/mes), haces una transferencia y tu dinero se convierte en oro físico el mismo día. El lingote es TUYO con número de serie. 🥇\n\n¿Quieres saber qué tarifa te conviene mejor?",
            
            precio: `El oro está ahora a ~116€ por gramo (junio 2026). Hace 5 años estaba a ~48€/gramo. Eso es un +144% de subida. 📈\n\nCon AUVESTA compras hasta un 15% más barato que en una tienda porque compras fracciones de lingotes grandes.\n\n¿Te gustaría que te explique los planes disponibles?`,
            
            tarifa: "Hay 4 tarifas:\n\n🟢 S-3: Entrada 300€ (principiantes)\n🔵 M-6: Entrada 600€ + 1% descuento + bonus 600€\n🟡 L-12: Entrada 1.200€ + 3% descuento + bonus 1.200€\n🟣 XL-24: Entrada 2.400€ + 6% descuento + bonus 2.400€\n\nLa M-6 es la más popular porque el bonus te devuelve la entrada. 💰\n\n¿Cuánto podrías ahorrar al mes? Así te recomiendo la mejor.",
            
            seguro: "Tu oro está protegido a todos los niveles:\n\n🔐 Cámaras LBMA (máxima seguridad mundial)\n🛡️ Asegurado contra robo e incendio\n📋 Auditado cada 3 meses por inspector independiente\n📊 Inventario publicado CADA DÍA online\n🏷️ Lingotes con número de serie a TU nombre\n\nSi AUVESTA cerrara, tu oro sigue siendo tuyo en la cámara. ¿Alguna otra duda?",
            
            impuesto: "En España la fiscalidad es muy favorable:\n\n✅ IVA: EXENTO (0%) en oro de inversión\n✅ Plata/platino/paladio: también exentos en depósito\n\nSolo pagas cuando VENDES con beneficio (19-27% según cuánto ganes). Si no vendes, no pagas nada. 📋\n\n¿Necesitas más detalle?",
            
            bitcoin: "El oro y Bitcoin son complementarios, no competencia:\n\n🥇 Oro: 5.000 años, +144% en 5 años, estable\n₿ Bitcoin: 15 años, puede caer 80% en semanas\n\nMi consejo: el oro como base segura, la cripto como apuesta. ¿Por qué no tener ambos? 😉\n\n¿Quieres saber cómo empezar con el oro?",
            
            empezar: `¡Genial que quieras empezar! 🎉\n\nEl siguiente paso es hablar con ${this.config.partnerName} por WhatsApp. Te explica todo personalizado en 5 minutos, sin compromiso.\n\n📱 WhatsApp: wa.me/${this.config.whatsappNumber}\n\n¿Tienes alguna duda más antes?`,
            
            quiebra: "Si AUVESTA cerrara (17 años sin problemas), TU ORO SIGUE SIENDO TUYO:\n\n1️⃣ Está a tu nombre con número de serie\n2️⃣ En cámaras de TERCEROS independientes\n3️⃣ No está en el balance de la empresa\n\nEs como un trastero: si la empresa cierra, tus cosas son tuyas. 🔒\n\n¿Algo más que te preocupe?",

            ganar: "Nadie garantiza ganancias futuras, pero los datos son claros:\n\n📈 5 años: +144%\n📈 10 años: ~+180%\n📈 20 años: ~+700%\n\nEjemplo: 100€/mes × 5 años = 6.000€ invertidos → potencialmente ~14.000€*\n\n*Basado en rendimiento pasado. No es garantía futura.\n\n¿Quieres que te muestre la calculadora?",

            vender: "Puedes vender en cualquier momento:\n\n💨 Online → se vende al instante a precio de mercado\n💰 El dinero va directo a tu cuenta bancaria\n📦 O te lo envían a casa (desde 1g de oro)\n\nSin plazos, sin penalizaciones, sin pedir permiso. Más fácil que un plazo fijo bancario. ✅\n\n¿Alguna otra pregunta?"
        };

        // Buscar coincidencia
        for (const [key, response] of Object.entries(responses)) {
            if (q.includes(key)) return response;
        }

        // Variaciones
        if (q.includes("cuanto") && (q.includes("necesit") || q.includes("cuesta") || q.includes("minim"))) return responses.tarifa;
        if (q.includes("fiab") || q.includes("estafa") || q.includes("timo") || q.includes("confi")) return responses.seguro;
        if (q.includes("iva") || q.includes("fiscal") || q.includes("hacienda")) return responses.impuesto;
        if (q.includes("cripto") || q.includes("crypto") || q.includes("ethereum")) return responses.bitcoin;
        if (q.includes("registr") || q.includes("apunt") || q.includes("quiero")) return responses.empezar;
        if (q.includes("cierra") || q.includes("bancarrota")) return responses.quiebra;
        if (q.includes("rentab") || q.includes("benefi") || q.includes("rendim")) return responses.ganar;
        if (q.includes("retir") || q.includes("liquid") || q.includes("sacar") || q.includes("recuper")) return responses.vender;
        if (q.includes("hola") || q.includes("buenas") || q.includes("hey")) {
            return "¡Hola! 👋 Bienvenido/a. Estoy aquí para resolver tus dudas sobre el ahorro en oro físico.\n\nPuedo ayudarte con:\n• Cómo funciona\n• Precios y tarifas\n• Seguridad\n• Impuestos\n\n¿Qué te gustaría saber?";
        }

        // Respuesta por defecto
        return `Buena pregunta. Para darte la mejor respuesta personalizada, te recomiendo hablar directamente con ${this.config.partnerName} por WhatsApp. Te atiende en menos de 1 hora, sin compromiso. 📱\n\n¿Puedo ayudarte con algo más? Pregúntame sobre precios, tarifas, seguridad o impuestos.`;
    }
}

// ========== INTEGRACIÓN CON LA UI ==========

document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new AuvestaChatbotAI(CHATBOT_CONFIG);
    
    const toggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input-field');
    const sendBtn = document.getElementById('chatbot-send');
    const messagesContainer = document.getElementById('chatbot-messages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Toggle chatbot
    toggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
        toggle.style.display = 'none';
        input.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        toggle.style.display = 'flex';
    });

    // Enviar mensaje
    async function sendMessage(text) {
        if (!text.trim()) return;
        
        // Mostrar mensaje del usuario
        const userDiv = document.createElement('div');
        userDiv.className = 'user-message-chat';
        userDiv.textContent = text;
        messagesContainer.appendChild(userDiv);
        
        // Quitar botones rápidos
        const quickButtons = document.querySelector('.quick-buttons');
        if (quickButtons) quickButtons.remove();
        
        // Mostrar "escribiendo..."
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;

        // Obtener respuesta (IA real o local)
        let answer;
        if (CHATBOT_CONFIG.apiKey && CHATBOT_CONFIG.apiKey !== 'TU-API-KEY-AQUI') {
            answer = await chatbot.getAIResponse(text);
        } else {
            // Sin API key → usar respuestas locales
            await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
            answer = chatbot.getLocalResponse(text);
        }
        
        // Quitar typing y mostrar respuesta
        typing.remove();
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.innerHTML = answer.replace(/\n/g, '<br>');
        messagesContainer.appendChild(botDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => sendMessage(btn.dataset.question));
    });

    // ========== FAQ ACCORDION ==========
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ========== CALCULATOR ==========
    const monthly = document.getElementById('monthly');
    const years = document.getElementById('years');
    const growth = document.getElementById('growth');

    function updateCalculator() {
        const m = parseInt(monthly.value);
        const y = parseInt(years.value);
        const g = parseInt(growth.value) / 100;
        
        document.getElementById('monthly-value').textContent = m + '€/mes';
        document.getElementById('years-value').textContent = y + (y === 1 ? ' año' : ' años');
        document.getElementById('growth-value').textContent = (g * 100) + '% anual';
        
        const invested = m * 12 * y;
        const monthlyRate = g / 12;
        const totalMonths = y * 12;
        let futureValue = 0;
        for (let i = 0; i < totalMonths; i++) {
            futureValue = (futureValue + m) * (1 + monthlyRate);
        }
        const profit = futureValue - invested;
        
        document.getElementById('total-invested').textContent = invested.toLocaleString('es-ES') + '€';
        document.getElementById('total-value').textContent = Math.round(futureValue).toLocaleString('es-ES') + '€';
        document.getElementById('total-profit').textContent = '+' + Math.round(profit).toLocaleString('es-ES') + '€';
    }

    monthly.addEventListener('input', updateCalculator);
    years.addEventListener('input', updateCalculator);
    growth.addEventListener('input', updateCalculator);
    updateCalculator();

    // ========== FORM ==========
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        e.target.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <div style="font-size:4rem; margin-bottom:20px;">✅</div>
                <h3 style="margin-bottom:10px;">¡Solicitud enviada!</h3>
                <p style="color:#6c757d;">Te contacto personalmente en menos de 24 horas.</p>
                <p style="margin-top:15px;"><a href="https://wa.me/${CHATBOT_CONFIG.whatsappNumber}?text=${encodeURIComponent(CHATBOT_CONFIG.whatsappMessage)}" style="background:#25D366;color:white;padding:12px 25px;border-radius:25px;font-weight:700;display:inline-block;">O escríbeme por WhatsApp ahora 📱</a></p>
            </div>
        `;
        console.log('Lead capturado:', data);
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ========== HEADER EFFECT ==========
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.style.boxShadow = window.scrollY > 50 ? '0 5px 20px rgba(0,0,0,0.3)' : 'none';
    });
});
