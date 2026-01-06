import { fabric } from "fabric";

export function drawGrid(canvas, gridSize) {
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  // Vertical lines
  for (let i = 0; i < width / gridSize; i++) {
    const x = i * gridSize;
    const line = new fabric.Line([x, 0, x, height], {
      stroke: "#2a2a2a",
      selectable: false,
      evented: false,
      excludeFromExport: true,
    });
    canvas.add(line);
    line.sendToBack();
  }

  // Horizontal lines
  for (let i = 0; i < height / gridSize; i++) {
    const y = i * gridSize;
    const line = new fabric.Line([0, y, width, y], {
      stroke: "#2a2a2a",
      selectable: false,
      evented: false,
      excludeFromExport: true,
    });
    canvas.add(line);
    line.sendToBack();
  }
}
