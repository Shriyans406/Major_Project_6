import { fabric } from "fabric";

export function startRect(p) {
  return new fabric.Rect({
    left: p.x,
    top: p.y,
    width: 1,
    height: 1,
    fill: "rgba(0,255,255,0.25)",
    stroke: "cyan",
    strokeWidth: 4,
  });
}

export function updateRect(rect, start, p) {
  rect.set({
    left: Math.min(start.x, p.x),
    top: Math.min(start.y, p.y),
    width: Math.abs(p.x - start.x),
    height: Math.abs(p.y - start.y),
  });
}

