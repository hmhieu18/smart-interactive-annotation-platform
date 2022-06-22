import { Grid, makeStyles, styled } from "@material-ui/core";
import React from "react";

import { useDatasetStore } from "../../../../stores/index";
import { ENUM_ANNOTATE_STATUS } from "../../../../../../constants/constants";

import SplitButton from "../../../../../../components/SplitButton";

import DoneIcon from "@material-ui/icons/Done";
import HelpIcon from "@material-ui/icons/HelpOutline";
import UnfinishedIcon from "@material-ui/icons/NotInterested";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: "15",
  },
}));

const UpdateStatusButtonPanel = () => {
  const instanceId = useDatasetStore((state) => state.instanceId);
  const updateAnnotateStatusDataInstance = useDatasetStore(
    (state) => state.updateAnnotateStatusDataInstance
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
            <SplitButton
              variant="primary"
              onClick={() =>
                updateAnnotateStatusDataInstance(
                  instanceId,
                  ENUM_ANNOTATE_STATUS.FINSIHED
                )
              }
              text="Mark as finished"
              icon={<DoneIcon />}
            />
          </Grid>{" "}
          <Grid item>
            <SplitButton
              variant="info"
              onClick={() =>
                updateAnnotateStatusDataInstance(
                  instanceId,
                  ENUM_ANNOTATE_STATUS.UNFINISHED
                )
              }
              text="Mark as Unfinished"
              icon={<UnfinishedIcon />}
            />
          </Grid>
          <Grid item>
            <SplitButton
              variant="warning"
              onClick={() =>
                updateAnnotateStatusDataInstance(
                  instanceId,
                  ENUM_ANNOTATE_STATUS.UNCERTAIN
                )
              }
              text="Mark as uncertain"
              icon={<HelpIcon />}
            />{" "}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default UpdateStatusButtonPanel;
