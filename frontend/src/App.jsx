import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const TOOLS = {
  SELECT: "select",
  LINE: "line",
  RECT: "rect",
  CIRCLE: "circle",
};

export default function App() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  const [tool, setTool] = useState(TOOLS.SELECT);

  const drawingObject = useRef(null);
  const startPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 900,
      height: 500,
      backgroundColor: "#f8f8f8",
      selection: true,
    });

    fabricCanvas.current = canvas;

    canvas.on("mouse:down", onMouseDown);
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", onMouseUp);

    return () => canvas.dispose();
  }, [tool]);

  // ---------------- CAD EVENTS ----------------

  const onMouseDown = (opt) => {
    if (tool === TOOLS.SELECT) return;

    const pointer = fabricCanvas.current.getPointer(opt.e);
    startPoint.current = pointer;

    let obj;

    if (tool === TOOLS.LINE) {
      obj = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: "black",
        strokeWidth: 2,
      });
    }

    if (tool === TOOLS.RECT) {
      obj = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
      });
    }

    if (tool === TOOLS.CIRCLE) {
      obj = new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 1,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
      });
    }

    drawingObject.current = obj;
    fabricCanvas.current.add(obj);
  };

  const onMouseMove = (opt) => {
    if (!drawingObject.current) return;

    const pointer = fabricCanvas.current.getPointer(opt.e);
    const { x, y } = startPoint.current;

    if (tool === TOOLS.LINE) {
      drawingObject.current.set({
        x2: pointer.x,
        y2: pointer.y,
      });
    }

    if (tool === TOOLS.RECT) {
      drawingObject.current.set({
        width: Math.abs(pointer.x - x),
        height: Math.abs(pointer.y - y),
        left: Math.min(pointer.x, x),
        top: Math.min(pointer.y, y),
      });
    }

    if (tool === TOOLS.CIRCLE) {
      const radius = Math.hypot(pointer.x - x, pointer.y - y) / 2;
      drawingObject.current.set({
        radius,
        left: x - radius,
        top: y - radius,
      });
    }

    fabricCanvas.current.renderAll();
  };

  const onMouseUp = () => {
    drawingObject.current = null;
    setTool(TOOLS.SELECT); // CAD behavior: auto return to select
  };

// ---------------- UI ----------------

  return (
    <div style={{ padding: 20 }}>
      <h3>Mini CAD Tool (React + Fabric)</h3>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setTool(TOOLS.SELECT)}>Select</button>
        <button onClick={() => setTool(TOOLS.LINE)}>Line</button>
        <button onClick={() => setTool(TOOLS.RECT)}>Rectangle</button>
        <button onClick={() => setTool(TOOLS.CIRCLE)}>Circle</button>
      </div>

      <canvas ref={canvasRef} />
    </div>
  );
}
