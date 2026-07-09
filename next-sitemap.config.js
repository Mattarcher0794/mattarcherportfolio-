/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mattarcher.me',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Keystatic admin routes must never be indexed or listed in the sitemap.
  exclude: ['/keystatic', '/keystatic/*', '/api/keystatic/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/keystatic'] }],
  },
}
