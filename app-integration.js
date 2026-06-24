// =============================================
// 🔌 APP-INTEGRATION.JS
// Este archivo conecta tu landing page con tu APP DE CAPTACIÓN.
// Cuando la app esté lista, solo cambias las URLs y funciona.
//
// ¿QUÉ HACE?
// 1. Envía los leads del formulario a tu app
// 2. Envía los datos del chatbot a tu app
// 3. Trackea de qué canal viene cada lead
// 4. Se conecta con todas las redes que tu app soporte
//
// ¿CÓMO FUNCIONA?
// Cada vez que alguien rellena un formulario o interactúa
// con el chatbot, este archivo envía esos datos a tu app
// mediante "webhooks" (como mensajeros automáticos).
// =============================================

// =============================================
// ⚙️ CONFIGURACIÓN — CAMBIA ESTOS VALORES
// Cuando tu app esté lista, pon aquí las URLs reales
// =============================================
const APP_CONFIG = {
    
    // URL de tu app de captación (donde se envían los leads)
    // Ejemplo: "https://mi-app-captacion.com/api/leads"
    appBaseUrl: 'https://TU-APP-CAPTACION.com/api',
    
    // Tu token/clave de acceso a la app (para seguridad)
    apiToken: 'TU-TOKEN-DE-API-AQUI',
    
    // ¿Activar integración? (false = no envía nada, para pruebas)
    enabled: false,  // Pon TRUE cuando la app esté lista
    
    // Endpoints de tu app (rutas donde se envían los datos)
    endpoints: {
        newLead: '/leads/create',         // Crear nuevo lead
        chatMessage: '/chat/message',     // Mensaje del chatbot
        trackEvent: '/analytics/event',   // Evento de tracking
        campaignTrigger: '/campaigns/trigger', // Disparar campaña
    },
    
    // Canales que tu app soporta (marca true los que tenga)
    channels: {
        whatsapp: true,
        instagram: true,
        linkedin: true,
        facebook: true,
        tiktok: true,
        email: true,
        sms: false,
        telegram: true,
    },
    
    // Tu info de contacto (para el chatbot y formularios)
    partner: {
        name: 'TU NOMBRE AQUÍ',
        whatsapp: '34611918310',
        email: 'tu@email.com',
        instagram: '@tuusuario',
        linkedin: 'tu-perfil-linkedin',
    },
    
    // Configuración del chatbot IA
    ai: {
        // Usa OpenAI si tienes API key, si no usa respuestas locales
        provider: 'openai', // 'openai' o 'local'
        apiKey: 'TU-OPENAI-API-KEY',
        model: 'gpt-4o-mini', // Más inteligente y barato
        maxTokens: 600,
    }
};

// =============================================
// 📊 TRACKING — DETECTAR DE DÓNDE VIENE EL VISITANTE
// Esto lee los parámetros UTM de la URL para saber
// si viene de Instagram, LinkedIn, Ads, etc.
// =============================================

function getTrackingData() {
    // Leer parámetros UTM de la URL
    // Ejemplo: tudominio.com?utm_source=instagram&utm_medium=bio
    const params = new URLSearchParams(window.location.search);
    
    return {
        // De dónde viene (instagram, linkedin, facebook, etc.)
        source: params.get('utm_source') || 'directo',
        // Qué tipo de enlace (bio, dm, ads, email, etc.)
        medium: params.get('utm_medium') || 'organico',
        // Nombre de la campaña (si usa ads)
        campaign: params.get('utm_campaign') || 'none',
        // Qué anuncio específico (para A/B testing)
        content: params.get('utm_content') || 'none',
        // Página de entrada
        landingPage: window.location.pathname,
        // Fecha y hora
        timestamp: new Date().toISOString(),
        // Referrer (de qué web viene)
        referrer: document.referrer || 'directo',
        // Dispositivo
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    };
}

// =============================================
// 📤 ENVIAR LEAD A TU APP
// Se ejecuta cuando alguien rellena el formulario.
// Envía nombre, email, teléfono + de dónde viene.
// =============================================

