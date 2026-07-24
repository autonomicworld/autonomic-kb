module.exports = {
  pathPrefix: `/autonomic-kb`,
  siteMetadata: {
    title: `Autonomic Knowledge Base`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-double-brackets-link",
            options: {
              stripBrackets: true,
              parseWikiLinks: true,
            },
          },
          "gatsby-remark-double-parenthesis-link",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 850,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-theme-garden`,
      options: {
        mdxOtherwiseConfigured: true,
        rootNote: "/readme",
        contentPath: `${__dirname}/..`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
        ],
      },
    },
  ],
};
