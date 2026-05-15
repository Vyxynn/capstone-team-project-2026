// /src/scripts/data.js

const STORAGE_KEY = "bodies";

export function readBodies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : (parsed.bodies ?? []);
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
