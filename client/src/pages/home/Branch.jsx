import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGSAP, withMotion } from '../../lib/motion.js';
import { useVideoAllowed } from '../../lib/media.js';
import { alphaVideoSupported, drawAlphaFrame } from '../../lib/alphaVideo.js';
import './Branch.css';

// Pixel size of each clip, so a branch keeps its shape before anything loads.
const CLIP_SIZE = { a: [658, 900], b: [576, 900], c: [900, 632] };

/**
 * One clip of a branch, with real transparency: the still poster first, then the
 * moving clip drawn on a canvas once it plays. `active` plays it; otherwise it rests.
 */
function Clip({ name, animated, near, active }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);
  const [width, height] = CLIP_SIZE[name];

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!animated || !near || !video || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let handle = 0;
    let stopped = false;
    const perFrame = 'requestVideoFrameCallback' in video;
    const schedule = () => {
      handle = perFrame ? video.requestVideoFrameCallback(draw) : requestAnimationFrame(draw);
    };
    function draw() {
      if (stopped) return;
      if (drawAlphaFrame(video, ctx)) setLive(true);
      if (active) schedule();
    }

    video.muted = true;
    if (active && !document.hidden) {
      video.play().catch(() => {});
      schedule();
    } else {
      video.pause();
    }
    return () => {
      stopped = true;
      if (perFrame) video.cancelVideoFrameCallback(handle);
      else cancelAnimationFrame(handle);
    };
  }, [animated, near, active]);

  return (
    <div className={`branch__clip${live ? ' is-live' : ''}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={`/media/branch-${name}-poster.webp`} alt="" width={width} height={height} decoding="async" />
      {animated && (
        <>
          <canvas ref={canvasRef} width={width} height={height} />
          <video
            ref={videoRef}
            src={near ? `/media/branch-${name}.mp4` : undefined}
            muted
            loop
            playsInline
            preload={near ? 'auto' : 'none'}
            disablePictureInPicture
          />
        </>
      )}
    </div>
  );
}

/**
 * A cinnamon branch that grows in from the edge of the page as it scrolls into
 * view and sways in a looping clip (DEC-032). The clips have real transparency
 * (see lib/alphaVideo.js), so the leaves are solid: they cover the side lines
 * and each other, and no background ever shows around them.
 *
 * - `name`: clip in /media (branch-<name>.mp4 and -poster.webp).
 * - `extra`: a second clip layered behind the first, for a fuller cluster.
 * - `side`: the edge it grows from; `flip` mirrors the clips for the other edge.
 * - The entrance is scrubbed and rewinds when scrolling back; the clips play
 *   only while on screen. Reduced motion or data saver shows the still posters.
 * - Decorative: hidden from assistive technology, behind the section's content.
 */
export default function Branch({ name, extra, side = 'left', flip = false, className = '' }) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const allowed = useVideoAllowed();
  const [animated] = useState(alphaVideoSupported);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const moving = allowed && animated;

  useLayoutEffect(() => {
    rootRef.current.parentElement.classList.add('has-branch');
  }, []);

  // Load the clips a screen ahead; play them only while on screen.
  useEffect(() => {
    if (!moving) return undefined;
    const root = rootRef.current;
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          loader.disconnect();
        }
      },
      { rootMargin: '100% 0px' },
    );
    const player = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    loader.observe(root);
    player.observe(root);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, [moving]);

  // Grows in from its edge with the scroll, and back out on the way up. The
  // untransformed root is the trigger, so its measured position stays true.
  useGSAP(
    () =>
      withMotion(() => {
        const from = side === 'left' ? -1 : 1;
        gsap.fromTo(
          innerRef.current,
          { xPercent: from * 38, rotation: from * 12, scale: 0.82, opacity: 0 },
          {
            xPercent: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 96%', end: 'top 42%', scrub: 1.2 },
          },
        );
      }),
    { scope: rootRef },
  );

  return (
    <div className={`branch branch--${side}${flip ? ' branch--flip' : ''} ${className}`} ref={rootRef} aria-hidden="true">
      <div className="branch__inner" ref={innerRef}>
        {extra && (
          <div className="branch__extra">
            <Clip name={extra} animated={moving} near={near} active={active} />
          </div>
        )}
        <div className="branch__main">
          <Clip name={name} animated={moving} near={near} active={active} />
        </div>
      </div>
    </div>
  );
}
