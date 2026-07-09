import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The Keystatic reader reads `content/` from the filesystem at request time
  // (the homepage is dynamic due to geo headers). Next's output file tracing
  // can't detect those dynamic reads, so the files must be explicitly bundled
  // into the serverless functions — otherwise content is missing at runtime on
  // Vercel and pages 500.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
    '/': ['./content/**/*'],
  },
}

export default nextConfig
