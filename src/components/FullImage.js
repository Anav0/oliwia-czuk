import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { TweenMax, TimelineMax, Power4 } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

const FullImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 100vh;
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  z-index: 5;
`;
const RevealOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: whitesmoke;
  z-index: 7;
`;
const Image = styled(Img)`
  height: 100%;
  width: 100%;
  z-index: 4;
  object-fit: cover;
`;

const PrevImage = styled.img`
  height: 100%;
  width: 100%;
  z-index: 4;
  object-fit: cover;
`;

const ImageDesc = styled.p`
  z-index: 6;
  position: absolute;
  bottom: 20px;
  left: 10px;
  color: white;
  width: 80%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.7rem;
    bottom: 40px;
    left: 40px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1.7rem;
    bottom: 40px;
    left: 40px;
    width: 45%;
  }
`;

const FullImage = props => {
  const wrapperRef = useRef();
  const revealOverlayRef = useRef();
  const imageDescRef = useRef();

  ScrollMagicPluginGsap(ScrollMagic, TimelineMax);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const { current: wrapper } = wrapperRef;
    const { current: revealOverlay } = revealOverlayRef;
    const { current: imageDesc } = imageDescRef;

    let timeline = new TimelineMax();
    let controller = new ScrollMagic.Controller();

    timeline
      .fromTo(
        revealOverlay,
        3,
        { skewX: props.animateRight ? "-45deg" : "45deg", scale: 2 },
        { skewX: 0, xPercent: props.animateRight ? -250 : 250, ease: Power4 }
      )
      .fromTo(
        imageDesc,
        1,
        { autoAlpha: 0, x: "-25px", y: "25px" },
        { autoAlpha: 1, x: 0, y: 0 },
        "-=2"
      );

    new ScrollMagic.Scene({
      triggerElement: wrapper
    })
      .setTween(timeline)
      .addTo(controller);
  }, []);

  return (
    <FullImageWrapper ref={wrapperRef} className={props.className}>
      <Overlay></Overlay>
      {window.innerWidth >= 768 ? (
        <RevealOverlay ref={revealOverlayRef}></RevealOverlay>
      ) : (
        ""
      )}

      {props.image.childImageSharp ? (
        <Image fluid={props.image.childImageSharp.fluid}></Image>
      ) : (
        <PrevImage src={props.image} />
      )}

      <ImageDesc ref={imageDescRef}>{props.desc}</ImageDesc>
    </FullImageWrapper>
  );
};

export default FullImage;