async function sendLeadToApp(leadData) {
    // Si la integración no está activada, solo guardar local
    if (!APP_CONFIG.enabled) {
        console.log('📋 [MODO PRUEBA] Lead capturado:', leadData);
        saveLeadLocally(leadData);
        return { success: true, mode: 'local' };
    }
    
    // Combinar datos del lead con tracking
    const fullLead = {
        ...leadData,
        tracking: getTrackingData(),
        source_page: 'landing-oro',
        created_at: new Date().toISOString(),
    };
    
    try {
        // Enviar a tu app de captación
        const response = await fetch(
            APP_CONFIG.appBaseUrl + APP_CONFIG.endpoints.newLead,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${APP_CONFIG.apiToken}`,
                },
                body: JSON.stringify(fullLead),
            }
        );
        
        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const result = await response.json();
        console.log('✅ Lead enviado a la app:', result);
        
        // También guardar localmente como backup
        saveLeadLocally(fullLead);
        
        // Disparar campaña automática en tu app
        triggerCampaign(fullLead);
        
        return { success: true, mode: 'app', data: result };
        
    } catch (error) {
        console.error('❌ Error enviando lead a la app:', error);
        // Si falla la app, guardar localmente
        saveLeadLocally(fullLead);
        return { success: false, mode: 'fallback', error: error.message };
    }
}

// =============================================
// 🚀 DISPARAR CAMPAÑA AUTOMÁTICA
// Cuando llega un lead, tu app puede iniciar una
// secuencia automática en el canal que elija.
// =============================================

async function triggerCampaign(leadData) {
    if (!APP_CONFIG.enabled) return;
    
    // Determinar qué campaña disparar según el canal de origen
    let campaignId;
    
    switch (leadData.tracking.source) {
        case 'instagram':
            campaignId = 'instagram-welcome-sequence';
            break;
        case 'linkedin':
            campaignId = 'linkedin-professional-sequence';
            break;
        case 'facebook':
            campaignId = 'facebook-ads-nurturing';
            break;
        case 'tiktok':
            campaignId = 'tiktok-young-investor';
            break;
        default:
            campaignId = 'general-welcome-sequence';
    }
    
    try {
        await fetch(APP_CONFIG.appBaseUrl + APP_CONFIG.endpoints.campaignTrigger, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APP_CONFIG.apiToken}`,
            },
            body: JSON.stringify({
                campaign_id: campaignId,
                lead_id: leadData.email,
                channels: getAvailableChannels(leadData),
                delay_minutes: 0, // Iniciar inmediatamente
            }),
        });
        console.log('🚀 Campaña disparada:', campaignId);
    } catch (e) {
        console.error('Error disparando campaña:', e);
    }
}

// =============================================
// 📱 DETERMINAR CANALES DISPONIBLES PARA UN LEAD
// Según los datos que dio, qué canales podemos usar
// =============================================

function getAvailableChannels(leadData) {
    const channels = [];
    
    if (leadData.phone && APP_CONFIG.channels.whatsapp) {
        channels.push('whatsapp');
    }
    if (leadData.email && APP_CONFIG.channels.email) {
        channels.push('email');
    }
    if (leadData.instagram && APP_CONFIG.channels.instagram) {
        channels.push('instagram');
    }
    // La app decidirá el orden de prioridad
    return channels;
}

// =============================================
// 💾 GUARDAR LEAD LOCALMENTE (backup + offline)
// Si la app no está disponible, guardamos en localStorage
// para no perder ningún lead.
// =============================================

function saveLeadLocally(leadData) {
    try {
        // Obtener leads guardados
        const stored = JSON.parse(localStorage.getItem('oro_leads') || '[]');
        // Añadir el nuevo
        stored.push(leadData);
        // Guardar
        localStorage.setItem('oro_leads', JSON.stringify(stored));
        console.log('💾 Lead guardado localmente. Total:', stored.length);
    } catch (e) {
        console.error('Error guardando lead local:', e);
    }
}

