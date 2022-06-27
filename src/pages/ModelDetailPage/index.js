import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import ModelInfo from "./components/ModelInfo/index";
import LabelList from "./components/LabelList/index";

import useModelInfoStore from "./store";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const ModelDetailPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { modelId } = useParams();
  const [activeTab, setActiveTab] = React.useState(0);

  const isLoading = useModelInfoStore((state) => state.isLoading);
  const getModelInfo = useModelInfoStore((state) => state.getModelInfo);

  React.useEffect(() => {
    getModelInfo(modelId);
  }, []);

  const handleChangeIndex = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={classes.root}>
      <Loading isLoading={isLoading} />
      <ModelInfo
        useStore={useModelInfoStore}
      />
      <LabelList useStore={useModelInfoStore} />
    </div>
  );
};

export default ModelDetailPage;
