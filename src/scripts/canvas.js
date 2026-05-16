// /src/scripts/canvas.js

import { writeBodies, readBodies } from "./data";
import { stepSimulation, BASE_DT } from "./physics";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let paused = false;
let speedMultiplier = 1;
let bodies = readBodies();

export function reloadBodies() {
  bodies = readBodies();
}

window.addEventListener("sim:pause", () => {
  paused = !paused;
});
window.addEventListener("sim:speed", (e) => {
  speedMultiplier = e.detail;
});

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function animate() {
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!paused && bodies.length > 0) {
    const steps = Math.max(1, Math.round(speedMultiplier));
    const dt = (BASE_DT * speedMultiplier) / steps;
    for (let s = 0; s < steps; s++) {
      stepSimulation(bodies, dt);
    }
    writeBodies(bodies);
  }

  window.dispatchEvent(
    new CustomEvent("sim:tick", {
      detail: {
        dt: paused ? 0 : BASE_DT * speedMultiplier,
        paused,
      },
    }),
  );

  for (const b of bodies) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
