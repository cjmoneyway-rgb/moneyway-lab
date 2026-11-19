import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig } from "remotion";
import type { Clip, Framing } from "../shots";

/**
 * Supplied performance footage, kept in sync with the song and graded into the red/black look.
 * Audio is muted — the master soundtrack is the only audio.
 */
export const Performance: React.FC<{
  clip: Clip;
  framing: Framing;
  syncFrames: number; // clip frame for song frame 0
  push: number; // 0..1 progress through the shot, for a slow push-in
  drift: number; // px of lateral camera drift
  pulse: number;
}> = ({ clip, framing, syncFrames, push, drift, pulse }) => {
  const { width, height } = useVideoConfig();
  // cover-fit the clip into the frame
  const cover = Math.max(width / clip.width, height / clip.height);
  const zoom = (framing === "close" ? clip.closeZoom : 1) * (1 + push * 0.035 + pulse * 0.01);
  const focusX = framing === "close" ? clip.face.x : 0.5;
  const focusY = framing === "close" ? clip.face.y : 0.5;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <div
        style={{
          position: "absolute",
          width: clip.width * cover,
          height: clip.height * cover,
          left: width / 2 - clip.width * cover * focusX,
          top: height / 2 - clip.height * cover * focusY,
          transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
          transform: `translateX(${drift}px) scale(${zoom})`,
        }}
      >
        <OffthreadVideo
          src={staticFile(`footage/${clip.file}`)}
          muted
          trimBefore={Math.max(0, syncFrames)}
          style={{ width: "100%", height: "100%", filter: "contrast(1.18) saturate(1.12) brightness(0.95)" }}
        />
      </div>
      {/* red/black grade */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(60,0,0,0.35), rgba(0,0,0,0) 40%, rgba(120,0,0,0.3))", mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65) 100%)" }} />
    </AbsoluteFill>
  );
};
