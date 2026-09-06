/* ==========================================================================
   Award-Winning Text Reveal Engine (Option A: GSAP + ScrollTrigger + Lenis)
   - Replicates the exact architectural logic from the tutorial
   - Only triggers elements when scrolled into view (start: "top 80%", once: true)
   - Preserves text-indent and ensures clean line masking
   ========================================================================== */

(function () {
  'use strict';

  // 1. Initialize Lenis Smooth Scrolling (Exact matching scroll dynamic)
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Setup GSAP & ScrollTrigger
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger library missing.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (typeof SplitText !== 'undefined') {
    gsap.registerPlugin(SplitText);
  }

  // Connect Lenis to ScrollTrigger so scroll positions stay in sync
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ==========================================================================
  // Custom Line Splitter Helper (Uses GSAP SplitText or robust DOM fallback)
  // ==========================================================================
  function splitElementIntoMaskedLines(el) {
    // If official GSAP SplitText is loaded
    if (typeof SplitText !== 'undefined') {
      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        lineClass: 'line++',
      });
      return {
        lines: split.lines,
        revert: () => split.revert(),
      };
    }

    // High-performance DOM fallback that creates identical <span class="line-mask"><span class="line-inner">
    const originalHTML = el.innerHTML;
    const computed = window.getComputedStyle(el);
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    const words = text.split(' ');

    // Temporarily replace words with test spans to measure layout line breaks
    el.innerHTML = words.map(w => `<span class="test-word">${w}</span>`).join(' ');
    const testWords = Array.from(el.querySelectorAll('.test-word'));

    const lines = [];
    let currentLine = [];
    let currentTop = null;

    testWords.forEach(wordSpan => {
      const top = wordSpan.offsetTop;
      if (currentTop === null || Math.abs(top - currentTop) > 4) {
        if (currentLine.length > 0) lines.push(currentLine);
        currentLine = [wordSpan.textContent];
        currentTop = top;
      } else {
        currentLine.push(wordSpan.textContent);
      }
    });
    if (currentLine.length > 0) lines.push(currentLine);

    // Build masked DOM structure
    el.innerHTML = '';
    const lineInnerElements = [];

    lines.forEach((lineWords, idx) => {
      const maskSpan = document.createElement('span');
      maskSpan.className = 'line-mask split-mask';
      maskSpan.style.overflow = 'hidden';
      maskSpan.style.display = 'block';

      const innerSpan = document.createElement('span');
      innerSpan.className = `line-inner line${idx + 1}`;
      innerSpan.style.display = 'block';
      innerSpan.textContent = lineWords.join(' ');

      maskSpan.appendChild(innerSpan);
      el.appendChild(maskSpan);
      lineInnerElements.push(innerSpan);
    });

    return {
      lines: lineInnerElements,
      revert: () => {
        el.innerHTML = originalHTML;
      },
    };
  }

  // ==========================================================================
  // Core Text Reveal Animation Initializer
  // ==========================================================================
  function initTextRevealAnimations() {
    const revealTargets = document.querySelectorAll('[data-text-reveal]');

    revealTargets.forEach(el => {
      // Check for custom delay or animation settings
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      const isHero = el.hasAttribute('data-hero'); // Hero reveals on page load; rest wait for scroll

      // 1. Check and preserve text-indent (As solved in the video)
      const computed = window.getComputedStyle(el);
      const textIndent = computed.textIndent;
      const hasIndent = textIndent && textIndent !== '0px' && textIndent !== '0';

      // 2. Split element into masked lines
      const splitResult = splitElementIntoMaskedLines(el);
      const lines = splitResult.lines;

      if (!lines || lines.length === 0) return;

      // Apply preserved indent to first line only, then clear parent
      if (hasIndent) {
        lines[0].style.paddingLeft = textIndent;
        el.style.textIndent = '0px';
      }

      // 3. Set initial state: lines are pushed down 120% out of view (accounts for descender padding)
      gsap.set(lines, {
        y: '120%',
      });

      // 4. Animation properties
      const animProps = {
        y: '0%',
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: delay,
      };

      // 5. ScrollTrigger integration: ONLY triggers when scrolled into view
      if (isHero) {
        // Hero element: triggers immediately after initial page mount
        gsap.to(lines, animProps);
      } else {
        // Scroll-triggered elements: strictly waits until the section enters 80% of viewport
        gsap.to(lines, {
          ...animProps,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%', // Starts when top of element reaches 80% down the viewport
            once: true,       // Play once cleanly, matching award-winning sites
          },
        });
      }
    });

    // Refresh ScrollTrigger calculations
    ScrollTrigger.refresh();
  }

  // Execute once DOM is loaded and fonts are ready (prevents layout shifts)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.fonts ? document.fonts.ready.then(initTextRevealAnimations) : initTextRevealAnimations();
    });
  } else {
    document.fonts ? document.fonts.ready.then(initTextRevealAnimations) : initTextRevealAnimations();
  }

  // Handle window resizing cleanly
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
})();
