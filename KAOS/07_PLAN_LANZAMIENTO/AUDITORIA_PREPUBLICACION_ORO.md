# AUDITORIA DE PREPUBLICACION

## Kepa Metales Preciosos — Checklist antes de cualquier publicacion o despliegue

---

## OBJETIVO

Verificar que todos los elementos estan correctos, legales y aprobados antes de publicar contenido, modificar la web o activar cualquier canal de captacion.

---

## 1. REVISION LEGAL Y COMERCIAL

| # | Punto de control | Estado | Notas |
|---|-----------------|--------|-------|
| 1.1 | No se promete rentabilidad en ningun material | PENDIENTE | Revisar todos los textos |
| 1.2 | No se promete ingresos a partners | PENDIENTE | Revisar oferta partners |
| 1.3 | No se usa "inversion" como recomendacion, sino "ahorro" o "informacion" | PENDIENTE | Buscar en todos los textos |
| 1.4 | Disclaimer presente en todo contenido que toque dinero | PENDIENTE | Verificar pie de pagina |
| 1.5 | No se presentan datos no verificados como hechos | PENDIENTE | Revisar claims de AUVESTA |
| 1.6 | Relacion comercial con AUVESTA declarada | OK | Ya esta en aviso-legal.html |
| 1.7 | No hay asesoramiento financiero personalizado | PENDIENTE | Revisar widget IA y textos |
| 1.8 | RGPD: checkbox en formularios | PENDIENTE | Formulario actual no lo tiene |
| 1.9 | Politica de privacidad completa | PENDIENTE | Revisar aviso-legal.html |
| 1.10 | No se guardan credenciales ni tokens en el codigo | OK | Verificado en auditoria anterior |

---

## 2. REVISION TECNICA WEB

| # | Punto de control | Estado | Notas |
|---|-----------------|--------|-------|
| 2.1 | frontend/index.html es el archivo publicado | OK | Confirmado via vercel.json |
| 2.2 | Widget IA oculto correctamente | OK | hidden + display:none + aria-hidden |
| 2.3 | Formulario de contacto envia a Formspree | OK | Implementado en commit a7a1a0a |
| 2.4 | WhatsApp flotante funciona (enlace correcto) | PENDIENTE | Probar en produccion |
| 2.5 | Ticker de precios funciona | PENDIENTE | Verificar API /api/prices |
| 2.6 | Enlaces internos no rotos | PENDIENTE | Comprobar todos los href |
| 2.7 | Imagenes cargan correctamente | PENDIENTE | Verificar en produccion |
| 2.8 | Responsive en movil | PENDIENTE | Probar en dispositivo real |
| 2.9 | SEO basico correcto (meta, OG, canonical) | OK | Implementado |
| 2.10 | No hay secretos expuestos en el codigo | OK | Verificado |
| 2.11 | HTTPS activo | OK | Vercel lo proporciona |
| 2.12 | robots.txt y sitemap.xml correctos | PENDIENTE | Verificar URLs |

---

## 3. REVISION DE CONTENIDO PARA REDES

| # | Punto de control | Estado | Notas |
|---|-----------------|--------|-------|
| 3.1 | Cada contenido tiene disclaimer si toca dinero | PENDIENTE | — |
| 3.2 | No hay errores ortograficos graves | PENDIENTE | Revisar guiones |
| 3.3 | CTA claro en cada publicacion | OK | Definido en calendario |
| 3.4 | Enlace correcto en cada CTA | PENDIENTE | Verificar antes de publicar |
| 3.5 | Imagen de Kepa es la correcta (futurista) | PENDIENTE | Avatar no creado aun |
| 3.6 | No se menciona precio exacto del oro (fluctua) | PENDIENTE | Revisar guiones |
| 3.7 | Contenido comprador no se mezcla con partner | OK | Separado en calendario |
| 3.8 | Horario de publicacion definido | PENDIENTE | Definir en Metricool |
| 3.9 | Hashtags definidos | PENDIENTE | Preparar set de hashtags |
| 3.10 | Formato correcto por red (9:16 para reels, cuadrado para posts) | PENDIENTE | — |

---

## 4. REVISION DE VIDEOS HEYGEN

| # | Punto de control | Estado | Notas |
|---|-----------------|--------|-------|
| 4.1 | Avatar aprobado | PENDIENTE | No creado |
| 4.2 | Voz probada y correcta | PENDIENTE | — |
| 4.3 | Pronunciacion revisada (Zurich, AUVESTA) | PENDIENTE | — |
| 4.4 | Creditos disponibles confirmados | PENDIENTE | — |
| 4.5 | Guion aprobado por KAOS | PENDIENTE | — |
| 4.6 | Disclaimer al final del video | OK | Incluido en guiones |
| 4.7 | Duracion dentro de limites (30s o 45s) | OK | Definido en guiones |
| 4.8 | Aprobacion para gastar creditos | PENDIENTE | Requiere OK explicito |

