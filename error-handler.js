// =============================================
// 🔧 ERROR-HANDLER.JS — ARREGLADOR AUTOMÁTICO DE FALLOS
// 
// ¿QUÉ HACE ESTE ARCHIVO?
// 1. Detecta cuando la conexión con el banco/pago falla
// 2. Detecta cuando la página de cliente (login AUVESTA) no carga
// 3. Intenta arreglarlo automáticamente (reintentos, rutas alternativas)
// 4. Si no puede arreglarlo, avisa al usuario con solución clara
// 5. Registra todos los errores para que tú veas qué pasa
//
// ¿CUÁNDO SE ACTIVA?
// - Cuando un cliente intenta abrir su depósito/login de AUVESTA
// - Cuando se hace una transferencia/conexión bancaria
// - Cuando la web no carga correctamente
// - Cuando el chatbot no puede conectar con la IA
//
// INSTALACIÓN: Añade esto al final de tu index.html:
// <script src="error-handler.js"></script>
// =============================================

// =============================================
// ⚙️ CONFIGURACIÓN DEL ARREGLADOR
// =============================================
const ERROR_CONFIG = {
    // Cuántas veces intentar antes de dar error
    maxRetries: 3,
    
    // Tiempo entre reintentos (en milisegundos)
    // 1000ms = 1 segundo
    retryDelays: [1000, 3000, 5000], // 1s, 3s, 5s
    
    // URLs que monitorizar (las páginas importantes)
    monitoredUrls: {
        auvestaLogin: 'https://login.auvesta.com/Default.aspx',
        auvestaMain: 'https://www.auvesta.com/',
        auvestaDepot: 'https://login.auvesta.com/',
    },
    
    // Mostrar mensajes al usuario (true) o solo en consola (false)
    showUserAlerts: true,
    
    // Guardar historial de errores (para que tú los veas después)
    logErrors: true,
};

// =============================================
// 🏦 DETECTOR DE FALLOS DE CONEXIÓN BANCARIA
// Cuando el cliente intenta conectar con su banco
// para hacer una transferencia y falla.
// =============================================

class BankConnectionHandler {
    constructor() {
        // Historial de errores
        this.errorLog = [];
        // Estado de la conexión
        this.connectionStatus = 'unknown';
    }
    
    // Verificar si hay conexión a internet
    checkInternetConnection() {
        return navigator.onLine;
    }
    
    // Intentar conectar con una URL con reintentos automáticos
    async connectWithRetry(url, options = {}) {
        let lastError = null;
        
        for (let attempt = 0; attempt < ERROR_CONFIG.maxRetries; attempt++) {
            try {
                // Mostrar estado al usuario
                if (attempt > 0) {
                    this.showStatus(`Reintentando conexión... (intento ${attempt + 1}/${ERROR_CONFIG.maxRetries})`);
                }
                
                // Intentar la conexión
                const response = await fetch(url, {
                    ...options,
                    // Timeout de 10 segundos por intento
                    signal: AbortSignal.timeout(10000),
                });
                
                if (response.ok) {
                    this.connectionStatus = 'connected';
                    this.showStatus('✅ Conexión establecida correctamente');
                    return { success: true, data: response };
                }
                
                // Si el servidor responde pero con error
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
                
            } catch (error) {
                lastError = error;
                this.logError('bank_connection', url, error, attempt + 1);
                
                // Esperar antes del siguiente intento
                if (attempt < ERROR_CONFIG.maxRetries - 1) {
                    await this.wait(ERROR_CONFIG.retryDelays[attempt]);
                }
            }
        }
        
        // Todos los intentos fallaron
        this.connectionStatus = 'failed';
        const solution = this.diagnoseAndSolve(lastError, url);
        return { success: false, error: lastError, solution };
    }
    
