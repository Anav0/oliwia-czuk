import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Lines from "src/components/Lines";

const ProjectWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    font-family: "Advent pro", sans-serif;
  }
`;

const MainImageWrapper = styled.div`
  width: 75%;
  height: 400px;
  position: absolute !important;
  display: flex;
  left: 0;
  top: 0;
  .lines {
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: flex;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 768px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 640px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 700px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 82%;
  }
`;

const MainImage = styled(Img)`
  width: 100%;
  height: 100%;
`;

const MainTitle = styled.h1`
  font-weight: 700;
  position: absolute;
  right: -55px;
  top: 350px;
  transform: rotate(-90deg);
  font-size: 2.2rem;
  color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: -35px;
    top: 630px;
    font-size: 3.4rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: -0px;
    top: 530px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    right: 55px;
    top: 580px;
    font-size: 5.1rem;
  }
`;

const ProjectStatus = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 430px;
  left: 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 800px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 680px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    top: 800px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    top: 820px;
  }
`;
const StatusHeader = styled.h2`
  font-weight: 400;
  font-size: 1.25rem;
  color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1.7rem;
  }
`;
const Status = styled.h3`
  font-weight: 700;
  font-size: 1.7rem;
  color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2.3rem;
  }
`;

export default ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  const statusTexts = {
    "in progress": "Would be seen in:",
    done: "Can be seen in:"
  };

  return (
    <Layout>
      <SEO title={frontmatter.title} keywords={frontmatter.tags.split(" ")} />
      <ProjectWrapper>
        <MainImageWrapper>
          <MainImage fluid={frontmatter.mainImage.childImageSharp.fluid} />
          <Lines className="lines" number={25} />
        </MainImageWrapper>
        <MainTitle>{frontmatter.title}</MainTitle>
        <ProjectStatus>
          <StatusHeader>{statusTexts[frontmatter.status]}</StatusHeader>
          <Status>{frontmatter.location}</Status>
        </ProjectStatus>
      </ProjectWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      fields {
        slug
      }
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        desc
        fullImage {
          desc
          image {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        hightlights {
          desc
          firstImage {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          firstImageDesc
          secondImage {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          secondImageDesc
        }
        location
        mainImage {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        status
        title
        tags
      }
      id
    }
  }
`;
