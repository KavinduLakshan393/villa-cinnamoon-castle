// Transparent video for every browser. A "stacked" clip carries its colour in
// the top half (premultiplied, on black) and its matte in the bottom half; one
// shared WebGL canvas joins the two and each place the clip appears copies the
// result to its own 2D canvas.
//
// Everything is shared: one WebGL context for the page, and one <video> (one
// download, one decoder) per clip however many times that clip is on the page.

const VERTEX = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D frame;
varying vec2 uv;
void main() {
  float a = texture2D(frame, vec2(uv.x, 0.5 + uv.y * 0.5)).g;
  vec3 c = texture2D(frame, vec2(uv.x, uv.y * 0.5)).rgb;
  gl_FragColor = vec4(min(c, vec3(a)), a);
}`;

let stage; // { canvas, gl } once set up, or false when WebGL is unavailable

function setup() {
  if (stage !== undefined) return stage;
  stage = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, depth: false });
    if (!gl) return stage;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return stage;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.disable(gl.BLEND);
    stage = { canvas, gl };
  } catch {
    stage = false;
  }
  return stage;
}

/** Whether transparent clips can be drawn here. */
export const alphaVideoSupported = () => Boolean(setup());

/**
 * Joins the current frame of a stacked clip on the shared canvas. Returns the
 * region holding the result ({ source, x, y, width, height }), or null when
 * there is nothing to draw yet. The region is valid until the next call.
 */
function composeFrame(video) {
  const s = setup();
  const width = video.videoWidth;
  const height = video.videoHeight / 2;
  if (!s || !width || video.readyState < 2) return null;
  const { canvas, gl } = s;
  // The shared canvas only ever grows, so clips of different sizes do not reallocate it.
  if (canvas.width < width || canvas.height < height) {
    canvas.width = Math.max(canvas.width, width);
    canvas.height = Math.max(canvas.height, height);
  }
  gl.viewport(0, 0, width, height);
  try {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  } catch {
    return null;
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  // The viewport sits at the bottom-left of the shared canvas.
  return { source: canvas, x: 0, y: canvas.height - height, width, height };
}

// ---------- Shared clips ----------

const clips = new Map(); // src -> { video, targets: Set<CanvasRenderingContext2D -> onFrame>, handle }

function clipFor(src) {
  let clip = clips.get(src);
  if (clip) return clip;
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.disablePictureInPicture = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('aria-hidden', 'true');
  // Kept in the document (unseen) so every browser is willing to play it.
  video.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
  video.src = src;
  document.body.appendChild(video);
  clip = { video, targets: new Map(), handle: 0, running: false };
  clips.set(src, clip);
  return clip;
}

function run(clip) {
  if (clip.running) return;
  clip.running = true;
  const { video } = clip;
  const perFrame = 'requestVideoFrameCallback' in video;
  const tick = () => {
    if (!clip.targets.size) {
      clip.running = false;
      video.pause();
      return;
    }
    const frame = composeFrame(video);
    if (frame) {
      clip.targets.forEach((onFrame, ctx) => {
        const target = ctx.canvas;
        if (target.width !== frame.width || target.height !== frame.height) {
          target.width = frame.width;
          target.height = frame.height;
        }
        ctx.clearRect(0, 0, frame.width, frame.height);
        ctx.drawImage(frame.source, frame.x, frame.y, frame.width, frame.height, 0, 0, frame.width, frame.height);
        onFrame?.();
      });
    }
    clip.handle = perFrame ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
  };
  if (!document.hidden) video.play().catch(() => {});
  clip.handle = perFrame ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
}

/** Starts downloading a clip before it is needed. */
export function preloadClip(src) {
  if (setup()) clipFor(src);
}

/**
 * Shows a clip on a 2D canvas context while subscribed; `onFrame` runs after each
 * frame drawn. The clip plays while anything shows it and rests otherwise.
 * Returns the function that stops showing it.
 */
export function showClip(src, ctx, onFrame) {
  if (!setup()) return () => {};
  const clip = clipFor(src);
  clip.targets.set(ctx, onFrame);
  run(clip);
  return () => {
    clip.targets.delete(ctx);
  };
}

// Tabs in the background rest; clips resume when the tab returns.
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    clips.forEach((clip) => {
      if (document.hidden) clip.video.pause();
      else if (clip.targets.size) clip.video.play().catch(() => {});
    });
  });
}
