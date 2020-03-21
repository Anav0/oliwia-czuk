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
            frontmatter {
              path
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
        path: node.frontmatter.path,
        component: projectTemplate,
        context: {
          path: node.frontmatter.path
        }
      });
    });
  });
};