    // Esperar X milisegundos
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Diagnosticar el problema y dar solución
    diagnoseAndSolve(error, url) {
        const errorMsg = error.message.toLowerCase();
        
        // CASO 1: Sin conexión a internet
        if (!navigator.onLine || errorMsg.includes('network') || errorMsg.includes('failed to fetch')) {
            return {
                problem: 'Sin conexión a Internet',
                icon: '📡',
                solutions: [
                    'Comprueba tu conexión WiFi o datos móviles',
                    'Intenta apagar y encender el WiFi',
                    'Si usas VPN, desactívala temporalmente',
                    'Prueba a abrir otra página web para verificar',
                ],
                autoFix: 'retry_when_online',
            };
        }
        
        // CASO 2: Timeout (la página tarda mucho)
        if (errorMsg.includes('timeout') || errorMsg.includes('aborted')) {
            return {
                problem: 'La página tarda demasiado en responder',
                icon: '⏳',
                solutions: [
                    'El servidor puede estar ocupado, espera 1-2 minutos',
                    'Recarga la página (F5 o botón de recargar)',
                    'Prueba desde otro navegador (Chrome, Firefox, Safari)',
                    'Si sigues sin acceso, inténtalo en 15-30 minutos',
                ],
                autoFix: 'retry_later',
            };
        }
        
        // CASO 3: Error del servidor (500, 502, 503)
        if (errorMsg.includes('500') || errorMsg.includes('502') || errorMsg.includes('503')) {
            return {
                problem: 'El servidor de AUVESTA tiene un problema temporal',
                icon: '🔧',
                solutions: [
                    'No es tu culpa — es un problema del servidor',
                    'Normalmente se arregla solo en 5-30 minutos',
                    'Intenta de nuevo más tarde',
                    'Si persiste más de 1 hora, contacta a AUVESTA: +49 (0) 8024-474-11-44',
                ],
                autoFix: 'retry_later',
            };
        }
        
        // CASO 4: Acceso denegado (401, 403)
        if (errorMsg.includes('401') || errorMsg.includes('403') || errorMsg.includes('denied')) {
            return {
                problem: 'Acceso denegado — problema con tu sesión',
                icon: '🔒',
                solutions: [
                    'Tu sesión puede haber caducado — intenta hacer login de nuevo',
                    'Borra las cookies del navegador para esta página',
                    'Prueba en una ventana de incógnito/privada',
                    'Si acabas de registrarte, espera 24h a que activen tu cuenta',
                ],
                autoFix: 'clear_and_retry',
            };
        }
        
        // CASO 5: Página no encontrada (404)
        if (errorMsg.includes('404')) {
            return {
                problem: 'La página no se encuentra',
                icon: '🔍',
                solutions: [
                    'La URL puede haber cambiado',
                    'Prueba ir a la página principal: login.auvesta.com',
                    'Si te dieron un enlace, pide uno actualizado',
                ],
                autoFix: 'redirect_main',
            };
        }
        
        // CASO 6: Error SSL/Certificado
        if (errorMsg.includes('ssl') || errorMsg.includes('certificate') || errorMsg.includes('https')) {
            return {
                problem: 'Error de seguridad en la conexión',
                icon: '🛡️',
                solutions: [
                    'Comprueba que la fecha/hora de tu dispositivo sea correcta',
                    'Desactiva temporalmente el antivirus/firewall',
                    'Prueba con otro navegador',
                    'Si usas WiFi público, cambia a datos móviles',
                ],
                autoFix: 'check_date',
            };
        }
        
        // CASO GENERAL: Error desconocido
        return {
            problem: 'Error inesperado al conectar',
            icon: '⚠️',
            solutions: [
                'Recarga la página completamente (Ctrl+F5)',
                'Borra caché del navegador',
                'Prueba en otro navegador o dispositivo',
                'Si el problema persiste, contacta conmigo por WhatsApp',
            ],
            autoFix: 'full_reload',
        };
    }
    
    // Mostrar estado/mensaje al usuario
    showStatus(message) {
        console.log('🏦', message);
    }
    
    // Guardar error en el historial
    logError(type, url, error, attempt) {
        const entry = {
            type,
            url,
            error: error.message,
            attempt,
            timestamp: new Date().toISOString(),
            online: navigator.onLine,
            userAgent: navigator.userAgent,
        };
        
        this.errorLog.push(entry);
        
        // Guardar en localStorage para que no se pierda
        if (ERROR_CONFIG.logErrors) {
            const stored = JSON.parse(localStorage.getItem('oro_error_log') || '[]');
            stored.push(entry);
            // Máximo 100 errores guardados
            if (stored.length > 100) stored.shift();
            localStorage.setItem('oro_error_log', JSON.stringify(stored));
        }
        
        console.warn(`⚠️ Error (intento ${attempt}):`, error.message);
    }
}

// =============================================
// 🖥️ DETECTOR DE FALLOS AL ABRIR PÁGINA DE CLIENTE
// Monitoriza cuando el cliente intenta abrir su login
// en AUVESTA y detecta/arregla problemas.
// =============================================

class PageLoadHandler {
    constructor() {
        this.bankHandler = new BankConnectionHandler();
    }
    
