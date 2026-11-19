import React, { useMemo } from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

type Building = { x: number; w: number; h: number; windows: { x: number; y: number; seed: number }[]; antenna: boolean };

const makeLayer = (seed: string, width: number, height: number, minH: number, maxH: number, winSize: number) => {
  const out: Building[] = [];
  let x = 0;
  let i = 0;
  while (x < width) {
    const r = (k: string) => random(`${seed}-${i}-${k}`);
    const w = 60 + r("w") * 160;
    const h = minH + r("h") * (maxH - minH);
    const windows: Building["windows"] = [];
    if (winSize > 0) {
      const gap = winSize * 2.2;
      for (let wy = height - h + gap; wy < height - gap; wy += gap) {
        for (let wx = x + gap * 0.6; wx < x + w - gap * 0.6; wx += gap) {
          const s = random(`${seed}-win-${wx.toFixed(0)}-${wy.toFixed(0)}`);
          if (s < 0.32) windows.push({ x: wx, y: wy, seed: s });
        }
      }
    }
    out.push({ x, w, h, windows, antenna: r("a") > 0.75 });
    x += w + r("g") * 12;
    i++;
  }
  return out;
};

/** Night-time city skyline with parallax, flickering windows and a red glow at the horizon. */
export const City: React.FC<{ intensity?: number; bass?: number }> = ({ intensity = 1, bass = 0 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const sceneW = width * 1.8;

  const layers = useMemo(
    () => [
      { b: makeLayer("far", sceneW, height, height * 0.25, height * 0.55, 0), color: "#1a0406", speed: 0.15 },
      { b: makeLayer("mid", sceneW, height, height * 0.2, height * 0.45, 4 * u), color: "#0d0203", speed: 0.35 },
      { b: makeLayer("near", sceneW, height, height * 0.12, height * 0.3, 6 * u), color: "#050101", speed: 0.7 },
    ],
    [sceneW, height, u],
  );
  const flickerBucket = Math.floor(frame / 8);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #000 0%, #120102 40%, #4a0204 ${72 - bass * 6}%, #a00a05 ${92 - bass * 4}%, #1a0000 100%)`,
          opacity: intensity,
        }}
      />
      {/* blood moon */}
      <div
        style={{
          position: "absolute",
          left: width * 0.5 - 260 * u,
          top: height * 0.18,
          width: 520 * u,
          height: 520 * u,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #ff3b2f 0%, #b30000 45%, rgba(120,0,0,0) 72%)",
          opacity: 0.55 + bass * 0.35,
          transform: `scale(${1 + bass * 0.08})`,
          filter: "blur(2px)",
        }}
      />
      {layers.map((layer, li) => {
        const offset = -((frame * layer.speed * 1.5 * u) % (sceneW - width));
        return (
          <svg
            key={li}
            width={sceneW}
            height={height}
            style={{ position: "absolute", left: offset, top: 0 }}
          >
            {layer.b.map((b, bi) => (
              <g key={bi}>
                <rect x={b.x} y={height - b.h} width={b.w} height={b.h} fill={layer.color} />
                {b.antenna && (
                  <>
                    <rect x={b.x + b.w / 2 - 2} y={height - b.h - 60 * u} width={4} height={60 * u} fill={layer.color} />
                    <circle
                      cx={b.x + b.w / 2}
                      cy={height - b.h - 62 * u}
                      r={4 * u}
                      fill="#ff1a0d"
                      opacity={(frame + bi * 7) % 40 < 20 ? 1 : 0.2}
                    />
                  </>
                )}
                {b.windows.map((w, wi) => {
                  const flick = random(`f-${li}-${bi}-${wi}-${flickerBucket}`);
                  const on = flick > 0.06;
                  return (
                    <rect
                      key={wi}
                      x={w.x}
                      y={w.y}
                      width={li === 1 ? 4 * u : 7 * u}
                      height={li === 1 ? 5 * u : 9 * u}
                      fill={w.seed < 0.08 ? "#ff3020" : "#ffd9a0"}
                      opacity={on ? (li === 1 ? 0.35 : 0.6) * intensity : 0.05}
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        );
      })}
      {/* street haze */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(0deg, rgba(225,6,0,0.35) 0%, rgba(225,6,0,0) 30%)",
          mixBlendMode: "screen",
          opacity: 0.6 + bass * 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
