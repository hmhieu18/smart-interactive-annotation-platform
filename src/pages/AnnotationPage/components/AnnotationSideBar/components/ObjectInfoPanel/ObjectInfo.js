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
import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import EventIcon from "@material-ui/icons/Bookmark";
import { ReactComponent as BBoxIcon } from "../../../../../../static/images/icons/ToolboxIcon/rectangle.svg";
// import { ReactComponent as EventIcon } from "../../../../../../static/images/icons/ToolboxIcon/bookmark.svg";
// import { ReactComponent as MaskIcon } from "../../../../../../static/images/icons/ToolboxIcon/paintbrush.svg";

import { ANNOTATION_TYPE } from "../../../../../../constants/constants";

import LabelSelection from "./LabelSelection";

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: "border-box",
    cursor: "pointer",
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
    fontSize: 10,
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

const mapAnnotationTypeToIcon = {
  [ANNOTATION_TYPE.BBOX]: BBoxIcon,
  [ANNOTATION_TYPE.EVENT]: EventIcon,
};

const ObjectInfo = (props) => {
  const confirm = useConfirm();
  const classes = useStyles();
  const {
    isSelected,
    annotationObject,
    labels,
    setSelectedObjectId,
    deleteAnnotationObject,
    toggleVisibility,
    setAnnotationObjectLabel,
  } = props;
  const handleDeleteAnnotationObject = (e) => {
    e.stopPropagation();
    confirm({
      title: "Delete annotation object",
      description: `This action can't be undone and will delete this object and associated annotations.`,
    }).then(() => {
      deleteAnnotationObject(annotationObject.id);
    });
  };
  React.useEffect(() => {
    console.log("annotationObject.type", annotationObject.type);
  });
  const AnnotationTypeIcon = mapAnnotationTypeToIcon[annotationObject.type];

  const { id, properties, label, frameID } = annotationObject;

  const fillColor = get(
    label,
    "annotationProperties.fill",
    DEFAULT_ANNOTATION_ATTRS.fill
  );
  const handleChangeLabel = (newLabel) => {
    if (newLabel) {
      setAnnotationObjectLabel(id, newLabel.id);
    } else {
      setAnnotationObjectLabel(id, "");
    }
  };

  return (
    <>
      <ListItem
        className={clsx(
          classes.container,
          isSelected && classes.selectedContainer
        )}
        onClick={() => {
          if (isSelected) {
            setSelectedObjectId(null);
          } else {
            setSelectedObjectId(annotationObject.id);
          }
        }}
      >
        <ListItemIcon style={{ alignItems: "center" }}>
          {isSelected ? (
            <ArrowDownIcon color="primary" fontSize="small" />
          ) : (
            <ArrowRightIcon color="primary" fontSize="small" />
          )}
          <SvgIcon className={classes.annotationTypeIcon}>
            <AnnotationTypeIcon style={{ color: fillColor }} />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<div className={classes.objectId}>Frame: {frameID} | {label.label}</div>}
          className={classes.objectId}
        />
        {/* <ListItemText
          disableTypography
          primary={<div className={classes.objectId}>ID: {id}</div>}
          className={classes.objectId}
        /> */}
        {/* <ListItemText
          disableTypography
          primary={<div className={classes.objectId}>Label: {label.label}</div>}
          className={classes.objectId}
        /> */}

        <ListItemSecondaryAction>
          <IconButton size="small" onClick={handleDeleteAnnotationObject}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={isSelected} className={classes.infoContainerCollapse}>
        <Divider className={classes.divider} variant="middle" light />
        <div className={classes.infoContainer}>
          <LabelSelection
            selectedLabel={label}
            labels={labels}
            handleChangeLabel={handleChangeLabel}
          />
          <div style={{ height: 10 }}></div>
        </div>
      </Collapse>
    </>
  );
};

export default ObjectInfo;
