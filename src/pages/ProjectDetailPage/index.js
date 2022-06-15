import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useParams } from 'react-router'
import Loading from '../../components/Loading'

import DatasetList from './components/DatasetList/index'

import useProjectInfoStore from './store'

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

const ProjectDetailPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { projectId } = useParams()
  const [activeTab, setActiveTab] = React.useState(0);

  const isLoading = useProjectInfoStore(state => state.isLoading)
  const getProjectInfo = useProjectInfoStore(state => state.getProjectInfo)

  React.useEffect(() => {
    getProjectInfo(projectId)
  }, [])


  const handleChangeIndex = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={classes.root}>
      <Loading isLoading={isLoading}/>
      {/* <Overview
        useStore={useProjectInfoStore}
      /> */}
      {/* <ProjectTabs
        value={activeTab}
        setValue={setActiveTab}
      /> */}
          <DatasetList useStore={useProjectInfoStore}/>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        {/* <TabPanel value={activeTab} index={0} dir={theme.direction}>
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <LabelList useStore={useProjectInfoStore}/>
        </TabPanel>
        <TabPanel value={activeTab} index={2} dir={theme.direction}>
          <Settings useStore={useProjectInfoStore} />
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}


export default ProjectDetailPage