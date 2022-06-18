import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import ProjectInfo from "./components/ProjectInfo/index";
import DatasetList from "./components/DatasetList/index";

import useProjectInfoStore from "./store";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const ProjectDetailPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = React.useState(0);

  const isLoading = useProjectInfoStore((state) => state.isLoading);
  const getProjectInfo = useProjectInfoStore((state) => state.getProjectInfo);

  React.useEffect(() => {
    getProjectInfo(projectId);
  }, []);

  const handleChangeIndex = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={classes.root}>
      <Loading isLoading={isLoading} />
      <ProjectInfo
        useStore={useProjectInfoStore}
      />
      <DatasetList useStore={useProjectInfoStore} />
    </div>
  );
};

export default ProjectDetailPage;
