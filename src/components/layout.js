import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import breakpoints from "src/styles/breakpoints";
import colors from "src/styles/colors";

const global = {
  breakpoints,
  colors
};
const MyGrid = styled.div`
  .landing-logo {
    width: 25px;
    height: auto;
    position: absolute;
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
      <MyGrid>{children}</MyGrid>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
