/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { domains: ['firebasestorage.googleapis.com','i.dummyjson.com',"fakestoreapi.com"], },
}

module.exports = nextConfig
