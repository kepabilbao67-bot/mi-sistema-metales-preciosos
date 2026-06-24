// ========== CHATBOT IA ==========
const chatbotKnowledge = {
    "como funciona": {
        answer: "Es muy sencillo:\n\n1️⃣ Te registras gratis online (5 minutos)\n2️⃣ Eliges cuánto ahorrar (desde 25€/mes)\n3️⃣ Haces una transferencia o domiciliación\n4️⃣ Tu dinero se convierte en oro físico el mismo día\n\nEl oro se almacena en cámaras de alta seguridad (Zúrich, Londres, Frankfurt...) y es 100% tuyo legalmente con número de serie asignado.\n\nPuedes vender online cuando quieras, sin permanencia ni penalizaciones. ¿Te gustaría saber qué tarifa te conviene?"
    },
    "cuanto necesito": {
        answer: "Para empezar necesitas muy poco:\n\n📌 Tarifa S-3: Entrada de 300€\n- Luego ahorras desde 25€/mes\n- Sin obligación mensual\n- Sin permanencia\n\nEs como abrir una cuenta de ahorro, pero en vez de euros que pierden valor por la inflación, ahorras en oro que ha subido +144% en 5 años.\n\nLos 300€ de entrada es una cuota única (agio) que da acceso al sistema. Después cada euro que pongas compra oro real.\n\n¿Quieres que te explique las diferencias entre tarifas?"
    },
    "seguro": {
        answer: "Tu oro está protegido a múltiples niveles:\n\n🔐 Almacenamiento: Cámaras de alta seguridad certificadas LBMA\n🛡️ Seguro: Contra robo, incendio y daños a valor de reposición\n📋 Auditorías: Inspector independiente cada 3 meses\n📊 Transparencia: Inventario publicado online CADA DÍA\n🏷️ Propiedad: Lingotes con número de serie a TU nombre\n\nIMPORTANTE: Tu oro NO está en el balance de la empresa. Si AUVESTA cerrara (17 años sin problemas), tu oro sigue en la cámara y sigue siendo tuyo.\n\n¿Tienes alguna otra duda sobre seguridad?"
    },
    "tarifa": {
        answer: "Hay 4 tarifas según tu perfil:\n\n🟢 S-3 (Principiante): Entrada 300€\n- Sin descuento extra\n- Ideal para empezar con poco\n\n🔵 M-6 (Popular): Entrada 600€\n- 1% descuento en cada compra\n- Bonus de 600€ en metal\n- El bonus cubre la entrada\n\n🟡 L-12 (Inversor): Entrada 1.200€\n- 3% descuento\n- Bonus 1.200€\n- Switch Pilot automático\n\n🟣 XL-24 (Premium): Entrada 2.400€\n- 6% descuento\n- Bonus 2.400€\n- Switch Pilot Plus\n\nMi recomendación: Si puedes, la M-6 es la mejor relación calidad-precio porque el bonus de 600€ te devuelve la entrada.\n\n¿Cuánto podrías ahorrar al mes? Así te recomiendo la mejor."
    },
    "impuestos": {
        answer: "La fiscalidad del oro en España es MUY favorable:\n\n✅ IVA: El oro de inversión está EXENTO de IVA (0%)\n✅ Plata/Platino/Paladio: También exentos si se almacenan en depósito franco (caso AUVESTA)\n\n📋 Cuando VENDES con beneficio:\n- Hasta 6.000€ de ganancia → 19%\n- De 6.000€ a 50.000€ → 21%\n- De 50.000€ a 200.000€ → 23%\n- Más de 200.000€ → 27%\n\n⚠️ Solo pagas cuando vendes Y ganas. Si no vendes, no pagas nada.\n\n📌 Si tu oro fuera de España supera 50.000€: declarar en Modelo 720.\n\n¿Necesitas más detalles fiscales?"
    },
    "bitcoin": {
        answer: "Buena pregunta. Son cosas muy diferentes:\n\n🥇 ORO:\n- 5.000 años como reserva de valor\n- +144% en 5 años de forma estable\n- Activo físico tangible\n- Sin riesgo tecnológico\n- Aceptado mundialmente\n\n₿ BITCOIN:\n- 15 años de existencia\n- Puede caer 50-80% en semanas\n- Digital — riesgo de hackeo/pérdida\n- Alta volatilidad\n- No universalmente aceptado\n\nMi opinión: No son competencia, son COMPLEMENTO. El oro es tu base segura, la cripto es la apuesta especulativa. ¿Por qué no tener ambos?\n\nLa diferencia clave: con el oro duermes tranquilo. ¿Puedes decir lo mismo del Bitcoin?"
    },
    "quien es auvesta": {
        answer: "AUVESTA Edelmetalle AG es:\n\n🏛️ Sociedad Anónima alemana (la forma jurídica más exigente)\n📅 Fundada en 2009 — 17 años de trayectoria\n📍 Sede: Holzkirchen (Múnich), Alemania\n👥 +200.000 inversores activos\n🌍 Presencia en 134 países\n💰 +500 millones € de facturación\n⭐ Certificada por Trusted Shops\n🏆 Múltiples premios como mejor dealer de lingotes\n🔍 Auditada por inspectores independientes\n\nNo es una startup, no es una empresa nueva, no es un chiringuito. Es una de las mayores casas de trading de metales preciosos de Europa.\n\n¿Quieres saber más sobre la seguridad?"
    },
    "empresa quiebra": {
        answer: "Es una preocupación lógica. La respuesta corta: TU ORO SIGUE SIENDO TUYO.\n\n¿Por qué?\n\n1️⃣ Tu oro está asignado con número de serie a tu nombre\n2️⃣ Se almacena en cámaras de TERCEROS independientes (no de AUVESTA)\n3️⃣ No forma parte del balance de la empresa\n4️⃣ Es como un trastero: si la empresa del trastero cierra, tus cosas son tuyas\n\nAdemás:\n- AUVESTA lleva 17 años sin incidentes\n- Más de 500 millones de facturación\n- Sociedad Anónima alemana (regulación estricta)\n- Auditorías trimestrales\n\nEl riesgo de que tu banco quiebre es estadísticamente MAYOR que el de AUVESTA. Y en un banco, tu dinero es un préstamo al banco. Aquí tu oro es TUYO.\n\n¿Algo más que te preocupe?"
    },
    "cuanto gano": {
        answer: "Nadie puede garantizar ganancias futuras, pero los datos históricos son muy claros:\n\n📈 Últimos 5 años: +144% (de ~48€/g a ~116€/g)\n📈 Últimos 10 años: +180% aproximadamente\n📈 Últimos 20 años: +700% aproximadamente\n\nEjemplo práctico con 100€/mes durante 5 años:\n- Total invertido: 6.000€\n- Valor si el oro repite +144%: ~14.640€\n- Beneficio: +8.640€\n\n⚠️ IMPORTANTE: Esto es pasado, no garantía. El oro puede bajar a corto plazo. Por eso es un plan de AHORRO a largo plazo — compras cada mes y promedias el precio (DCA).\n\nLa pregunta real es: ¿Prefieres dejar 6.000€ en el banco perdiendo valor por inflación, o tener la posibilidad de multiplicarlo en oro?\n\n¿Quieres que te muestre la calculadora?"
    },
    "sacar dinero": {
        answer: "¡Sí! Puedes sacar tu dinero cuando quieras:\n\n💨 VENTA ONLINE:\n- Entras en tu depósito (web o app)\n- Eliges cuánto quieres vender\n- Se vende a precio de mercado en el momento\n- El dinero se transfiere a tu cuenta bancaria\n\n📦 O TE LO ENVÍAN A CASA:\n- Desde 1g de oro\n- Desde 50g de plata\n- Envío asegurado con tracking\n\n🔑 SIN RESTRICCIONES:\n- Sin plazos de preaviso\n- Sin penalizaciones\n- Sin pedir permiso\n- Sin permanencia\n\nEs literalmente más fácil sacar dinero de aquí que de un plazo fijo bancario.\n\n¿Alguna otra duda?"
    }
};

