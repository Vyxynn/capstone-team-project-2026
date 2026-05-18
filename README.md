# Gravitational Orbit Simulator

A browser-based n-body gravity sim. Place bodies on a canvas, set their mass, radius, and initial velocity, and watch them orbit each other.

Built with JS, HTML5 Canvas, and Vite.

## How it works

Every frame, graviational force is calculated between every pair of bodies using Newton's law of universal gravitation and applied as acceleration. Bodies are then moved based on their velocity.

You can create bodies using the sidebar, setting their mass, radius, color, starting position, and initial velocity. Bodies can also be locked in place so they act as fixed gravitational anchors. Simulation speed can be changed from 1/16x all the way up to 10x, and the data is saved to localStorage.

## How to run

```bash
npm install
npm run dev
```
