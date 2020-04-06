import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const OfferWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  * {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const OfferIndex = styled.span`
  font-size: 8rem;
  position: absolute;
  transform-origin: bottom left;
  top: -60px;
  right: -20px;
  font-weight: 100;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: -65px;
    right: -45px;
  }
`;

const OfferImage = styled(Img)`
  width: 250px;
  height: 250px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 420px;
    height: 420px;
  }
`;

const OfferDescWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 65%;
    position: absolute;
    left: -30%;
    top: 50%;
    transform: translate(50%, -50%);
  }
`;

const OfferTitle = styled.h2`
  font-size: 2rem;
  margin-top: 1.5rem;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.white};
  color: transparent;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 3.8rem;
  }
`;

const OfferDesc = styled.p`
  font-size: 1.25rem;
  margin-top: 1.5rem;
  font-weight: 500;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const OfferBtn = styled.button`
  font-size: 1.75rem;
  box-shadow: none;
  background: transparent;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.harshPink};
  cursor: pointer;
  margin-top: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const OfferImageIndex = styled.div`
  position: relative;
`;

export default (props) => {
  return (
    <OfferWrapper className="offer">
      <OfferImageIndex>
        <OfferImage fluid={props.mainImage.childImageSharp.fluid} />
        {props.index > 9 ? (
          <OfferIndex className="default-text-shadow">{props.index}</OfferIndex>
        ) : (
          <OfferIndex className="default-text-shadow">{`0${props.index}`}</OfferIndex>
        )}
      </OfferImageIndex>
      <OfferDescWrapper>
        <OfferTitle className="default-text-shadow">{props.title}</OfferTitle>
        <OfferDesc className="default-text-shadow">{props.desc}</OfferDesc>
        <OfferBtn>{props.btnText}</OfferBtn>
      </OfferDescWrapper>
    </OfferWrapper>
  );
};
