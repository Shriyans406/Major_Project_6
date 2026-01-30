import { TOOLS } from "../tools/tools";
import { fabric } from "fabric";

export function attachCanvasEvents({ canvas, toolRef }) {
  let drawing = false;
  let start = null;
  let temp = null;

  canvas.on("mouse:down", (opt) => {
    const tool = toolRef.current;
    if (tool === TOOLS.SELECT) return;

    drawing = true;
    const p = canvas.getPointer(opt.e);
    start = p;

    if (tool === TOOLS.LINE) {
      temp = new fabric.Line([p.x, p.y, p.x + 1, p.y + 1], {
        stroke: "lime",
        strokeWidth: 4,
      });
    }

    if (tool === TOOLS.RECT) {
      temp = new fabric.Rect({
        left: p.x,
        top: p.y,
        width: 1,
        height: 1,
        fill: "rgba(0,255,255,0.3)",
        stroke: "cyan",
        strokeWidth: 3,
      });
    }

    if (tool === TOOLS.CIRCLE) {
      temp = new fabric.Circle({
        left: p.x,
        top: p.y,
        radius: 1,
        fill: "rgba(255,255,0,0.3)",
        stroke: "yellow",
        strokeWidth: 3,
      });
    }

    if (temp) canvas.add(temp);
  });

  canvas.on("mouse:move", (opt) => {
    if (!drawing || !temp) return;

    const p = canvas.getPointer(opt.e);
    const sx = start.x;
    const sy = start.y;

    if (toolRef.current === TOOLS.LINE) {
      temp.set({ x2: p.x, y2: p.y });
    }

    if (toolRef.current === TOOLS.RECT) {
      temp.set({
        left: Math.min(sx, p.x),
        top: Math.min(sy, p.y),
        width: Math.abs(p.x - sx),
        height: Math.abs(p.y - sy),
      });
    }

    if (toolRef.current === TOOLS.CIRCLE) {
      const r = Math.hypot(p.x - sx, p.y - sy) / 2;
      temp.set({
        radius: r,
        left: sx - r,
        top: sy - r,
      });
    }

    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    drawing = false;
    temp = null;
  });
}

