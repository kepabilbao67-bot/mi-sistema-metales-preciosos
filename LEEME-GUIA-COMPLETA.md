# 📖 LÉEME — GUÍA COMPLETA DE TU SISTEMA
# Lee esto PRIMERO. Te explica TODO lo que tienes y cómo usarlo.
# Tiempo de lectura: 10 minutos. Te ahorrará HORAS de confusión.

---

## 🗂️ TUS ARCHIVOS — QUÉ ES CADA UNO

### 🌐 ARCHIVOS WEB (tu página de internet):

| Archivo | Qué es | Para qué sirve |
|---------|--------|-----------------|
| `index.html` | Tu página PRINCIPAL | Es la web que ven tus clientes |
| `styles.css` | Los ESTILOS (colores, formas) | Hace que la web sea bonita |
| `chatbot-ia.js` | El CHATBOT inteligente | Responde preguntas de clientes 24/7 |
| `app-integration.js` | CONEXIÓN con tu app | Envía leads a tu app de captación |
| `error-handler.js` | ARREGLADOR de fallos | Detecta y arregla problemas automáticamente |
| `script.js` | Funciones EXTRA | Calculadora, FAQ, formulario (versión básica) |
| `gracias.html` | Página de GRACIAS | Lo que ve el cliente tras enviar formulario |
| `lead-magnet.html` | Página de GUÍA GRATIS | Para captar emails ofreciendo una guía |
| `sobre-mi.html` | Tu página PERSONAL | Genera confianza mostrando quién eres |
| `index-seo.html` | Plantilla SEO | Referencia de cómo debe ser el head para SEO |

### 📋 ARCHIVOS DE ESTRATEGIA (guías y contenido):

| Archivo | Qué es | Cuándo usarlo |
|---------|--------|---------------|
| `CALENDARIO-INSTAGRAM-30-DIAS.md` | 30 posts listos | Cada día copia y publica |
| `SCRIPTS-VIDEOS-REELS.md` | 10 guiones de vídeo | Cuando vayas a grabar |
| `SECUENCIA-EMAILS-7-DIAS.md` | 7 emails automáticos | Copiar en Mailerlite |
| `WHATSAPP-SECUENCIA-CIERRE.md` | Mensajes de WhatsApp | Cuando hables con leads |
| `GUIA-WAALAXY-MANYCHAT.md` | Automatización redes | Para configurar bots |
| `GUIA-AUTOMATIZACION.md` | Plan general | Visión del sistema completo |
| `FACEBOOK-ADS-GUIA.md` | Publicidad pagada | Cuando tengas presupuesto |
| `PRESENTACION-REUNIONES.md` | Guión presentaciones | Para reuniones/directos |
| `CRM-GOOGLE-SHEETS.md` | Tu CRM gratis | Para gestionar leads |
| `NEWSLETTER-SEMANAL.md` | 12 newsletters | Enviar cada lunes |
| `DIRECTO-INSTAGRAM-SCRIPT.md` | Script directo IG | Una vez al mes mínimo |
| `CANVA-TEMPLATES-GUIA.md` | Diseño con Canva | Para crear imágenes |
| `TRACKING-LEADS.md` | Medir resultados | Para saber qué funciona |
| `FIVERR-TEMPLATE-VENDER.md` | Vender a otros | Ganar dinero extra |

---

## 🚀 CÓMO SUBIR TU WEB A INTERNET (5 minutos, GRATIS)

### Opción A: NETLIFY (la más fácil, recomendada)

```
1. Ve a netlify.com
2. Crea cuenta gratis (con tu email o GitHub)
3. En el dashboard, busca "Deploy manually" o "Drag and drop"
4. ARRASTRA la carpeta "auvesta-landing" entera al recuadro
5. Espera 30 segundos
6. ¡LISTO! Te da una URL tipo: random-name-12345.netlify.app
7. Tu web ya está online 🎉
```

### Opción B: DOMINIO PROPIO (10€/año)

```
1. Compra un dominio en namecheap.com (ej: oroparatufuturo.com)
2. En Netlify → Domain settings → Add custom domain
3. Pon tu dominio → Te da unos DNS (nameservers)
4. En Namecheap → Domain → Custom DNS → Pega los de Netlify
5. Espera 1-24 horas (propagación DNS)
6. ¡Tu web con dominio profesional! 🎉
```

---

## ⚙️ CÓMO PERSONALIZAR LA WEB CON TUS DATOS

### PASO 1: Cambia estos datos en `chatbot-ia.js`:

Busca estas líneas al principio del archivo:
```javascript
partnerName: 'Tu Nombre',        // ← PON TU NOMBRE REAL
whatsappNumber: '34600000000',   // ← PON TU WHATSAPP (sin +)
whatsappMessage: 'Hola!...',     // ← Mensaje que reciben al escribirte
```

### PASO 2: Cambia estos datos en `app-integration.js`:

```javascript
partner: {
    name: 'TU NOMBRE AQUÍ',       // ← Tu nombre
    whatsapp: '34TUNUMERO',       // ← Tu WhatsApp
    email: 'tu@email.com',        // ← Tu email
    instagram: '@tuusuario',      // ← Tu Instagram
}
```

### PASO 3: Busca y reemplaza en TODOS los archivos:

Usa Ctrl+H (buscar y reemplazar) en tu editor:
```
Buscar: "34TUNUMERO"  → Reemplazar: tu número real (ej: 34612345678)
Buscar: "tudominio.com" → Reemplazar: tu dominio real
Buscar: "OroParaTuFuturo" → Reemplazar: tu marca/nombre
Buscar: "[Tu Nombre]" → Reemplazar: tu nombre real
Buscar: "TU-API-KEY-AQUI" → Reemplazar: tu clave de OpenAI (opcional)
```

