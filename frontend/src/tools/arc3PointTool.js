import { fabric } from "fabric";

export function createArc3Point(p1, p2, p3) {
  const circle = computeCircle(p1, p2, p3);
  if (!circle) return null;

  const { center, radius } = circle;

  const a1 = Math.atan2(p1.y - center.y, p1.x - center.x);
  const a3 = Math.atan2(p3.y - center.y, p3.x - center.x);

  return new fabric.Path(
    describeArc(center.x, center.y, radius, a1, a3),
    {
      fill: "",
      stroke: "#aa66ff",
      strokeWidth: 3,
    }
  );
}

function computeCircle(p1, p2, p3) {
  const A = p2.x - p1.x;
  const B = p2.y - p1.y;
  const C = p3.x - p1.x;
  const D = p3.y - p1.y;

  const E = A * (p1.x + p2.x) + B * (p1.y + p2.y);
  const F = C * (p1.x + p3.x) + D * (p1.y + p3.y);
  const G = 2 * (A * (p3.y - p2.y) - B * (p3.x - p2.x));

  if (G === 0) return null;

  const cx = (D * E - B * F) / G;
  const cy = (A * F - C * E) / G;

  return {
    center: { x: cx, y: cy },
    radius: Math.hypot(cx - p1.x, cy - p1.y),
  };
}

function describeArc(cx, cy, r, start, end) {
  const sx = cx + r * Math.cos(start);
  const sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(end);
  const ey = cy + r * Math.sin(end);

  return `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
}

