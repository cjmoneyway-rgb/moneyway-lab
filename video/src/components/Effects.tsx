import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.09 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width={width} height={height}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 30} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={width} height={height} filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Scanlines: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => (
  <AbsoluteFill
    style={{
      opacity,
      background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 2px, transparent 4px)",
      pointerEvents: "none",
    }}
  />
);

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.85 }) => (
  <AbsoluteFill
    style={{ background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: "none" }}
  />
);

export const Flash: React.FC<{ amount: number; color?: string }> = ({ amount, color = "#fff" }) =>
  amount > 0.001 ? <AbsoluteFill style={{ background: color, opacity: amount, mixBlendMode: "screen" }} /> : null;

/** Rising embers / sparks. */
export const Embers: React.FC<{ count?: number; speed?: number; opacity?: number }> = ({ count = 70, speed = 1, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (k: string) => random(`em-${i}-${k}`);
        const life = 90 + r("l") * 120;
        const t = ((frame * speed + r("o") * life) % life) / life;
        const x = r("x") * width + Math.sin((frame + i * 20) / 25) * 30 * u;
        const y = height * (1.05 - t * 1.1);
        const size = (2 + r("s") * 5) * u;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: r("c") > 0.8 ? "#fff3d0" : "#ff3a1a",
              boxShadow: `0 0 ${size * 3}px #ff2a00`,
              opacity: Math.sin(t * Math.PI),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Sweeping concert light beams from the top of frame. */
export const LightBeams: React.FC<{ intensity: number; pulse: number }> = ({ intensity, pulse }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", opacity: intensity, pointerEvents: "none" }}>
      {[0.15, 0.38, 0.62, 0.85].map((x, i) => {
        const angle = Math.sin(frame / 35 + i * 1.7) * 22;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * x - width * 0.06,
              top: -height * 0.1,
              width: width * 0.12,
              height: height * 1.4,
              transformOrigin: "50% 0%",
              transform: `rotate(${angle}deg)`,
              background: `linear-gradient(180deg, rgba(255,${i % 2 ? 255 : 40},${i % 2 ? 255 : 20},${0.35 + pulse * 0.35}) 0%, rgba(255,0,0,0) 85%)`,
              clipPath: "polygon(45% 0, 55% 0, 100% 100%, 0 100%)",
              filter: "blur(8px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