---

## 🤖 CÓMO FUNCIONA EL CHATBOT (para que lo entiendas)

```
EL CHATBOT TIENE 2 MODOS:

MODO 1 — LOCAL (gratis, sin API):
- Funciona con respuestas PRE-PROGRAMADAS
- Detecta palabras clave en la pregunta del usuario
- Responde con las respuestas que YO ya escribí
- Cubre +10 temas (tarifas, seguridad, impuestos, etc.)
- Si no entiende → redirige a WhatsApp contigo
- COSTE: 0€

MODO 2 — IA REAL (con OpenAI API):
- Responde CUALQUIER pregunta sobre el oro
- Tiene todo el conocimiento de AUVESTA cargado
- Habla de forma natural y personalizada
- Detecta intención de compra → avisa a tu app
- COSTE: ~0,01-0,03€ por conversación (~3€/mes con 100 chats)

¿CÓMO ACTIVAR MODO 2?
1. Ve a platform.openai.com
2. Crea cuenta → API Keys → Create new key
3. Carga 5€ de crédito (dura meses)
4. Copia la key
5. Pégala en chatbot-ia.js donde dice "TU-API-KEY-AQUI"
6. ¡Listo! El chatbot ahora es inteligente de verdad.
```

---

## 🔌 CÓMO CONECTAR CON TU APP DE CAPTACIÓN

Cuando tu app esté lista (la del otro proyecto):

```
1. Abre app-integration.js
2. Cambia appBaseUrl por la URL de tu app
   Ejemplo: 'https://mi-app.com/api'
3. Cambia apiToken por tu token de acceso
4. Cambia enabled de false a true
5. ¡Hecho! Ahora cada lead va directo a tu app.
```

**¿Qué pasa cuando se conecta?**
- Cada formulario enviado → se envía a tu app
- Cada interacción del chatbot → se registra
- Si detecta intención de compra → aviso urgente a ti
- Tu app dispara campañas automáticas en TODOS los canales
- Si la app cae → los leads se guardan localmente y se sincronizan después

---

## 📱 TU RUTINA DIARIA (20-30 minutos)

```
☀️ MAÑANA (10 min):
  □ Abrir WhatsApp Business → responder mensajes nuevos
  □ Revisar DMs de Instagram → responder o dejar que ManyChat lo haga
  □ Mirar notificaciones de tu app (leads nuevos)

☀️ MEDIODÍA (5 min):
  □ El post del día se publica solo (programado con Metricool)
  □ Responder comentarios nuevos en el post

🌙 TARDE (15 min):
  □ 1-2 llamadas/audios con leads calientes
  □ Actualizar CRM (mover leads de estado)
  □ Responder últimos DMs del día

📅 DOMINGO (45 min):
  □ Programar 7 posts de la semana siguiente
  □ Revisar métricas (qué funcionó, qué no)
  □ Preparar contenido nuevo si hace falta
```

---

## ❓ PREGUNTAS FRECUENTES TUYAS

**¿Necesito saber programar?**
No. Solo necesitas copiar/pegar y cambiar tus datos. Todo está explicado.

**¿Cuánto cuesta mantener esto?**
- Web en Netlify: GRATIS
- Dominio propio: ~10€/año (opcional)
- ChatBot IA: 0€ (modo local) o ~3€/mes (con OpenAI)
- Mailerlite: GRATIS hasta 1.000 contactos
- ManyChat: GRATIS hasta 1.000 contactos
- Metricool: GRATIS (plan básico)
- **TOTAL MÍNIMO: 0€/mes**

**¿Puedo cambiar los textos/colores?**
Sí. Los textos están en index.html (busca lo que quieras cambiar). Los colores están al principio de styles.css en las variables (--gold, --dark, etc.).

**¿El chatbot funciona en móvil?**
Sí. Todo es responsive (se adapta a cualquier pantalla).

**¿Qué pasa si se me olvida la API key de OpenAI?**
El chatbot sigue funcionando en modo local (con respuestas pre-programadas). No se rompe nada.

**¿Puedo añadir más preguntas al chatbot?**
Sí. En chatbot-ia.js busca "chatbotKnowledge" y añade más entradas copiando el formato de las existentes.

---

## 🆘 SI ALGO NO FUNCIONA:

1. **La web no carga:** Sube de nuevo a Netlify (arrastra la carpeta)
2. **El chatbot no responde:** Verifica que chatbot-ia.js está enlazado en el HTML
3. **No recibo leads:** Comprueba que APP_CONFIG.enabled = true en app-integration.js
4. **El formulario no envía:** Abre la consola del navegador (F12) y mira si hay errores rojos
5. **Los estilos se ven mal:** Verifica que styles.css está enlazado en el <head>

**Si nada funciona:** Escríbeme y lo arreglamos juntos.

---

## 📈 TU HOJA DE RUTA (próximos 90 días)

| Semana | Acción principal | Resultado esperado |
|--------|-----------------|-------------------|
| 1 | Subir web + configurar WhatsApp + primeros 7 posts | Web online, primeros contactos |
| 2 | Activar ManyChat + enviar mensajes a 50 conocidos | 5-10 conversaciones |
| 3 | Configurar Mailerlite + publicar cada día | Primeros leads por email |
| 4 | Primer directo de Instagram + cerrar primeros clientes | 2-5 clientes |
| 5-8 | Activar Waalaxy LinkedIn + escalar contenido | 5-10 clientes/mes |
| 9-12 | Facebook Ads + optimizar lo que funciona | 10-15 clientes/mes |
| 13+ | Tu app de captación conectada + automatización total | 15-20+ clientes/mes |
