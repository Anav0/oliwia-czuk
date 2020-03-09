import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import breakpoints from "src/styles/breakpoints";

const MyGrid = styled.div``;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={breakpoints}>
      <MyGrid>{children}</MyGrid>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
