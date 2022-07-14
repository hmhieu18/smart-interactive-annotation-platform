import React, { useCallback }  from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'lodash'
import { find } from 'lodash'

import { useDatasetStore, useAnnotationStore } from '../../../../stores/index'
// import {mockupDataInstance} from '../../../../../../mockup'
const useStyles = makeStyles(theme => ({
  root: {

  },
  name: {
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.primary,
    whiteSpace: 'nowrap',
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: theme.spacing(1)
  }
}))

const SaveStatus = (props) => {
  const classes = useStyles()

  const saveStatus = useAnnotationStore(state => state.saveStatus)

  return (
    <div className={classes.root}>
      <div className={classes.name}>
        {saveStatus?"":"(Not Saved)"}
      </div>
    </div>
  )
}

export default SaveStatus