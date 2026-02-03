import { fabric } from "fabric";

export function createCircle2Point(p1, p2) {
  const cx = (p1.x + p2.x) / 2;
  const cy = (p1.y + p2.y) / 2;
  const r = Math.hypot(p2.x - p1.x, p2.y - p1.y) / 2;

  return new fabric.Circle({
    left: cx - r,
    top: cy - r,
    radius: r,
    fill: "",
    stroke: "#66ffcc",
    strokeWidth: 3,
  });
}

