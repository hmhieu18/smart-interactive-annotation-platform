import React from "react";
import { makeStyles } from "@material-ui/core";

import ToolboxButton from "./ToolboxButton";
import { MODES } from "../../constants";

import { ReactComponent as RectangleIcon } from "../../../../static/images/icons/ToolboxIcon/rectangle.svg";
import { ReactComponent as PolygonIcon } from "../../../../static/images/icons/ToolboxIcon/polygon.svg";
import { ReactComponent as PainBrushIcon } from "../../../../static/images/icons/ToolboxIcon/paintbrush.svg";
import { ReactComponent as ScribblesIcon } from "../../../../static/images/icons/ToolboxIcon/scribbles.svg";
import { ReactComponent as CursorIcon } from "../../../../static/images/icons/ToolboxIcon/cursor.svg";
import { ReactComponent as EditIcon } from "../../../../static/images/icons/ToolboxIcon/edit.svg";
import { ReactComponent as RefExIcon } from "../../../../static/images/icons/ToolboxIcon/refex.svg";
// import { ReactComponent as CutIcon } from '../../../../static/images/icons/ToolboxIcon/cut.svg'
// import { ReactComponent as DeleteIcon } from '../../../../static/images/icons/ToolboxIcon/delete.svg'
import StatusButtonsList from "../AnnotationSideBar/components/StatusButtonsList";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#f8f8f8",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
}));

const toolBoxButtons = [
  {
    name: "Cursor",
    mode: MODES.CURSOR.name,
    component: <CursorIcon />,
  },
  {
    name: "Edit",
    mode: MODES.EDIT.name,
    component: <EditIcon />,
  },
  {
    name: "Rectangle",
    mode: MODES.DRAW_BBOX.name,
    component: <RectangleIcon />,
  },
  // {
  //   name: 'Polygon',
  //   mode: MODES.DRAW_POLYGON.name,
  //   component: <PolygonIcon />,
  // },
  // {
  //   name: 'Mask brush',
  //   mode: MODES.DRAW_MASK_BRUSH.name,
  //   component: <PainBrushIcon />,
  // },
  // {
  //   name: 'Scribble to Mask',
  //   mode: MODES.DRAW_MASK.name,
  //   component: <ScribblesIcon />,
  // },
  // {
  //   name: 'Referring expression',
  //   mode: MODES.REFERRING_EXPRESSION.name,
  //   component: <RefExIcon />,
  // },
];

const Toolbox = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StatusButtonsList />
      {/* {
        toolBoxButtons.map((btn) => {
          const { name, component, mode, } = btn
          return (
            <ToolboxButton
              key={`toolbox-button-${mode}`}
              name={name}
              component={component}
            />
          )
        })
      } */}
    </div>
  );
};

export default Toolbox;
