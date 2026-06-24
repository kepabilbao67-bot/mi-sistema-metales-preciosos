# 📊 CRM EN GOOGLE SHEETS — GESTIONA TUS LEADS Y CLIENTES
# Crea esta hoja en Google Sheets y cópiala:
# sheets.google.com → Nueva hoja de cálculo

---

## 🗂️ PESTAÑA 1: "LEADS" (Todos tus contactos)

### Columnas:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Fecha | Nombre | Teléfono | Email | Canal origen | Estado | Última acción | Próximo paso | Fecha próximo | Notas |

### Estados posibles (columna F):
```
🟡 NUEVO — Acaba de contactar, no he hablado aún
🔵 CONTACTADO — Le he escrito, esperando respuesta  
🟠 INTERESADO — Ha mostrado interés, en conversación
🟢 PRESENTACIÓN — Hemos tenido presentación/llamada
💚 CALIENTE — Quiere empezar, falta cierre
✅ CLIENTE — Se ha registrado y ha pagado
❌ PERDIDO — No le interesa / no responde
⏸️ PAUSADO — Interesado pero "no es el momento"
```

### Canales de origen (columna E):
```
IG — Instagram (DM)
LI — LinkedIn
WA — WhatsApp (contacto directo)
WEB — Landing page (formulario)
REF — Referido de otro cliente
FB — Facebook
TT — TikTok
PRES — Presencial/evento
```

### Ejemplo de filas:

| Fecha | Nombre | Teléfono | Email | Canal | Estado | Última acción | Próximo paso | Fecha | Notas |
|-------|--------|----------|-------|-------|--------|---------------|-------------|-------|-------|
| 23/06 | María López | +34612... | maria@... | IG | 🟠 | Envié info | Proponer llamada | 25/06 | Le interesa para hijos |
| 23/06 | Pedro García | +34655... | pedro@... | LI | 🔵 | Msg 2 Waalaxy | Esperar respuesta | 27/06 | Autónomo, sector tech |
| 22/06 | Ana Ruiz | +34699... | ana@... | WEB | 💚 | Presentación hecha | Cierre mañana | 24/06 | Quiere M-6, tiene 200€/mes |

---

## 🗂️ PESTAÑA 2: "CLIENTES" (Los que ya se han registrado)

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Fecha registro | Nombre | Tarifa | Ahorro mensual | Canal origen | Seguimiento 7 días | Seguimiento 30 días | Seguimiento 90 días | Notas |

---

## 🗂️ PESTAÑA 3: "MÉTRICAS SEMANALES"

| Semana | Mensajes enviados | Respuestas | Presentaciones | Cierres | Ratio conversión | Ingresos comisión |
|--------|------------------|-----------|----------------|---------|-----------------|-------------------|
| S1 (24-30 jun) | | | | | | |
| S2 (1-7 jul) | | | | | | |
| S3 (8-14 jul) | | | | | | |
| S4 (15-21 jul) | | | | | | |

**Fórmulas útiles:**
```
Ratio respuesta = Respuestas / Mensajes × 100
Ratio presentación = Presentaciones / Respuestas × 100
Ratio cierre = Cierres / Presentaciones × 100
Ratio total = Cierres / Mensajes × 100
```

---

## 🗂️ PESTAÑA 4: "CONTENIDO PUBLICADO"

| Fecha | Red social | Tipo | Tema | Alcance | Likes | Comentarios | DMs recibidos |
|-------|-----------|------|------|---------|-------|------------|---------------|
| 24/06 | Instagram | Carrusel | 144% en 5 años | | | | |
| 25/06 | Instagram | Imagen | Dato inflación | | | | |
| 26/06 | TikTok | Reel | 3 mentiras oro | | | | |

---

## 🗂️ PESTAÑA 5: "TAREAS DIARIAS"

| Lunes | Martes | Miércoles | Jueves | Viernes | Sábado | Domingo |
|-------|--------|-----------|--------|---------|--------|---------|
| □ Revisar DMs | □ Revisar DMs | □ Revisar DMs | □ Revisar DMs | □ Revisar DMs | □ Grabar Reels | □ Programar posts |
| □ 5 msgs LinkedIn | □ 5 msgs LinkedIn | □ 5 msgs LinkedIn | □ 5 msgs LinkedIn | □ 5 msgs LinkedIn | □ Contenido semana | □ Revisar métricas |
| □ Publicar post | □ Publicar post | □ Publicar post | □ Publicar post | □ Publicar post | □ Responder DMs | □ Planificar |
| □ 2 llamadas | □ 2 llamadas | □ 2 llamadas | □ 2 llamadas | □ 2 llamadas | | |
| □ Actualizar CRM | □ Actualizar CRM | □ Actualizar CRM | □ Actualizar CRM | □ Actualizar CRM | | |

---

## 💡 AUTOMATIZACIÓN DEL CRM

### Con Google Sheets + Google Forms:

1. **Crea un Google Form** con los campos del formulario de tu landing
2. **Conecta las respuestas** a la pestaña "LEADS" automáticamente
3. Cada vez que alguien rellena tu formulario → aparece en tu CRM

### Con Zapier (gratis hasta 100 tareas/mes):

```
Trigger: Nuevo formulario en tu landing
  → Acción: Añadir fila en Google Sheets (pestaña LEADS)
  → Acción: Enviarte notificación por email
  → Acción: Enviarte mensaje de Slack/Telegram
```

### Código de colores para estados:

```
🟡 Amarillo claro — Nuevo
🔵 Azul claro — Contactado
🟠 Naranja — Interesado
🟢 Verde claro — Presentación hecha
💚 Verde fuerte — Caliente (próximo a cerrar)
✅ Verde + negrita — CLIENTE
❌ Rojo tachado — Perdido
⏸️ Gris — Pausado
```

---

## 📱 DASHBOARD RÁPIDO (primera celda de la hoja)

Añade esto arriba de todo en tu hoja para ver resumen al abrir:

```
===========================================
RESUMEN HOY:
Leads totales: [fórmula CONTARA]
Leads activos: [fórmula CONTAR.SI estado<>"❌"]
Presentaciones pendientes: [CONTAR.SI estado="🟢"]
Clientes totales: [CONTAR.SI estado="✅"]
Ratio conversión general: [clientes/leads totales]
===========================================
```

**Fórmulas Google Sheets:**
```
Total leads: =CONTARA(A2:A)
Leads activos: =CONTAR.SI(F2:F,"<>❌")
Clientes: =CONTAR.SI(F2:F,"✅")
Ratio: =CONTAR.SI(F2:F,"✅")/CONTARA(A2:A)*100 & "%"
```
