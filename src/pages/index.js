import React, {useEffect, useRef, useState} from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Landing from "src/components/Landing";
import Offers from "src/components/Offers";
import { graphql } from "gatsby";
import { TimelineMax,TweenMax, Power4 } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import styled from "styled-components";
import Colors from "src/styles/colors";

const ContentWrapper = styled.div`
  cursor: ${(props)=>props.showCursor ? "inherit" : "none"};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 200vh;
    margin-top: 75vh;
  }
`;
const Overlay = styled.div`
  position: fixed;
  left: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  transform: translateX("100%");
  background-color: ${({ theme }) => theme.colors.pink};
`;

const Cursor = styled.div`
  width:8rem;
  height:8rem;
  border: 0.35rem solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 15px ${({ theme }) => theme.colors.darkPink};
  border-radius: 50%;
  display:flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  position:fixed;
  left:0;
  top:0;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  z-index: 7;
  font-size:2rem;
  cursor:none;
  pointer-events: none;
`

const IndexPage = ({ location, data }) => {
  const wrapperRef = useRef();
  const landingRef = useRef();
  const offersRef = useRef();
  const overlayRef = useRef();
  const cursorRef = useRef();
  const cursorAttr = useRef();

  let [innerWidth, setInnerWidth] = useState(0);

  function moveCursor(cursor,clientY,clientX){
    cursor.setAttribute("style",`top: ${clientY-cursor.clientWidth/2}px; left: ${clientX-cursor.clientWidth/2}px; ${cursorAttr.current}`)
  }
  function changeCursorToSwipe(cursor){
    cursor.innerText = "swipe";
    cursorAttr.current = `color: ${Colors.darkPink}; border-color: ${Colors.darkPink}; transform: scale(0.75);`
  }
  function changeCursorToScroll(cursor){
    cursor.innerText = "scroll";
    cursorAttr.current = `color: ${Colors.white}; border-color: ${Colors.white}; transform: scale(1);`
  }

  useEffect(() => {
    setInnerWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
    if (innerWidth < 1024) return;
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
    const { current: wrapper } = wrapperRef;
    const { current: landing } = landingRef;
    const { current: offers } = offersRef;
    const { current: overlay } = overlayRef;
    const { current: cursor } = cursorRef;
    offers.addEventListener("mouseenter",(e)=>changeCursorToSwipe(cursor))
    offers.addEventListener("mouseleave",(e)=>changeCursorToScroll(cursor))
    window.addEventListener("mousemove",(e)=>
      moveCursor(cursor,e.clientY,e.clientX)
    )
    window.addEventListener("touchmove",(e)=>
        moveCursor(cursor,e.touches[0].clientY,e.touches[0].clientX)
    )

    let timeline = new TimelineMax();
    let controller = new ScrollMagic.Controller();

    timeline
      .fromTo(landing, 8, { autoAlpha: 1 }, { autoAlpha: 0, ease: Power4 })
      .to(overlay, 6, { left: "0",ease: Power4 })
      .to(overlay, 6, { left: "-100%", delay: 4,ease: Power4 })
      .fromTo(offers, 8, { autoAlpha: 0 }, { autoAlpha: 1,ease: Power4 });

    new ScrollMagic.Scene({
      triggerElement: wrapper,
      duration: "150%",
    })
      .setTween(timeline)
      .addTo(controller);
  }, [innerWidth]);
  return (
    <Layout location={location}>
      <SEO title="Strona główna" keywords={[]} />
      {
        innerWidth > 768 ? (<Cursor ref={cursorRef}>
        scroll
        </Cursor>):""
      }

      <ContentWrapper showCursor={innerWidth <= 768} ref={wrapperRef}>
        <Overlay ref={overlayRef} />
        <Landing ref={landingRef} />
        <Offers ref={offersRef} data={data} />
      </ContentWrapper>
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
