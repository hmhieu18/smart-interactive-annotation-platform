import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { find } from "lodash";

import { useAnnotationStore } from "../../../../stores/index";

import ObjectInfo from "./ObjectInfo";

const useStyles = makeStyles((theme) => ({
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
  divider: {
    background: theme.palette.secondary.main,
  },
  listContainer: {
    width: "100%",
    padding: 0,
    background: theme.palette.primary.light,
  },
}));

const ObjectInfoPanel = (props) => {
  const {playerRef, controlsRef, fps} = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const annotationsList = useAnnotationStore((state) => state.annotations);
  const labels = useAnnotationStore((state) => state.labels);

  
  React.useEffect(() => {
    // console.log("annotationsList", annotationsList);
  }, [annotationsList]);

  const objectList = annotationsList.map((obj) => ({
    ...obj,
    label: find(labels, { id: obj.labelID }),
  }));

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

      <Grid container item xs={8} direction="row" alignItems="center">
        <Grid item className="m-0 font-weight-bold text-primary">
          Annotations
        </Grid>
      </Grid>
    </a>
    <Collapse in={isOpen} className="collapse show">
      <List className={classes.listContainer}>
            {objectList.map((obj) => {
              return (
                <ObjectInfo
                  key={obj.id}
                  annotationObject={obj}
                  playerRef={playerRef}
                  controlsRef={controlsRef}
                  fps={fps}
                />
              );
            })}
          </List>
    </Collapse>
  </div>
  );
};

export default ObjectInfoPanel;
