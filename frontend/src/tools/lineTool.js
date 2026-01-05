import { fabric } from "fabric";

export function startLine(p) {
  return new fabric.Line([p.x, p.y, p.x + 1, p.y + 1], {
    stroke: "lime",
    strokeWidth: 4,
  });
}

export function updateLine(line, p) {
  line.set({ x2: p.x, y2: p.y });
}

