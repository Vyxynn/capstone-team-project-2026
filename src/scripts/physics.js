// /src/scripts/physics.js

export const G = 6.6743e-11;
export const DAY = 86400;

export function applyGravity(bodies) {
    for (const body of bodies) {
        body.resetAcc();
    }

    // gravitational forces
    for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;

            const softening = 1e6;
            const distanceSq = dx ** 2 + dy ** 2 + softening;
            const distance = Math.sqrt(distanceSq);

            if (distance === 0) continue;

            // newton's law of gravitation
            const force = (G * a.mass * b.mass) / distanceSq;

            // normalize direction vector
            const fx = (force * dx) / distance;
            const fy = (force * dy) / distance;

            // apply forces
            a.applyForce(fx, fy);
            b.applyForce(-fx, -fy);
        }
    }
}

// update velocity and positions
export function updateBodies(bodies, day = DAY) {
    for (const body of bodies) {
        body.vx += body.ax * day;
        body.vy += body.ay * day;

        body.x += body.vx * day;
        body.y += body.vy * day;
    }
}

// step simulation
export function stepSimulation(bodies, day = DAY) {
    applyGravity(bodies);
    updateBodies(bodies, day);
}
