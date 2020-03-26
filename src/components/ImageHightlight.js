import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const ImageHightlightWrapper = styled.div`
  width: 100%;
  height: 330px;
  padding-right: 35px;
  position: relative;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 450px;
    max-width: 390px;
  }
`;
const HighlightImage = styled(Img)`
  width: 100%;
  height: 100%;
  box-shadow: -5px 4px 10px rgba(0, 0, 0, 0.5);
`;

const PreviewHighlightImage = styled.img`
  width: 100%;
  height: 100%;
  box-shadow: -5px 4px 10px rgba(0, 0, 0, 0.5);
`;

const HightlightImageDesc = styled.div`
  transform: rotate(-90deg) translate(100%, 0);
  transform-origin: right bottom;
  overflow: visible;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
  }
  span,
  strong {
    font-size: 1.15rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 1.43rem;
    }
  }
  strong {
    margin-right: 5px;
  }
`;

const ImageHightlight = props => {
  return (
    <ImageHightlightWrapper className={props.className}>
      {props.prev ? (
        <PreviewHighlightImage src={props.fluid} />
      ) : (
        <HighlightImage fluid={props.fluid} />
      )}
      <HightlightImageDesc>
        <strong>{props.number}</strong>
        <span>{props.desc}</span>
      </HightlightImageDesc>
    </ImageHightlightWrapper>
  );
};

export default ImageHightlight;
