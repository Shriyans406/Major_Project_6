import { useEffect } from "react";
import { TOOLS } from "../tools/tools";

export function useKeyboard(setTool, canvasRef) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setTool(TOOLS.SELECT);
      if (e.key === "l") setTool(TOOLS.LINE);
      if (e.key === "r") setTool(TOOLS.RECT);
      if (e.key === "c") setTool(TOOLS.CIRCLE);

      if (e.key === "Delete" || e.key === "Backspace") {
        const canvas = canvasRef.current;
        canvas.getActiveObjects().forEach(o => canvas.remove(o));
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}

