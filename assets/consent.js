/* Mission Grey: first-party analytics and the cookie choice.
   Page views go to Mission Grey's own collector on app.missiongrey.com
   (Customer Insights, Website page). Nothing is sent to any third party
   and no third-party script is loaded.

   Every visitor is counted the cookieless way: the collector derives a
   visitor code that changes every day, from the request itself, and
   nothing is stored on the device. Only after the visitor presses
   Accept on the banner does the script keep a random reader id in a
   first-party cookie, so the Website page can tell returning readers
   from new ones.

   Cookies, both host-only (no Domain attribute, so they never travel to
   app.missiongrey.com), Path=/, SameSite=Lax, Secure, 13 months:
     mg_consent  accepted | declined   the choice, never an id
     mg_vid      32 lowercase hex      the reader id, only after Accept

   The collector's contract, which this file follows, is the docstring
   of insights/collector.py in the platform repository.

   Hosts:
     missiongrey.com      counts, banner, cookies
     www.missiongrey.com  counts the cookieless way only: no banner, no
                          cookie, no reader id. A host-only cookie would
                          give one reader two ids, so returning readers
                          are measured on one host. Once www redirects
                          to the apex at the hosting level this branch
                          stops being reached.
     anything else        (local builds, previews) the banner and the
                          cookies work, nothing is sent: each beacon is
                          written to the browser console instead. */
