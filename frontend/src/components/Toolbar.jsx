import { TOOLS } from "../tools/tools";

export default function Toolbar({ tool, setTool }) {
  return (
    <div style={styles.toolbar}>
      <div style={styles.group}>
        <ToolButton
          label="Select"
          active={tool === TOOLS.SELECT}
          onClick={() => setTool(TOOLS.SELECT)}
        />
        <ToolButton
          label="Line"
          active={tool === TOOLS.LINE}
          onClick={() => setTool(TOOLS.LINE)}
        />
        <ToolButton
          label="Rect"
          active={tool === TOOLS.RECT}
          onClick={() => setTool(TOOLS.RECT)}
        />
        <ToolButton
          label="Circle"
          active={tool === TOOLS.CIRCLE}
          onClick={() => setTool(TOOLS.CIRCLE)}
        />
      </div>

      <div style={styles.groupMuted}>
        {/* future: grid toggle, snap toggle, zoom */}
        <span style={styles.hint}>CAD Tool</span>
      </div>
    </div>
  );
}

/* ---------- Button ---------- */

function ToolButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.button,
        ...(active ? styles.buttonActive : {}),
      }}
    >
      {label}
    </button>
  );
}

/* ---------- Styles ---------- */

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#161616",
    padding: "10px 12px",
    borderRadius: "12px",
    marginBottom: "12px",
    boxShadow: "0 6px 30px rgba(0,0,0,0.45)",
    border: "1px solid #262626",
  },

  group: {
    display: "flex",
    gap: "6px",
  },

  groupMuted: {
    display: "flex",
    alignItems: "center",
    color: "#777",
    fontSize: "12px",
  },

  hint: {
    opacity: 0.7,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  button: {
    background: "#222",
    color: "#ddd",
    border: "1px solid #2f2f2f",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.15s ease",
  },

  buttonActive: {
    background: "#4cc2ff",
    color: "#000",
    border: "1px solid #4cc2ff",
    boxShadow: "0 0 0 1px rgba(76,194,255,0.35)",
  },
};

