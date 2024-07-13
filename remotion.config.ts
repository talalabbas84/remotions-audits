// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./remotion/webpack-override.mjs";

Config.setVideoImageFormat("png");

Config.overrideWebpackConfig(webpackOverride);
// Config.setScale(1.5);

// Config.setVideoConfig({
//   width: 1920,
//   height: 1080,
//   fps: 30
// });
