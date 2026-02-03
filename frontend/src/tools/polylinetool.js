import { fabric } from "fabric";

export function createPolyline(points) {
  return new fabric.Polyline(points, {
    fill: "",
    stroke: "#ffcc66",
    strokeWidth: 3,
    selectable: false,
    evented: false,
  });
}

export function updatePolyline(polyline, points) {
  polyline.set({ points });
}

