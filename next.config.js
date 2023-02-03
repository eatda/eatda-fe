/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});
module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: ["server.eat-da.co.kr"],
  },
});