// Función de búsqueda de respuestas
function findAnswer(question) {
    const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (q.includes("funciona") || q.includes("como es") || q.includes("explicame") || q.includes("que es")) {
        return chatbotKnowledge["como funciona"].answer;
    }
    if (q.includes("cuanto necesito") || q.includes("cuanto cuesta") || q.includes("precio") || q.includes("empezar") || q.includes("minimo")) {
        return chatbotKnowledge["cuanto necesito"].answer;
    }
    if (q.includes("segur") || q.includes("fiable") || q.includes("confianza") || q.includes("estafa") || q.includes("fraude") || q.includes("timo")) {
        return chatbotKnowledge["seguro"].answer;
    }
    if (q.includes("tarifa") || q.includes("plan") || q.includes("cual elijo") || q.includes("conviene") || q.includes("mejor opcion")) {
        return chatbotKnowledge["tarifa"].answer;
    }
    if (q.includes("impuesto") || q.includes("fiscal") || q.includes("iva") || q.includes("hacienda") || q.includes("irpf") || q.includes("declarar")) {
        return chatbotKnowledge["impuestos"].answer;
    }
    if (q.includes("bitcoin") || q.includes("cripto") || q.includes("crypto") || q.includes("ethereum")) {
        return chatbotKnowledge["bitcoin"].answer;
    }
    if (q.includes("auvesta") || q.includes("empresa") || q.includes("quien")) {
        return chatbotKnowledge["quien es auvesta"].answer;
    }
    if (q.includes("quiebra") || q.includes("cierra") || q.includes("quiebre") || q.includes("bancarrota")) {
        return chatbotKnowledge["empresa quiebra"].answer;
    }
    if (q.includes("gano") || q.includes("ganancia") || q.includes("rentabilidad") || q.includes("rendimiento") || q.includes("beneficio")) {
        return chatbotKnowledge["cuanto gano"].answer;
    }
    if (q.includes("sacar") || q.includes("retirar") || q.includes("vender") || q.includes("recuperar") || q.includes("liquidez")) {
        return chatbotKnowledge["sacar dinero"].answer;
    }
    if (q.includes("oro") && (q.includes("subir") || q.includes("bajar"))) {
        return "El oro puede fluctuar a corto plazo como cualquier activo, pero históricamente SIEMPRE ha subido a largo plazo. En los últimos 5 años subió +144%. En 20 años +700%. Por eso funciona como plan de AHORRO a largo plazo: compras cada mes y promedias el precio.\n\nLa inflación GARANTIZA que tu dinero en el banco pierde valor. El oro no lo garantiza, pero tiene 5.000 años de historial a su favor. ¿Qué prefieres?\n\n¿Tienes alguna otra pregunta?";
    }
    
    return "¡Buena pregunta! Te respondo de forma personalizada.\n\nPara darte la mejor respuesta, te recomiendo contactar directamente conmigo por WhatsApp. Así podemos hablar con más detalle sobre tu situación.\n\n¿Hay algo más en lo que pueda ayudarte?\n\nTambién puedes preguntarme sobre:\n- Cómo funciona el plan\n- Tarifas y precios\n- Seguridad\n- Impuestos en España\n- Comparación con cripto\n- Cómo sacar tu dinero";
}