// =============================================
// 📊 EXPORTAR LEADS GUARDADOS LOCALMENTE
// Úsalo para descargar todos los leads que se guardaron
// cuando la app no estaba conectada.
// Ejecuta en consola: exportLocalLeads()
// =============================================

function exportLocalLeads() {
    const leads = JSON.parse(localStorage.getItem('oro_leads') || '[]');
    
    if (leads.length === 0) {
        console.log('No hay leads guardados localmente.');
        return [];
    }
    
    // Crear CSV para descargar
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Presupuesto', 'Canal', 'Dispositivo'];
    const rows = leads.map(l => [
        l.created_at || l.tracking?.timestamp || '',
        l.name || '',
        l.email || '',
        l.phone || '',
        l.budget || '',
        l.tracking?.source || 'desconocido',
        l.tracking?.device || '',
    ]);
    
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    
    // Descargar como archivo
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-oro-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    console.log(`✅ Exportados ${leads.length} leads como CSV`);
    return leads;
}

// =============================================
// 🔄 SINCRONIZAR LEADS LOCALES CON LA APP
// Cuando la app vuelve a estar disponible, envía
// todos los leads que se guardaron offline.
// Ejecuta: syncLocalLeadsToApp()
// =============================================

async function syncLocalLeadsToApp() {
    if (!APP_CONFIG.enabled) {
        console.log('⚠️ La app no está habilitada. Activa APP_CONFIG.enabled = true');
        return;
    }
    
    const leads = JSON.parse(localStorage.getItem('oro_leads') || '[]');
    
    if (leads.length === 0) {
        console.log('No hay leads pendientes de sincronizar.');
        return;
    }
    
    console.log(`🔄 Sincronizando ${leads.length} leads con la app...`);
    
    let synced = 0;
    for (const lead of leads) {
        try {
            await fetch(APP_CONFIG.appBaseUrl + APP_CONFIG.endpoints.newLead, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${APP_CONFIG.apiToken}`,
                },
                body: JSON.stringify(lead),
            });
            synced++;
        } catch (e) {
            console.error('Error sincronizando lead:', e);
        }
    }
    
    // Limpiar leads locales sincronizados
    localStorage.removeItem('oro_leads');
    console.log(`✅ ${synced}/${leads.length} leads sincronizados con la app`);
}

// =============================================
// 📈 TRACKING DE EVENTOS
// Registra acciones del usuario para analítica
// =============================================

function trackEvent(eventName, eventData = {}) {
    const event = {
        event: eventName,
        data: eventData,
        tracking: getTrackingData(),
        timestamp: new Date().toISOString(),
    };
    
    // Enviar a la app si está habilitada
    if (APP_CONFIG.enabled) {
        fetch(APP_CONFIG.appBaseUrl + APP_CONFIG.endpoints.trackEvent, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APP_CONFIG.apiToken}`,
            },
            body: JSON.stringify(event),
        }).catch(() => {}); // No bloquear si falla
    }
    
    // Siempre logear en consola para debug
    console.log('📈 Evento:', eventName, eventData);
}

// =============================================
// 🤖 CHATBOT IA CONECTADO A LA APP
// Cuando el chatbot detecta un lead caliente,
// lo envía automáticamente a tu app de captación.
// =============================================

async function handleChatbotLead(chatData) {
    // Si el usuario muestra intención de compra en el chat
    const buyIntentKeywords = ['empezar', 'registrar', 'comprar', 'quiero', 'apuntar', 'contratar'];
    const hasBuyIntent = buyIntentKeywords.some(kw => 
        chatData.lastMessage.toLowerCase().includes(kw)
    );
    
    if (hasBuyIntent) {
        // Enviar como lead caliente a la app
        await sendLeadToApp({
            name: 'Chat Lead',
            source: 'chatbot',
            intent: 'high',
            conversation: chatData.messages.slice(-5), // Últimos 5 mensajes
            channel_preference: 'whatsapp',
        });
        
        trackEvent('chatbot_buy_intent', { message: chatData.lastMessage });
    }
}

