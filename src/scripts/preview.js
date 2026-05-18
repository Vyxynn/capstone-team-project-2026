// /src/scripts/preview.js

export function drawBodyPreview(canvasEl, color, radius) {
  const ctx = canvasEl.getContext("2d");
  const w = canvasEl.width;
  const h = canvasEl.height;

  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  // Clamp so the body never overflows the preview canvas
  const maxR = Math.min(w, h) / 2 - 2;
  const displayR = Math.min(radius, maxR);

  ctx.beginPath();
  ctx.arc(cx, cy, displayR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}