// ========== CHATBOT UI ==========
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('chatbot-toggle');
    const window_ = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input-field');
    const send = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Toggle chatbot
    toggle.addEventListener('click', () => {
        window_.classList.add('active');
        toggle.style.display = 'none';
        input.focus();
    });

    close.addEventListener('click', () => {
        window_.classList.remove('active');
        toggle.style.display = 'flex';
    });

    // Send message
    function sendMessage(text) {
        if (!text.trim()) return;
        
        // Add user message
        const userDiv = document.createElement('div');
        userDiv.className = 'user-message-chat';
        userDiv.textContent = text;
        messages.appendChild(userDiv);
        
        // Remove quick buttons after first interaction
        const quickButtons = document.querySelector('.quick-buttons');
        if (quickButtons) quickButtons.remove();
        
        // Show typing indicator
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
        
        // Simulate AI thinking
        setTimeout(() => {
            typing.remove();
            const answer = findAnswer(text);
            const botDiv = document.createElement('div');
            botDiv.className = 'bot-message';
            botDiv.innerHTML = answer.replace(/\n/g, '<br>');
            messages.appendChild(botDiv);
            messages.scrollTop = messages.scrollHeight;
        }, 1000 + Math.random() * 1000);
        
        input.value = '';
    }

    send.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });

    // Quick buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sendMessage(btn.dataset.question);
        });
    });

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ========== CALCULATOR ==========
    const monthly = document.getElementById('monthly');
    const years = document.getElementById('years');
    const growth = document.getElementById('growth');
    const monthlyValue = document.getElementById('monthly-value');
    const yearsValue = document.getElementById('years-value');
    const growthValue = document.getElementById('growth-value');
    const totalInvested = document.getElementById('total-invested');
    const totalValue = document.getElementById('total-value');
    const totalProfit = document.getElementById('total-profit');

    function updateCalculator() {
        const m = parseInt(monthly.value);
        const y = parseInt(years.value);
        const g = parseInt(growth.value) / 100;
        
        monthlyValue.textContent = m + '€/mes';
        yearsValue.textContent = y + (y === 1 ? ' año' : ' años');
        growthValue.textContent = (g * 100) + '% anual';
        
        const invested = m * 12 * y;
        
        // Future value of annuity with monthly compounding
        const monthlyRate = g / 12;
        const totalMonths = y * 12;
        let futureValue = 0;
        for (let i = 0; i < totalMonths; i++) {
            futureValue = (futureValue + m) * (1 + monthlyRate);
        }
        
        const profit = futureValue - invested;
        
        totalInvested.textContent = invested.toLocaleString('es-ES') + '€';
        totalValue.textContent = Math.round(futureValue).toLocaleString('es-ES') + '€';
        totalProfit.textContent = '+' + Math.round(profit).toLocaleString('es-ES') + '€';
    }

    monthly.addEventListener('input', updateCalculator);
    years.addEventListener('input', updateCalculator);
    growth.addEventListener('input', updateCalculator);
    updateCalculator();

    // ========== FORM SUBMISSION ==========
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        form.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <div style="font-size:4rem; margin-bottom:20px;">✅</div>
                <h3 style="margin-bottom:10px;">¡Solicitud enviada!</h3>
                <p style="color:#6c757d;">Te contacto personalmente en menos de 24 horas.</p>
                <p style="color:#6c757d; margin-top:10px;">Mientras tanto, puedes preguntarle lo que quieras a nuestro asistente de IA 👉</p>
            </div>
        `;
        
        // In production, send data to server/email service
        console.log('Lead captured:', data);
    });

    // ========== SMOOTH SCROLL FOR HEADER LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========== HEADER SCROLL EFFECT ==========
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
