import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COPY } from "../copy";
import { MARKER, RED } from "../fonts";

/** Gritty brick wall lit by a red streetlight, with spray-painted tags that wipe on. */
export const BrickWall: React.FC<{ bass: number; startFrame: number }> = ({ bass, startFrame }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const local = frame - startFrame;
  const vertical = height > width;
  const bw = 120 * u;
  const bh = 50 * u;

  const tags = [
    { text: COPY.graffiti[0], x: vertical ? 0.04 : 0.6, y: vertical ? 0.3 : 0.0, rot: -8, size: 260, color: RED, at: 10 },
    { text: COPY.graffiti[1], x: vertical ? 0.7 : 0.84, y: vertical ? 0.33 : 0.68, rot: 6, size: 170, color: "#e8e8e8", at: 70 },
    { text: COPY.graffiti[2], x: vertical ? 0.06 : 0.6, y: vertical ? 0.86 : 0.7, rot: -4, size: 140, color: "#ffb800", at: 140 },
  ];

  return (
    <AbsoluteFill style={{ background: "#160606" }}>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
          <pattern id="bricks" width={bw} height={bh * 2} patternUnits="userSpaceOnUse">
            <rect width={bw} height={bh * 2} fill="#1b0b0a" />
            <rect x={2} y={2} width={bw - 4} height={bh - 4} fill="#3a1410" />
            <rect x={-bw / 2 + 2} y={bh + 2} width={bw - 4} height={bh - 4} fill="#331210" />
            <rect x={bw / 2 + 2} y={bh + 2} width={bw - 4} height={bh - 4} fill="#3d1611" />
          </pattern>
          <radialGradient id="streetlight" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="#ff2a1a" stopOpacity={0.55 + bass * 0.3} />
            <stop offset="60%" stopColor="#400000" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.85} />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#bricks)" />
        <rect width={width} height={height} fill="url(#streetlight)" />
      </svg>
      {tags.map((t, i) => {
        const p = interpolate(local, [t.at, t.at + 24], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * t.x,
              top: height * t.y,
              fontFamily: MARKER,
              fontSize: t.size * u,
              color: t.color,
              transform: `rotate(${t.rot}deg)`,
              clipPath: `inset(0 ${100 - p}% 0 0)`,
              opacity: 0.85,
              textShadow: `0 0 ${18 * u}px ${t.color}, 4px 4px 0 rgba(0,0,0,0.6)`,
              filter: "blur(0.4px)",
              mixBlendMode: "screen",
              whiteSpace: "nowrap",
            }}
          >
            {t.text}
            {/* paint drips */}
            {[0.2, 0.45, 0.7].map((dx, di) => (
              <span
                key={di}
                style={{
                  position: "absolute",
                  left: `${dx * 100}%`,
                  top: "78%",
                  width: 6 * u,
                  height: interpolate(local, [t.at + 20 + di * 6, t.at + 90 + di * 10], [0, (40 + di * 25) * u], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  background: t.color,
                  borderRadius: 4 * u,
                }}
              />
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
