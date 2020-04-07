import React from "react";
import styled from "styled-components";

const CarouselProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Progressbar = styled.div`
  width: 100%;
  height: 2px;
  position: relative;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 0 2rem;
  &:after {
    width: ${(props) => `${props.value}%`};
    background-color: ${({ theme }) => theme.colors.darkPink};
    transition: width 1s ease-in-out;
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    height: 100%;
  }
`;

const ProgressNumber = styled.span`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.white};
`;

export default (props) => {
  return (
    <CarouselProgressWrapper className={props.className}>
      <ProgressNumber className="default-text-shadow">01</ProgressNumber>
      <Progressbar value={(props.active / props.total) * 100}></Progressbar>
      <ProgressNumber className="default-text-shadow">
        {props.total < 9 ? `0${props.total}` : props.total}
      </ProgressNumber>
    </CarouselProgressWrapper>
  );
};
