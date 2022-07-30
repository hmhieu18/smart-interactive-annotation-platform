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
import { FootballIcon } from "../../../../../../components/icons/FootballIcon";
import PredictionService from "../../../../../../services/PredictionService";

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

let interval = undefined;

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
  const [running, setRunning] = useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLoadingDialog, setOpenLoadingDialog] = React.useState(false);
  const labels = useAnnotationStore((state) => state.labels);
  const [progress, setProgress] = useState(0);
  const [progressDes, setProgressDes] = useState("");
  const [sse, setSse] = useState(null);
  const [result, setResult] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  // const [isHandled, setIsHandled] = useState(false);
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
    // handlePredictionResult(predictionResultMockup);
    setSse(sendRequest());
  };

  const handleSaveEditDialogF = async (finishedLabel) => {
    setPredictionResult(null);
    setProgress(0);
    setProgressDes("");
    await createLabelMaps(finishedLabel, datasetId);
    setOpenDialog(false);
    setOpenLoadingDialog(true);
    // handleFProgressBar();
    const tmpResult = await PredictionService.getPredictionByModelIdAndDataId(
      modelId,
      instanceId
    );
    console.log("tmpResult", tmpResult);
    setPredictionResult(tmpResult);
    handlePredictionResult(tmpResult);
    // setSse(sendRequest());
  };

  React.useEffect(() => {
    if (predictionResult == null) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 500);
    } else {
      setOpenLoadingDialog(false);
      clearInterval(interval);
    }
  }, [predictionResult]);

  React.useEffect(() => {
    if (progress < 10) {
      setProgressDes("Getting data...");
    } else if (progress < 30) {
      setProgressDes("Extracting features...");
    } else if (progress < 70) {
      setProgressDes("Predicting...");
    }
    if (progress == 70) {
      clearInterval(interval);
    }
  }, [progress]);

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
    // setIsHandled(true);
    //download from url
    console.log("handlePredictionResult", result);
    fetch(result)
      .then((response) => response.json())
      .then((jsonData) => {
        const { fps, numFrames } = video;
        console.log("handlePredictionResult", jsonData, modelLabels, labelMaps);
        for (const prediction of jsonData.predictions) {
          const frameID = Math.floor((prediction.position / 1000) * fps);
          const modelLabel = find(modelLabels, { label: prediction.label });
          const datasetLabelId = find(labelMaps, {
            classId: modelLabel.id,
          })?.labelId;
          if (datasetLabelId) {
            handleAddEventAnnotation(frameID, datasetLabelId);
          }
        }
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
    // setIsHandled(false);
  };

  const sendRequest = () => {
    const sse = new EventSource(
      `${backendURL}/predict?model-id=${modelId}&data-id=${instanceId}`
    );
    function getRealtimeData(obj) {
      setProgress(obj.progress);
      setProgressDes(obj.stage);
      console.log("getRealtimeData", obj);
      if (obj.progress >= 100) {
        setResult(obj.result);
        console.log("RESULT", obj.result);
        sse.close();
        // if (!isHandled) {
        handlePredictionResult(obj.result);
        // }
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
              icon={<FootballIcon />}
              onClick={instanceId ? handleTriggerLabelMapping : null}
            />
            <div className="my-2"></div>
          </div>
        </Collapse>
      </div>

      {/* <LabelMappingDialog
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
      /> */}

      <LabelMappingDialog
        open={openDialog}
        setOpen={setOpenDialog}
        yourLabels={labels}
        modelLabels={modelLabels}
        handleSave={handleSaveEditDialogF}
        labelPairList={labelMaps}
      />
      <LoadingDialog
        open={openLoadingDialog}
        setOpen={setOpenLoadingDialog}
        progress={progress}
        description={progressDes}
        // handleOnCancel={() => {
        //   sse.close();
        // }}
      />
    </div>
  );
};

export default AIAssistancePanel;
