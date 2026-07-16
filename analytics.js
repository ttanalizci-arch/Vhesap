// analytics.js
// Vhesap Dynamic Google Analytics 4 (GA4) Integration
// Property ID: 539908008
// OAuth Client ID: 192875788685-4jjcnail09heeq2aoppt614efgnp9f6q.apps.googleusercontent.com

(function initDynamicAnalytics() {
    // Varsayılan / Ana Ayarlar
    const defaultSettings = {
        measurementId: 'G-H0WX0KCEM6',
        propertyId: '539908008',
        oauthClientId: '192875788685-4jjcnail09heeq2aoppt614efgnp9f6q.apps.googleusercontent.com'
    };

    let measurementId = defaultSettings.measurementId;
    let isEnabled = true;

    try {
        const analyticsConf = JSON.parse(localStorage.getItem('vhesap_analytics_config'));
        if (analyticsConf) {
            measurementId = analyticsConf.measurementId || measurementId;
            isEnabled = analyticsConf.enabled !== false; // false değilse true kabul et
        }
    } catch (e) {
        console.warn("Analytics ayarları okunamadı, varsayılan ayarlara dönülüyor.", e);
    }

    if (isEnabled) {
        // GTAG Kütüphanesini Dinamik Olarak Yükle
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        // Ayarları Yapılandır
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', measurementId);
        
        // API veya Yönetim Paneli için meta bilgileri globalde tut
        window.vhesapAnalyticsMeta = defaultSettings;
    }
})();

// Olay tetikleme (Event Tracking) için pratik yardımcı fonksiyon
window.trackEvent = function(eventName, eventParams) {
    if (window.gtag) gtag('event', eventName, eventParams);
};
