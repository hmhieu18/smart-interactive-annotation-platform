import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    background: theme.palette.primary.light
  }
}))

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const ProjectTabs = (props) => {
  const classes = useStyles()
  const { value, setValue } = props

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      className="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <Tab label="Dataset" {...a11yProps(0)} />
      <Tab label="Labels" {...a11yProps(1)} />
    </Tabs>
  )
}


export default ProjectTabs