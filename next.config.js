// require('dotenv').config();
// @ts-check
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.CONFIG_ENV === 'DEV';
const rootPath=process.env.ROOT_REPO_READ_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        isProduction,
        isDevelopment,
        rootDataDir:rootPath,
    },
    serverRuntimeConfig: {
        appHost: "string"
    },
    reactStrictMode: false,
  }
   
  module.exports = nextConfig