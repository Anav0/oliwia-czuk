import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";

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
  font-size: 2rem;
  cursor: pointer;
  font-family: "Srisakdi", cursive;
  transition: opacity 0.25s ease-in-out;
  opacity: 0.55;
  text-transform: capitalize;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 4.25rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3rem;
  }

  &:hover {
    opacity: 1;
  }
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
`;
const MenuImages = styled.div`
  width: 70%;
  height: 70%;
  background-color: white;
  position: relative;
  overflow: hidden;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gatsby-image-wrapper {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
`;
const MenuItems = styled.div`
  width: 100%;
  height: 80%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
  }
`;

const MenuImagesOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.pink};
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
      projectImage: file(relativePath: { eq: "landscape.jpg" }) {
        id
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  function generateTimeline(index) {
    let menuImage = document.querySelectorAll(".menu-image")[index];

    return new TimelineMax({ paused: true }).to(menuImage, 0, { autoAlpha: 1 });
  }

  var menuItems = {
    home: { image: data.homeImage },
    projects: { image: data.projectImage },
    contact: { image: data.contactImage }
  };

  var prevItem = null;
  var currentItem = null;
  var overlayAnimation = null;
  var isBack = false;
  function changeImage(item) {
    prevItem = currentItem;
    currentItem = item;

    if (currentItem === prevItem) return;

    const imageOverlay = document.getElementById("menu-image-overlay");

    if (!overlayAnimation)
      overlayAnimation = new TimelineMax({
        paused: true,
        onReverseComplete: () => {
          overlayAnimation.restart();
        }
      }).fromTo(
        imageOverlay,
        1,
        { skewX: 30, scale: 2 },
        { skewX: 0, xPercent: 100 }
      );

    let currentImageTimeline = menuItems[item].timeline;
    if (prevItem) {
      var prevImageTimeline = menuItems[prevItem].timeline;
    }
    if (overlayAnimation.isActive()) {
      if (overlayAnimation.reversed()) overlayAnimation.play();
      else overlayAnimation.reverse();
    } else {
      if (!overlayAnimation.reversed()) overlayAnimation.reverse();
      else overlayAnimation.play();
    }
  }

  const [isOpen, setIsOpen] = useState(undefined);
  const menuRef = React.createRef();

  useEffect(() => {
    const menuTimeline = new TimelineMax();
    const { current: menu } = menuRef;

    const coverElements = document.querySelectorAll(".menu-cover");

    if (isOpen) animateIn(menu, menuTimeline, coverElements);
    else if (isOpen === false) animateOut(menu, menuTimeline, coverElements);

    Object.keys(menuItems).map((item, index) => {
      menuItems[item].timeline = generateTimeline(index);
    });
  });

  return (
    <>
      <HamburgerWrapper
        onClick={() => setIsOpen(!isOpen)}
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
                {item}
              </MenuItem>
            ))}
          </Menu>
        </MenuItems>
        <MenuImagesWrapper id="menu-image-wrapper">
          <MenuImages>
            {Object.keys(menuItems).map((item, index) => {
              return (
                <Img
                  className="menu-image"
                  key={menuItems[item].image.id}
                  fluid={menuItems[item].image.childImageSharp.fluid}
                />
              );
            })}
            <MenuImagesOverlay id="menu-image-overlay" />
          </MenuImages>
        </MenuImagesWrapper>
      </MenuWrapper>
    </>
  );
}

export default Hamburger;
