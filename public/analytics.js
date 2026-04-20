// CyberXDefend — Google Analytics 4 with Consent Mode v2
// gtag.js is loaded on every page. Consent defaults to denied, which under
// Consent Mode v2 still allows Google to receive cookieless pings (no cookies,
// no identifiers) for aggregated modeling. Clicking Accept upgrades consent to
// granted, enabling full measurement. Declining keeps the cookieless mode.
(function () {
  var GA_ID = 'G-SKZS79YV8T';
  var CONSENT_KEY = 'cxd-consent-v1';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  function save(choice) {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch (e) {}
  }

  function read() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function removeBanner() {
    var el = document.getElementById('cxd-consent');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function injectBanner() {
    if (document.getElementById('cxd-consent')) return;

    var style = document.createElement('style');
    style.textContent =
      '#cxd-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
      'max-width:560px;margin-left:auto;margin-right:auto;padding:16px 18px;border-radius:16px;' +
      'background:rgba(11,18,32,0.96);border:1px solid rgba(255,255,255,0.12);' +
      'color:#e2e8f0;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;' +
      'font-size:13px;line-height:1.55;box-shadow:0 20px 40px rgba(0,0,0,0.45);' +
      'backdrop-filter:blur(10px);}' +
      '#cxd-consent p{margin:0 0 10px;color:#cbd5e1;}' +
      '#cxd-consent a{color:#67e8f9;text-decoration:underline;}' +
      '#cxd-consent .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end;}' +
      '#cxd-consent button{cursor:pointer;border-radius:999px;padding:8px 16px;font-size:13px;' +
      'font-weight:600;border:1px solid rgba(255,255,255,0.12);background:transparent;color:#cbd5e1;' +
      'font-family:inherit;}' +
      '#cxd-consent button.primary{background:#67e8f9;color:#020617;border-color:#67e8f9;}' +
      '#cxd-consent button:hover{border-color:#67e8f9;color:#fff;}' +
      '#cxd-consent button.primary:hover{background:#22d3ee;color:#020617;}';
    document.head.appendChild(style);

    var div = document.createElement('div');
    div.id = 'cxd-consent';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-label', 'Cookie consent');
    div.innerHTML =
      '<p>We use essential storage to run this site. With your consent, we also use ' +
      'Google Analytics (with IP anonymisation) to understand how visitors reach us. ' +
      'Until you accept, only cookieless aggregate measurement is sent. ' +
      'See our <a href="/privacy-policy.html">Privacy Policy</a>.</p>' +
      '<div class="row">' +
      '<button type="button" data-action="decline">Decline</button>' +
      '<button type="button" class="primary" data-action="accept">Accept</button>' +
      '</div>';
    document.body.appendChild(div);

    div.addEventListener('click', function (e) {
      var action = e.target && e.target.getAttribute('data-action');
      if (action === 'accept') { save('granted'); grant(); removeBanner(); }
      if (action === 'decline') { save('denied'); removeBanner(); }
    });
  }

  window.cxdConsent = {
    reset: function () {
      try { localStorage.removeItem(CONSENT_KEY); } catch (e) {}
      injectBanner();
    }
  };

  var stored = read();
  if (stored === 'granted') {
    grant();
  } else if (stored === 'denied') {
    // Keep denied — Consent Mode v2 still sends cookieless pings.
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectBanner);
    } else {
      injectBanner();
    }
  }
})();
