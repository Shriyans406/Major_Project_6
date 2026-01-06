export function createHistoryManager(canvas) {
  const undoStack = [];
  const redoStack = [];
  let isRestoring = false;

  function save() {
    if (isRestoring) return;

    const json = canvas.toJSON();
    undoStack.push(json);
    redoStack.length = 0; // clear redo on new action
  }

  function undo() {
    if (undoStack.length === 0) return;

    isRestoring = true;
    const current = canvas.toJSON();
    redoStack.push(current);

    const prev = undoStack.pop();
    canvas.loadFromJSON(prev, () => {
      canvas.renderAll();
      isRestoring = false;
    });
  }

  function redo() {
    if (redoStack.length === 0) return;

    isRestoring = true;
    const current = canvas.toJSON();
    undoStack.push(current);

    const next = redoStack.pop();
    canvas.loadFromJSON(next, () => {
      canvas.renderAll();
      isRestoring = false;
    });
  }

  return { save, undo, redo };
}
