/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
