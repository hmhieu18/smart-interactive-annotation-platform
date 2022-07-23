import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  Button,
  TableCell,
} from "@material-ui/core";
import { get } from "lodash";
import moment from "moment";

import EditIcon from "@material-ui/icons/Edit";
import SplitButton from "../../../../components/SplitButton";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import "../../../../assets/scss/sb-admin-2.scss";

import Link from "../../../../components/Link";
import CreateDatasetDialog from "./components/CreateDatasetDialog";

const useStyles = makeStyles(() => ({
  table: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
}));

const tableColumns = [
  {
    key: "name",
    label: "Name",
    formatter: (value, fullValue) => (
      <Link
        to={`/datasets/dataset=${fullValue.id}`}
        style={{ color: "#2876D4" }}
      >
        {value}
      </Link>
    ),
  },
  {
    key: "datatype",
    label: "Type",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "createdDate",
    label: "Created at",
    formatter: (value) => moment(value).format("MMMM Do YYYY, HH:mm"),
  },
];

const DatasetList = (props) => {
  const classes = useStyles();
  const { projectId } = useParams();
  const { useStore } = props;

  const datasets = useStore((state) => state.datasets);
  const getDatasets = useStore((state) => state.getDatasets);
  const appendNewDataset = useStore((state) => state.appendNewDataset);

  const [openDialog, setOpenDialog] = React.useState(false);

  React.useEffect(() => {
    getDatasets(projectId);
  }, [projectId]);

  const handleTriggerCreateDataset = () => {
    setOpenDialog(true);
  };

  const handleCreateDataset = (newDataset) => {
    appendNewDataset(newDataset);
  };

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

  return (
    <div className={classes.datasetListContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <SplitButton
          onClick={() => {
            setOpenDialog(true);
          }}
          text="New Dataset"
          icon={<i class="bi bi-plus-square-fill"></i>}
        />
      </div>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <StyledTableRow>
            {tableColumns.map((col) => (
              <StyledTableCell key={col.key}>{col.label}</StyledTableCell>
            ))}
            <StyledTableCell align="center">Annotate</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {datasets.map((dataset) => (
            <StyledTableRow key={`dataset-${dataset.id}`}>
              {tableColumns.map((col) => {
                const colValue = get(dataset, col.key, "");
                return (
                  <StyledTableCell key={`dataset-${dataset.id}-col-${col.key}`}>
                    {col.formatter
                      ? col.formatter(colValue, dataset)
                      : colValue}
                  </StyledTableCell>
                );
              })}
              
              <StyledTableCell align="center">
                <IconButton
                  color="secondary"
                  component="a"
                  href={`/annotations/dataset=${dataset.id}`}
                >
                  <PlayCircleFilledIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <CreateDatasetDialog
        projectId={projectId}
        open={openDialog}
        setOpen={setOpenDialog}
        handleCreate={handleCreateDataset}
      />
    </div>
  );
};

export default DatasetList;
