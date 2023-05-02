/** @type {import('next').NextConfig} */

import { conf } from './src/configs';

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig

console.log(conf.SENTRY_TOKEN);
// Inected Content via Sentry Wizard Below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    url:conf.BASE_URL,
    authToken:conf.SENTRY_TOKEN,
    org: conf.ORG_NAME,
    project: conf.PROJECT_NAME,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
