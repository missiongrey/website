/* Mission Grey: consent-gated analytics.
   Nothing is requested from any third party until the visitor chooses
   "Allow". The measurement id arrives on this script tag's data-ga
   attribute and is written at build time; while it is still the build
   token the whole feature stays inert (no banner, no requests), so the
   site can ship before analytics is configured.

   States, stored in localStorage under "mg-consent":
     granted  load gtag.js, analytics_storage granted
     denied   do nothing, never ask again
     unset    show the notice
*/
(function () {
  'use strict';

  var KEY = 'mg-consent';
  var self = document.currentScript ||
    document.querySelector('script[src$="consent.js"]');
  if (!self) { return; }

  var id = (self.getAttribute('data-ga') || '').trim();
  // Anything that is not a real GA4 measurement id means analytics off.
  if (!/^G-[A-Z0-9]+$/.test(id)) { return; }

  function read() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { window.localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
  }

  function startAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }

  function notice() {
    var box = document.createElement('div');
    box.className = 'consent';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Analytics cookies');

    var p = document.createElement('p');
    p.className = 'consent-text';
    p.textContent =
      'We use analytics cookies to understand how this site is used.';

    var row = document.createElement('div');
    row.className = 'consent-cta';

    function button(label, cls, choice) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'consent-btn ' + cls;
      b.textContent = label;
      b.addEventListener('click', function () {
        write(choice);
        if (box.parentNode) { box.parentNode.removeChild(box); }
        if (choice === 'granted') { startAnalytics(); }
      });
      return b;
    }

    row.appendChild(button('Allow', 'consent-allow', 'granted'));
    row.appendChild(button('Decline', 'consent-decline', 'denied'));
    box.appendChild(p);
    box.appendChild(row);
    document.body.appendChild(box);
  }

  var state = read();
  if (state === 'granted') { startAnalytics(); }
  else if (state !== 'denied') { notice(); }
})();
