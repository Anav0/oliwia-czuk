import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Autoplay from "src/components/Projects/Autoplay";
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
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const projects = edges.map(({ node }) => {
    return { ...node.frontmatter, id: node.id };
  });
  console.log(projects);
  return (
    <Layout>
      <SEO
        title="Projects"
        keywords={[
          "projects",
          "freelancer",
          "landscape",
          "engineer",
          "professional",
          "renovation"
        ]}
      />
      <ProjectsWrapper>
        {/*<Autoplay*/}
        {/*  totalTime={5000}*/}
        {/*  stroke={1}*/}
        {/*  size={32}*/}
        {/*  onTick={secondsLeft => console.log(`End in ${secondsLeft}`)}*/}
        {/*  onRestart={() => console.log("restart")}*/}
        {/*  autoReset={true}*/}
        {/*/>*/}
        <ProjectShowcase projects={projects} />
      </ProjectsWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 25)
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            path
            title
            mainImage
          }
        }
      }
    }
  }
`;
