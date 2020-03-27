import React, { useEffect } from "react";
import styled from "styled-components";
import flowerVideo from "src/video/flower.mp4";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";
import { TimelineMax, Power4, Power3 } from "gsap";

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
  left: -36%;
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

const LandingVideoWrapper = styled.div`
  height: 60vh;
  width: 70%;
  max-width: 700px;
  background-color: white;
  border: 5px solid ${({ theme }) => theme.colors.pink};
  box-sizing: content-box;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-width: 10px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40%;
    height: 85vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 92vh;
  }
`;

const LandingVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default () => {
  const videoRef = React.createRef();
  const videoWrapperRef = React.createRef();
  const headerRef = React.createRef();

  useEffect(() => {
    const { current: video } = videoRef;
    const { current: videoWrapper } = videoWrapperRef;
    const { current: header } = headerRef;
    const image = document.querySelector(".landingImage");

    let timeline = new TimelineMax();

    timeline
      .fromTo(
        videoWrapper,
        1.25,
        { y: `-${window.innerHeight}px` },
        { y: 0, duration: 0.75, ease: "back.out(2)" }
      )
      .fromTo(
        videoWrapper,
        0.75,
        { scaleY: 0.01 },
        { scaleY: 1, transformOrigin: "center", ease: Power4 }
      )
      .fromTo(
        videoWrapper,
        0.75,
        { scaleX: 0.015 },
        { scaleX: 1, transformOrigin: "center", ease: Power4 }
      )
      .fromTo(
        videoWrapper,
        0.5,
        { boxShadow: "none", borderWidth: "0px" },
        {
          boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.25)",
          borderWidth: window.innerWidth > 600 ? "10px" : "5px",
          ease: Power4
        },
        "-=0.2"
      )
      .fromTo(video, 0.75, { opacity: 0 }, { opacity: 1, ease: Power3 })
      .fromTo(
        header,
        0.75,
        { opacity: 0 },
        { opacity: 1, ease: Power3 },
        "-=0.5"
      )
      .fromTo(
        header,
        0.4,
        { translateX: "100px" },
        { translateX: 0, ease: Power3 },
        "-=0.5"
      )
      .fromTo(image, 1, { opacity: 0 }, { opacity: 1, ease: Power4 });
  }, []);
  const data = useStaticQuery(graphql`
    query {
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
      <LandingHeader ref={headerRef}>
        Oliwia Czuk - Landscape Engineer
      </LandingHeader>
      <LandingVideoWrapper ref={videoWrapperRef}>
        <LandingVideo
          ref={videoRef}
          loop
          muted
          autoPlay
          src={flowerVideo}
        ></LandingVideo>
      </LandingVideoWrapper>
      <Img className="landingImage" fluid={data.image.childImageSharp.fluid} />
    </LandingWrapper>
  );
};
