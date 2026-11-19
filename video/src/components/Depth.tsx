import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

/** Out-of-focus foreground bokeh and haze that move faster than CJ, giving the stills parallax depth. */
export const ForegroundDepth: React.FC<{ drift: number; close: boolean; opacity?: number }> = ({ drift, close, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity, transform: `translateX(${drift * 1.8}px)` }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const r = (k: string) => random(`fg-${i}-${k}`);
        const size = (close ? 260 : 180) * u * (0.6 + r("s"));
        const x = r("x") * width * 1.2 - width * 0.1 + Math.sin((frame + i * 40) / 70) * 40 * u;
        const y = (r("y") < 0.5 ? r("y") * 0.3 : 0.75 + r("y") * 0.3) * height;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,${r("c") > 0.6 ? 220 : 40},${r("c") > 0.6 ? 200 : 20},0.28) 0%, rgba(255,0,0,0) 70%)`,
              filter: `blur(${(close ? 14 : 10) * u}px)`,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          background: "linear-gradient(0deg, rgba(20,0,0,0.55) 0%, rgba(0,0,0,0) 22%)",
        }}
      />
    </AbsoluteFill>
  );
};
