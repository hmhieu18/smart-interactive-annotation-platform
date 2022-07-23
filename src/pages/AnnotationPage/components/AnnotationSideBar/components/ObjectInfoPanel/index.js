import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { find } from "lodash";

import { useAnnotationStore } from "../../../../stores/index";

import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";

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
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const selectedAnnotationId = useAnnotationStore(
    (state) => state.selectedAnnotationId
  );
  const setSelectedAnnotationId = useAnnotationStore(
    (state) => state.setSelectedAnnotationId
  );
  const annotationsList = useAnnotationStore((state) => state.annotations);
  const deleteAnnotation = useAnnotationStore(
    (state) => state.deleteAnnotation
  );
  const labels = useAnnotationStore((state) => state.labels);
  const setAnnotationLabel = useAnnotationStore(
    (state) => state.setAnnotationLabel
  );
  
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
        <Grid item className={classes.titleCount}>
          {annotationsList.length}
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
                  isSelected={obj.id === selectedAnnotationId}
                  labels={labels}
                  setSelectedObjectId={setSelectedAnnotationId}
                  setAnnotationObjectLabel={setAnnotationLabel}
                  deleteAnnotationObject={deleteAnnotation}
                />
              );
            })}
          </List>
    </Collapse>
  </div>
    // <Grid container>
    //   <Grid
    //     container
    //     item
    //     xs={12}
    //     direction="row"
    //     alignItems="center"
    //     className={classes.header}
    //     onClick={() =>
    //       setIsOpen((isOpen) => {
    //         if (isOpen) setSelectedAnnotationId(null);
    //         return !isOpen;
    //       })
    //     }
    //   >
    //     <Grid container item direction="row" alignItems="center" xs={2}>
    //       {isOpen ? (
    //         <ArrowDownIcon color="secondary" />
    //       ) : (
    //         <ArrowRightIcon color="secondary" />
    //       )}
    //     </Grid>
    //     <Grid container item xs={8} direction="row" alignItems="center">
    //       <Grid item className={classes.title}>
    //         Objects
    //       </Grid>
    //       <Grid item className={classes.titleCount}>
    //         {annotationsList.length}
    //       </Grid>
    //     </Grid>
    //     <Grid container item xs={2} justifyContent="flex-start">
    //       {/* <Divider orientation="vertical" flexItem className={classes.divider} /> */}
    //     </Grid>
    //   </Grid>
    //   <Grid container item xs={12}>
    //     <Collapse
    //       in={isOpen || selectedAnnotationId}
    //       className={classes.listContainer}
    //     >

    //     </Collapse>
    //   </Grid>
    // </Grid>
  );
};

export default ObjectInfoPanel;
