/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // the legacy map island wires the DOM imperatively; no double-invoke
  webpack: (config) => {
    // import the legacy body markup as a raw string
    config.module.rules.push({
      test: /legacy-markup\.html$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