    // Abrir la página de login de AUVESTA con protección contra fallos
    async openClientPage(url = ERROR_CONFIG.monitoredUrls.auvestaLogin) {
        // PASO 1: Verificar conexión a internet
        if (!navigator.onLine) {
            this.showErrorModal({
                problem: 'Sin conexión a Internet',
                icon: '📡',
                solutions: [
                    'No tienes conexión a internet ahora mismo',
                    'Conéctate a WiFi o activa tus datos móviles',
                    'Cuando tengas conexión, pulsa "Reintentar"',
                ],
                autoFix: 'retry_when_online',
            });
            return;
        }
        
        // PASO 2: Intentar cargar la página
        this.showLoadingOverlay('Conectando con tu depósito de AUVESTA...');
        
        const result = await this.bankHandler.connectWithRetry(url, {
            mode: 'no-cors', // Porque es dominio externo
        });
        
        this.hideLoadingOverlay();
        
        if (result.success) {
            // Éxito → abrir en nueva pestaña
            window.open(url, '_blank');
        } else {
            // Fallo → mostrar solución al usuario
            this.showErrorModal(result.solution);
        }
    }
    
    // Abrir con verificación rápida (para botones de la web)
    quickOpen(url) {
        // Verificación rápida de internet
        if (!navigator.onLine) {
            this.showQuickError('Sin conexión. Comprueba tu WiFi/datos.');
            return;
        }
        
        // Abrir directamente (más rápido para el usuario)
        const newWindow = window.open(url, '_blank');
        
        // Si el navegador bloquea popups
        if (!newWindow) {
            this.showQuickError('Tu navegador bloqueó la ventana. Permite popups o copia este enlace: ' + url);
        }
    }
    
    // Mostrar pantalla de carga
    showLoadingOverlay(message) {
        // Crear overlay si no existe
        let overlay = document.getElementById('loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.style.cssText = `
                position:fixed; top:0; left:0; width:100%; height:100%;
                background:rgba(0,0,0,0.7); display:flex; align-items:center;
                justify-content:center; z-index:99999; backdrop-filter:blur(5px);
            `;
            document.body.appendChild(overlay);
        }
        
        overlay.innerHTML = `
            <div style="background:white; border-radius:16px; padding:40px; text-align:center; max-width:400px; margin:20px;">
                <div style="font-size:2rem; margin-bottom:15px;" class="spin-icon">⏳</div>
                <h3 style="margin-bottom:10px; color:#1a1a2e;">${message}</h3>
                <p style="color:#6c757d; font-size:0.9rem;">Esto puede tardar unos segundos...</p>
                <div style="margin-top:15px; height:4px; background:#eee; border-radius:2px; overflow:hidden;">
                    <div style="height:100%; width:30%; background:linear-gradient(90deg,#D4AF37,#996515); border-radius:2px; animation:loading 1.5s infinite;"></div>
                </div>
            </div>
            <style>
                @keyframes loading { 0%{width:10%;margin-left:0} 50%{width:50%;margin-left:25%} 100%{width:10%;margin-left:90%} }
                .spin-icon { animation: spin 2s linear infinite; }
                @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            </style>
        `;
        overlay.style.display = 'flex';
    }
    
    // Ocultar pantalla de carga
    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';
    }
    
    // Mostrar modal de error con soluciones
    showErrorModal(solution) {
        let modal = document.getElementById('error-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'error-modal';
            modal.style.cssText = `
                position:fixed; top:0; left:0; width:100%; height:100%;
                background:rgba(0,0,0,0.7); display:flex; align-items:center;
                justify-content:center; z-index:99999; backdrop-filter:blur(5px);
            `;
            document.body.appendChild(modal);
        }
        
        const solutionsList = solution.solutions.map(s => `<li style="padding:8px 0; font-size:0.9rem; border-bottom:1px solid #eee;">✅ ${s}</li>`).join('');
        
        modal.innerHTML = `
            <div style="background:white; border-radius:16px; padding:40px; max-width:500px; margin:20px; text-align:center;">
                <div style="font-size:3rem; margin-bottom:15px;">${solution.icon}</div>
                <h3 style="margin-bottom:10px; color:#1a1a2e;">${solution.problem}</h3>
                <p style="color:#6c757d; margin-bottom:20px; font-size:0.9rem;">No te preocupes, tiene solución:</p>
                <ul style="text-align:left; list-style:none; padding:0; margin-bottom:20px;">${solutionsList}</ul>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button onclick="window.PageHandler.retryLastAction()" style="background:linear-gradient(135deg,#D4AF37,#996515); color:#1a1a2e; border:none; padding:12px 25px; border-radius:25px; font-weight:700; cursor:pointer;">🔄 Reintentar</button>
                    <button onclick="document.getElementById('error-modal').style.display='none'" style="background:#f0f0f0; color:#333; border:none; padding:12px 25px; border-radius:25px; font-weight:600; cursor:pointer;">Cerrar</button>
                    <button onclick="window.AppIntegration.MultiChannel.openWhatsApp('Hola, tengo un problema técnico con la web')" style="background:#25D366; color:white; border:none; padding:12px 25px; border-radius:25px; font-weight:700; cursor:pointer;">📱 Pedir ayuda</button>
                </div>
                <p style="margin-top:15px; font-size:0.75rem; color:#999;">Error registrado automáticamente. Si persiste, contacta soporte.</p>
            </div>
        `;
        modal.style.display = 'flex';
    }
    
    // Mostrar error rápido (toast notification)
    showQuickError(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
            background:#dc3545; color:white; padding:15px 25px; border-radius:12px;
            font-size:0.9rem; font-weight:600; z-index:99999; max-width:90%;
            text-align:center; box-shadow:0 5px 20px rgba(220,53,69,0.3);
            animation: slideUp 0.3s ease;
        `;
        toast.innerHTML = `⚠️ ${message}`;
        document.body.appendChild(toast);
        
        // Desaparece en 5 segundos
        setTimeout(() => toast.remove(), 5000);
    }
    
    // Reintentar última acción
    retryLastAction() {
        document.getElementById('error-modal').style.display = 'none';
        this.openClientPage();
    }
}

// =============================================
// 🌐 MONITOR DE CONEXIÓN EN TIEMPO REAL
// Detecta cuando el usuario pierde/recupera internet
// y avisa automáticamente.
// =============================================

class ConnectionMonitor {
    constructor() {
        this.isOnline = navigator.onLine;
        this.init();
    }
    
