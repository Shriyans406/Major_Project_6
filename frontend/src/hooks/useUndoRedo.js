import { useEffect } from "react";

export function useUndoRedo(historyRef) {
  useEffect(() => {
    function handleKey(e) {
      if (!e.ctrlKey) return;

      if (e.key === "z") {
        e.preventDefault();
        historyRef.current.undo();
      }

      if (e.key === "y") {
        e.preventDefault();
        historyRef.current.redo();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
}
