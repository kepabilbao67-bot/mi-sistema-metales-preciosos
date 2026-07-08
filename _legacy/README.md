# _legacy/ — Código heredado NO activo

## Aviso importante

Los archivos en esta carpeta son código heredado que **NO debe usarse en producción**.

### chatbot-ia.js

- Código de chatbot anterior con enfoque comercial no válido para el proyecto actual.
- Contiene frases que prometen rentabilidad implícita y lenguaje de venta agresivo.
- Tiene placeholder de API key en frontend (arquitectura insegura).
- **NO reutilizar para la nueva IA educativa.**

### La nueva IA educativa debe:

- Construirse desde cero con backend seguro (Vercel Function).
- Usar `OPENAI_API_KEY` exclusivamente en variables de entorno de Vercel.
- Tener un system prompt restrictivo: solo educativo, sin asesoramiento financiero personalizado.
- No prometer rentabilidad, no decir "compra" ni "vende".
- Derivar a contacto/WhatsApp para consultas personales.

### Por qué no se elimina del repo

Se mantiene como referencia histórica. No se hace force push para no alterar el historial de Git.
