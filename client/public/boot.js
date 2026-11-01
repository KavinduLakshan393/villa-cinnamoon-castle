(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  if (!reduce) root.classList.add('has-motion');

  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  var showIntro = path === '/';
  // Keep the boot decision independent from CSS classes. React modules may
  // initialise after another early script has updated the root class list.
  window.__VILLA_INTRO__ = showIntro;

  if (showIntro) {
    root.classList.add('is-intro');
    // The Home hero photograph is the first thing painted: fetch it at once.
    var portrait = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
    var hero = document.createElement('link');
    hero.rel = 'preload';
    hero.as = 'image';
    hero.href = '/media/hero-video-' + (portrait ? 'mobile' : 'desktop') + '-poster.webp';
    hero.fetchPriority = 'high';
    document.head.appendChild(hero);
  }
})();
