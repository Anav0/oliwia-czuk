import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Landing from "src/components/Landing";
import Offers from "src/components/Offers";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[]} />
      <Landing />
      <Offers />
    </Layout>
  );
};

export default IndexPage;
