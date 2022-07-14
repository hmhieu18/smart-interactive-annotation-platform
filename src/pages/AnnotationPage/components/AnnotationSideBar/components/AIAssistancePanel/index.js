import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { useParams } from "react-router";
import { backendURL } from "../../../../../../constants/constants";
import { find } from "lodash";

import {
  useAnnotationStore,
  useLabelStore,
  useDatasetStore,
} from "../../../../stores/index";
import EventAnnotationClass from "../../../../../../classes/EventAnnotationClass";

import LoadingDialog from "./components/LoadingDialog/LoadingDialog";
import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";

import SplitButton from "../../../../../../components/SplitButton";
import LabelMappingDialog from "./components/LabelMappingDialog/LabelMappingDialog";
import { MODEL_ID } from "../../../../../../constants/constants";
import { predictionResultMockup } from "../../../../../../mockup";
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
  const instanceId = useDatasetStore((state) => state.instanceId);
  const [isOpen, setIsOpen] = useState(true);
  const [modelId, setModelId] = useState("");
  const datasetLabels = useLabelStore((state) => state.labels);
  const labelMaps = useLabelStore((state) => state.labelMaps);
  const modelLabels = useLabelStore((state) => state.modelLabels);
  const loadDatasetLabel = useLabelStore((state) => state.loadDatasetLabel);
  const loadModelLabels = useLabelStore((state) => state.loadModelLabel);
  const loadLabelMaps = useLabelStore((state) => state.loadLabelMaps);
  const getDatasetLabelIDMappedModelLabelName = useLabelStore(
    (state) => state.getDatasetLabelIDMappedModelLabelName
  );
  const createLabelMaps = useLabelStore((state) => state.createLabelMappings);
  const updateLabelMaps = useLabelStore((state) => state.updateLabelMaps);
  const { datasetId } = useParams();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLoadingDialog, setOpenLoadingDialog] = React.useState(false);
  const labels = useAnnotationStore((state) => state.labels);
  const [progress, setProgress] = useState(0);
  const [progressDes, setProgressDes] = useState("");
  const [sse, setSse] = useState(null);
  const [result, setResult] = useState(null);
  const [isHandled, setIsHandled] = useState(false);
  const video = useDatasetStore(
    useCallback(
      (state) => find(state.dataInstances, { id: instanceId }),
      [instanceId]
    )
  );

  React.useEffect(async () => {
    setModelId(MODEL_ID.NON_AUDIO_SOCCERNET_MODEL);
    await loadModelLabels(modelId);
    await loadLabelMaps(datasetId);
  }, [datasetId, modelId]);

  const handleTriggerLabelMapping = async () => {

    await loadModelLabels(modelId);
    await loadLabelMaps(datasetId);

    setModelId(MODEL_ID.NON_AUDIO_SOCCERNET_MODEL);
    setOpenDialog(true);
  };

  const handleSaveEditDialog = async (finishedLabel) => {
    await createLabelMaps(finishedLabel, datasetId);
    
    setOpenDialog(false);
    setOpenLoadingDialog(true);
    handlePredictionResult(predictionResultMockup);
    setSse(sendRequest());
  };

  const appendAnnotation = useAnnotationStore(
    (state) => state.appendAnnotation
  );

  const handleAddEventAnnotation = (frameID, labelID) => {
    const newEvent = EventAnnotationClass.constructorFromServerData({
      id: null,
      frameID,
      labelID,
    });
    console.log("handleAddEventAnnotation", newEvent);
    appendAnnotation(newEvent);
  };

  const handlePredictionResult = (result) => {
    setIsHandled(true);
    const { fps, numFrames } = video;
    console.log("handlePredictionResult", modelLabels, labelMaps);
    for (const prediction of result.predictions) {
      const frameID = Math.floor((prediction.position / 1000) * fps);
      const modelLabel = find(modelLabels, { label: prediction.label });
      const datasetLabelId = find(labelMaps, {classId: modelLabel.id}).labelId;
      if(datasetLabelId) {
        handleAddEventAnnotation(frameID, datasetLabelId);
      }
    }
    setIsHandled(false);
  };

  const sendRequest = () => {
    const sse = new EventSource(
      `${backendURL}/predict?model-url=soccernet-9b7f7694-64d8-4cb3-bf37-080dce41ebb4.loca.lt&data-id=${instanceId}`
    );
    function getRealtimeData(obj) {
      setProgress(obj.progress);
      setProgressDes(obj.stage);
      if (obj.progress >= 100) {
        setResult(predictionResultMockup);
        console.log("RESULT", result);
        sse.close();
        if (!isHandled) {
          handlePredictionResult(predictionResultMockup);
        }
      }
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };
    return sse;
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
              onClick={instanceId ? handleTriggerLabelMapping : null}
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
      <LoadingDialog
        open={openLoadingDialog}
        setOpen={setOpenLoadingDialog}
        progress={progress}
        description={progressDes}
        handleOnCancel={() => {
          sse.close();
        }}
      />
    </div>
  );
};

export default AIAssistancePanel;
