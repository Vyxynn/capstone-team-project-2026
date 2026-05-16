// /src/scripts/data.js

import { Body } from "./body";
const STORAGE_KEY = "bodies";

export function readBodies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : (parsed.bodies ?? []);

    return arr.map((b) => {
      const body = new Body(
        b.name,
        b.color,
        b.mass,
        b.radius,
        b.x,
        b.y,
        b.vx,
        b.vy,
      );
      body.ax = b.ax ?? 0;
      body.ay = b.ay ?? 0;
      body.fixed = b.fixed ?? false;
      body.createdAt = b.createdAt;
      body.updatedAt = b.updatedAt;
      return body;
    });
  } catch (err) {
    console.error("Failed to read bodies from localStorage:", err);
    return [];
  }
}

export function writeBodies(bodies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bodies));
  } catch (err) {
    console.error("Failed to write bodies to localStorage:", err);
  }
}
