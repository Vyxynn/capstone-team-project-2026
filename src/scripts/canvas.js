// /src/scripts/canvas.js

import { writeBodies, readBodies } from "./data";
import { stepSimulation } from "./physics";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// const interval = setInterval(() => {
//     const bodies = readBodies();
//     for (b in bodies) { 
//         ctx.beginPath();
//         ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
//         ctx.fillStyle = b.color;
//         ctx.fill();
//     }
// }, 1000);

function animate() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bodies = readBodies();
    // if (bodies.length <= 0) return;
    // updateBodies(bodies);
    stepSimulation(bodies)

    for (const b of bodies) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
        ctx.fill();
        console.log(b.x, b.y);
    }
    requestAnimationFrame(animate);
}

animate();