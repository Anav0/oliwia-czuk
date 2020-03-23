import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const FullImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

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

const Image = styled(Img)`
  height: 100%;
  width: 100%;
  z-index: 4;
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
  return (
    <FullImageWrapper className={props.className}>
      <Overlay></Overlay>
      <Image fluid={props.image.childImageSharp.fluid}></Image>
      <ImageDesc>{props.desc}</ImageDesc>
    </FullImageWrapper>
  );
};

export default FullImage;
