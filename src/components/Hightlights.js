import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ImageHightlight from "src/components/ImageHightlight";
import { TweenMax, TimelineMax, Power4 } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { scaleAnimation } from "src/animations";

const HightlightsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 40px 20px;
    margin: 0 20px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 75%;
    width: 100%;
    grid-gap: 60px;
  }
  .firstImage {
    grid-column: 1/2;
    grid-row: 1/2;
    place-self: center;
  }
  .secondImage {
    grid-column: 2/3;
    grid-row: 2/3;
    place-self: center;
  }
`;

const HighlightsDesc = styled.p`
  margin: 100px 0;
  line-height: 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: 1/2;
    grid-row: 2/3;
    max-width: 75%;
    place-self: start center;
    font-size: 1.7rem;
    line-height: 140%;
    max-width: 390px;
  }
`;

const Hightlights = (props) => {
  const secondImageRef = useRef();
  const firstImageRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

    if (window.innerWidth < 768) return;
    const { current: firstImage } = firstImageRef;
    const { current: secondImage } = secondImageRef;
    const { current: wrapper } = wrapperRef;

    let timeline = new TimelineMax();
    let controller = new ScrollMagic.Controller();

    timeline
      .add(scaleAnimation(wrapper.children, 0.5, 0.05, 0.25))
      .add(scaleAnimation(firstImage.children, 0.75, 0.2, 0.25))
      .add(scaleAnimation(secondImage.children, 0.75, 0.2, 0.25));

    new ScrollMagic.Scene({
      triggerElement: wrapper,
      offset: -300,
    })
      .setTween(timeline)
      .addTo(controller);
  }, []);

  return (
    <HightlightsWrapper ref={wrapperRef} className={props.className}>
      <ImageHightlight
        className="firstImage"
        fluid={props.firstImage}
        desc={props.firstImageDesc}
        number={props.countFrom}
        ref={firstImageRef}
      />
      <HighlightsDesc>{props.desc}</HighlightsDesc>
      <ImageHightlight
        className="secondImage"
        fluid={props.secondImage}
        desc={props.secondImageDesc}
        number={props.countFrom + 1}
        ref={secondImageRef}
      />
    </HightlightsWrapper>
  );
};

export default Hightlights;
