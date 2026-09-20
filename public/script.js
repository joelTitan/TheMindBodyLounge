document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var linkPath = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (linkPath === path) {
      link.classList.add('active');
    }
  });

  var banner = document.querySelector('.cookie-banner');
  if (banner) {
    if (!localStorage.getItem('cookieConsent')) {
      banner.classList.add('visible');
    }
    banner.querySelector('.accept').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.classList.remove('visible');
    });
    banner.querySelector('.decline').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'declined');
      banner.classList.remove('visible');
    });
  }
});

// Home hero: cross-fade through the photos (paused for reduced-motion users)
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var i = 0;
  setInterval(function () {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
  }, 5000);
})();
