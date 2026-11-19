import React from "react";
import { Composition } from "remotion";
import { MusicVideo } from "./MusicVideo";
import { DURATION_FRAMES, FPS } from "./timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CJMoneyway" component={MusicVideo} durationInFrames={DURATION_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="CJMoneywayVertical" component={MusicVideo} durationInFrames={DURATION_FRAMES} fps={FPS} width={1080} height={1920} />
  </>
);
