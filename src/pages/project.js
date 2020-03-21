import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import styled from "styled-components";
import { graphql } from "gatsby";

const ProjectWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        keywords={[
          "projects",
          "freelancer",
          "landscape",
          "engineer",
          "professional",
          "renovation"
        ]}
      />
      <ProjectWrapper>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
      </ProjectWrapper>
    </Layout>
  );
};
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
