import React from 'react'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import BasicButton from '../../../../components/BasicButton'
import Collapse from '@material-ui/core/Collapse'
import { filter } from 'lodash'
import { useConfirm } from 'material-ui-confirm'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    margin: 'auto',
    width: 'calc(100% - 40px)',
    background: theme.palette.secondary.lighter,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 18,
  },
}))


const BulkSelection = (props) => {
  const classes = useStyles()
  const confirm = useConfirm()
  const { datasetId } = useParams()
  const { useStore } = props

  const selected = useStore(state => state.selected)
  const deselectAll = useStore(state => state.deselectAll)
  const deleteSelectedData = useStore(state => state.deleteSelectedData)

  const selectedIds = filter(Object.keys(selected), key => selected[key])

  const handleDeleteSelected = () => {
    confirm({
      title: 'Delete selected data instances',
      description: `This action can't be undone and will delete ${selectedIds.length} instances and associated annotations.`
    }).then(() => {
      deleteSelectedData()
    })
  }

  return (
    <Collapse in={Boolean(selectedIds.length)} timeout={500}>
      <Grid container className={classes.root}>
        <Grid container item xs={4} justifyContent="flex-start" spacing={1}>
          <Grid item>
            <BasicButton
              variant="primary"
              href={`/annotations/dataset=${datasetId}?instance_id=${selectedIds[0]}`}
              text={`Annotate ${selectedIds.length} items`}
            >
            </BasicButton>
          </Grid>
          <Grid item>
            <BasicButton
              variant="secondary"
              onClick={deselectAll}
              text="Deselect all"
            >
            </BasicButton>
          </Grid>
          <Grid item>
            <BasicButton
              variant="danger"
              onClick={handleDeleteSelected}
              text="Delete"
            >
            </BasicButton>
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  )

}

export default BulkSelection