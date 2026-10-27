/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Old per-project pages from v1 now live in the Projects section.
  async redirects() {
    return ["/crypto", "/ens", "/sinduChart", "/adminSindu", "/corba"].map((source) => ({
      source,
      destination: "/#projects",
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
