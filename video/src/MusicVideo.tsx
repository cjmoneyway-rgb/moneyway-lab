import React from "react";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrickWall } from "./components/BrickWall";
import { City } from "./components/City";
import { CJ, Tint } from "./components/CJ";
import { Crown } from "./components/Crown";
import { Embers, Flash, Grain, LightBeams, Scanlines, Vignette } from "./components/Effects";
import { Equalizer } from "./components/Equalizer";
import { LowerThird, Marquee, SlamWord } from "./components/Typography";
import { COPY } from "./copy";
import { ANTON, BEBAS, RED, SILVER } from "./fonts";
import { barFrame, beatInfo, DURATION_FRAMES, kickHit, SECTIONS, sectionAt, SectionName } from "./timing";

const AUDIO = staticFile("soundtrack.wav");

const CJ_X: Record<SectionName, { h: number; v: number }> = {
  intro: { h: 0.5, v: 0.5 },
  verse1: { h: 0.68, v: 0.5 },
  hook: { h: 0.5, v: 0.5 },
  verse2: { h: 0.3, v: 0.5 },
  outro: { h: 0.5, v: 0.5 },
};
const CJ_H: Record<SectionName, { h: number; v: number }> = {
  intro: { h: 0.97, v: 0.6 },
  verse1: { h: 0.97, v: 0.6 },
  hook: { h: 1.02, v: 0.64 },
  verse2: { h: 0.97, v: 0.6 },
  outro: { h: 0.64, v: 0.5 },
};

