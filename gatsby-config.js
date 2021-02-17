const path = require('path')
const configuration = require('./content/configuration')
const s3BucketName = process.env.S3_DEST_BUCKET || ''
const contentPath = 'content'

module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-transformer-marbleitem',
      options: {
        skipMetadataPrune: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/essays`,
        name: `essay`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
      // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'menu',
        path: `${contentPath}/json/menus`,
      },
    },
    {
      resolve: '@ndlib/gatsby-theme-marble',
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: configuration.siteMetadata.siteUrl,
        sitemap: `${configuration.siteMetadata.siteUrl}/sitemap.xml`,
        env: {
          development: {
            policy: [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
          production: {
            policy: [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: configuration.manifest,
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: s3BucketName,
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          'https://static.nd.edu',
          'https://image-iiif.library.nd.edu',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'standard',
        path: 'content/json/standard',
      },
    },
  ],
}
