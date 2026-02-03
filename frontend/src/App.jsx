import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { TOOLS } from "./tools/tools";
import { attachCanvasEvents } from "./canvas/canvasEvents";
import {
  enableSelection,
  disableSelection,
  attachSnapWhileMoving,
} from "./canvas/selection/selectionController";

export default function App() {
  const canvasRef = useRef(null);
  const canvasObj = useRef(null);

  const [tool, setTool] = useState(TOOLS.SELECT);
  const toolRef = useRef(tool);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 900,
      height: 550,
      backgroundColor: "#1e1e1e",
    });

    canvasObj.current = canvas;

    attachCanvasEvents({
      canvas,
      toolRef,
    });

    attachSnapWhileMoving(canvas);

    return () => canvas.dispose();
  }, []);

  // 🔑 THIS CONTROLS EVERYTHING
  useEffect(() => {
    const canvas = canvasObj.current;
    if (!canvas) return;

    if (tool === TOOLS.SELECT) {
      enableSelection(canvas);
    } else {
      disableSelection(canvas);
    }
  }, [tool]);

  return (
    <div style={{ background: "#111", minHeight: "100vh", padding: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button onClick={() => setTool(TOOLS.SELECT)}>Select</button>
        <button onClick={() => setTool(TOOLS.LINE)}>Line</button>
        <button onClick={() => setTool(TOOLS.RECT)}>Rect</button>
        <button onClick={() => setTool(TOOLS.CIRCLE)}>Circle</button>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid #555",
          display: "block",
        }}
      />
    </div>
  );
}

