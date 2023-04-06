/**
 * @type {import('next').NextConfig}
 */
const path = require('path')
const withTM = require('next-transpile-modules')(['mui-rte'])
const intercept = require("intercept-stdout")
// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return ""
  }
  return text
}

if (process.env.NODE_ENV === "development") {
  intercept(interceptStdout)
}

const nextConfig = withTM({
  eslint: {
    dirs: ['pages', 'utils', 'layout', 'hooks', 'app-redux', 'types'],
  },
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: [process.env.HOST_NAME, process.env.API_HOST_NAME],
  },
  swcMinify: true,
  reactStrictMode: false,
  env: {
    CURRENT_ENV: process.env.CURRENT_ENV,
    API_URL: process.env.API_URL,
    API_HOST_NAME: process.env.API_HOST_NAME,
  },
  compiler: {
    removeConsole: {
      exclude: ['log'],
    },
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "abstracts/mixins.scss";`,
  },
})

module.exports = nextConfig
