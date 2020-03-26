import React from "react";
import styled from "styled-components";

const LinesWrapper = styled.div`
  min-width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.softBlack};
  transform: rotate(-45deg);
`;

const Lines = props => {
  return (
    <LinesWrapper className={props.className}>
      {[...Array(props.number)].map((number, index) => (
        <Line key={`line${index}`}></Line>
      ))}
    </LinesWrapper>
  );
};

export default Lines;
