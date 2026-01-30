import { useState } from "react";
import { TOOLS } from "../tools/tools";

export default function Toolbar({ tool, setTool }) {
  return (
    <div style={styles.toolbar}>
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

      {/* -------- Circle Group -------- */}
      <Dropdown
        label="Circle"
        active={[
          TOOLS.CIRCLE,
          TOOLS.CIRCLE_2PT,
        ].includes(tool)}
        items={[
          {
            label: "Center + Radius",
            tool: TOOLS.CIRCLE,
          },
          {
            label: "2-Point Diameter",
            tool: TOOLS.CIRCLE_2PT,
          },
        ]}
        setTool={setTool}
      />

      {/* -------- Arc Group -------- */}
      <Dropdown
        label="Arc"
        active={[
          TOOLS.ARC_CENTER,
          TOOLS.ARC_3PT,
        ].includes(tool)}
        items={[
          {
            label: "Center → Start → End",
            tool: TOOLS.ARC_CENTER,
          },
          {
            label: "3-Point Arc",
            tool: TOOLS.ARC_3PT,
          },
        ]}
        setTool={setTool}
      />

      <ToolButton
        label="Polyline"
        active={tool === TOOLS.POLYLINE}
        onClick={() => setTool(TOOLS.POLYLINE)}
      />
    </div>
  );
}

/* ================= BUTTON ================= */

function ToolButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.button,
        ...(active ? styles.active : {}),
      }}
    >
      {label}
    </button>
  );
}

/* ================= DROPDOWN ================= */

function Dropdown({ label, items, active, setTool }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={styles.dropdownWrapper}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...styles.button,
          ...(active ? styles.active : {}),
        }}
      >
        {label} ▾
      </button>

      {open && (
        <div style={styles.dropdown}>
          {items.map((item) => (
            <div
              key={item.tool}
              style={styles.dropdownItem}
              onClick={() => {
                setTool(item.tool);
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  toolbar: {
    display: "flex",
    gap: 8,
    padding: 10,
    background: "#161616",
    borderRadius: 12,
    border: "1px solid #262626",
    boxShadow: "0 6px 30px rgba(0,0,0,0.45)",
    marginBottom: 12,
  },

  button: {
    background: "#222",
    color: "#ddd",
    border: "1px solid #2f2f2f",
    padding: "6px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    whiteSpace: "nowrap",
  },

  active: {
    background: "#4cc2ff",
    color: "#000",
    border: "1px solid #4cc2ff",
    boxShadow: "0 0 0 1px rgba(76,194,255,0.35)",
  },

  dropdownWrapper: {
    position: "relative",
  },

  dropdown: {
    position: "absolute",
    top: "110%",
    left: 0,
    background: "#1e1e1e",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    overflow: "hidden",
    minWidth: 180,
    zIndex: 100,
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  },

  dropdownItem: {
    padding: "8px 12px",
    fontSize: 13,
    color: "#ddd",
    cursor: "pointer",
  },
};

