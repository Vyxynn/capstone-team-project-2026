// /src/scripts/physics.js

export const G = 500;
export const BASE_DT = 0.016;

export function applyGravity(bodies) {
  for (const body of bodies) {
    body.resetAcc();
  }

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];

      const dx = b.x - a.x;
      const dy = b.y - a.y;

      const softening = 10;
      const distanceSq = dx ** 2 + dy ** 2 + softening;
      const distance = Math.sqrt(distanceSq);

      const force = (G * a.mass * b.mass) / distanceSq;

      const fx = (force * dx) / distance;
      const fy = (force * dy) / distance;

      b.applyForce(-fx, -fy);
      a.applyForce(fx, fy);
    }
  }
}

export function updateBodies(bodies, dt = BASE_DT) {
  for (const body of bodies) {
    if (body.fixed) continue;

    body.vx += body.ax * dt;
    body.vy += body.ay * dt;

    body.x += body.vx * dt;
    body.y += body.vy * dt;
  }
}

export function stepSimulation(bodies, dt = BASE_DT) {
  applyGravity(bodies);
  updateBodies(bodies, dt);
}
