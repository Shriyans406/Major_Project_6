import { useEffect, useRef, useState } from "react";
import { initCanvas } from "./canvas/initCanvas";
import { attachCanvasEvents } from "./canvas/canvasEvents";
import { useKeyboard } from "./hooks/useKeyboard";
import { TOOLS } from "./tools/tools";

export default function App() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  const [tool, setTool] = useState(TOOLS.SELECT);
  const toolRef = useRef(tool);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    const canvas = initCanvas(canvasRef.current);
    fabricCanvas.current = canvas;

    attachCanvasEvents({
      canvas,
      toolRef,
    });

    return () => canvas.dispose();
  }, []);

  useKeyboard(setTool, fabricCanvas);

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
        style={{ border: "2px solid #666", display: "block" }}
      />
    </div>
  );
}

