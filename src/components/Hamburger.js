import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TimelineMax } from "gsap";

const HamburgerWrapper = styled.div`
  position: absolute;
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

const Menu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px 0;
  opacity: 0;
`;

const MenuItem = styled.h1`
  font-size: 2rem;
  cursor: pointer;
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

function animateIn(menu, timeline, coverElements) {
  timeline
    .to(coverElements, 0, { opacity: 1 })
    .fromTo(
      coverElements,
      0.5,
      { y: "-100%", x: "100%" },
      { y: 0, x: 0, stagger: 0.25 }
    )
    .fromTo(menu, 0.25, { opacity: 0 }, { opacity: 1 });
}

function animateOut(menu, timeline, coverElements) {
  timeline
    .fromTo(menu, 0.25, { opacity: 1 }, { opacity: 0 })
    .fromTo(
      Array.from(coverElements).reverse(),
      0.5,
      { y: 0, x: 0 },
      { y: "-100%", x: "100%", stagger: 0.25 }
    );
}

const covers = ["#FFEDED", "#FFFAFA", "#FFF3DB"];

function Hamburger() {
  const [isOpen, setIsOpen] = useState(undefined);
  const menuRef = React.createRef();
  useEffect(() => {
    const { current: menu } = menuRef;
    let timeline = new TimelineMax();
    const coverElements = document.querySelectorAll(".menu-cover");
    if (isOpen) animateIn(menu, timeline, coverElements);
    else if (isOpen === false) animateOut(menu, timeline, coverElements);
  });
  return (
    <>
      <HamburgerWrapper
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "open" : ""}
      ></HamburgerWrapper>
      {covers.map((color, i) => (
        <MenuCover className="menu-cover" key={color} bg={color} />
      ))}
      <Menu ref={menuRef}>
        <MenuItem>Home</MenuItem>
        <MenuItem>Projects</MenuItem>
        <MenuItem>Contact</MenuItem>
      </Menu>
    </>
  );
}

export default Hamburger;
