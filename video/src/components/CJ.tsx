import React from "react";
import { Img, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const SRC = staticFile("cj.png");
const ASPECT = 1152 / 1366;

export type Tint = "none" | "red" | "mono";

const Masked: React.FC<{ color: string; style?: React.CSSProperties; blend?: React.CSSProperties["mixBlendMode"] }> = ({
  color,
  style,
  blend,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: color,
      WebkitMaskImage: `url(${SRC})`,
      maskImage: `url(${SRC})`,
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%",
      mixBlendMode: blend,
      ...style,
    }}
  />
);

/**
 * CJ — the lead. Beat-synced bounce/head-nod, bass-driven scale, chromatic split on kicks,
 * slice glitches, echo trails and colour treatments.
 */
export const CJ: React.FC<{
  x: number; // centre, fraction of width
  heightFrac: number;
  pulse: number;
  phase: number;
  bass: number;
  kick: number;
  enter?: number; // 0..1 rise-in
  glitch?: boolean;
  echoes?: number;
  tint?: Tint;
  rim?: number;
  topFrac?: number; // if set, top edge of the photo (fraction of height); otherwise bottom-anchored
  anchorX?: number; // which point of the photo (fraction of its width) sits at `x`
  driftX?: number; // px of lateral camera drift
  push?: number; // 0..1 slow push-in through the shot
}> = ({
  x,
  heightFrac,
  pulse,
  phase,
  bass,
  kick,
  enter = 1,
  glitch = false,
  echoes = 0,
  tint = "none",
  rim = 1,
  topFrac,
  anchorX = 0.5,
  driftX = 0,
  push = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const h = height * heightFrac;
  const w = h * ASPECT;
  const scale = 1 + pulse * 0.022 + bass * 0.035 + push * 0.04;
  const nod = Math.sin(phase * Math.PI * 2) * 0.9;
  const rise = (1 - enter) * h * 0.6;
  const split = (kick * 22 + pulse * 6) * (h / 1000);

  const box: React.CSSProperties = {
    position: "absolute",
    left: width * x - w * anchorX + driftX,
    top: (topFrac === undefined ? height - h : height * topFrac) + rise,
    width: w,
    height: h,
    transform: `scale(${scale}) rotate(${nod}deg)`,
    transformOrigin: topFrac === undefined ? "50% 100%" : `${anchorX * 100}% 30%`,
    opacity: enter,
  };

  const imgFilter =
    tint === "mono"
      ? "grayscale(1) contrast(1.35) brightness(1.05)"
      : `contrast(1.12) saturate(1.15) brightness(${1 + kick * 0.15})`;

  return (
    <>
      {/* echo trail */}
      {Array.from({ length: echoes }).map((_, i) => {
        const k = i + 1;
        return (
          <div
            key={`e${i}`}
            style={{
              ...box,
              transform: `scale(${scale * (1 + k * 0.06 + pulse * 0.04 * k)}) rotate(${nod * (1 + k)}deg)`,
              opacity: (0.35 / k) * enter,
            }}
          >
            <Masked color={i % 2 ? "#ffffff" : "#ff1a0d"} />
          </div>
        );
      })}
      <div style={box}>
        {/* rim light / glow */}
        <Masked
          color="#ff2414"
          style={{ filter: `blur(${(14 + bass * 18) * (h / 1000)}px)`, transform: "scale(1.02)", opacity: 0.7 * rim }}
        />
        {/* chromatic split */}
        <Masked color="#ff0033" style={{ transform: `translateX(${split}px)`, opacity: 0.8 }} />
        <Masked color="#00e5ff" style={{ transform: `translateX(${-split}px)`, opacity: 0.55 }} />
        <Img src={SRC} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: imgFilter }} />
        {tint === "red" && <Masked color="#ff1a0d" blend="multiply" style={{ opacity: 0.55 }} />}
        {tint === "mono" && <Masked color="#ff1a0d" blend="screen" style={{ opacity: 0.12 }} />}
        {/* slice glitch */}
        {glitch &&
          kick > 0.45 &&
          Array.from({ length: 6 }).map((_, i) => {
            // slices stay below the face (chest/arms) so CJ's face, cap logo and expression are never altered
            const top = 50 + random(`gt-${frame}-${i}`) * 42;
            const hh = 2 + random(`gh-${frame}-${i}`) * 7;
            const dx = (random(`gx-${frame}-${i}`) - 0.5) * 70 * kick * (h / 1000);
            return (
              <Img
                key={`g${i}`}
                src={SRC}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  clipPath: `inset(${top}% 0 ${100 - top - hh}% 0)`,
                  transform: `translateX(${dx}px)`,
                  filter: imgFilter,
                }}
              />
            );
          })}
      </div>
    </>
  );
};
