import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { find } from "lodash";
import { useParams, useHistory } from "react-router";
import { get } from "lodash";

import { useDatasetStore, useAnnotationStore } from "../../../../stores/index";
import useQuery from "../../../../../../utils/useQuery";

import { IMAGES_PER_PAGE } from "../../../../constants";
import ArrowRightIcon from "@material-ui/icons/ChevronRightRounded";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreRounded";

import DataInstanceInfo from "./DataInstanceInfo";
import DataPagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  header: {
    cursor: "pointer",
    background: theme.palette.primary.dark,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },
  titleCount: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    minWidth: 30,
    fontSize: 12,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
  },
  divider: {
    background: theme.palette.secondary.main,
  },
  listContainer: {
    width: "100%",
    padding: 0,
    background: theme.palette.primary.light,
  },
}));

const ObjectInfoPanel = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const { datasetId } = useParams();
  let query = useQuery();
  let history = useHistory();
  const page = JSON.parse(query.get("page") || 1);

  const annotationsList = useAnnotationStore((state) => state.annotations);
  const updateAnnotations = useAnnotationStore(
    (state) => state.updateAnnotations
  );

  const dataset = useDatasetStore((state) => state.dataset);
  const dataInstances = useDatasetStore((state) => state.dataInstances);
  const instanceId = useDatasetStore((state) => state.instanceId);
  const setInstanceId = useDatasetStore((state) => state.setInstanceId);
  const saveStatus = useAnnotationStore((state) => state.saveStatus);

  const handleChangeInstanceId = (id) => {
    if (!saveStatus) {
      console.log("handleChangeInstanceId not save");
      if (window.confirm("Save before leaving?")) {
        updateAnnotations(instanceId, annotationsList);
      }
    }
    setInstanceId(id);
  };
  useEffect(() => {
    if (dataInstances) {
      if (instanceId) {
        const instanceIndex = dataInstances.findIndex(
          (instance) => instance.id == instanceId
        );
        const newPage = Number.parseInt(instanceIndex / IMAGES_PER_PAGE) + 1;
        if (page != newPage) {
          handlePageChange(null, newPage);
        }
      }
    }
  }, [dataInstances, instanceId]);

  const instances = get(dataset, "instances", 0);
  const maxPage = Number.parseInt(
    instances / IMAGES_PER_PAGE + Boolean(instances % IMAGES_PER_PAGE)
  );
  const handlePageChange = (e, val) => {
    let newPage = val;
    newPage = Math.max(Math.min(maxPage, newPage), 1);

    if (newPage !== page) {
      history.replace(`/annotations/dataset=${datasetId}?page=${newPage}`);
    }
  };

  const checkInPage = (ind) => {
    return (page - 1) * IMAGES_PER_PAGE <= ind && ind < page * IMAGES_PER_PAGE;
  };

  return (
    <div className="card shadow mb-4">
      <a
        // href="#collapseCardExample"
        className="d-block card-header py-3"
        data-toggle="collapse"
        role="button"
        aria-expanded="true"
        aria-controls="collapseCardExample"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {/* <h6 className="m-0 font-weight-bold text-primary">Data List</h6>
      <Grid item className={classes.titleCount}>{dataset.instances}</Grid> */}
        <Grid container item xs={8} direction="row" alignItems="center">
          <Grid item className="m-0 font-weight-bold text-primary">
            Data samples
          </Grid>
          <Grid item className={classes.titleCount}>
            {dataset.instances}
          </Grid>
        </Grid>
      </a>
      <Collapse in={isOpen} className="collapse show">
          <List className={classes.listContainer}>
            <DataPagination
              page={page}
              count={maxPage}
              handlePageChange={handlePageChange}
            />
            {dataInstances.map((instance, ind) => {
              if (!checkInPage(ind)) return;
              return (
                <DataInstanceInfo
                  key={instance.id}
                  dataInstance={instance}
                  isSelected={instance.id === instanceId}
                  setSelectedInstanceId={handleChangeInstanceId}
                />
              );
            })}
          </List>
      </Collapse>
    </div>
  );
};

export default ObjectInfoPanel;
