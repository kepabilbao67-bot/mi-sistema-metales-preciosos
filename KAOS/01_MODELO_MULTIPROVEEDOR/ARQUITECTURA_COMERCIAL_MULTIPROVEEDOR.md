# ARQUITECTURA COMERCIAL MULTIPROVEEDOR

## Kepa Metales Preciosos — Sistema de comparacion y recomendacion

---

## 1. PRINCIPIO FUNDAMENTAL

Kepa Metales Preciosos es una marca independiente de informacion, comparacion y acompanamiento en metales preciosos fisicos.

No es representante exclusivo de ninguna empresa.

El sistema esta disenado para incorporar multiples proveedores y ofrecer al cliente la opcion mas adecuada segun sus necesidades, no solo la mas barata.

---

## 2. ESTRUCTURA DE PROVEEDORES

Cada proveedor se registra con la siguiente ficha:

| Campo | Descripcion |
|-------|-------------|
| ID | Identificador unico (PROV-001, PROV-002...) |
| Nombre | Nombre comercial de la empresa |
| Pais | Pais de registro legal |
| Web | URL oficial |
| Precio del oro | Fuente de precio y tipo (spot, fixing, propio) |
| Prima / Spread | Porcentaje o importe sobre spot |
| Comision de compra | Porcentaje o fijo por operacion |
| Comision de venta | Porcentaje o fijo por recompra |
| Custodia | Coste mensual/anual y ubicacion |
| Seguro | Incluido o adicional, cobertura |
| Entrega fisica | Disponible, coste, minimo |
| Importe minimo | Para empezar (unico o periodico) |
| Compra periodica | Disponible, frecuencia, minimo |
| Programa de partners | Existe o no |
| Comision comercial | Estructura de compensacion para partners |
| API disponible | Si/No, tipo |
| Panel de partner | Acceso, funcionalidades |
| Enlace de alta | URL de registro para nuevos clientes |
| Condiciones especiales | Requisitos, restricciones, exclusividades |
| Fecha de actualizacion | Ultima revision de los datos |
| Estado de verificacion | VERIFICADO / PENDIENTE DE VERIFICACION |

---

## 3. CRITERIOS DE COMPARACION

El sistema NO recomienda unicamente por precio. Compara:

1. **Coste total** — prima + comisiones + custodia + seguro
2. **Seguridad** — regulacion, auditoria, segregacion de activos
3. **Liquidez** — facilidad y coste de recompra/venta
4. **Custodia** — ubicacion, tipo, acceso, seguro
5. **Entrega fisica** — disponibilidad, coste, tiempos
6. **Flexibilidad** — importes minimos, pausas, cancelaciones
7. **Transparencia** — acceso a informacion, auditoria, tracking
8. **Beneficio comercial** — para quien quiera ser partner

---

## 4. FLUJO DE RECOMENDACION

```
Cliente contacta
    |
    v
Kepa escucha necesidades
    |
    v
Clasifica perfil:
  - Importe disponible
  - Objetivo (ahorro periodico / compra puntual / entrega)
  - Horizonte temporal
  - Preferencia custodia vs entrega
  - Interes en ser partner
    |
    v
Sistema compara proveedores segun perfil
    |
    v
Kepa presenta opciones con pros/contras
    |
    v
Cliente decide libremente
```

---

## 5. REGLAS DE CUMPLIMIENTO

- No prometer rentabilidad ni resultados futuros.
- No presentar ningun proveedor como "el mejor" sin matizar.
- Siempre indicar que el precio de los metales fluctua.
- No dar asesoramiento financiero personalizado.
- Declarar la relacion comercial con cada proveedor (comisiones, colaboracion).
- Indicar claramente cuando un dato es PENDIENTE DE VERIFICACION.
- No inventar precios, comisiones ni condiciones.

---

## 6. PROVEEDORES REGISTRADOS

| ID | Nombre | Estado | Ficha |
|----|--------|--------|-------|
| PROV-001 | AUVESTA Edelmetalle AG | Primer proveedor activo | PROVEEDOR_001_AUVESTA.md |
| PROV-002 | (Reservado) | Pendiente de investigacion | — |
| PROV-003 | (Reservado) | Pendiente de investigacion | — |

---

## 7. EVOLUCION PREVISTA

### Fase 1 (actual)
- Un unico proveedor (Auvesta).
- Comparador no activo en web.
- Informacion del proveedor en la seccion Partners.

### Fase 2 (proxima)
- Incorporar segundo proveedor.
- Crear pagina de comparacion en web.
- Formulario separado para compradores y partners.

### Fase 3 (futura)
- Tres o mas proveedores.
- Comparador interactivo en web.
- API interna de precios multiproveedor.
- CRM con clasificacion por proveedor preferido.

---

## 8. NOTAS

- Este documento es interno y no se publica en la web.
- Los datos de proveedores deben actualizarse trimestralmente como minimo.
- Cualquier dato no verificado por fuente oficial debe marcarse como PENDIENTE DE VERIFICACION.
- La decision final siempre es del cliente.

---

*Documento creado: 16 julio 2026*
*Estado: BORRADOR v1*
*Autor: KAOS / Kiro*
