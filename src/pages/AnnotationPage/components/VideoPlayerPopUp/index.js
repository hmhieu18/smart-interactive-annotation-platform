import { useRef, useState } from "react";
import KonvaPlayer from "./components/KonvaPlayer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { mockupVideo } from "../../../../mockup";
import React, { useCallback, useMemo, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stage, Layer } from "react-konva";
import { get, find, debounce } from "lodash";

import EventCenter from "../../EventCenter";
import { useGeneralStore, useDatasetStore } from "../../stores/index";

import { EVENT_TYPES, MODES, STAGE_PADDING } from "../../constants";
import getRenderingSize from "../../utils/getRenderingSize";
import VideoPlayControl from "./components/PlaybackController/VideoPlayControl";
const useStyles = makeStyles((theme) => ({
  stageContainer: {
    width: "100%",

    flex: 1,
    overflowY: "hidden",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  stage: {
    background: "#f8f8f8",
    cursor: ({ activeMode }) =>
      get(find(MODES, { name: activeMode }), "cursor", "default"),
  },
  annotatorContainer: {
    display: "flex",
    flex: 1,
    overflowX: "hidden",
    // paddingBottom: 10,
    background: theme.palette.primary.light,
  },
}));

const RenderComponent = (props) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [videoSize, setVideoSize] = useState({
    width: 0,
    height: 0,
  });

  const activeMode = useGeneralStore((state) => state.activeMode);
  const classes = useStyles({ activeMode });

  const stageContainerRef = React.useRef(null);
  const getStageContainerRef = useCallback(
    () => stageContainerRef.current,
    [stageContainerRef]
  );
  const stageRef = React.useRef(null);
  const setStage = useGeneralStore((state) => state.setStage);
  React.useEffect(() => {
    setStage(stageRef.current);
  }, [stageRef]);

  const stage = useGeneralStore((state) => state.stage);
  const stageSize = useGeneralStore((state) => state.stageSize);
  const setStageSize = useGeneralStore((state) => state.setStageSize);

  const handleNewStageSize = debounce(
    () => {
      const container = getStageContainerRef();

      if (
        container &&
        container.clientWidth > 0 &&
        container.clientHeight > 0
      ) {
        setStageSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    },
    500,
    { leading: true, trailing: true }
  );

  const instanceId = useDatasetStore((state) => state.instanceId);
  const dataInstance = useDatasetStore(
    useCallback(
      (state) => find(state.dataInstances, { id: instanceId }),
      [instanceId]
    )
  );

  const setRenderingSize = useGeneralStore((state) => state.setRenderingSize);
  const renderingSize = useMemo(() => {
    const newRenderingSize = getRenderingSize(
      stageSize,
      dataInstance,
      STAGE_PADDING
    );
    setRenderingSize(newRenderingSize);
    window.canvasRenderingSize = newRenderingSize;

    return newRenderingSize;
  }, [stageSize, dataInstance]);

  const recenterStage = () => {
    const stage = stageRef.current;
    if (stage) {
      stage.position({
        x: (stageSize.width - renderingSize.width) / 2,
        y: (stageSize.height - renderingSize.height) / 2,
      });
      stage.scale({ x: 1, y: 1 });
      stage.batchDraw();
    }
  };

  useEffect(() => {
    if (stage) {
      recenterStage();
    }
  }, [stageSize, renderingSize]);

  React.useEffect(() => {
    handleNewStageSize();
    window.addEventListener("resize", handleNewStageSize);
    const { getSubject } = EventCenter;
    let subscriptions = {
      [EVENT_TYPES.RESIZE_STAGE]: getSubject(
        EVENT_TYPES.RESIZE_STAGE
      ).subscribe({ next: (e) => handleNewStageSize(e) }),
      [EVENT_TYPES.VIEW.CENTER_VIEWPOINT]: getSubject(
        EVENT_TYPES.VIEW.CENTER_VIEWPOINT
      ).subscribe({ next: (e) => recenterStage(e) }),
    };

    return () => {
      window.removeEventListener("resize", handleNewStageSize);
      Object.keys(subscriptions).forEach((subscription) =>
        subscriptions[subscription].unsubscribe()
      );
    };
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>Video</DialogTitle>
      <DialogContent>
        <video
          style={{ display: "none" }}
          ref={stageRef}
          onLoadedData={(el) => {
            setVideoSize({
              width: el.target.videoWidth,
              height: el.target.videoHeight,
            });
            setLoading(false);
          }}
          src={mockupVideo.url}
        />
        <div className={classes.stageContainer} ref={stageContainerRef}>
          <Stage
            // ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            className={classes.stage}
          >
            <Layer listening={false}>
              <KonvaPlayer
                width={stageSize.width}
                height={stageSize.height}
                video={stageRef.current}
              />
            </Layer>
          </Stage>
          {/* <div className={classes.annotatorContainer}> */}
            <VideoPlayControl />
          {/* </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenderComponent;
