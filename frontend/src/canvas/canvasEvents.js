import { TOOLS } from "../tools/tools";
import { startLine, updateLine } from "../tools/lineTool";
import { startRect, updateRect } from "../tools/rectTool";
import { startCircle, updateCircle } from "../tools/circleTool";

export function attachCanvasEvents({
  canvas,
  toolRef,
}) {
  let drawing = false;
  let start = { x: 0, y: 0 };
  let temp = null;

  canvas.on("mouse:down", (opt) => {
    if (toolRef.current === TOOLS.SELECT) return;

    drawing = true;
    const p = canvas.getPointer(opt.e);
    start = p;

    if (toolRef.current === TOOLS.LINE) temp = startLine(p);
    if (toolRef.current === TOOLS.RECT) temp = startRect(p);
    if (toolRef.current === TOOLS.CIRCLE) temp = startCircle(p);

    canvas.add(temp);
  });

  canvas.on("mouse:move", (opt) => {
    if (!drawing || !temp) return;

    const p = canvas.getPointer(opt.e);

    if (toolRef.current === TOOLS.LINE) updateLine(temp, p);
    if (toolRef.current === TOOLS.RECT) updateRect(temp, start, p);
    if (toolRef.current === TOOLS.CIRCLE) updateCircle(temp, start, p);

    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    drawing = false;
    temp = null;
  });
}

