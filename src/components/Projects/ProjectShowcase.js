import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { TimelineMax, Power4 } from "gsap";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const ShowcaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
    height: 60%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 75%;
    height: 50%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 70%;
    height: 65%;
  }
`;

const ProjectTitle = styled.span`
  * {
    font-family: "Sacramento", cursive;
  }
  text-align: center;
  padding: 0.75em;
  height: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    text-align: left;
  }
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.wheat};
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
    text-transform: capitalize;
    transition: all 0.25s ease-in-out;
    text-decoration: none;
    font-size: 2.75rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 3rem;
      padding: 0.5em;
      text-align: left;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 3.5rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 4.5rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      font-size: 5.3rem;
      padding: 0.5em;
    }

    &:hover {
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: ${props => props.bg};
    }

    &.active {
    }
  }

  &:nth-child(odd) {
    place-self: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      place-self: flex-end;
    }
  }

  &:nth-child(even) {
    place-self: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      place-self: flex-start;
    }
  }
`;

const ProjectShowcase = props => {
  const projectsWrapperRef = useRef();
  useEffect(() => {
    const { current: projectsWrapper } = projectsWrapperRef;
    new TimelineMax({ delay: 0.25 }).fromTo(
      projectsWrapper.children,
      1,
      { autoAlpha: 0, ease: Power4 },
      { autoAlpha: 1, stagger: 0.25, ease: Power4 }
    );
  }, []);
  return (
    <ShowcaseWrapper ref={projectsWrapperRef}>
      {props.projects.map(project => (
        <ProjectTitle key={project.id} bg={`url(${project.mainImage})`}>
          <AniLink paintDrip hex={"#FFEDED"} to={project.path}>
            {project.title}
          </AniLink>
        </ProjectTitle>
      ))}
    </ShowcaseWrapper>
  );
};

export default ProjectShowcase;