(function () {
  'use strict';

  var COLLECTOR = 'https://app.missiongrey.com/insights/hit/';
  var APEX = 'missiongrey.com';
  var WWW = 'www.missiongrey.com';
  var CHOICE = 'mg_consent';
  var READER = 'mg_vid';
  var MAX_AGE = 34128000; // 395 days, in seconds
  // While the visitor has not chosen yet, the page view waits this long for
  // a choice, so a reader who presses Accept on the page they landed on is
  // linked to how they arrived. Leaving the page sends it at once.
  var CHOICE_WAIT_MS = 10000;
  var VID_RE = /^[0-9a-f]{32}$/;

  var host = window.location.hostname;
  var live = host === APEX || host === WWW;
  var cookies = host !== WWW;

  // Tidy up the stored choice from the earlier Google Analytics versions.
  try { window.localStorage.removeItem('mg-consent'); } catch (e) { /* ok */ }

  // ---- cookies ---------------------------------------------------------

  function readCookie(name) {
    var parts = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf('=');
      if (parts[i].slice(0, eq) === name) { return parts[i].slice(eq + 1); }
    }
    return null;
  }

  function writeCookie(name, value, maxAge) {
    document.cookie = name + '=' + value + '; Path=/; Max-Age=' + maxAge +
      '; SameSite=Lax' + (window.location.protocol === 'https:' ? '; Secure' : '');
  }

  function choice() {
    if (!cookies) { return null; }
    var c = readCookie(CHOICE);
    return c === 'accepted' || c === 'declined' ? c : null;
  }

  function randomHex() {
    var c = window.crypto;
    if (!c || !c.getRandomValues) { return null; }
    var bytes = c.getRandomValues(new Uint8Array(16));
    var out = '';
    for (var i = 0; i < bytes.length; i++) {
      out += (bytes[i] < 16 ? '0' : '') + bytes[i].toString(16);
    }
    return out;
  }

  // The reader id, or null. After Accept both cookies are written again on
  // every page load with the same values: Safari and every iPhone browser
  // keep a script-written cookie for at most 7 days, and rewriting it rolls
  // that week forward. After Decline any id left behind is deleted.
  function settle() {
    var state = choice();
    if (state === 'accepted') {
      var vid = readCookie(READER);
      if (!vid || !VID_RE.test(vid)) { vid = randomHex(); }
      if (!vid) { return null; }
      writeCookie(READER, vid, MAX_AGE);
      writeCookie(CHOICE, 'accepted', MAX_AGE);
      return vid;
    }
    // No id exists before a choice or after Decline, whatever is left over.
    if (cookies && readCookie(READER) !== null) { writeCookie(READER, '', 0); }
    if (state === 'declined') { writeCookie(CHOICE, 'declined', MAX_AGE); }
    return null;
  }

  // ---- beacons ---------------------------------------------------------

  function send(body) {
    var data = JSON.stringify(body);
    if (!live) {
      if (window.console && console.info) { console.info('[analytics, not sent here]', body); }
      return;
    }
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(COLLECTOR, data)) { return; }
    } catch (e) { /* fall through */ }
    try {
      window.fetch(COLLECTOR, {
        method: 'POST', body: data, keepalive: true, mode: 'no-cors', credentials: 'omit'
      });
    } catch (e) { /* nothing more to try */ }
  }

  function pageViewId() {
    var id = randomHex();
    if (id) { return id; }
    var s = '';
    while (s.length < 32) { s += Math.floor(Math.random() * 1e9).toString(36); }
    return s.slice(0, 32);
  }

  function screenClass() {
    var w = window.screen && window.screen.width;
    if (!w) { return null; }
    return w < 640 ? 's' : w < 1024 ? 'm' : 'l';
  }

  // Only where the visitor came from, never the page or its query string:
  // the collector keeps the host alone, so nothing more needs to leave.
  function referrerOrigin() {
    var m = /^(https?:\/\/)(?:[^\/?#@]*@)?([^\/?#]+)/i.exec(document.referrer || '');
    return m ? m[1] + m[2] + '/' : '';
  }

  function utm(params, key) {
    var v = params ? params.get(key) : null;
    return v ? v.slice(0, 100) : null;
  }

  var view = null;    // the current page view: {id, sent, visibleMs, since}
  var waitTimer = null;

  function now() { return Date.now(); }

  function startView() {
    view = {
      id: pageViewId(),
      sent: false,
      visibleMs: 0,
      since: document.visibilityState === 'visible' ? now() : null
    };
  }

  function sendPageView() {
    if (!view || view.sent) { return; }
    if (waitTimer) { clearTimeout(waitTimer); waitTimer = null; }
    view.sent = true;
    var params = null;
    try { params = new URLSearchParams(window.location.search); } catch (e) { /* old browser */ }
    var body = {
      t: 'pageview',
      id: view.id,
      path: window.location.pathname.slice(0, 300),
      ref: referrerOrigin(),
      utm_source: utm(params, 'utm_source'),
      utm_medium: utm(params, 'utm_medium'),
      utm_campaign: utm(params, 'utm_campaign'),
      screen: screenClass()
    };
    // Never sent before Accept, and never once the choice says declined.
    var vid = choice() === 'accepted' ? settle() : null;
    if (vid) { body.vid = vid; }
    send(body);
  }

  function engagedMs() {
    var ms = view.visibleMs + (view.since !== null ? now() - view.since : 0);
    return Math.max(0, Math.round(ms));
  }

  function sendEngage() {
    if (!view) { return; }
    sendPageView();
    var ms = engagedMs();
    if (ms > 0) { send({ t: 'engage', id: view.id, ms: ms }); }
  }

  function begin() {
    startView();
    if (choice() === null && cookies) {
      waitTimer = setTimeout(sendPageView, CHOICE_WAIT_MS);
    } else {
      sendPageView();
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (!view) { return; }
    if (document.visibilityState === 'hidden') {
      if (view.since !== null) { view.visibleMs += now() - view.since; view.since = null; }
      sendEngage();
    } else if (view.since === null) {
      view.since = now();
    }
  });

  window.addEventListener('pagehide', function () {
    if (!view) { return; }
    if (view.since !== null) { view.visibleMs += now() - view.since; view.since = null; }
    sendEngage();
  });

  // A page restored from the back-forward cache is a new page view.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) { return; }
    settle();
    if (cookies) {
      if (choice() !== null) { closeBanner(); } else { banner(false); }
    }
    begin();
  });

  // ---- the banner ------------------------------------------------------

  var box = null;
  var settingsButton = null;

  function closeBanner() {
    if (box && box.parentNode) { box.parentNode.removeChild(box); }
    box = null;
    document.body.style.paddingBottom = '';
  }

  function decide(value) {
    var hadFocus = box && box.contains(document.activeElement);
    writeCookie(CHOICE, value, MAX_AGE);
    settle();
    closeBanner();
    if (hadFocus && settingsButton) { settingsButton.focus(); }
    // A page view still waiting for the choice goes now, with the reader id
    // if the answer was Accept.
    sendPageView();
  }

  function banner(focus) {
    if (box) { return; }
    box = document.createElement('div');
    box.className = 'consent';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Cookie choice');
    box.tabIndex = -1;

    var p = document.createElement('p');
    p.className = 'consent-text';
    p.appendChild(document.createTextNode(
      'Mission Grey counts visits to this site with its own analytics. ' +
      'No third-party cookies or trackers. May we set our own cookie to recognize ' +
      'your browser when you come back? '));
    var more = document.createElement('a');
    more.href = '/privacy/#s3';
    more.textContent = 'Privacy Policy';
    p.appendChild(more);

    var current = choice();
    var stateLine = null;
    if (current) {
      stateLine = document.createElement('p');
      stateLine.className = 'consent-now';
      stateLine.textContent = 'Your current choice: ' +
        (current === 'accepted' ? 'Accepted' : 'Declined') + '.';
    }

    var row = document.createElement('div');
    row.className = 'consent-cta';

    function button(label, value) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'consent-btn';
      b.textContent = label;
      b.addEventListener('click', function () { decide(value); });
      return b;
    }

    row.appendChild(button('Accept', 'accepted'));
    row.appendChild(button('Decline', 'declined'));
    box.appendChild(p);
    if (stateLine) { box.appendChild(stateLine); }
    box.appendChild(row);
    // Early in the document, right after the skip link, so keyboard and
    // screen-reader users meet it first; it is fixed, so it looks the same.
    var skip = document.querySelector('.skip');
    if (skip && skip.parentNode === document.body) {
      document.body.insertBefore(box, skip.nextSibling);
    } else {
      document.body.insertBefore(box, document.body.firstChild);
    }
    // Room below the footer, so the slip never sits over its last links.
    document.body.style.paddingBottom = (box.offsetHeight + 24) + 'px';
    // Reopened from Cookie settings: focus the slip itself, not either answer.
    if (focus) { box.focus(); }
  }

  // "Cookie settings" in the footer's legal row: changing or withdrawing the
  // choice is one click away on every page, as easy as giving it.
  function settingsLink() {
    var legal = document.querySelector('.foot-legal');
    if (!legal) { return; }
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'foot-legal-btn';
    b.textContent = 'Cookie settings';
    b.addEventListener('click', function () { banner(true); });
    settingsButton = b;
    var terms = legal.querySelector('a[href="/terms/"]');
    if (terms && terms.nextSibling) { legal.insertBefore(b, terms.nextSibling); }
    else { legal.appendChild(b); }
  }

  // ---- start -----------------------------------------------------------

  settle();
  if (cookies) {
    settingsLink();
    if (choice() === null) { banner(false); }
  }

  if (document.prerendering) {
    document.addEventListener('prerenderingchange', begin, { once: true });
  } else {
    begin();
  }
})();
