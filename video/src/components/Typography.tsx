import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ANTON, BEBAS, RED, SILVER } from "../fonts";

/** A word that slams in on a downbeat, shakes, and gets a red underline swipe. */
export const SlamWord: React.FC<{
  text: string;
  from: number;
  to: number;
  left: number;
  top: number;
  maxWidth: number;
  size: number;
  align?: "left" | "center";
  index: number;
}> = ({ text, from, to, left, top, maxWidth, size, align = "left", index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - from;
  if (frame < from || frame >= to) return null;
  const s = spring({ frame: local, fps, config: { damping: 11, stiffness: 180, mass: 0.6 } });
  const scale = interpolate(s, [0, 1], [2.6, 1]);
  const blur = interpolate(local, [0, 5], [14, 0], { extrapolateRight: "clamp" });
  const shake = local < 8 ? (random(`sh-${frame}`) - 0.5) * 18 * (1 - local / 8) : 0;
  const out = interpolate(frame, [to - 5, to], [1, 0], { extrapolateLeft: "clamp" });
  const line = interpolate(local, [4, 14], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const words = text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: maxWidth,
        textAlign: align,
        transform: `translate(${shake}px, ${-shake / 2}px) scale(${scale})`,
        transformOrigin: align === "left" ? "0% 50%" : "50% 50%",
        filter: `blur(${blur}px)`,
        opacity: out * Math.min(1, s * 1.5),
      }}
    >
      <div style={{ fontFamily: BEBAS, color: RED, fontSize: size * 0.22, letterSpacing: size * 0.04 }}>
        {`0${index + 1}`} / MONEYWAY
      </div>
      {words.map((w, i) => (
        <div
          key={i}
          style={{
            fontFamily: ANTON,
            fontSize: size,
            lineHeight: 0.95,
            color: i === words.length - 1 ? "#fff" : "transparent",
            WebkitTextStroke: i === words.length - 1 ? undefined : `${size * 0.025}px ${SILVER}`,
            textShadow: i === words.length - 1 ? `0 0 ${size * 0.25}px rgba(225,6,0,0.75), ${size * 0.04}px ${size * 0.04}px 0 ${RED}` : undefined,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {w}
        </div>
      ))}
      <div
        style={{
          height: size * 0.08,
          width: `${line}%`,
          background: `linear-gradient(90deg, ${RED}, #ff5a3c)`,
          marginTop: size * 0.12,
          marginLeft: align === "center" ? `${(100 - line) / 2}%` : 0,
          boxShadow: `0 0 ${size * 0.2}px ${RED}`,
        }}
      />
    </div>
  );
};

/** Rows of giant scrolling text for the hook. */
export const Marquee: React.FC<{ text: string; rows: number; speed: number; pulse: number; opacity?: number }> = ({
  text,
  rows,
  speed,
  pulse,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const rowH = height / rows;
  const unit = `${text} ✦ `.repeat(8);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity, transform: "rotate(-6deg) scale(1.25)" }}>
      {Array.from({ length: rows }).map((_, i) => {
        const dir = i % 2 ? 1 : -1;
        const x = ((frame * speed * (1 + i * 0.15)) % width) * dir - width * 0.5;
        const filled = i % 2 === 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: i * rowH,
              left: x,
              height: rowH,
              fontFamily: ANTON,
              fontSize: rowH * 0.92,
              lineHeight: `${rowH}px`,
              whiteSpace: "nowrap",
              color: filled ? `rgba(225,6,0,${0.75 + pulse * 0.25})` : "transparent",
              WebkitTextStroke: filled ? undefined : `${Math.max(2, rowH * 0.012)}px rgba(255,255,255,${0.35 + pulse * 0.5})`,
            }}
          >
            {unit}
          </div>
        );
      })}
    </div>
  );
};

/** Name strap for the lead artist. */
export const LowerThird: React.FC<{ from: number; to: number; name: string; role: string; left: number; bottom: number; u: number }> = ({
  from,
  to,
  name,
  role,
  left,
  bottom,
  u,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame >= to) return null;
  const inS = spring({ frame: frame - from, fps, config: { damping: 14 } });
  const outS = interpolate(frame, [to - 10, to], [0, 1], { extrapolateLeft: "clamp" });
  const x = interpolate(inS - outS, [0, 1], [-600 * u, 0]);
  return (
    <div style={{ position: "absolute", left: left + x, bottom, display: "flex", alignItems: "stretch", opacity: 1 - outS }}>
      <div style={{ width: 14 * u, background: RED, boxShadow: `0 0 ${20 * u}px ${RED}` }} />
      <div style={{ background: "rgba(0,0,0,0.75)", padding: `${10 * u}px ${28 * u}px`, backdropFilter: "blur(6px)" }}>
        <div style={{ fontFamily: ANTON, color: "#fff", fontSize: 92 * u, lineHeight: 1 }}>{name}</div>
        <div style={{ fontFamily: BEBAS, color: SILVER, fontSize: 34 * u, letterSpacing: 6 * u }}>{role}</div>
      </div>
    </div>
  );
};
