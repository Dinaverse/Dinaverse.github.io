// Scroll-reveal: sections fade and slide into view the first time they enter the viewport.
// Shared across every page.
(function () {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.fade-up').forEach(function (el) {
      revealObserver.observe(el);
    });
  });
})();

// Site-wide network mesh: a slow-moving lattice of nodes and connecting lines,
// fixed behind every page. This is the site's signature visual, not a one-off
// hero decoration, so it runs on every page via this shared script.
(function () {
  function start() {
    var canvas = document.createElement('canvas');
    canvas.id = 'site-mesh';
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    if (prefersReducedMotion) return;

    var meshRgb = getComputedStyle(document.documentElement).getPropertyValue('--mesh-rgb').trim() || '94, 140, 106';

    var nodes = [];
    var count = Math.round((window.innerWidth * window.innerHeight) / 42000);
    count = Math.max(20, Math.min(count, 60));
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22
      });
    }

    function tick() {
      var w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (var a = 0; a < nodes.length; a++) {
        var n = nodes[a];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (var b = 0; b < nodes.length; b++) {
        for (var c = b + 1; c < nodes.length; c++) {
          var dx = nodes[b].x - nodes[c].x;
          var dy = nodes[b].y - nodes[c].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170) {
            ctx.strokeStyle = 'rgba(' + meshRgb + ',' + (0.22 * (1 - dist / 170)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[b].x, nodes[b].y);
            ctx.lineTo(nodes[c].x, nodes[c].y);
            ctx.stroke();
          }
        }
      }
      for (var d = 0; d < nodes.length; d++) {
        ctx.fillStyle = 'rgba(' + meshRgb + ', 0.45)';
        ctx.beginPath();
        ctx.arc(nodes[d].x, nodes[d].y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
