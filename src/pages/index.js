import React from "react";
import SEO from "src/components/seo";
import GlobalStyle from "src/styles/global";
import Layout from "src/components/Layout";
import Logo from "src/images/logo.svg";
import Landing from "src/components/Landing";
import Hamburger from "src/components/Hamburger";
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <GlobalStyle />
      <Hamburger />
      <Logo className="landing-logo" />
      <Landing />
    </Layout>
  );
};

export default IndexPage;