---

## 5. CLAIMS QUE DEBEN CORREGIRSE EN LA WEB ACTUAL

Estos textos estan actualmente en la web publicada y deben revisarse antes de cualquier campana de captacion:

| # | Ubicacion | Texto actual | Problema | Accion recomendada |
|---|-----------|--------------|----------|-------------------|
| 5.1 | index.html hero stats | "17+ anos de trayectoria / 134 paises / 200k+ inversores" | Parecen datos propios de Kepa pero son de AUVESTA | Atribuir claramente a AUVESTA o eliminar |
| 5.2 | index.html trust card | "Colaborador oficial de AUVESTA..." | Correcto pero debe mantenerse coherente con modelo multiproveedor | Mantener por ahora, cambiar en fase 2 |
| 5.3 | index.html seccion confianza | "Kepa Bilbao es colaborador oficial de AUVESTA Edelmetalle AG" | Correcto y declarado | OK |
| 5.4 | index.html badge foto | "AUVESTA - Colaborador oficial" | Muy prominente para un modelo multiproveedor | Mantener por ahora, cambiar en fase 2 |
| 5.5 | footer | "Partners / Auvesta" | Titulo sugiere que partners = auvesta | Cambiar a "Partners" en fase 2 |
| 5.6 | partners.html | Toda la pagina centrada en AUVESTA | No hay comparador ni otros proveedores | Fase 2: convertir en pagina multiproveedor |
| 5.7 | index.html raiz (legacy) | "Garantia recompra 100%" | Claim fuerte sin fuente verificable | index.html raiz no se publica (es legacy) |

**PRIORIDAD:** Los items 5.1 y 5.7 son los de mayor riesgo legal. El 5.1 esta en produccion.

---

## 6. REVISION DE FORMULARIOS

| # | Punto de control | Estado | Notas |
|---|-----------------|--------|-------|
| 6.1 | Formulario compradores existe | OK | contacto.html |
| 6.2 | Formulario compradores conectado a backend | OK | Formspree (a7a1a0a) |
| 6.3 | Formulario partners separado | NO EXISTE | Crear en siguiente bloque |
| 6.4 | Checkbox RGPD en formulario compradores | NO EXISTE | Anadir |
| 6.5 | Mensaje de confirmacion tras envio | OK | Frontend muestra mensaje |
| 6.6 | Datos llegan a Formspree | PENDIENTE DE PRUEBA | Probar en produccion |
| 6.7 | No se almacenan datos sensibles en frontend | OK | — |

---

## 7. REVISION DE CONTACTOS

| # | Canal | Funcional | Notas |
|---|-------|-----------|-------|
| 7.1 | WhatsApp +34 611 918 310 | PENDIENTE DE PRUEBA | Enlace en web apunta a este numero |
| 7.2 | Email kepabilbao67@gmail.com | PENDIENTE DE PRUEBA | En contacto.html |
| 7.3 | Telefono +34 611 918 310 | PENDIENTE DE PRUEBA | En contacto.html |
| 7.4 | Formulario web | OK (Formspree) | — |

---

## 8. DECISION FINAL

Antes de publicar el primer contenido o activar cualquier canal, todos los items marcados como PENDIENTE en las secciones 1, 3 y 5 deben resolverse o aceptarse conscientemente.

### Items criticos (bloquean publicacion):
- 1.1 — No prometer rentabilidad (revisar textos)
- 1.8 — Checkbox RGPD en formulario
- 5.1 — Stats del hero que parecen propios

### Items importantes (deben resolverse pronto):
- 6.3 — Formulario partners separado
- 3.5 — Avatar futurista
- 4.1 — Avatar HeyGen

### Items secundarios (pueden esperar):
- 2.8 — Test responsive
- 3.9 — Hashtags
- 5.5 — Footer "Partners / Auvesta"

---

## 9. ESTADO DE APROBACION

| Ambito | Estado |
|--------|--------|
| Documentos KAOS | BORRADOR — pendiente aprobacion |
| Web actual (produccion) | PUBLICADA con items a corregir |
| Contenidos redes | BORRADOR — no publicar aun |
| Videos HeyGen | NO GENERAR |
| Automatizaciones | NO ACTIVAR |
| Ads | NO LANZAR |

---

*Documento creado: 16 julio 2026*
*Estado: BORRADOR v1*
*Autor: KAOS / Kiro*
