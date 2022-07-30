import React from "react";
import { makeStyles, SvgIcon } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { useConfirm } from "material-ui-confirm";
import { DEFAULT_ANNOTATION_ATTRS } from "../../../../constants";
import { get } from "lodash";
import EventIcon from "@material-ui/icons/Bookmark";
import { ReactComponent as BBoxIcon } from "../../../../../../static/images/icons/ToolboxIcon/rectangle.svg";

import { ANNOTATION_TYPE } from "../../../../../../constants/constants";

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: "border-box",
    cursor: "pointer",
    justifyContent: "space-between",
  },
  selectedContainer: {
    background: "#c5defc",
    borderRadius: "5px 5px 0px 0px",
  },
  annotationTypeIcon: {
    width: 15,
    height: 15,
  },
  objectId: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: 14,
  },
  divider: {
    background: theme.palette.primary.main,
  },
  infoContainerCollapse: {
    width: "100%",
    justifyContent: "center",
    background: "#c5defc",
    "&.MuiCollapse-entered": {
      borderRadius: "0px 0px 5px 5px",
    },
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));
const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};
const mapAnnotationTypeToIcon = {
  [ANNOTATION_TYPE.BBOX]: BBoxIcon,
  [ANNOTATION_TYPE.EVENT]: EventIcon,
};

const ObjectInfo = (props) => {
  const confirm = useConfirm();
  const classes = useStyles();
  const { isSelected, annotationObject, playerRef, controlsRef, fps } = props;

  const AnnotationTypeIcon = mapAnnotationTypeToIcon[annotationObject.type];

  const { id, properties, label, frameID, confidence } = annotationObject;

  const fillColor = get(
    label,
    "annotationProperties.fill",
    DEFAULT_ANNOTATION_ATTRS.fill
  );
  return (
    <>
      <ListItem
        className={clsx(
          classes.container,
          isSelected && classes.selectedContainer
        )}
        onClick={() => {
          console.log("frameID/fps", frameID / fps);
          playerRef.current.seekTo(Math.round(frameID / fps));
          controlsRef.current.style.visibility = "visible";

          setTimeout(() => {
            controlsRef.current.style.visibility = "hidden";
          }, 1000);
        }}
      >
        <ListItemIcon style={{ alignItems: "center" }}>
          <SvgIcon className={classes.annotationTypeIcon}>
            <AnnotationTypeIcon style={{ color: fillColor }} />
          </SvgIcon>
        </ListItemIcon>

        <ListItemText
          disableTypography
          primary={<div className={classes.objectId}>{label.label}</div>}
          className={classes.objectId}
        />

        <ListItemText
          disableTypography
          primary={
            <div className={classes.objectId}>{format(frameID / fps)}</div>
          }
          className={classes.objectId}
        />
        <ListItemText
          disableTypography
          primary={
            <div className={classes.objectId}>
              {
                confidence == undefined || confidence == 1
                  ? ""
                  : `Conf: ${confidence.toFixed(2)}`
                //get 2 decimal places of confidence
                //.toFixed(2)
              }
            </div>
          }
          className={classes.objectId}
        />
      </ListItem>
    </>
  );
};

export default ObjectInfo;
