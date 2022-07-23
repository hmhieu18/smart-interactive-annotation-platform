import { Grid, makeStyles, styled } from "@material-ui/core";
import React from "react";

import { useDatasetStore, useAnnotationStore } from "../../../../stores/index";
import { ENUM_ANNOTATE_STATUS } from "../../../../../../constants/constants";

import IconButton from "../../../../../../components/IconButton";

import DoneIcon from "@material-ui/icons/Done";
import HelpIcon from "@material-ui/icons/HelpOutline";
import UnfinishedIcon from "@material-ui/icons/NotInterested";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: "15",
    padding: "10",
  },
}));

const StatusButtonsList = () => {
  const instanceId = useDatasetStore((state) => state.instanceId);
  const updateAnnotateStatusDataInstance = useDatasetStore(
    (state) => state.updateAnnotateStatusDataInstance
  );
  const annotationsList = useAnnotationStore((state) => state.annotations);
  const updateAnnotations = useAnnotationStore(
    (state) => state.updateAnnotations
  );
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {instanceId && (
        <Grid
          container
          direction="column"
          item
          xs={12}
          spacing={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item>
            <IconButton
              variant="primary"
              onClick={() => {
                updateAnnotateStatusDataInstance(
                  instanceId,
                  ENUM_ANNOTATE_STATUS.FINSIHED
                );
                updateAnnotations(instanceId, annotationsList);
              }}
              text="Mark as finished"
              icon={<DoneIcon />}
            />
          </Grid>{" "}
          <Grid item>
            <IconButton
              variant="info"
              onClick={() => {
                updateAnnotateStatusDataInstance(
                  instanceId,
                  ENUM_ANNOTATE_STATUS.UNFINISHED
                );
                updateAnnotations(instanceId, annotationsList);
              }}
              text="Mark as Unfinished"
              icon={<UnfinishedIcon />}
            />
          </Grid>
          <Grid item>
            <IconButton
              variant="warning"
              onClick={() => {
                updateAnnotateStatusDataInstance(
                  instanceId,
                  ENUM_ANNOTATE_STATUS.UNCERTAIN
                );
                updateAnnotations(instanceId, annotationsList);
              }}
              text="Mark as uncertain"
              icon={<HelpIcon />}
            />{" "}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default StatusButtonsList;
