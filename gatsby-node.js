exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollmagic/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};
const path = require(`path`);
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const projectTemplate = path.resolve(`src/pages/project.js`);
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
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: projectTemplate,
        context: {
          path: node.fields.slug
        }
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
      value: slug
    });
  }
};
