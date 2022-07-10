import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { useParams } from "react-router";

import { useAnnotationStore } from "../../../../stores/index";
import { useLabelStore } from "../../../../stores/index";

import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";

import SplitButton from "../../../../../../components/SplitButton";
import LabelMappingDialog from "./components/LabelMappingDialog/LabelMappingDialog";
import {MODEL_ID} from "../../../../../../constants/constants"
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
  const [modelId, setModelId] = useState("");
  const labelMaps = useLabelStore((state) => state.labelMaps);
  const modelLabels = useLabelStore((state) => state.modelLabels);
  const loadDatasetLabel = useLabelStore((state) => state.loadDatasetLabel);
  const loadModelLabels = useLabelStore((state) => state.loadModelLabel);
  const loadLabelMaps = useLabelStore((state) => state.loadLabelMaps);
  const createLabelMaps = useLabelStore((state) => state.createLabelMappings);
  const updateLabelMaps = useLabelStore((state) => state.updateLabelMaps);
  const { datasetId } = useParams();

  const [openDialog, setOpenDialog] = React.useState(false);
  const labels = useAnnotationStore((state) => state.labels);

  React.useEffect(() => {
    setModelId(MODEL_ID.NON_AUDIO_SOCCERNET_MODEL)
    loadModelLabels(modelId);
    // loadModelLabels(datasetId);
    loadLabelMaps(datasetId);
    console.log("labelMaps", labelMaps)
  }, [datasetId]);

  const handleTriggerLabelMapping = () => {
    console.log("OPENING DIALOG");
    console.log("MODEL_ID.NON_AUDIO_SOCCERNET_MODEL",MODEL_ID.NON_AUDIO_SOCCERNET_MODEL)
    setModelId(MODEL_ID.NON_AUDIO_SOCCERNET_MODEL)
    loadModelLabels(modelId);
    console.log("modelid", modelId)
    setOpenDialog(true);
  };

  const handleSaveEditDialog = (finishedLabel) => {
    // if (finishedLabel.id) {
    //   updateLabel(finishedLabel)
    // } else {
    console.log(finishedLabel, datasetId);
    createLabelMaps(finishedLabel, datasetId);
    // }
    setOpenDialog(false);
  };

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
        modelLabels={modelLabels}
        handleSave={handleSaveEditDialog}
        labelPairList={labelMaps}
      />
    </div>
  );
};

export default AIAssistancePanel;
