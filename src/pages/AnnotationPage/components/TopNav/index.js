import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Fullscreen from "@material-ui/icons/Fullscreen";
import { useParams } from "react-router";

import DataInfo from "./components/DataInfo/index";
import SaveStatus from "./components/SaveStatus/index";
import useQuery from "../../../../utils/useQuery";
import { useGeneralStore, useDatasetStore } from "../../stores/index";

const useStyles = makeStyles((theme) => ({
  topNavWrapper: {
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 55,
    paddingLeft: 20,
    paddingRight: 20,
    background: theme.palette.primary.darker,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  centerSection: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  modal: {
    width: 500,
    padding: 20,
    marginTop: 100,
    margin: "auto",
  },
  roundButton2: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.palette.error.main,
    marginRight: 20,
  },
  fullScreenButton: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.palette.primary.light,
    marginRight: 20,
  },
  closeIcon: { backgroundColor: theme.palette.primary.light, marginRight: 20 },
}));

const TopNav = (props) => {
  const classes = useStyles();
  const { datasetId } = useParams();
  const query = useQuery();
  const page = JSON.parse(query.get("page") || 1);
  const isPlayMode = useGeneralStore((state) => state.isPlayMode);
  const setIsPlayMode = useGeneralStore((state) => state.setIsPlayMode);
  const videoId = useDatasetStore((state) => state.instanceId);

  return (
    <div className={classes.topNavWrapper}>
      <div className={classes.leftSection}>
        <DataInfo />
        <SaveStatus></SaveStatus>
      </div>
      <div className={classes.rightSection}>
        {videoId && (
          <IconButton
            onClick={() => {
              setIsPlayMode(true);
            }}
            className={classes.fullScreenButton}
          >
            <Fullscreen color={classes.closeIcon} />
          </IconButton>
        )}
        <IconButton
          href={`/datasets/dataset=${datasetId}?page=${1}`}
          className={classes.roundButton2}
        >
          <CloseIcon color={classes.closeIcon} />
        </IconButton>
      </div>
    </div>
  );
};

export default TopNav;
