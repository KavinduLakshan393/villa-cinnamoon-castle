// Transparent video for every browser. A "stacked" clip carries its colour in
// the top half (premultiplied, on black) and its matte in the bottom half; one
// shared WebGL canvas joins the two and each clip copies the result to its own
// 2D canvas. One context serves the whole page, so no context limit is reached.

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
 * Draws the current frame of a stacked clip, with its transparency, onto a 2D
 * canvas context. Returns false when there was nothing to draw yet.
 */
export function drawAlphaFrame(video, ctx) {
  const s = setup();
  const width = video.videoWidth;
  const height = video.videoHeight / 2;
  if (!s || !width || video.readyState < 2) return false;
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
    return false;
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  const target = ctx.canvas;
  if (target.width !== width || target.height !== height) {
    target.width = width;
    target.height = height;
  }
  ctx.clearRect(0, 0, width, height);
  // The viewport sits at the bottom-left of the shared canvas.
  ctx.drawImage(canvas, 0, canvas.height - height, width, height, 0, 0, width, height);
  return true;
}