export const MusicVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const vertical = height > width;
  const u = Math.min(width, height) / 1080;
  const orient = vertical ? "v" : "h";

  // ---- audio reactivity -------------------------------------------------
  const audioData = useAudioData(AUDIO);
  const spectrum = audioData
    ? visualizeAudio({ fps, frame, audioData, numberOfSamples: 64, optimizeFor: "speed" })
    : new Array(64).fill(0);
  const bass = Math.min(1, ((spectrum[0] + spectrum[1] + spectrum[2] + spectrum[3]) / 4) * 2.2);
  const eqValues = spectrum.slice(0, 28);

  const { pulse, phase, beatInBar } = beatInfo(frame);
  const kick = kickHit(frame);
  const section = sectionAt(frame);
  const sIdx = SECTIONS.indexOf(section);
  const local = frame - section.from;

  // ---- CJ placement, eased between sections ------------------------------
  const prev = SECTIONS[Math.max(0, sIdx - 1)].name;
  const tMove = interpolate(local, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cjX = interpolate(tMove, [0, 1], [CJ_X[prev][orient], CJ_X[section.name][orient]]);
  const cjH = interpolate(tMove, [0, 1], [CJ_H[prev][orient], CJ_H[section.name][orient]]);
  const cjEnter = spring({ frame: frame - barFrame(1), fps, config: { damping: 16, stiffness: 90 } });

  let tint: Tint = "none";
  if (section.name === "verse2") tint = (["none", "mono", "red", "none"] as Tint[])[Math.min(3, Math.floor(local / (barFrame(11) - barFrame(10))))];
  if (section.name === "hook" && beatInBar === 3) tint = "red";

  // ---- camera ------------------------------------------------------------
  const isHook = section.name === "hook";
  const shakeAmt = (isHook ? 14 : 4) * u * (pulse * 0.6 + kick);
  const camX = (random(`cx-${frame}`) - 0.5) * shakeAmt;
  const camY = (random(`cy-${frame}`) - 0.5) * shakeAmt;
  const camZoom = 1 + (isHook ? pulse * 0.025 : 0) + interpolate(local, [0, section.to - section.from], [0, 0.04]);

  // section-change flash
  const flash = SECTIONS.slice(1).reduce((acc, s) => {
    const d = frame - s.from;
    return d >= 0 && d < 10 ? Math.max(acc, 1 - d / 10) : acc;
  }, 0);
  const strobe = isHook ? pulse * 0.18 : 0;

  // ---- layout helpers ----------------------------------------------------
  const textBox = vertical
    ? { left: width * 0.05, top: height * 0.07, maxWidth: width * 0.9, size: 150 * u, align: "center" as const }
    : { left: width * 0.06, top: height * 0.26, maxWidth: width * 0.5, size: 170 * u, align: "left" as const };
  const textBoxV2 = vertical ? textBox : { ...textBox, left: width * 0.53, maxWidth: width * 0.44 };

  // intro timings
  const crownDraw = interpolate(frame, [5, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const presentsIn = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const presentsOut = interpolate(frame, [barFrame(1) - 8, barFrame(1)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bigCJ = spring({ frame: frame - barFrame(1), fps, config: { damping: 12 } });

  // outro / end card
  const endStart = barFrame(16);
  const endCard = interpolate(frame, [endStart, endStart + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [DURATION_FRAMES - 18, DURATION_FRAMES - 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outroTitle = spring({ frame: frame - SECTIONS[4].from, fps, config: { damping: 13 } });

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Audio src={AUDIO} />

      <AbsoluteFill style={{ transform: `translate(${camX}px, ${camY}px) scale(${camZoom})` }}>
        {/* ================= BACKGROUNDS ================= */}
        {(section.name === "intro" || section.name === "verse1" || section.name === "outro") && (
          <City
            bass={bass}
            intensity={section.name === "intro" ? interpolate(frame, [barFrame(1) - 20, barFrame(1)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1}
          />
        )}
        {isHook && (
          <>
            <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 60%, #5a0000 0%, #120000 55%, #000 100%)` }} />
            <Marquee text={COPY.hookWord} rows={vertical ? 9 : 6} speed={9 * u} pulse={pulse} opacity={0.9} />
            <LightBeams intensity={0.9} pulse={pulse} />
          </>
        )}
        {section.name === "verse2" && <BrickWall bass={bass} startFrame={section.from} />}

        {/* giant outline name behind CJ in the intro */}
        {section.name === "intro" && frame >= barFrame(1) && (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                fontFamily: ANTON,
                fontSize: (vertical ? 700 : 760) * u,
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: `${6 * u}px ${RED}`,
                transform: `scale(${interpolate(bigCJ, [0, 1], [1.8, 1]) + pulse * 0.03}) translateY(${vertical ? -height * 0.18 : -height * 0.05}px)`,
                opacity: bigCJ,
                filter: `drop-shadow(0 0 ${30 * u}px ${RED})`,
              }}
            >
              {COPY.artist}
            </div>
          </AbsoluteFill>
        )}

        {/* outro title behind CJ */}
        {section.name === "outro" && (
          <AbsoluteFill style={{ alignItems: "center" }}>
            <div style={{ marginTop: height * (vertical ? 0.08 : 0.04), transform: `scale(${outroTitle})` }}>
              <Crown size={(vertical ? 260 : 200) * u} glow={20 + pulse * 30} />
            </div>
            <div
              style={{
                fontFamily: ANTON,
                fontSize: (vertical ? 210 : 260) * u,
                lineHeight: 1,
                color: "#fff",
                letterSpacing: interpolate(outroTitle, [0, 1], [80, 8]) * u,
                textShadow: `0 0 ${40 * u}px ${RED}, ${8 * u}px ${8 * u}px 0 ${RED}`,
                opacity: outroTitle,
              }}
            >
              {COPY.brand}
            </div>
          </AbsoluteFill>
        )}

        {section.name !== "verse2" && <Embers count={vertical ? 60 : 80} speed={isHook ? 2.2 : 1} opacity={isHook ? 1 : 0.8} />}
        {section.name === "outro" && <LightBeams intensity={0.55} pulse={pulse} />}

        {/* ================= CJ ================= */}
        {frame >= barFrame(1) - 2 && (
          <CJ
            x={cjX}
            heightFrac={cjH}
            pulse={pulse}
            phase={phase}
            bass={bass}
            kick={kick}
            enter={section.name === "intro" ? cjEnter : 1}
            glitch={section.name !== "intro" && section.name !== "outro"}
            echoes={isHook ? 3 : 0}
            tint={tint}
          />
        )}

        {/* ================= FOREGROUND TYPE ================= */}
        {section.name === "intro" && (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: presentsOut }}>
            <Crown size={220 * u} draw={crownDraw} fill={crownDraw > 0.95 ? 1 : 0} glow={crownDraw * 25} />
            <div
              style={{
                fontFamily: BEBAS,
                color: SILVER,
                fontSize: 72 * u,
                letterSpacing: interpolate(presentsIn, [0, 1], [60, 18]) * u,
                opacity: presentsIn,
                marginTop: 24 * u,
              }}
            >
              {COPY.presents}
            </div>
          </AbsoluteFill>
        )}

        {section.name === "verse1" &&
          COPY.verse1.map((w, i) => (
            <SlamWord key={w + i} text={w} index={i} from={barFrame(2 + i)} to={barFrame(3 + i)} {...textBox} />
          ))}
        {section.name === "verse2" &&
          COPY.verse2.map((w, i) => (
            <SlamWord key={w + i} text={w} index={i + 4} from={barFrame(10 + i)} to={barFrame(11 + i)} {...textBoxV2} />
          ))}

        {isHook && (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: height * (vertical ? 0.2 : 0.17) }}>
            <div
              style={{
                fontFamily: ANTON,
                fontSize: (vertical ? 190 : 230) * u,
                lineHeight: 1,
                color: "#fff",
                transform: `scale(${1 + pulse * 0.12}) rotate(${beatInBar % 2 ? 2 : -2}deg)`,
                textShadow: `0 0 ${50 * u}px ${RED}, ${10 * u}px ${10 * u}px 0 ${RED}, ${-3 * u}px ${-3 * u}px 0 #00e5ff`,
              }}
            >
              {COPY.hookWord}
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>

      {/* lower third sits outside the shaking camera */}
      <LowerThird
        from={barFrame(2) + 12}
        to={barFrame(4)}
        name={COPY.artist}
        role={COPY.role}
        left={width * (vertical ? 0.05 : 0.06)}
        bottom={height * (vertical ? 0.14 : 0.2)}
        u={u}
      />

      {frame >= barFrame(1) && endCard < 1 && <Equalizer values={eqValues} opacity={0.85} heightFrac={vertical ? 0.1 : 0.15} />}

      {/* ================= END CARD ================= */}
      {endCard > 0 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 45%, #3a0000 0%, #000 70%)`,
            opacity: endCard,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ transform: `scale(${1 + pulse * 0.05})` }}>
            <Crown size={(vertical ? 300 : 240) * u} glow={30 + pulse * 30} />
          </div>
          <div style={{ fontFamily: ANTON, color: "#fff", fontSize: (vertical ? 150 : 170) * u, lineHeight: 1.05, textShadow: `0 0 ${40 * u}px ${RED}` }}>
            {COPY.endCard}
          </div>
          <div style={{ height: 6 * u, width: 420 * u, background: RED, margin: `${18 * u}px 0`, boxShadow: `0 0 ${20 * u}px ${RED}` }} />
          <div style={{ fontFamily: BEBAS, color: SILVER, fontSize: 56 * u, letterSpacing: 18 * u }}>{COPY.label}</div>
        </AbsoluteFill>
      )}

      {/* ================= FINISHING ================= */}
      <Flash amount={flash * 0.9 + strobe} />
      <Flash amount={kick * 0.08} color={RED} />
      <Scanlines opacity={0.1} />
      <Vignette strength={0.8} />
      <Grain opacity={0.1} />
      <AbsoluteFill style={{ background: "#000", opacity: fadeOut }} />
    </AbsoluteFill>
  );
};
