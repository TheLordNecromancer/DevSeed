/* =========================================================
   CONTROLADOR — conecta Modelo y Vista, maneja eventos.
   ========================================================= */
var DevSeedController = (function (Model, View) {
  'use strict';

  var menuOpen = false;
  var twTimer = null;
  var observer = null;

  /* ---------- Render según idioma ---------- */
  function renderAll() {
    var t = Model.ui();
    View.applyTranslations(t, Model.getLang());
    View.renderNav(Model.get('nav'));
    View.renderCoordinator(Model.get('coordinator'));
    View.renderStudents(Model.get('students'), t);
    View.renderGallery(Model.get('gallery'));
    View.renderActivities(Model.get('activities'));
    View.renderEvents(Model.get('events'));
    View.renderCarouselDots('questCarousel', Model.get('activities').length, t);
    View.renderCarouselDots('eventCarousel', Model.get('events').length, t);
    requestAnimationFrame(updateCarousels);
    View.renderVideos(Model.get('videos'), t);
    View.renderProductions(Model.get('productions'));
    View.renderProjects(Model.get('projects'));
    View.renderAreas(Model.get('interestAreas'), t.fAreaPh);
    View.setMenuOpen(menuOpen, t);
    observeSections();
  }

  function startTypewriter() {
    var text = Model.t('typewriter'), i = 0;
    clearTimeout(twTimer);
    View.clearTypewriter();
    (function tick() {
      if (i < text.length) { View.appendTypewriterChar(text.charAt(i++)); twTimer = setTimeout(tick, 45); }
    })();
  }

  function changeLang(lang) {
    if (lang === Model.getLang()) return;
    Model.setLang(lang);
    renderAll();
    startTypewriter();
  }

  /* ---------- Navegación ---------- */
  function setMenu(open) { menuOpen = open; View.setMenuOpen(open, Model.ui()); }

  function observeSections() {
    if (!('IntersectionObserver' in window)) return;
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) View.setActiveLink(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Model.get('nav').forEach(function (n) {
      var el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
  }

  function bindNav() {
    document.getElementById('navToggle').addEventListener('click', function () { setMenu(!menuOpen); });
    document.getElementById('navLinks').addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820 && menuOpen) setMenu(false); });
  }

  function bindLang() {
    document.querySelector('.lang-switch').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) changeLang(b.dataset.lang);
    });
  }

  /* ---------- Componentes ---------- */
  function bindFlipCards() {
    var box = document.getElementById('students');
    box.addEventListener('click', function (e) {
      var card = e.target.closest('.flip');
      if (card) View.toggleFlip(card);
    });
    box.addEventListener('keydown', function (e) {
      var card = e.target.closest('.flip');
      if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); View.toggleFlip(card); }
    });
  }

  var CAROUSELS = ['questCarousel', 'eventCarousel'];

  function updateCarousels() { CAROUSELS.forEach(View.updateCarouselState); }

  function bindCarousel(id) {
    var box = document.getElementById(id);
    var track = box.querySelector('.carousel-track');
    var ticking = false;
    box.addEventListener('click', function (e) {
      var btn = e.target.closest('.carousel-btn');
      if (btn) { View.scrollCarousel(id, Number(btn.dataset.dir)); return; }
      var dot = e.target.closest('.carousel-dot');
      if (dot) View.scrollCarouselTo(id, Number(dot.dataset.index));
    });
    track.addEventListener('keydown', function (e) {
      if (e.target !== track) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); View.scrollCarousel(id, 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); View.scrollCarousel(id, -1); }
    });
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { View.updateCarouselState(id); ticking = false; });
    }, { passive: true });
  }

  function bindCarousels() {
    CAROUSELS.forEach(bindCarousel);
    window.addEventListener('resize', updateCarousels);
  }

  function bindVideos() {
    document.getElementById('videoGrid').addEventListener('click', function (e) {
      var btn = e.target.closest('.video-play');
      if (btn) View.playVideo(btn.closest('.video-frame'));
    });
  }

  function bindProductions() {
    // al reproducir un video, se pausa el otro
    document.getElementById('prodGrid').addEventListener('play', function (e) {
      document.querySelectorAll('#prodGrid video').forEach(function (v) { if (v !== e.target) v.pause(); });
    }, true);
  }

  function bindForm() {
    var form = document.getElementById('joinForm');
    // Heurística 5/9: al corregir un campo, su error desaparece de inmediato
    ['nombre', 'correo', 'area'].forEach(function (k) {
      form[k].addEventListener(k === 'area' ? 'change' : 'input', function () { View.clearFieldError(k); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = Model.ui();
      var data = View.getFormData();
      var pending = Model.addRegistration(data);
      View.setSending(true, t);
      pending.then(function (result) {
        View.setSending(false, Model.ui());
        if (result.ok) View.showFormSuccess(Model.ui());
        else if (result.sendError) View.showSendError(Model.ui(), result);
        else View.showFormErrors(result.errors);
      });
    });
  }

  // Heurística 3: botón para volver arriba sin tener que hacer scroll
  function bindBackTop() {
    var btn = document.getElementById('backTop'), ticking = false;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('.brand').focus({ preventScroll: true });
    });
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { View.setBackTop(window.scrollY > 900); ticking = false; });
    }, { passive: true });
  }

  function init() {
    Model.loadLang();
    renderAll();
    startTypewriter();
    bindNav();
    bindLang();
    bindFlipCards();
    bindCarousels();
    bindVideos();
    bindProductions();
    bindForm();
    bindBackTop();
  }

  return { init: init };
})(DevSeedModel, DevSeedView);

document.addEventListener('DOMContentLoaded', DevSeedController.init);
