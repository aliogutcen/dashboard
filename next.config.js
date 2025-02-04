const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
    prependData: `@use "abstracts" as *;`,
  },
};

module.exports = nextConfig;
