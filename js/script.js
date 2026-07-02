(function () {
  'use strict';

  var heroBg = document.querySelector('[data-parallax]');
  var timelineSection = document.querySelector('[data-timeline]');
  var timelineFill = document.querySelector('[data-timeline-fill]');
  var timelineItems = Array.prototype.slice.call(document.querySelectorAll('[data-timeline-item]'));
  var timelineDots = Array.prototype.slice.call(document.querySelectorAll('[data-timeline-dot]'));

  var rafId = null;

  function updateScroll() {
    if (heroBg) {
      heroBg.style.transform = 'translate3d(0,' + (window.scrollY * 0.16) + 'px,0)';
    }

    if (timelineSection && timelineFill && timelineItems.length) {
      var rect = timelineSection.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      var progress = Math.min(1, Math.max(0, (vh * 0.72 - rect.top) / (rect.height * 0.72)));

      timelineFill.style.height = Math.round(progress * 100) + '%';

      var n = timelineItems.length;
      timelineItems.forEach(function (item, i) {
        var threshold = i / (n - 1);
        var active = progress >= threshold - 0.06;
        item.classList.toggle('is-active', active);
      });
    }
  }

  function onScrollOrResize() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = null;
      updateScroll();
    });
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  updateScroll();

  /* ============ Testimonials carousel — pause on hover/touch ============ */
  var carouselViewport = document.querySelector('[data-carousel-viewport]');
  var carouselTrack = document.querySelector('[data-carousel-track]');

  if (carouselViewport && carouselTrack) {
    var pause = function () { carouselTrack.classList.add('is-paused'); };
    var resume = function () { carouselTrack.classList.remove('is-paused'); };

    carouselViewport.addEventListener('mouseenter', pause);
    carouselViewport.addEventListener('mouseleave', resume);
    carouselViewport.addEventListener('touchstart', pause, { passive: true });
    carouselViewport.addEventListener('touchend', resume);
  }

  /* ============ FAQ accordion ============ */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));

  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = '0px';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ============ Reserva form ============ */
  var form = document.getElementById('reservar-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
})();
