import React from "react";
import { useVideoConfig } from "remotion";
import { RED } from "../fonts";

/** Mirrored audio spectrum bars, driven by the real soundtrack. */
export const Equalizer: React.FC<{ values: number[]; opacity?: number; heightFrac?: number }> = ({
  values,
  opacity = 1,
  heightFrac = 0.16,
}) => {
  const { width, height } = useVideoConfig();
  const bars = [...values.slice().reverse(), ...values];
  const bw = width / bars.length;
  const maxH = height * heightFrac;
  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, width, height: maxH, opacity, display: "flex", alignItems: "flex-end" }}>
      {bars.map((v, i) => {
        const h = Math.min(1, Math.pow(v, 0.6) * 1.6) * maxH;
        return (
          <div key={i} style={{ width: bw, height: maxH, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div
              style={{
                width: bw * 0.62,
                height: Math.max(2, h),
                background: `linear-gradient(0deg, ${RED} 0%, #ff4a2a 70%, #fff 100%)`,
                boxShadow: `0 0 ${bw * 0.8}px rgba(225,6,0,0.7)`,
                borderRadius: bw * 0.2,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
