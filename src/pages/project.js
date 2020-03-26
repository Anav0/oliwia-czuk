import React, { useEffect, useRef } from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import PrevLayout from "src/components/PrevLayout";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Lines from "src/components/Lines";
import Hightlights from "src/components/Hightlights";
import FullImage from "src/components/FullImage";
import NextProject from "src/components/NextProject";
import { TimelineMax, Power4, Power3 } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

const ProjectWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    font-family: "Advent pro", sans-serif;
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 82%;
  }
`;

const MainImage = styled(Img)`
  width: 100%;
  height: 100%;
`;

const PreviewMainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainTitle = styled.h1`
  font-weight: 700;
  position: absolute;
  right: 30px;
  bottom: 10%;
  transform: rotate(-90deg) translate(100%, 0);
  transform-origin: right bottom;
  font-size: 2.2rem;
  color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: 90px;
    bottom: 15%;
    font-size: 3.4rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 125px;
    bottom: 10%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    right: 150px;
    font-size: 5.1rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints["lg+"]}) {
    right: 150px;
    bottom: 5%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    right: 250px;
  }
`;

const MainStatus = styled.div`
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
    left: 60px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    top: 820px;
  }
`;

const MainStatusHeader = styled.h2`
  font-weight: 400;
  font-size: 1.25rem;
  color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1.7rem;
  }
`;

const MainStatusLocation = styled.h3`
  font-weight: 700;
  font-size: 1.7rem;
  color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2.3rem;
  }
`;

const MainDescriptionWrapper = styled.div`
  height: 125vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainDescription = styled.p`
  width: 100%;
  text-align: justify;
  margin: 0 20px;
  line-height: 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0;
    width: 75%;
    line-height: 40px;
    font-size: 1.7rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
    line-height: 60px;
    font-size: 2.2rem;
  }
`;

export const ProjectTemplate = ({ data }) => {
  const statusTexts = {
    "in progress": "Would be seen in:",
    done: "Can be seen in:"
  };

  let contentToRender = [];
  let i = 0;
  let j = 1;
  return (
    <PrevLayout>
      <ProjectWrapper>
        <MainWrapper>
          <MainImageWrapper>
            <PreviewMainImage src={data.mainImage} />
            <Lines className="lines" number={25} />
          </MainImageWrapper>
          <MainTitle>{data.title}</MainTitle>
          <MainStatus>
            <MainStatusHeader>{statusTexts[data.status]}</MainStatusHeader>
            <MainStatusLocation>{data.location}</MainStatusLocation>
          </MainStatus>
        </MainWrapper>
        <MainDescriptionWrapper>
          <MainDescription>{data.desc}</MainDescription>
        </MainDescriptionWrapper>

        {data.hightlights.map((highlight, index) => {
          contentToRender[i] = (
            <Hightlights
              className={"project-section"}
              key={highlight.firstImageDesc + index}
              {...highlight}
              countFrom={index + 1}
              prev={true}
            />
          );
          i += 2;
        })}
        {data.fullImage.map((fullImage, index) => {
          contentToRender[j] = (
            <FullImage
              className={"project-section"}
              {...fullImage}
              image={fullImage.image}
              key={fullImage.desc + index}
              prev={true}
            />
          );
          j += 2;
        })}
        {contentToRender}
      </ProjectWrapper>
    </PrevLayout>
  );
};

export default ({ data }) => {
  const mainTitleRef = useRef();
  const mainDescRef = useRef();
  const mainStatusRef = useRef();
  useEffect(() => {
    const { current: mainTitle } = mainTitleRef;
    const { current: mainStatus } = mainStatusRef;

    const timeline = new TimelineMax();

    timeline.fromTo(
      mainStatus,
      1,
      { autoAlpha: 0, scale: 2, x: "-10%", y: "60%" },
      { autoAlpha: 1, scale: 1, y: 0, x: 0, ease: Power4 },
      "-=0.75"
    );
  }, []);

  const { frontmatter } = data.markdownRemark;
  const currentPorjectId = data.markdownRemark.id;
  const { edges: allPagesData } = data.allMarkdownRemark;
  const nextNode = allPagesData.find(({ node }) => node.id == currentPorjectId);
  const statusTexts = {
    "in progress": "Would be seen in:",
    done: "Can be seen in:"
  };
  let nextProjectData = undefined;
  if (nextNode.next)
    nextProjectData = {
      slug: nextNode.next.fields.slug,
      ...nextNode.next.frontmatter
    };

  let contentToRender = [];
  let i = 0;
  let j = 1;
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.desc}
        keywords={frontmatter.tags.split(" ")}
      />
      <ProjectWrapper>
        <MainWrapper>
          <MainImageWrapper>
            <MainImage fluid={frontmatter.mainImage.childImageSharp.fluid} />
            <Lines className="lines" number={25} />
          </MainImageWrapper>
          <MainTitle ref={mainTitleRef}>{frontmatter.title}</MainTitle>
          <MainStatus ref={mainStatusRef}>
            <MainStatusHeader>
              {statusTexts[frontmatter.status]}
            </MainStatusHeader>
            <MainStatusLocation>{frontmatter.location}</MainStatusLocation>
          </MainStatus>
        </MainWrapper>
        <MainDescriptionWrapper>
          <MainDescription ref={mainDescRef}>
            {frontmatter.desc}
          </MainDescription>
        </MainDescriptionWrapper>

        {frontmatter.hightlights.map((highlight, index) => {
          contentToRender[i] = (
            <Hightlights
              className={"project-section"}
              key={highlight.firstImageDesc + index}
              {...highlight}
              countFrom={index + 1}
              prev={false}
            />
          );
          i += 2;
        })}
        {frontmatter.fullImage.map((fullImage, index) => {
          contentToRender[j] = (
            <FullImage
              className={"project-section"}
              {...fullImage}
              key={fullImage.desc + index}
              prev={false}
            />
          );
          j += 2;
        })}
        {contentToRender}
        {nextProjectData ? <NextProject {...nextProjectData} /> : ""}
      </ProjectWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    allMarkdownRemark {
      edges {
        next {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        node {
          id
        }
      }
    }
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
