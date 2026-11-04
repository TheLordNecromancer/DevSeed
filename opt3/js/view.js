/* =========================================================
   VISTA — genera el HTML a partir de los datos y actualiza el DOM.
   No contiene lógica de negocio ni maneja eventos.
   ========================================================= */
var DevSeedView = (function () {
  'use strict';

  function $(sel) { return document.querySelector(sel); }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderNav(items) {
    $('#navLinks').innerHTML = items.map(function (it) {
      return '<li><a href="#' + it.id + '" data-section="' + it.id + '">' + esc(it.label) + '</a></li>';
    }).join('');
  }

  function renderCoordinator(c) {
    $('#coordinator').innerHTML =
      '<img src="' + c.photo + '" alt="' + esc(c.name) + '" class="avatar" loading="lazy">' +
      '<div><div class="name">' + esc(c.name) + '</div>' +
      '<div class="role">' + esc(c.role) + '</div></div>';
  }

  function renderStudents(list, t) {
    $('#students').innerHTML = list.map(function (s) {
      var avatar = s.photo
        ? '<img src="' + s.photo + '" alt="' + esc(s.name) + '" class="mini-avatar" loading="lazy">'
        : '<div class="mini-avatar" aria-hidden="true"></div>';
      return '<div class="flip' + (s.lead ? ' is-lead' : '') + '" tabindex="0" aria-label="' + esc(s.name + ', ' + s.role) + '"><div class="flip-inner">' +
        '<div class="flip-face flip-front">' + (s.lead ? '<span class="lead-badge">★ ' + esc(t.leadBadge) + '</span>' : '') +
        avatar + '<div class="name">' + esc(s.name) + '</div><div class="role-mini">' + esc(s.role) + '</div></div>' +
        '<div class="flip-face flip-back">' + esc(s.role) + '</div>' +
        '</div></div>';
    }).join('');
  }

  function renderGallery(list) {
    $('#collageGrid').innerHTML = list.map(function (g, i) {
      return '<figure class="polaroid p' + (i + 1) + (g.tall ? ' tall' : '') + '">' +
        '<img class="photo" src="' + g.photo + '" alt="' + esc(g.caption) + '" loading="lazy">' +
        '<figcaption class="cap">' + esc(g.caption) + '</figcaption></figure>';
    }).join('');
  }

  function renderActivities(list) {
    $('#questGrid').innerHTML = list.map(function (a) {
      return '<article class="quest-card">' +
        '<img class="quest-img" src="' + a.photo + '" alt="' + esc(a.title) + '" loading="lazy">' +
        '<div class="quest-body"><span class="capsule">' + esc(a.tag) + '</span>' +
        '<h4>' + esc(a.title) + '</h4><p>' + esc(a.text) + '</p></div></article>';
    }).join('');
  }

  var PEPE_ART =
    '<svg viewBox="0 0 120 120" class="proj-art" aria-hidden="true">' +
    '<circle cx="60" cy="60" r="52" fill="rgba(0,0,0,0.25)"/>' +
    '<path d="M60 18c8 14 26 22 26 44a26 26 0 0 1-52 0c0-10 5-17 10-22 1 8 5 12 9 13-2-14 1-25 7-35z" fill="#FEE75C" stroke="#000" stroke-width="3"/>' +
    '<path d="M60 52c5 7 12 11 12 21a12 12 0 0 1-24 0c0-6 4-9 6-12 1 4 3 6 5 6-1-6 0-11 1-15z" fill="#FF4FA3" stroke="#000" stroke-width="3"/>' +
    '</svg>';

  function renderProjects(list) {
    $('#projGrid').innerHTML = list.map(function (p) {
      var screen = p.image
        ? '<img src="' + p.image + '" alt="' + esc(p.imageAlt || p.title) + '" class="proj-shot" loading="lazy">'
        : PEPE_ART;
      var action = p.url
        ? '<a href="' + p.url + '" class="proj-btn">' + esc(p.button) + '</a>'
        : '';
      return '<article class="proj-card proj-featured">' +
        '<div class="proj-screen">' + screen +
        (p.status ? '<span class="proj-status"><span class="pulse"></span>' + esc(p.status) + '</span>' : '') +
        '</div><div class="proj-info">' +
        '<h4>' + esc(p.title) + '</h4>' +
        (p.text ? '<p class="proj-text">' + esc(p.text) + '</p>' : '') +
        (p.partner ? '<p class="proj-partner">★ ' + esc(p.partner) + '</p>' : '') +
        '<div class="proj-meta">' +
        p.chips.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('') +
        '</div>' + action + '</div></article>';
    }).join('');
  }

  function renderAreas(list, placeholder) {
    var sel = $('#areaSelect'), current = sel.value;
    sel.innerHTML = '<option value="" disabled>' + esc(placeholder) + '</option>' +
      list.map(function (a) { return '<option value="' + a.value + '">' + esc(a.label) + '</option>'; }).join('');
    sel.value = current || '';
  }

  var EVENT_ART = {
    'GAME JAM': '<svg viewBox="0 0 120 120" class="proj-art" aria-hidden="true"><rect x="18" y="38" width="84" height="48" rx="22" fill="#A08CFF" stroke="#000" stroke-width="3"/><path d="M38 54v16M30 62h16" stroke="#000" stroke-width="5" stroke-linecap="round"/><circle cx="78" cy="56" r="5" fill="#FEE75C" stroke="#000" stroke-width="2.5"/><circle cx="88" cy="68" r="5" fill="#FF4FA3" stroke="#000" stroke-width="2.5"/></svg>',
    'VISIT': '<svg viewBox="0 0 120 120" class="proj-art" aria-hidden="true"><circle cx="60" cy="60" r="38" fill="#A08CFF" stroke="#000" stroke-width="3"/><path d="M22 60h76M60 22c-14 14-14 62 0 76M60 22c14 14 14 62 0 76" fill="none" stroke="#000" stroke-width="3"/><path d="M84 30l18-8-8 18-6 4z" fill="#FEE75C" stroke="#000" stroke-width="3" stroke-linejoin="round"/></svg>',
    'FIRE': PEPE_ART,
    'BOOTCAMP': '<svg viewBox="0 0 120 120" class="proj-art" aria-hidden="true"><path d="M60 14l10 24 26 2-20 17 6 25-22-13-22 13 6-25-20-17 26-2z" fill="#FEE75C" stroke="#000" stroke-width="3" stroke-linejoin="round"/><rect x="40" y="88" width="40" height="16" rx="5" fill="#FF4FA3" stroke="#000" stroke-width="3"/></svg>'
  };

  function renderEvents(list) {
    $('#eventGrid').innerHTML = list.map(function (ev) {
      var art = EVENT_ART[ev.artKey || ev.type] || EVENT_ART['GAME JAM'];
      var media = ev.image
        ? '<img src="' + ev.image + '" alt="' + esc(ev.title) + '" class="event-banner"' + (ev.imagePosition ? ' style="object-position:' + ev.imagePosition + '"' : '') + ' loading="lazy" referrerpolicy="no-referrer" data-fallback="1">' +
          '<div class="event-art" hidden>' + art + '</div>'
        : '<div class="event-art">' + art + '</div>';
      return '<article class="event-card">' +
        '<div class="event-media">' + media + '<span class="event-type">' + esc(ev.type) + '</span></div>' +
        '<div class="event-body">' +
        (ev.dates ? '<div class="event-date">▸ ' + esc(ev.dates) + '</div>' : '') +
        '<h4>' + esc(ev.title) + '</h4>' +
        (ev.hashtag ? '<div class="event-hashtag">' + esc(ev.hashtag) + '</div>' : '') +
        '<p>' + esc(ev.text) + '</p>' +
        (ev.details && ev.details.length ? '<ul class="event-details">' + ev.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="event-actions">' +
        (ev.url ? '<a href="' + ev.url + '" class="proj-btn" target="_blank" rel="noopener">' + esc(ev.button) + '</a>' : '') +
        (ev.url2 ? '<a href="' + ev.url2 + '" class="proj-btn proj-btn-alt" target="_blank" rel="noopener">' + esc(ev.button2) + '</a>' : '') +
        '</div>' +
        '</div></article>';
    }).join('');
    // si el banner externo no carga, se muestra el arte por defecto
    document.querySelectorAll('#eventGrid img[data-fallback]').forEach(function (img) {
      img.onerror = function () { var art = img.nextElementSibling; img.remove(); if (art) art.hidden = false; };
    });
  }

  function renderVideos(list, t) {
    $('#videoGrid').innerHTML = list.map(function (v) {
      var mins = Math.floor(v.start / 60);
      var meta = [v.channel, v.date].filter(Boolean).join(' · ');
      return '<article class="event-card video-card">' +
        '<div class="video-frame" data-video="' + v.id + '" data-start="' + v.start + '">' +
        '<button type="button" class="video-play" aria-label="' + esc(t.livePlay + ': ' + v.title) + '">' +
        '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy">' +
        '<span class="video-icon" aria-hidden="true">▶</span></button>' +
        '<span class="event-type">' + esc(v.tag) + '</span></div>' +
        '<div class="event-body"><h4>' + esc(v.title) + '</h4>' +
        (meta ? '<div class="event-date">' + esc(meta) + '</div>' : '') +
        '<div class="video-links"><span class="chip">' + esc(t.liveFrom) + ' ' + mins + '</span>' +
        '<a class="video-yt" href="https://www.youtube.com/watch?v=' + v.id + '&t=' + v.start + 's" target="_blank" rel="noopener">' + esc(t.liveYoutube) + '</a></div>' +
        '</div></article>';
    }).join('');
  }

  function renderProductions(list) {
    $('#prodGrid').innerHTML = list.map(function (v) {
      return '<article class="prod-card">' +
        '<div class="phone"><video class="prod-video" controls playsinline preload="none" poster="' + v.poster + '">' +
        '<source src="' + v.src + '" type="video/mp4"></video>' +
        '<span class="event-type">' + esc(v.tag) + '</span></div>' +
        '<div class="prod-body"><h4>' + esc(v.title) + '</h4><p>' + esc(v.text) + '</p></div>' +
        '</article>';
    }).join('');
  }

  // Cambia la miniatura por el reproductor (solo se carga YouTube al hacer clic)
  function playVideo(frame) {
    var id = frame.dataset.video, start = frame.dataset.start;
    var title = frame.querySelector('.video-play').getAttribute('aria-label');
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?start=' + start + '&autoplay=1&rel=0" ' +
      'title="' + esc(title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }

  /* ---- carrusel (reutilizable: talleres y eventos) ----
     Estructura: .carousel#id > .carousel-dots + .carousel-btn + .carousel-track */
  function carouselParts(id) {
    var box = document.getElementById(id);
    return { box: box, track: box.querySelector('.carousel-track'), dots: box.querySelector('.carousel-dots') };
  }

  function renderCarouselDots(id, count, t) {
    var html = '';
    for (var i = 0; i < count; i++) {
      html += '<button type="button" class="carousel-dot" data-index="' + i + '" aria-label="' + esc(t.carGoTo + ' ' + (i + 1)) + '"></button>';
    }
    carouselParts(id).dots.innerHTML = html;
  }

  function carouselStep(track) {
    var card = track.firstElementChild;
    if (!card) return track.clientWidth;
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  // Animación propia con easing: más suave y consistente en todos los navegadores
  // (el scroll-snap nativo se pausa mientras se mueve para que no "salte")
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function animateTrack(track, target) {
    var start = track.scrollLeft, dist = target - start;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (track._anim) cancelAnimationFrame(track._anim);
    if (Math.abs(dist) < 1) return;
    track.classList.add('is-animating');
    if (reduce) { track.scrollLeft = target; track.classList.remove('is-animating'); return; }
    var duration = Math.min(700, 380 + Math.abs(dist) * 0.25), t0 = null;
    function frame(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / duration);
      track.scrollLeft = start + dist * easeInOutCubic(p);
      if (p < 1) track._anim = requestAnimationFrame(frame);
      else { track._anim = null; track.classList.remove('is-animating'); }
    }
    track._anim = requestAnimationFrame(frame);
  }

  function carouselIndex(track) { return Math.round(track.scrollLeft / carouselStep(track)); }

  function scrollCarousel(id, dir) {
    var track = carouselParts(id).track;
    var step = carouselStep(track);
    var max = track.scrollWidth - track.clientWidth;
    var target;
    if (dir > 0 && track.scrollLeft >= max - step * 0.3) target = 0;           // al final → vuelve al inicio
    else if (dir < 0 && track.scrollLeft <= step * 0.3) target = max;           // al inicio → va al final
    else target = Math.max(0, Math.min(max, (carouselIndex(track) + dir) * step));
    animateTrack(track, target);
  }

  function scrollCarouselTo(id, index) {
    var track = carouselParts(id).track;
    var max = track.scrollWidth - track.clientWidth;
    animateTrack(track, Math.min(max, index * carouselStep(track)));
  }

  function updateCarouselState(id) {
    var c = carouselParts(id), track = c.track;
    var cards = track.children.length;
    var step = carouselStep(track);
    var visible = Math.max(1, Math.round(track.clientWidth / step));
    var pages = Math.max(1, cards - visible + 1);
    var current = Math.min(pages - 1, Math.round(track.scrollLeft / step));
    c.dots.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.hidden = i >= pages;
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    c.box.classList.toggle('no-scroll', pages <= 1);
  }

  /* ---- idioma ---- */
  function applyTranslations(t, lang) {
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.metaDesc);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'); if (t[k] != null) el.textContent = t[k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria'); if (t[k] != null) el.setAttribute('aria-label', t[k]);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph'); if (t[k] != null) el.setAttribute('placeholder', t[k]);
    });
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    $('.lang-switch').setAttribute('aria-label', t.langLabel);
    $('#joinFeedback').classList.remove('show', 'error');
  }

  function setTypewriter(text) { $('#tw-text').textContent = text; }

  /* ---- actualizaciones puntuales ---- */
  function appendTypewriterChar(ch) { $('#tw-text').textContent += ch; }
  function clearTypewriter() { $('#tw-text').textContent = ''; }

  function setMenuOpen(open, t) {
    $('#navLinks').classList.toggle('open', open);
    $('#navToggle').setAttribute('aria-expanded', String(open));
    $('#navToggle').setAttribute('aria-label', open ? t.menuClose : t.menuOpen);
  }

  function setActiveLink(id) {
    document.querySelectorAll('#navLinks a').forEach(function (a) {
      a.classList.toggle('active', a.dataset.section === id);
    });
  }

  function toggleFlip(card) { card.classList.toggle('flipped'); }

  function getFormData() {
    var f = $('#joinForm');
    return { nombre: f.nombre.value, correo: f.correo.value, area: f.area.value, mensaje: f.mensaje.value, honey: f._honey.value };
  }

  // Heurística 9: cada campo muestra su propio error, claro y junto al campo
  function setFieldError(name, msg) {
    var f = $('#joinForm'), input = f[name];
    if (!input) return;
    var field = input.closest('.field');
    var box = field.querySelector('.field-msg');
    if (!box) {
      box = document.createElement('small');
      box.className = 'field-msg';
      box.id = 'err-' + name;
      field.appendChild(box);
    }
    box.textContent = msg ? '✖ ' + msg : '';
    input.classList.toggle('field-error', !!msg);
    if (msg) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', box.id); }
    else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
  }

  function clearFieldError(name) { setFieldError(name, ''); }

  function showFormErrors(errors) {
    ['nombre', 'correo', 'area'].forEach(function (k) { setFieldError(k, errors[k] || ''); });
    var fb = $('#joinFeedback');
    fb.textContent = '';
    fb.classList.remove('show', 'error');
    var first = Object.keys(errors)[0];
    if (first) $('#joinForm')[first].focus();
  }

  function setSending(sending, t) {
    var btn = $('#submitBtn');
    btn.disabled = sending;
    btn.classList.toggle('sending', sending);
    btn.textContent = sending ? t.sending : t.submit;
  }

  function showSendError(t, info) {
    info = info || {};
    var fb = $('#joinFeedback');
    var reason = info.needsActivation ? t.sendActivation : (info.fileProtocol ? t.sendFile : t.sendError);
    fb.innerHTML = esc(reason) +
      (info.mailto ? '<br><a class="feedback-link" href="' + esc(info.mailto) + '">' + esc(t.sendMailto) + '</a>' : '');
    fb.classList.add('show', 'error');
  }

  function showFormSuccess(t) {
    var f = $('#joinForm'), btn = $('#submitBtn'), fb = $('#joinFeedback');
    ['nombre', 'correo', 'area'].forEach(clearFieldError);
    fb.classList.remove('error');
    fb.textContent = t.success;
    fb.classList.add('show');
    btn.textContent = t.submitDone;
    btn.classList.add('success');
    f.reset();
    f.area.value = '';
    setTimeout(function () {
      btn.textContent = t.submit;
      btn.classList.remove('success');
    }, 2600);
  }

  function setBackTop(visible) { $('#backTop').classList.toggle('show', visible); }

  return {
    renderNav: renderNav,
    renderCoordinator: renderCoordinator,
    renderStudents: renderStudents,
    renderGallery: renderGallery,
    renderActivities: renderActivities,
    renderProjects: renderProjects,
    renderAreas: renderAreas,
    renderEvents: renderEvents,
    renderCarouselDots: renderCarouselDots,
    scrollCarousel: scrollCarousel,
    scrollCarouselTo: scrollCarouselTo,
    updateCarouselState: updateCarouselState,
    renderVideos: renderVideos,
    renderProductions: renderProductions,
    playVideo: playVideo,
    applyTranslations: applyTranslations,
    setTypewriter: setTypewriter,
    clearTypewriter: clearTypewriter,
    appendTypewriterChar: appendTypewriterChar,
    setMenuOpen: setMenuOpen,
    setActiveLink: setActiveLink,
    toggleFlip: toggleFlip,
    getFormData: getFormData,
    showFormErrors: showFormErrors,
    showFormSuccess: showFormSuccess,
    clearFieldError: clearFieldError,
    setBackTop: setBackTop,
    setSending: setSending,
    showSendError: showSendError
  };
})();
