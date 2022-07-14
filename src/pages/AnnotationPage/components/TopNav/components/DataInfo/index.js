import React, { useCallback }  from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'lodash'
import { find } from 'lodash'

import { useDatasetStore } from '../../../../stores/index'
// import {mockupDataInstance} from '../../../../../../mockup'
const useStyles = makeStyles(theme => ({
  root: {

  },
  name: {
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.primary.contrastText,
    whiteSpace: 'nowrap',
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

const DataInfo = (props) => {
  const classes = useStyles()

  const instanceId = useDatasetStore(state => state.instanceId)
  const dataInstance = useDatasetStore(useCallback(state => find(state.dataInstances, { id: instanceId }), [instanceId]))

  const dataInstanceName = get(dataInstance, 'name', '');

  React.useEffect(() => {
    console.log("dataInstance", dataInstance);
  }, [dataInstance])
  return (
    <div className={classes.root}>
      <div className={classes.name}>
        {dataInstanceName}
      </div>
    </div>
  )
}

export default DataInfo