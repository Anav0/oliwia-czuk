import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import breakpoints from "src/styles/breakpoints";
import colors from "src/styles/colors";
import Logo from "src/images/logo.svg";
import Hamburger from "src/components/Hamburger";
import GlobalStyle from "src/styles/global";

const global = {
  breakpoints,
  colors
};

const MyGrid = styled.div`
  min-height: 100vh;
  .landing-logo {
    width: 25px;
    height: auto;
    position: fixed;
    left: 20px;
    top: 30px;
    z-index: 10;
    path {
      fill: ${({ theme }) => theme.colors.softBlack};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 48px;
      left: 30px;
      top: 30px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: 55px;
      left: 50px;
      top: 30px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      width: 64px;
      left: 60px;
      top: 40px;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={global}>
      <GlobalStyle />
      <MyGrid>
        <Hamburger />
        <Logo className="landing-logo" />
        {children}
      </MyGrid>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
