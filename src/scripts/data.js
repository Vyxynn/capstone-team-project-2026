// /src/scripts/data.js

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFilePath = "../../data/bodies.json";

export function writeFile(filePath, data) {
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function readFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        console.log("No users file found, starting with empty array");
        return [];
    }
}
// TESTING
// const data = {
//     name: "Earth",
//     color: "#3b82f6",
//     mass: 5.972e24,
//     radius: 6371,
//     x: 0,
//     y: 0,
//     vx: 0,
//     vy: 0,
//     ax: 0,
//     ay: 0,
//     createdAt: 1715700000000,
//     updatedAt: null,
// };

// const bodies = readFile(dbFilePath);
// bodies.push(data);
// writeFile(dbFilePath, bodies);
// console.log(dbFilePath);
// console.log(bodies);
