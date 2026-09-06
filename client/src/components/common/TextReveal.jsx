import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TextReveal = ({
  children,
  as: Component = 'div',
  className = '',
  style = {},
  delay = 0,
  isHero = false
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      // Split text into line masks
      const originalHTML = el.innerHTML;
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      const words = text.split(' ');

      el.innerHTML = words.map(w => `<span class="test-word" style="display:inline-block; margin-right: 0.25em;">${w}</span>`).join('');
      const testWords = Array.from(el.querySelectorAll('.test-word'));

      const lines = [];
      let currentLine = [];
      let currentTop = null;

      testWords.forEach(wordSpan => {
        const top = wordSpan.offsetTop;
        if (currentTop === null || Math.abs(top - currentTop) > 6) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [wordSpan.textContent];
          currentTop = top;
        } else {
          currentLine.push(wordSpan.textContent);
        }
      });
      if (currentLine.length > 0) lines.push(currentLine);

      el.innerHTML = '';
      const lineInnerElements = [];

      lines.forEach((lineWords, idx) => {
        const maskSpan = document.createElement('span');
        maskSpan.className = 'line-mask split-mask';
        maskSpan.style.overflow = 'hidden';
        maskSpan.style.display = 'block';

        const innerSpan = document.createElement('span');
        innerSpan.className = `line-inner line-${idx + 1}`;
        innerSpan.style.display = 'block';
        innerSpan.textContent = lineWords.join(' ');

        maskSpan.appendChild(innerSpan);
        el.appendChild(maskSpan);
        lineInnerElements.push(innerSpan);
      });

      if (lineInnerElements.length === 0) return;

      gsap.set(lineInnerElements, { y: '120%' });

      const animProps = {
        y: '0%',
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: delay,
      };

      if (isHero) {
        gsap.to(lineInnerElements, animProps);
      } else {
        gsap.to(lineInnerElements, {
          ...animProps,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [children, delay, isHero]);

  return (
    <Component ref={containerRef} className={className} style={style}>
      {children}
    </Component>
  );
};
