import React from "react";
import SEO from "src/components/seo";
import GlobalStyle from "src/styles/global";
import Layout from "src/components/Layout";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <GlobalStyle />
  </Layout>
);

export default IndexPage;
