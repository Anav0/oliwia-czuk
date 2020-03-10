import React from "react";
import styled from "styled-components";
import flowerVideo from "src/video/flower.mp4";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";

const LandingWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .landingImage {
    position: absolute !important;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 42%;
    transform: translate(-50%, -50%);

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 75%;
      left: 45%;
      width: 60%;
      top: 45%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: 40%;
      left: 46%;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      width: 50%;
      left: 48%;
      top: 50%;
    }
  }
`;

const LandingHeader = styled.h1`
  font-family: "Srisakdi", cursive;
  font-weight: normal;
  font-size: 1.4rem;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  top: 48.5%;
  left: 10%;
  transform: translate(-50%, 0) rotate(-90deg);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 25%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: 3.5rem;
    left: 28%;
  }
`;

const LandingVideo = styled.video`
  border: 5px solid ${({ theme }) => theme.colors.pink};
  height: 60vh;
  width: 70%;
  object-fit: cover;
  max-width: 700px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-width: 10px;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.25);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40%;
    height: 85vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 92vh;
  }
`;

export default () => {
  const data = useStaticQuery(graphql`
    query Images {
      image: file(relativePath: { eq: "lady-xl.png" }) {
        id
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <LandingWrapper>
      <LandingHeader>Oliwia Czuk - Landscape Engineer</LandingHeader>
      <LandingVideo loop muted autoPlay src={flowerVideo}></LandingVideo>
      <Img className="landingImage" fluid={data.image.childImageSharp.fluid} />
    </LandingWrapper>
  );
};
