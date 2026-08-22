/* Mission Grey: cookieless analytics.
   gtag.js runs in Consent Mode with every storage type denied,
   permanently: no analytics cookie is ever set and nothing is stored on
   the visitor's device, so no consent interaction is required and no
   notice is shown. Google receives cookieless, aggregate pings only.
   While the data-ga attribute still carries the build token
   (__GA_MEASUREMENT_ID__) the whole feature is inert: no request is
   made to any third party. */
(function () {
  'use strict';

  var self = document.currentScript ||
    document.querySelector('script[src$="consent.js"]');
  if (!self) { return; }

  var id = (self.getAttribute('data-ga') || '').trim();
  // Anything that is not a real GA4 measurement id means analytics off.
  if (!/^G-[A-Z0-9]+$/.test(id)) { return; }

  // Tidy up the stored choice from the earlier consent-notice version.
  try { window.localStorage.removeItem('mg-consent'); } catch (e) { /* ok */ }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
})();
