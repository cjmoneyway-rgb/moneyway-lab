import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p"); // standard limited-range output for players and platforms
Config.setColorSpace("bt709");
Config.setConcurrency(4);
// Use a locally installed Chromium if REMOTION_CHROME is set (e.g. in sandboxes without download access).
if (process.env.REMOTION_CHROME) {
  Config.setBrowserExecutable(process.env.REMOTION_CHROME);
}
