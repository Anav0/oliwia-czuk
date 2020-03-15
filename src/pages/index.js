import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Landing from "src/components/Landing";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[]} />
      <Landing />
    </Layout>
  );
};

export default IndexPage;
