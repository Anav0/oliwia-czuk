require("dotenv").config({
  path: ".env"
});
module.exports = {
  siteMetadata: {
    title: `oliwia-czuk`,
    description: `Oliwia Czuk's portfolio`,
    author: `Igor Motyka <igormotyka6@gmail.com>`
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Advent Pro`,
            variants: [`400`, `700`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/public/assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
        name: "assets"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/project`
      }
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-transition-link`,
    "gatsby-plugin-react-svg",
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 100
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-styled-components`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
