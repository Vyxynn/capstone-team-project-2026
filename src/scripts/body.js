// /src/scripts/body.js

export class Body {
  constructor(name, color, mass, radius, x, y, vx, vy) {
    this.name = name;
    this.color = color;
    this.mass = mass;
    this.radius = radius;
    this.x = x; // position x
    this.y = y; // position y
    this.vx = vx; // velocity x
    this.vy = vy; // velocity y
    this.ax = 0; // acceleration x
    this.ay = 0; // acceleration y
    this.fixed = false;
    this.createdAt = Date.now();
    this.updatedAt = null;
  }

  get speed() {
    return Math.sqrt(this.vx ** 2 + this.vy ** 2);
  }

  get kineticEnergy() {
    return 0.5 * this.mass * this.speed ** 2;
  }

  get momentum() {
    return this.mass * this.speed;
  }

  get density() {
    return this.mass / ((4 / 3) * Math.PI * this.radius ** 3);
  }

  applyForce(fx, fy) /* force x, force y */ {
    this.ax += fx / this.mass;
    this.ay += fy / this.mass;
  }

  resetAcc() {
    this.ax = 0;
    this.ay = 0;
  }
}
