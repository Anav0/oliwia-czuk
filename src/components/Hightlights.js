import React from "react";
import styled from "styled-components";
import ImageHightlight from "src/components/ImageHightlight";

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

const Hightlights = props => {
  let firstImage = "";
  let secondImage = "";
  if (props.prev) {
    firstImage = props.firstImage;
    secondImage = props.secondImage;
  } else {
    firstImage = props.firstImage.childImageSharp.fluid;
    secondImage = props.secondImage.childImageSharp.fluid;
  }

  return (
    <HightlightsWrapper className={props.className}>
      <ImageHightlight
        className="firstImage"
        fluid={firstImage}
        desc={props.firstImageDesc}
        number={props.countFrom}
        prev={props.prev}
      />
      <HighlightsDesc>{props.desc}</HighlightsDesc>
      <ImageHightlight
        className="secondImage"
        fluid={secondImage}
        desc={props.secondImageDesc}
        number={props.countFrom + 1}
        prev={props.prev}
      />
    </HightlightsWrapper>
  );
};

export default Hightlights;
