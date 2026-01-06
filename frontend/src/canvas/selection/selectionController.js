import { snapPointer } from "../grid/snap";

export function enableSelection(canvas) {
  canvas.selection = true;

  canvas.getObjects().forEach((obj) => {
    obj.selectable = true;
    obj.evented = true;
  });
}

export function disableSelection(canvas) {
  canvas.discardActiveObject();
  canvas.selection = false;

  canvas.getObjects().forEach((obj) => {
    obj.selectable = false;
    obj.evented = false;
  });

  canvas.requestRenderAll();
}

export function attachSnapWhileMoving(canvas) {
  canvas.on("object:moving", (opt) => {
    const obj = opt.target;
    if (!obj) return;

    const snapped = snapPointer({ x: obj.left, y: obj.top });
    obj.set({
      left: snapped.x,
      top: snapped.y,
    });
  });
}
