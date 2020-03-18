import React from "react";
import SEO from "src/components/seo";
import Layout from "src/components/Layout";
import Autoplay from "src/components/Projects/Autoplay";
import styled from "styled-components";

const ProjectsWrapper = styled.div``;

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
      <ProjectsWrapper>
        <Autoplay
          totalTime={5000}
          stroke={1}
          size={32}
          onTick={secondsLeft => console.log(`End in ${secondsLeft}`)}
          onRestart={() => console.log("restart")}
          autoReset={true}
        />
      </ProjectsWrapper>
    </Layout>
  );
};

export default ProjectsPage;
