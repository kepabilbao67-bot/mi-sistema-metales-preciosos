# 📣 GUÍA DE FACEBOOK/INSTAGRAM ADS — CAPTACIÓN PAGADA
# Para cuando tengas presupuesto (desde 5€/día = 150€/mes)
# Resultado esperado: 20-80 leads/mes con 150-300€ de inversión
# ROI: Si 1 cliente te genera +X€ de comisión, solo necesitas 2-3 al mes

---

## ⚠️ CUÁNDO ACTIVAR ADS (no antes)

Activa publicidad pagada SOLO cuando:
✅ Ya tengas tu landing page funcionando
✅ Ya tengas WhatsApp Business configurado
✅ Ya hayas hecho al menos 5 presentaciones manuales
✅ Sepas responder objeciones con fluidez
✅ Tengas al menos 1-2 clientes (prueba social)

NO actives ads si no puedes atender leads rápido (máx 4h).

---

## 🎯 ESTRATEGIA DE CAMPAÑA

### Presupuesto mínimo: 5€/día (150€/mes)
### Presupuesto recomendado: 10€/día (300€/mes)
### Objetivo: Leads (formulario o WhatsApp)

---

## CAMPAÑA 1: "Lead Magnet — Calculadora de Ahorro"

**Objetivo de campaña:** Generación de leads
**Optimización:** Conversiones (formulario)
**Destino:** Tu landing page (#calculadora)

**Público objetivo:**
```
Ubicación: España
Edad: 28-55 años
Género: Todos
Intereses:
  - Inversión
  - Finanzas personales  
  - Ahorro
  - Oro
  - Mercados financieros
  - Libertad financiera
  - Jubilación
  - Patrimonio

Exclusiones:
  - Personas que ya han visitado tu web (retargeting separado)
```

**Texto del anuncio (Opción A — Dato impactante):**
```
📈 El oro ha subido un 144% en 5 años.

Mientras tu banco te da un 0,5%.

¿Sabías que puedes ahorrar en ORO FÍSICO desde 25€/mes?

✅ Sin contratos ni permanencia
✅ Lingote real con tu nombre
✅ Empresa alemana, 17 años, +200.000 inversores
✅ Puedes vender online cuando quieras

🔢 Usa nuestra calculadora GRATIS y descubre cuánto 
podrías tener en 5 años ahorrando en oro.

👇 Haz clic y calcula tu futuro.
```

**Texto del anuncio (Opción B — Pregunta):**
```
❓ ¿Cuánto valdrán tus 100€/mes dentro de 5 años?

🏦 En el banco: ~6.300€ (inflación te quita -25%)
🥇 En oro físico: potencialmente +14.000€*

La diferencia es UNA decisión.

✅ Desde 25€/mes
✅ Sin permanencia
✅ 100% tuyo
✅ Exento de IVA

Calcula GRATIS cuánto podrías tener 👇

*Basado en rendimiento 2021-2026. No garantiza futuro.
```

**Texto del anuncio (Opción C — Emocional):**
```
Tu dinero en el banco pierde valor cada día.

La inflación ha destruido un 25% de tu poder adquisitivo 
en 5 años. Y no va a parar.

Hay una forma de protegerte que lleva 5.000 años 
funcionando: ORO FÍSICO.

Y hoy puedes acceder desde solo 25€/mes.

Sin ser rico. Sin ser experto. Desde tu sofá.

Descubre cómo → calcula tu ahorro en oro gratis 👇
```

**Imagen/Vídeo del anuncio:**
- Imagen 1: Lingote de oro con texto "144% en 5 años"
- Imagen 2: Comparativa banco vs oro (barras)
- Vídeo: Tu Reel #1 ("144% — eso es lo que ha subido el oro")

---

## CAMPAÑA 2: "WhatsApp directo"

**Objetivo:** Mensajes (WhatsApp)
**Destino:** WhatsApp Business directo

**Texto:**
```
¿Quieres proteger tus ahorros de la inflación?

Te explico GRATIS en 5 minutos cómo ahorrar en oro 
físico desde 25€/mes con la mayor empresa de metales 
preciosos de Europa.

📱 Escríbeme por WhatsApp → te respondo personalmente.

Sin compromiso. Sin spam. Solo información.
```

**Botón:** "Enviar mensaje de WhatsApp"
**Mensaje prellenado:** "Hola! Vi tu anuncio y me interesa saber más sobre el ahorro en oro"

---

## CAMPAÑA 3: RETARGETING (los que visitaron tu web)

**Público:** Personas que visitaron tu landing en los últimos 30 días PERO no rellenaron el formulario.
**Presupuesto:** 3€/día (90€/mes)

**Texto:**
```
Volviste a pensarlo, ¿verdad? 🤔

El oro sigue subiendo. Hoy está a ~116€/gramo.
Hace 1 mes estaba a menos.

Si te quedaste con dudas, estoy aquí para resolverlas.
Sin presión, sin compromiso.

📱 Escríbeme "DUDAS" por WhatsApp y te respondo al momento.
```

---

## 📊 MÉTRICAS A VIGILAR

| Métrica | Objetivo | Si es peor |
|---------|----------|------------|
| CPM (coste por 1.000 impresiones) | <10€ | Cambiar público |
| CTR (% clics) | >1,5% | Cambiar texto/imagen |
| CPL (coste por lead) | <5-15€ | Optimizar landing |
| Ratio lead→cliente | >20% | Mejorar seguimiento |

**Ejemplo con 300€/mes (10€/día):**
```
Si CPL = 5€ → 60 leads/mes
Si CPL = 10€ → 30 leads/mes
Si conversión = 25% → 7-15 clientes/mes
```

---

## 🔧 CONFIGURACIÓN TÉCNICA

### Paso 1: Instalar Meta Pixel
```html
<!-- Pegar esto en el <head> de tu index.html -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### Paso 2: Evento de conversión al enviar formulario
```javascript
// Añadir al submit del formulario en chatbot-ia.js
fbq('track', 'Lead', {
    content_name: 'Formulario oro',
    content_category: 'lead'
});
```

### Paso 3: Crear conversión personalizada
- En Meta Business Suite → Eventos → Conversiones personalizadas
- URL contiene: "/gracias" o cuando el formulario muestra "✅ Solicitud enviada"

---

## 💡 CONSEJOS PRO

1. **A/B testea SIEMPRE** — 2-3 versiones de texto + 2-3 imágenes
2. **Empieza con 5€/día** y sube cuando veas qué funciona
3. **No toques la campaña en 3-4 días** — el algoritmo necesita aprender
4. **Responde leads de ads en menos de 5 minutos** — están calientes ahora
5. **Los vídeos funcionan mejor** que las imágenes (menor CPL)
6. **El retargeting es ORO** (nunca mejor dicho) — CPL 50% menor
7. **Desactiva anuncios que lleven 1.000 impresiones sin resultado**
8. **Los fines de semana** suelen tener CPL más bajo
9. **Lookalike audience:** Cuando tengas 100 leads, crea un público similar
10. **Excluye a tus clientes actuales** de las campañas
