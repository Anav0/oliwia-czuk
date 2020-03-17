import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Autoplay from "src/components/Projects/Autoplay";
const ProjectsPage = () => {
  return (
    <Layout>
      <SEO
        title="Projects"
        keywords={[
          "projects",
          "freelancer",
          "landscape",
          "engineer",
          "professional",
          "renovation"
        ]}
      />
      <Autoplay totalTime={3000} stroke={1} size={32} />
    </Layout>
  );
};

export default ProjectsPage;
