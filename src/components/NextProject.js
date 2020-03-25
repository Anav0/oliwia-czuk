import React from "react";
import styled from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import colors from "src/styles/colors";

const NextProjectWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkerPink};
  a {
    font-size: 2.5rem;
    font-family: "Advent Pro", sans-serif;
    font-weight: 700;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.softBlack};
    color: transparent;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.wheat};
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 6rem;
      -webkit-text-stroke-width: 3px;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 6.8rem;
    }
  }
`;

const NextProject = props => {
  return (
    <NextProjectWrapper>
      <AniLink paintDrip hex={colors.wheat} to={props.slug}>
        {props.title}
      </AniLink>
    </NextProjectWrapper>
  );
};

export default NextProject;
