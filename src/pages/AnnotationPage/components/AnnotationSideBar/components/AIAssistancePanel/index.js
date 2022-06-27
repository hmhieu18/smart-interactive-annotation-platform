import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

import { useAnnotationStore } from "../../../../stores/index";

import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";

import SplitButton from "../../../../../../components/SplitButton";
import LabelMappingDialog from "./components/LabelMappingDialog/LabelMappingDialog";
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
  },
  listContainer: {
    width: "100%",
    background: theme.palette.primary.light,
    textAlign: "center",
  },
}));

const AIAssistancePanel = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const [openDialog, setOpenDialog] = React.useState(false);
  const labels = useAnnotationStore(state => state.labels)

  const handleTriggerLabelMapping =  () => {
    console.log("OPENING DIALOG")
    setOpenDialog(true);
  };

  const handleSaveEditDialog = (finishedLabel) => {
    if (finishedLabel.id) {
      updateLabel(finishedLabel)
    } else {
      createLabel(finishedLabel)
    }
    setOpenDialog(false)
  }


  return (
    <div>
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
          <h6 className="m-0 font-weight-bold text-primary">AI Assistants</h6>
        </a>
        <Collapse in={isOpen} className="collapse show">
          <div className="card-body">
            <SplitButton
              text="Predict Soccer Events"
              icon={"ss"}
              onClick={handleTriggerLabelMapping}
            />
            <div className="my-2"></div>
            <SplitButton text="Predict Faces" icon={"ss"} />
          </div>
        </Collapse>
      </div>
      <LabelMappingDialog
        open={openDialog}
        setOpen={setOpenDialog}
        yourLabels={labels}
        modelLabels={[]}
        handleSave={handleSaveEditDialog}
      />
    </div>
  );
};

export default AIAssistancePanel;
