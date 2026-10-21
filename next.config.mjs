/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: dirname,
};

export default nextConfig;
