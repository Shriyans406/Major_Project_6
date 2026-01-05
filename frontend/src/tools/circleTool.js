import { fabric } from "fabric";

export function startCircle(p) {
  return new fabric.Circle({
    left: p.x,
    top: p.y,
    radius: 1,
    fill: "rgba(255,255,0,0.25)",
    stroke: "yellow",
    strokeWidth: 4,
  });
}

export function updateCircle(circle, start, p) {
  const r = Math.hypot(p.x - start.x, p.y - start.y) / 2;
  circle.set({
    radius: r,
    left: start.x - r,
    top: start.y - r,
  });
}

