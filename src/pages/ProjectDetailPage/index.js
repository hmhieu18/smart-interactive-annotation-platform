import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Loading from "../../components/Loading";

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
      <DatasetList useStore={useProjectInfoStore} />
    </div>
  );
};

export default ProjectDetailPage;
