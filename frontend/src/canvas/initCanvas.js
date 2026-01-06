import { fabric } from "fabric";

export function initCanvas(canvasEl) {
  const canvas = new fabric.Canvas(canvasEl, {
    width: 900,
    height: 550,
    backgroundColor: "#1e1e1e",
    preserveObjectStacking: true,
    selection: true,
  });

  return canvas;
}
