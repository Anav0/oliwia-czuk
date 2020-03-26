import React from "react";
import { ProjectTemplate } from "src/pages/project";

const ProjectPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  return <ProjectTemplate data={data} />;
};

export default ProjectPreview;
