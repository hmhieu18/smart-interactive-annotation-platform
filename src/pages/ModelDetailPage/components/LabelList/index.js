import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { get } from 'lodash'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import CreateIcon from '@material-ui/icons/AddCircle';

import EditLabelDialog from './components/EditLabelDialog';
// import { ColorCell } from './components/ColorCell'

import ModelLabelClass from '../../../../classes/ModelLabelClass'
import randomColor from '../../../../utils/randomColor'
import SplitButton from '../../../../components/SplitButton'
const useStyles = makeStyles(() => ({
  labelListContainer: {
    width: '100%',
  },
  dataGrid: {
  },
  table: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
}))

const tableColumns = [
  { field: 'label', headerName: 'Label', },
  { field: '', headerName: 'Edit', align: 'center' },
  { field: '', headerName: 'Delete', align: 'center' },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    borderRadius: 8,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const LabelList = (props) => {
  const classes = useStyles()
  const { modelId } = useParams()
  const { useStore } = props


  const labels = useStore(state => state.labels)
  const getLabels = useStore(state => state.getLabels)
  const createLabel = useStore(state => state.createLabel)
  const updateLabel = useStore(state => state.updateLabel)
  const deleteLabel = useStore(state => state.deleteLabel)

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingLabel, setEditingLabel] = React.useState({})

  React.useEffect(() => {
    getLabels(modelId)
  }, [])

  const handleTriggerEditLabel = (label) => () => {
    setEditingLabel(label)
    setOpenDialog(true)
  }

  const handleTriggerCreateLabel = () => {
    const newLabel = new ModelLabelClass('', '', modelId)
    setEditingLabel(newLabel)
    setOpenDialog(true)
  }


  const handleSaveEditDialog = (finishedLabel) => {
    if (finishedLabel.id) {
      updateLabel(finishedLabel)
    } else {
      createLabel(finishedLabel)
    }
    setOpenDialog(false)
  }

  const handleTriggerDeleteLabel = (label) => () => {
    deleteLabel(label)
  }


  return (
    <div className={classes.labelListContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
                <SplitButton
          variant="primary"
          icon={<CreateIcon />}
          onClick={handleTriggerCreateLabel}
          text="New label"
        >
        </SplitButton>
      </div>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <StyledTableRow>
            {tableColumns.map(col => {
              const { headerName, field, align } = col
              return (
                <StyledTableCell key={`column-header-${field}-${headerName}`} align={align}>
                  {headerName}
                </StyledTableCell>
              )
            })}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {labels.map(label => (
            <StyledTableRow
              key={`label-${label.id}`}
            >
              {tableColumns.map(col => {
                const { formatter, component: RenderComponent, align, field } = col

                if (!field) {
                  return null
                }

                const colValue = get(label, field, '')
                const formattedValue = formatter ? formatter(colValue) : colValue
                return (
                  <StyledTableCell
                    key={`label-${label.id}-col-${col.field}`}
                    align={align}
                  >
                    {RenderComponent ?
                      <RenderComponent value={formattedValue} /> :
                      formattedValue
                    }
                  </StyledTableCell>
                )
              })}
              <StyledTableCell align='center'>
                <IconButton
                  color="primary"
                  onClick={handleTriggerEditLabel(label)}
                >
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <IconButton
                  color="secondary"
                  onClick={handleTriggerDeleteLabel(label)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))
          }
        </TableBody>
      </Table>
      <EditLabelDialog
        modelId={modelId}
        open={openDialog}
        setOpen={setOpenDialog}
        handleSave={handleSaveEditDialog}
        label={editingLabel}
      />
    </div>
  );
}

export default LabelList