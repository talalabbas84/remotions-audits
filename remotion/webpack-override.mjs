import { enableTailwind } from "@remotion/tailwind";
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import nextConfig from '../next.config.js';

/**
 *  @param {import('webpack').Configuration} currentConfig
 */
export const webpackOverride = (currentConfig) => {
  // Merge the current configuration with Next.js and Tailwind configurations
  const mergedConfig = merge(currentConfig, nextConfig.webpack(currentConfig, { isServer: false, webpack, nextRuntime: 'edge' }));

  // Ensure no duplicate entries
  mergedConfig.entry = [...new Set(mergedConfig.entry)];

  return enableTailwind(mergedConfig);
};
