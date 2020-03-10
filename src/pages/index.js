import React from "react";
import SEO from "src/components/seo";
import GlobalStyle from "src/styles/global";
import Layout from "src/components/Layout";
import Logo from "src/images/logo.svg";
import Landing from "src/components/Landing";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <GlobalStyle />
      <Logo className="landing-logo" />
      <Landing />
    </Layout>
  );
};

export default IndexPage;
