export function setGridBackground(canvas, gridSize = 25) {
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  const gridCanvas = document.createElement("canvas");
  gridCanvas.width = width;
  gridCanvas.height = height;

  const ctx = gridCanvas.getContext("2d");

  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  canvas.setBackgroundImage(
    gridCanvas.toDataURL(),
    canvas.renderAll.bind(canvas)
  );
}
