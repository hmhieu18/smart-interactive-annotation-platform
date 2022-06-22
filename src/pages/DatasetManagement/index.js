import React from "react";
import { useParams } from "react-router";

import Loading from "../../components/Loading";
import DatasetInfo from "./components/DatasetInfo/index";
import BulkSelection from "./components/BulkSelection/index";
import DataListSection from "./components/DataListSection/index";
import DataPagination from "./components/DataPagination/index";
import LabelList from "./components/LabelList/index";
import SwipeableViews from "react-swipeable-views";
import ProjectTabs from "./components/Tabs/index";
import TabPanel from "./components/TabPanel/index";
import useDatasetManagementStore from "./store.js";
import SplitButton from '../../components/SplitButton'
import useQuery from "../../utils/useQuery";
import { useTheme } from "@material-ui/core/styles";

const DatasetDetailPage = (props) => {
  const { datasetId } = useParams();
  let query = useQuery();
  const theme = useTheme();

  const page = JSON.parse(query.get("page") || 1);

  const isLoading = useDatasetManagementStore((state) => state.isLoading);
  const getDataset = useDatasetManagementStore((state) => state.getDataset);
  const getData = useDatasetManagementStore((state) => state.getData);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeIndex = (index) => {
    setActiveTab(index);
  };

  React.useEffect(() => {
    getDataset(datasetId);
  }, [datasetId]);

  React.useEffect(() => {
    getData(datasetId, page);
  }, [page]);

  return (
    <div>
      <Loading isLoading={isLoading} />
      <DatasetInfo useStore={useDatasetManagementStore} />
    <div className="card shadow mb-4">

      <ProjectTabs value={activeTab} setValue={setActiveTab} />
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>

          <BulkSelection useStore={useDatasetManagementStore} />
          <DataListSection useStore={useDatasetManagementStore} />
          <DataPagination useStore={useDatasetManagementStore} />
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <LabelList useStore={useDatasetManagementStore}/>
        </TabPanel>
      </SwipeableViews>
      </div>
    </div>
  );
};

export default DatasetDetailPage;
