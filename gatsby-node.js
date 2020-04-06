exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollmagic/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
const path = require(`path`);
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const blackList = ["offer"];
    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (
        !blackList.some((element) => element === node.frontmatter.templateKey)
      )
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            `src/pages/${node.frontmatter.templateKey}.js`
          ),
          context: {
            slug: node.fields.slug,
          },
        });
    });
  });
};

const { createFilePath } = require(`gatsby-source-filesystem`);
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.onCreateNode = ({ node, getNode, actions }) => {
  fmImagesToRelative(node);
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
