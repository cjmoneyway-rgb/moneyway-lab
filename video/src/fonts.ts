import { continueRender, delayRender, staticFile } from "remotion";

// Fonts are bundled in public/fonts (Anton, Permanent Marker, Bebas Neue — SIL Open Font License)
// so rendering works offline.
const FONTS = [
  { family: "Anton", file: "Anton.ttf" },
  { family: "PermanentMarker", file: "PermanentMarker.ttf" },
  { family: "BebasNeue", file: "BebasNeue.ttf" },
];

if (typeof document !== "undefined") {
  const handle = delayRender("Loading fonts");
  Promise.all(
    FONTS.map((f) => {
      const face = new FontFace(f.family, `url(${staticFile(`fonts/${f.file}`)})`);
      (document.fonts as unknown as { add: (f: FontFace) => void }).add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const ANTON = "Anton, Impact, sans-serif";
export const MARKER = "PermanentMarker, cursive";
export const BEBAS = "BebasNeue, Impact, sans-serif";

export const RED = "#E10600";
export const DEEP_RED = "#7a0000";
export const SILVER = "#D9D9DE";
