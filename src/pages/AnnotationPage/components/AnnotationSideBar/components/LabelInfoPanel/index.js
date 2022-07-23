import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

import { useAnnotationStore } from "../../../../stores/index";

import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";

import LabelInfo from "./LabelInfo";
import EventAnnotationClass from "../../../../../../classes/EventAnnotationClass";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  header: {
    cursor: "pointer",
    background: theme.palette.primary.dark,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },
  titleCount: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    minWidth: 30,
    fontSize: 12,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
  },
  listContainer: {
    width: "100%",
    background: theme.palette.primary.light,
  },
}));

const LabelInfoPanel = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const labels = useAnnotationStore((state) => state.labels);
  const appendAnnotation = useAnnotationStore(
    (state) => state.appendAnnotation
  );

  const handleAddEventAnnotation = (frameID, labelID) => {
    const newEvent= EventAnnotationClass.constructorFromServerData({
      id: null,
      frameID,
      labelID,
    })
    console.log("newEvent", newEvent)
    appendAnnotation(
      newEvent
    );
  };

  return (
    <div className="card shadow mb-4">
    <a
      // href="#collapseCardExample"
      className="d-block card-header py-3"
      data-toggle="collapse"
      role="button"
      aria-expanded="true"
      aria-controls="collapseCardExample"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      {/* <h6 className="m-0 font-weight-bold text-primary">Data List</h6>
    <Grid item className={classes.titleCount}>{dataset.instances}</Grid> */}
      <Grid container item xs={8} direction="row" alignItems="center">
        <Grid item className="m-0 font-weight-bold text-primary">
          Labels
        </Grid>
        <Grid item className={classes.titleCount}>
          {labels.length}
        </Grid>
      </Grid>
    </a>
    <Collapse in={isOpen} className="collapse show">
      <List className={classes.listContainer}>
            {labels.map((obj) => {
              return (
                <LabelInfo
                  key={obj.id}
                  labelObject={obj}
                  handleAddEventAnnotation={handleAddEventAnnotation}
                />
              );
            })}
          </List>
    </Collapse>
  </div>
  );
};

export default LabelInfoPanel;
