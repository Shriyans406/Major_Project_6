import { GRID_SIZE } from "./gridConfig";

export function snapValue(v) {
  return Math.round(v / GRID_SIZE) * GRID_SIZE;
}

export function snapPointer(p) {
  return {
    x: snapValue(p.x),
    y: snapValue(p.y),
  };
}
