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
  }, 4000);
})();

// Contact form: send via Web3Forms without leaving the page
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = 'Sending…';
    button.disabled = true;

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) throw new Error(data.message || 'failed');
        form.reset();
        status.className = 'form-status success';
        status.textContent = 'Thank you! Your message was sent. We’ll be in touch soon.';
      })
      .catch(function () {
        status.className = 'form-status error';
        status.textContent = 'Sorry, something went wrong. Please try again or email info@themindbodylounge.com.';
      })
      .then(function () { button.disabled = false; });
  });
})();

// Reviews: show "Read more" only on cards whose text is clamped, and toggle full text
(function () {
  var cards = document.querySelectorAll('.review-card');
  if (!cards.length) return;
  function refresh() {
    cards.forEach(function (card) {
      var text = card.querySelector('.review-text');
      var btn = card.querySelector('.review-more');
      if (card.classList.contains('expanded')) return;
      btn.hidden = text.scrollHeight <= text.clientHeight + 1;
    });
  }
  cards.forEach(function (card) {
    var btn = card.querySelector('.review-more');
    btn.addEventListener('click', function () {
      var open = card.classList.toggle('expanded');
      btn.textContent = open ? 'Show less' : 'Read more';
      btn.setAttribute('aria-expanded', open);
    });
  });
  window.addEventListener('load', refresh);
  window.addEventListener('resize', refresh);
  refresh();
})();
