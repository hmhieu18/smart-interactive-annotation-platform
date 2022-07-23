import React from "react";
import { makeStyles } from '@material-ui/core'

import '../../../../assets/scss/sb-admin-2.scss'
import DataInstanceListPanel from './components/DataInstanceListPanel/index'
import LabelInfoPanel from './components/LabelInfoPanel/index'
import ObjectInfoPanel from './components/ObjectInfoPanel/index'
import StatusButtonsList from './components/StatusButtonsList/index'
import AIAssistancePanel from './components/AIAssistancePanel/index'

const useStyles = makeStyles(theme => ({
    sideBarWrapper: {
      boxSizing: 'border-box',
      height: '100%',
      background: theme.palette.primary.darker,
      padding: 10,
      overflowY: 'scroll',
    },
  }))

const AnnotationSideBar = (props) => {
    const classes = useStyles()
    return (
      <div className={classes.sideBarWrapper}>
        <AIAssistancePanel/>
        <DataInstanceListPanel/>
        <LabelInfoPanel/>
        <ObjectInfoPanel/>
      </div>
    )
};
export default AnnotationSideBar;
