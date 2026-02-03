import { fabric } from "fabric";

export function createArc(center, start, end) {
  const r = Math.hypot(start.x - center.x, start.y - center.y);

  const startAngle =
    Math.atan2(start.y - center.y, start.x - center.x);
  const endAngle =
    Math.atan2(end.y - center.y, end.x - center.x);

  return new fabric.Path(
    describeArc(center.x, center.y, r, startAngle, endAngle),
    {
      fill: "",
      stroke: "#ff66aa",
      strokeWidth: 3,
    }
  );
}

function describeArc(cx, cy, r, start, end) {
  const sx = cx + r * Math.cos(start);
  const sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(end);
  const ey = cy + r * Math.sin(end);

  const largeArc = Math.abs(end - start) > Math.PI ? 1 : 0;

  return `
    M ${sx} ${sy}
    A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}
  `;
}

