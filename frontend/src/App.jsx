import { useEffect, useRef, useState } from "react";
import { initCanvas } from "./canvas/initCanvas";
import { attachCanvasEvents } from "./canvas/canvasEvents";
import { useKeyboard } from "./hooks/useKeyboard";
import { TOOLS } from "./tools/tools";
import Toolbar from "./components/Toolbar.jsx"

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
  <div style={{ background: "#0e0e0e", minHeight: "100vh", padding: 20 }}>
    <Toolbar tool={tool} setTool={setTool} />

    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid #2a2a2a",
        borderRadius: 10,
        display: "block",
      }}
    />
  </div>
);

}