    init() {
        // Escuchar cuando se pierde internet
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineBanner();
            console.log('📡 Conexión perdida');
        });
        
        // Escuchar cuando vuelve internet
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showOnlineBanner();
            console.log('✅ Conexión restaurada');
            
            // Intentar sincronizar leads pendientes
            if (window.AppIntegration && window.AppIntegration.config.enabled) {
                window.AppIntegration.syncLeads();
            }
        });
    }
    
    showOfflineBanner() {
        let banner = document.getElementById('connection-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'connection-banner';
            document.body.appendChild(banner);
        }
        banner.style.cssText = `
            position:fixed; top:0; left:0; width:100%; padding:12px;
            background:#dc3545; color:white; text-align:center; z-index:99999;
            font-size:0.85rem; font-weight:600;
        `;
        banner.innerHTML = '📡 Sin conexión a internet — Algunas funciones pueden no estar disponibles';
    }
    
    showOnlineBanner() {
        let banner = document.getElementById('connection-banner');
        if (banner) {
            banner.style.background = '#28a745';
            banner.innerHTML = '✅ Conexión restaurada';
            setTimeout(() => banner.remove(), 3000);
        }
    }
}

// =============================================
// 🛡️ PROTECCIÓN DE FORMULARIOS
// Si el usuario rellena un formulario y falla el envío,
// NO se pierden los datos. Se guardan y se reintentan.
// =============================================

class FormProtector {
    
    // Guardar datos del formulario mientras el usuario escribe
    // (por si la página se cierra accidentalmente)
    static autoSaveForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Cada vez que cambia un campo, guardar
        form.addEventListener('input', () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem(`form_backup_${formId}`, JSON.stringify(data));
        });
        
        // Restaurar datos guardados (por si recargó la página)
        const saved = localStorage.getItem(`form_backup_${formId}`);
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && data[key]) field.value = data[key];
            });
            console.log('📋 Formulario restaurado desde backup');
        }
    }
    
    // Limpiar backup después de envío exitoso
    static clearBackup(formId) {
        localStorage.removeItem(`form_backup_${formId}`);
    }
}

// =============================================
// 🚀 INICIALIZACIÓN — TODO SE ACTIVA AQUÍ
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Crear instancias
    const pageHandler = new PageLoadHandler();
    const connectionMonitor = new ConnectionMonitor();
    
    // Hacer accesible globalmente
    window.PageHandler = pageHandler;
    window.ConnectionMonitor = connectionMonitor;
    window.FormProtector = FormProtector;
    
    // Proteger el formulario de contacto
    FormProtector.autoSaveForm('contact-form');
    
    // Interceptar clicks a login.auvesta.com
    document.querySelectorAll('a[href*="login.auvesta"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            pageHandler.quickOpen(link.href);
        });
    });
    
    console.log('🛡️ Error Handler activo — Protección contra fallos habilitada');
});

// =============================================
// 📋 VER HISTORIAL DE ERRORES (para ti como admin)
// Ejecuta esto en la consola del navegador:
//   viewErrorLog()
// =============================================

function viewErrorLog() {
    const log = JSON.parse(localStorage.getItem('oro_error_log') || '[]');
    if (log.length === 0) {
        console.log('✅ No hay errores registrados');
        return;
    }
    console.table(log);
    return log;
}

function clearErrorLog() {
    localStorage.removeItem('oro_error_log');
    console.log('🗑️ Historial de errores limpiado');
}

// Hacer accesibles globalmente
window.viewErrorLog = viewErrorLog;
window.clearErrorLog = clearErrorLog;
