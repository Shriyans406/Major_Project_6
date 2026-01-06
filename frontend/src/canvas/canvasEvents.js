import { TOOLS } from "../tools/tools";
import { startLine, updateLine } from "../tools/lineTool";
import { startRect, updateRect } from "../tools/rectTool";
import { startCircle, updateCircle } from "../tools/circleTool";
import { snapPointer } from "./grid/snap";
import {
  enableSelection,
  disableSelection,
} from "./selection/selectionController";

export function attachCanvasEvents({ canvas, toolRef, history }) {
  let drawing = false;
  let start = { x: 0, y: 0 };
  let temp = null;

  canvas.on("mouse:down", (opt) => {
    if (toolRef.current === TOOLS.SELECT) {
      enableSelection(canvas);
      return;
    }

    disableSelection(canvas);
    drawing = true;

    const raw = canvas.getPointer(opt.e);
    const p = snapPointer(raw);
    start = p;

    if (toolRef.current === TOOLS.LINE) temp = startLine(p);
    if (toolRef.current === TOOLS.RECT) temp = startRect(p);
    if (toolRef.current === TOOLS.CIRCLE) temp = startCircle(p);

    canvas.add(temp);
  });

  canvas.on("mouse:move", (opt) => {
    if (!drawing || !temp) return;

    const raw = canvas.getPointer(opt.e);
    const p = snapPointer(raw);

    if (toolRef.current === TOOLS.LINE) updateLine(temp, p);
    if (toolRef.current === TOOLS.RECT) updateRect(temp, start, p);
    if (toolRef.current === TOOLS.CIRCLE) updateCircle(temp, start, p);

    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    if (temp) history.save();
    drawing = false;
    temp = null;
  });

  //new ones

  canvas.on("object:modified", () => {
    history.save();
  });

  canvas.on("object:removed", () => {
    history.save();
  });
}