// =============================================
// 🌐 INTEGRACIÓN MULTI-CANAL
// Funciones para conectar con cada red social
// desde tu app de captación.
// =============================================

const MultiChannel = {
    
    // Abrir WhatsApp con mensaje prellenado
    openWhatsApp(message = '') {
        const msg = message || APP_CONFIG.partner.whatsapp_default_message || 'Hola! Me interesa el ahorro en oro';
        const url = `https://wa.me/${APP_CONFIG.partner.whatsapp}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        trackEvent('channel_open', { channel: 'whatsapp' });
    },
    
    // Abrir Instagram DM
    openInstagram() {
        window.open(`https://ig.me/m/${APP_CONFIG.partner.instagram.replace('@', '')}`, '_blank');
        trackEvent('channel_open', { channel: 'instagram' });
    },
    
    // Abrir LinkedIn
    openLinkedIn() {
        window.open(`https://linkedin.com/in/${APP_CONFIG.partner.linkedin}`, '_blank');
        trackEvent('channel_open', { channel: 'linkedin' });
    },
    
    // Abrir Telegram (si tiene)
    openTelegram(username) {
        if (username) {
            window.open(`https://t.me/${username}`, '_blank');
            trackEvent('channel_open', { channel: 'telegram' });
        }
    },
    
    // Enviar email
    openEmail(subject = 'Quiero info sobre ahorro en oro') {
        window.open(`mailto:${APP_CONFIG.partner.email}?subject=${encodeURIComponent(subject)}`, '_blank');
        trackEvent('channel_open', { channel: 'email' });
    },
};

// =============================================
// 🔔 NOTIFICACIONES PUSH (opcional, futuro)
// Para avisar al partner cuando llega un lead caliente
// =============================================

async function notifyPartner(leadData) {
    if (!APP_CONFIG.enabled) return;
    
    // Tu app se encargará de enviar la notificación
    // al canal que prefieras (WhatsApp, email, push, etc.)
    await fetch(APP_CONFIG.appBaseUrl + '/notifications/new-lead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APP_CONFIG.apiToken}`,
        },
        body: JSON.stringify({
            type: 'new_lead',
            priority: leadData.intent === 'high' ? 'urgent' : 'normal',
            lead: leadData,
            message: `🥇 Nuevo lead: ${leadData.name || 'Anónimo'} desde ${leadData.tracking?.source || 'web'}`,
        }),
    }).catch(() => {});
}

// =============================================
// 📋 RESUMEN DE FUNCIONES DISPONIBLES
// 
// Para TI (ejecutar en consola del navegador):
//   exportLocalLeads()     → Descargar CSV con todos los leads
//   syncLocalLeadsToApp()  → Enviar leads guardados a tu app
//   
// Para LA WEB (se ejecutan automáticamente):
//   sendLeadToApp(data)    → Envía formulario a tu app
//   trackEvent(name, data) → Registra un evento
//   handleChatbotLead(data)→ Detecta intención de compra en chat
//   MultiChannel.openWhatsApp() → Abre WhatsApp
//   
// PARA CONECTAR TU APP:
//   1. Pon tu URL en APP_CONFIG.appBaseUrl
//   2. Pon tu token en APP_CONFIG.apiToken
//   3. Cambia APP_CONFIG.enabled a TRUE
//   4. Asegúrate de que tu app acepta POST en los endpoints
// =============================================

// Hacer funciones accesibles globalmente
window.AppIntegration = {
    sendLead: sendLeadToApp,
    trackEvent,
    exportLeads: exportLocalLeads,
    syncLeads: syncLocalLeadsToApp,
    MultiChannel,
    getTracking: getTrackingData,
    config: APP_CONFIG,
};

console.log('🔌 App Integration cargada. Estado:', APP_CONFIG.enabled ? '✅ CONECTADA' : '⚠️ MODO LOCAL');
