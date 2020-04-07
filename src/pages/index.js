import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Landing from "src/components/Landing";
import Offers from "src/components/Offers";
import { graphql } from "gatsby";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[]} />
      <Landing />
      <Offers data={data} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "offer" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            templateKey
            title
            desc
            btnText
            mainImage {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default IndexPage;
