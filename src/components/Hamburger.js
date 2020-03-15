import React, { useState } from "react";
import styled from "styled-components";
import { TimelineMax, Power4 } from "gsap";
import Img from "gatsby-image";
import { graphql, useStaticQuery, Link } from "gatsby";
import TransitionLink from "gatsby-plugin-transition-link";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const HamburgerWrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 20px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
  z-index: 10;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 25px;
    top: 56px;
    right: 50px;
  }
  &.open {
    &:after {
      transform: scaleX(0.65);
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: 10px;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.softBlack};
  }
  &:after {
    transition: transform 0.3s ease-in-out;
    transform-origin: top left;
    content: "";
    position: absolute;
    top: 0px;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.softBlack};
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  opacity: 0;
`;

const Menu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const MenuItem = styled.h1`
  cursor: pointer;
  transition: opacity 0.25s ease-in-out;
  opacity: 0.55;
  text-transform: capitalize;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 2rem;
    font-family: "Srisakdi", cursive;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 4.25rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 3rem;
    }
  }
  &:hover {
    opacity: 1;
  }
`;
const MenuImagesContent = styled.div`
  width: 100%;
  height: 100%;
`;
const MenuCover = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.bg};
  z-index: 8;
  opacity: 0;
`;

const MenuImagesWrapper = styled.div`
  height: 100%;
  width: 50%;
  background-color: white;
  display: none;
  position: relative;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gatsby-image-wrapper {
    object-fit: cover;
    width: 60%;
    height: 60%;
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MenuItems = styled.div`
  width: 100%;
  height: 80%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
  }
`;

function animateIn(menu, timeline, coverElements) {
  timeline
    .to(coverElements, 0, { opacity: 1 })
    .fromTo(
      coverElements,
      0.5,
      { y: "-100%", x: "100%" },
      { y: 0, x: 0, stagger: 0.2 }
    )
    .fromTo(menu, 0.5, { opacity: 0 }, { opacity: 1 });
}

function animateOut(menu, timeline, coverElements) {
  timeline
    .fromTo(menu, 0.5, { opacity: 1 }, { opacity: 0 })
    .fromTo(
      Array.from(coverElements).reverse(),
      0.5,
      { y: 0, x: 0 },
      { y: "-100%", x: "100%", stagger: 0.2 }
    );
}

const covers = ["#FFEDED", "#FFFAFA", "#FFF3DB"];

function Hamburger() {
  const data = useStaticQuery(graphql`
    query {
      homeImage: file(relativePath: { eq: "home-image.png" }) {
        id
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      contactImage: file(relativePath: { eq: "contact-image.jpg" }) {
        id
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      projectImage: file(relativePath: { eq: "project-image.jpg" }) {
        id
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  var menuItems = {
    home: { image: data.homeImage, link: "/" },
    projects: { image: data.projectImage, link: "projects" },
    contact: { image: data.contactImage, link: "contact" }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(
    menuItems[Object.keys(menuItems)[0]].image.childImageSharp.fluid
  );
  const menuRef = React.createRef();
  const imageRef = React.createRef();

  function changeImage(item) {
    const { current: image } = imageRef;
    new TimelineMax({
      repeat: 1,
      yoyo: true,
      onRepeat: () => {
        setDisplayedImage(menuItems[item].image.childImageSharp.fluid);
      }
    }).fromTo(
      image,
      0.5,
      { opacity: 1, ease: Power4 },
      { opacity: 0, ease: Power4 }
    );
  }
  function toggleMenu() {
    setIsOpen(!isOpen);
    const menuTimeline = new TimelineMax();
    const { current: menu } = menuRef;
    const coverElements = document.querySelectorAll(".menu-cover");
    if (!isOpen) animateIn(menu, menuTimeline, coverElements);
    else animateOut(menu, menuTimeline, coverElements);
  }
  return (
    <>
      <HamburgerWrapper
        onClick={() => toggleMenu()}
        className={isOpen ? "open" : ""}
      ></HamburgerWrapper>
      {covers.map((color, i) => (
        <MenuCover className="menu-cover" key={color + i} bg={color} />
      ))}
      <MenuWrapper ref={menuRef}>
        <MenuItems>
          <Menu>
            {Object.keys(menuItems).map((item, index) => (
              <MenuItem
                onMouseEnter={() => changeImage(item)}
                key={item + index}
              >
                <AniLink paintDrip hex={covers[1]} to={menuItems[item].link}>
                  {item}
                </AniLink>
              </MenuItem>
            ))}
          </Menu>
        </MenuItems>
        <MenuImagesWrapper>
          <MenuImagesContent ref={imageRef}>
            <Img fluid={displayedImage} />
          </MenuImagesContent>
        </MenuImagesWrapper>
      </MenuWrapper>
    </>
  );
}

export default Hamburger;
