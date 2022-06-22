import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TopNav from "./components/TopNav/index";
import Toolbox from "./components/Toolbox/index";
import AnnotationSideBar from "./components/AnnotationSideBar/index";
import { useDatasetStore, useAnnotationStore } from "./stores/index";
import { useParams } from "react-router";
import useQuery from "../../utils/useQuery";
import annotationEventCenter from "./EventCenter";
import "../../assets/scss/sb-admin-2.scss";
import RenderComponent from './components/Stage/index'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "column",
    overflow: "hidden",
  },
  annotationWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    flex: 1,
    overflow: "hidden",
  },
  annotatorContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowX: "hidden",
    height: "100%",
    boxSizing: "border-box",
    // paddingBottom: 10,
    background: theme.palette.primary.light,
  },
  toolboxContainer: {
    height: "100%",
  },
  sidebarWrapper: {
    width: "25%",makeStyles, makeStyles, 
  },
}));

const AnnotationPage = (props) => {
  const query = useQuery();
  const classes = useStyles();
  const { datasetId } = useParams();

  const instanceIdQuery = query.get("instance_id") || "";

  const instanceId = useDatasetStore((state) => state.instanceId);
  const getDatasetInfo = useDatasetStore((state) => state.getDatasetInfo);
  const getDataInstances = useDatasetStore((state) => state.getDataInstances);
  const setInstanceId = useDatasetStore((state) => state.setInstanceId);
  const loadAnnotationLabels = useAnnotationStore(state => state.loadAnnotationLabels)
  const loadAnnotationObjects = useAnnotationStore(state => state.loadAnnotationObjects)
  const loadAnnotations = useAnnotationStore(state => state.loadAnnotations)

  useEffect(() => {
    if (datasetId) {
      getDatasetInfo(datasetId);
      loadAnnotationLabels(datasetId)

    }
  }, [datasetId]);

  useEffect(() => {
    getDataInstances(datasetId);
  }, [datasetId]);

  useEffect(() => {
    setInstanceId(instanceIdQuery);
  }, [instanceIdQuery]);

  useEffect(() => {
    if (instanceId) {
      loadAnnotationObjects(instanceId);
      loadAnnotations(instanceId);
    }
  }, [instanceId]);

  return (
    <div className={classes.root}>
      <TopNav />
      <div className={classes.annotationWrapper}>
        <div className={classes.sidebarWrapper}>
          <AnnotationSideBar />
        </div>

        <div className={classes.annotatorContainer}>
           <RenderComponent/>
          {/*<PropagationControl/>
          <PlayControl/>
          <ModeController/>
          <KeyboardHandler /> 
          <Prediction /> */}
        </div>
        <div className={classes.toolboxContainer}>
          <Toolbox eventCenter={annotationEventCenter} />
        </div>
      </div>
    </div>
  );
};

export default AnnotationPage;
