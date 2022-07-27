import { useRef, useState, useCallback } from "react";
import KonvaPlayer from "./components/KonvaPlayer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mockupVideo } from "../../../../mockup.js";
import { find } from "lodash";
import { ReactComponent as BBoxIcon } from "../../../../static/images/icons/ToolboxIcon/rectangle.svg";
import { ANNOTATION_TYPE } from "../../../../constants/constants";
import { DEFAULT_ANNOTATION_ATTRS } from "../../constants";

import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Bookmark";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import screenful from "screenfull";
import Controls from "./components/Controls";
import { useDatasetStore, useAnnotationStore } from "../../stores/index";
import { get } from "lodash";
import ObjectInfoPanel from "./components/ObjectInfoPanel/index";
const useStyles = makeStyles((theme) => ({
  sidebarWrapper: {
    width: "30%",
    margin: "30px",
  },
  annotatorContainer: {
    display: "flex",
    overflowX: "hidden",
  },
  playerWrapper: {
    flex: 1,
    width: "100%",
    position: "relative",
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

let count = 0;
const mapAnnotationTypeToIcon = {
  [ANNOTATION_TYPE.BBOX]: BBoxIcon,
  [ANNOTATION_TYPE.EVENT]: EventIcon,
};
const RenderComponent = (props) => {
  const dataInstances = useDatasetStore((state) => state.dataInstances);
  const videoId = useDatasetStore((state) => state.instanceId);
  const video = useDatasetStore(
    useCallback(
      (state) => find(state.dataInstances, { id: videoId }),
      [videoId]
    )
  );
  const annotationsList = useAnnotationStore((state) => state.annotations);
  const labels = useAnnotationStore((state) => state.labels);

  const objectList = annotationsList.map((obj) => ({
    ...obj,
    label: find(labels, { id: obj.labelID }),
  }));

  const marks = objectList.map((annotation) => {
    const value = (annotation.frameID * 100) / video?.numFrames;
    const fillColor = get(
      annotation.label,
      "annotationProperties.fill",
      DEFAULT_ANNOTATION_ATTRS.fill
    );
    const AnnotationTypeIcon = mapAnnotationTypeToIcon[annotation.type];
    const label = <AnnotationTypeIcon style={{ color: fillColor }} />;
    return {
      value,
      label,
      textLabel: annotation.label.label,
    };
  });

  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [showControls, setShowControls] = useState(false);
  // const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });
  React.useEffect(() => {
    // if (!video) {
    //   video = dataInstances?dataInstances[0]:null;
    // }
  }, [video, dataInstances]);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    // console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    // console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const getElapsedTimeSlider = () => {
    var text = Math.round(played * duration);
    const timeInPercent = played * 100;
    const oneSecInPercent = 100 / duration;
    marks.forEach((mark) => {
      if (
        timeInPercent >= mark.value - oneSecInPercent &&
        timeInPercent <= mark.value + oneSecInPercent
      )
        text += ` ${mark.textLabel}`;
    });
    return text;
  };
  const totalDuration = format(duration);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <div className="modal-header">
        <button
          className="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <DialogContent>
        <Container maxWidth="md" className={classes.annotatorContainer}>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={hanldeMouseLeave}
            ref={playerContainerRef}
            className={classes.playerWrapper}
          >
            <ReactPlayer
              ref={playerRef}
              width="100%"
              height="100%"
              url={video?.video}
              pip={pip}
              playing={playing}
              controls={false}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onProgress={handleProgress}
              config={{
                file: {
                  attributes: {
                    crossorigin: "anonymous",
                  },
                },
              }}
            />

            <Controls
              ref={controlsRef}
              onSeek={handleSeekChange}
              onSeekMouseDown={handleSeekMouseDown}
              onSeekMouseUp={handleSeekMouseUp}
              onDuration={handleDuration}
              onRewind={handleRewind}
              onPlayPause={handlePlayPause}
              onFastForward={handleFastForward}
              playing={playing}
              played={played}
              elapsedTime={format(currentTime)}
              elapsedTimeSlider={getElapsedTimeSlider()}
              totalDuration={totalDuration}
              onMute={hanldeMute}
              muted={muted}
              onVolumeChange={handleVolumeChange}
              onVolumeSeekDown={handleVolumeSeekDown}
              playbackRate={playbackRate}
              onPlaybackRateChange={handlePlaybackRate}
              onToggleFullScreen={toggleFullScreen}
              volume={volume}
              marks={marks}
              fileName={video?.name}
            />
          </div>
          <div className={classes.sidebarWrapper}>
            <ObjectInfoPanel
              playerRef={playerRef}
              controlsRef={controlsRef}
              fps={video?.fps}
            />
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default RenderComponent;
