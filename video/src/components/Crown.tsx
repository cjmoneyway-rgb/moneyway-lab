import React from "react";
import { SILVER } from "../fonts";

/** Moneyway-style crown. `draw` (0..1) animates the outline being drawn on. */
export const Crown: React.FC<{ size: number; draw?: number; fill?: number; color?: string; glow?: number }> = ({
  size,
  draw = 1,
  fill = 1,
  color = SILVER,
  glow = 0,
}) => {
  const len = 420;
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      style={{ overflow: "visible", filter: glow ? `drop-shadow(0 0 ${glow}px rgba(225,6,0,0.9))` : undefined }}
    >
      <path
        d="M14 62 L8 22 L30 42 L50 10 L70 42 L92 22 L86 62 Z"
        fill={color}
        fillOpacity={fill}
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
      {[
        [8, 22],
        [50, 10],
        [92, 22],
        [30, 42],
        [70, 42],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y - (i < 3 ? 5 : 0)} r={i < 3 ? 4.5 : 0} fill={color} opacity={draw} />
      ))}
      <rect x={14} y={66} width={72} height={7} rx={1.5} fill={color} opacity={Math.min(1, draw * 1.5) * fill} />
    </svg>
  );
};
