/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
  
  cors: {
    allowedHeaders: ["*"],
    allowedOrigins: ["http://localhost:3000","https://haircuts-express.vercel.app","*"],
    allowedMethods: ["GET", "POST"],
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: true,
    domains: ["localhost"],
  },

  env: {
    GET_ALL_REPO: process.env.GET_ALL_REPO,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    API_URL: process.env.API_URL,
  },
});

module.exports = nextConfig;

process.noDeprecation = true;
