import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import { useParams } from 'react-router'

import DataInfo from './components/DataInfo/index'
import SaveStatus from './components/SaveStatus/index'
import useQuery from '../../../../utils/useQuery'

const useStyles = makeStyles(theme => ({
  topNavWrapper: {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 55,
    paddingLeft: 20,
    paddingRight: 20,
    background: theme.palette.primary.darker
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  centerSection: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  modal: {
    width: 500,
    padding: 20,
    marginTop: 100,
    margin: 'auto',
  }
}))

const TopNav = (props) => {
  const classes = useStyles()
  const { datasetId } = useParams()
  const query = useQuery()
  const page = JSON.parse(query.get("page") || 1)
  

  return (
    <div className={classes.topNavWrapper}>
      <div className={classes.leftSection}>
        <DataInfo />
        <SaveStatus/>
      </div>
      <div className={classes.rightSection}>
        <IconButton
          href={`/datasets/dataset=${datasetId}?page=${1}`}
        >
          <CloseIcon color="secondary"/>
        </IconButton>
      </div>
    </div>
  )
}

export default TopNav