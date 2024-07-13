/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "nodejs")
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^@aws-sdk\/signature-v4-crt$/,
        })
      );
    return config;
  },
};

module.exports = nextConfig;
