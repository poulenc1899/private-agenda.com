// Parallax: each [data-scroll-speed] element moves up by scrollY / speed.
// Updates are batched into one requestAnimationFrame per frame and use
// translate3d on GPU-composited layers, so the movement stays in step with
// the browser's own scrolling in both directions (writing the transform
// straight from every scroll event made upward scrolling stutter on mobile).
(function () {
  var items = [];
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    for (var i = 0; i < items.length; i++) {
      items[i].el.style.transform = 'translate3d(0,' + (-(y / items[i].speed)) + 'px,0)';
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  function init() {
    var els = document.querySelectorAll('[data-scroll-speed]');
    for (var i = 0; i < els.length; i++) {
      var speed = parseInt(els[i].getAttribute('data-scroll-speed'), 10);
      if (!speed) continue;
      els[i].style.willChange = 'transform';
      items.push({ el: els[i], speed: speed });
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
