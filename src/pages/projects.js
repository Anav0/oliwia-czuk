import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import styled from "styled-components";
import ProjectShowcase from "src/components/Projects/ProjectShowcase";
import { graphql } from "gatsby";

const ProjectsWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({
  location,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const projects = edges.map(({ node }) => {
    return { ...node.frontmatter, id: node.id, path: node.fields.slug };
  });
  return (
    <Layout location={location}>
      <SEO
        title="Projekty"
        keywords={[
          "projekty",
          "freelancer",
          "krajobraz",
          "inżynier",
          "profesjonalista",
          "renowacja",
          "inwentaryzacja",
        ]}
      />
      <ProjectsWrapper>
        <ProjectShowcase projects={projects} />
      </ProjectsWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
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
