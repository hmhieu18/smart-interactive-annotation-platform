import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { useParams, useHistory } from "react-router";
import { useConfirm } from "material-ui-confirm";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { get, cloneDeep } from "lodash";
import "../../../../assets/scss/sb-admin-2.scss";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import StorageIcon from "@material-ui/icons/Storage";

import moment from "moment";
import NakedField from "../../../../components/NakedField";
import SettingsMenu from "./components/SettingsMenu";

import DatasetClass from "../../../../classes/DatasetClass";
import useQuery from "../../../../utils/useQuery";

import { backendURL } from "../../../../constants/constants";
import SplitButton from "../../../../components/SplitButton";
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    padding: 20,
  },
  name: {
    fontSize: 30,
  },
  description: {
    marginTop: 20,
    lineHeight: 1.5,
    color: theme.palette.primary.dark,
  },
  instances: {
    marginTop: 10,
    fontSize: 12,
    color: theme.palette.primary.dark,
  },
  button: {
    height: "fit-content",
  },
  storageIcon: {
    margin: 10,
  },
}));

const DatasetInfo = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const confirm = useConfirm();
  const { datasetId } = useParams();
  const query = useQuery();
  const { useStore, values, setFieldValue, errors, setSubmitting, setErrors } =
    props;

  const page = JSON.parse(query.get("page") || 1);

  const dataset = useStore((state) => state.dataset);
  const deleteDataset = useStore((state) => state.deleteDataset);
  const updateDatasetInfo = useStore((state) => state.updateDatasetInfo);

  const { id, projectId, datatype, description } = dataset;

  React.useEffect(() => {
    const { name, description, createdDate } = dataset;
    setFieldValue("name", name);
    setFieldValue("description", description);
    setFieldValue("createdDate", createdDate);
  }, [dataset, setFieldValue]);

  const handleSubmit = async () => {
    let data = cloneDeep(values);
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        data[key] = dataset[key];
      }
    });

    const newDataset = new DatasetClass(
      dataset.id,
      data.name,
      projectId,
      data.datatype,
      { description: data.description }
    );

    try {
      await updateDatasetInfo(newDataset);
    } catch (error) {
      const errMessage = get(error, "data.errors.json.dataset", "");
      setErrors({ error: errMessage });
    }
    setSubmitting(false);
  };

  const [settingAnchorEl, setSettingAnchorEl] = React.useState(null);

  const handleClickSettingMenu = (event) => {
    setSettingAnchorEl(event.currentTarget);
  };

  const handleCloseSettingMenu = () => {
    setSettingAnchorEl(null);
  };

  const handleClickDeleteDataset = async () => {
    confirm({
      title: "Delete dataset",
      description: `This action can't be undone and will delete all images and annotations belong to this dataset`,
    }).then(async () => {
      await deleteDataset(datasetId);
      history.replace(`/projects/project=${projectId}`);
    });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">
          <StorageIcon className={classes.storageIcon}></StorageIcon>
          {dataset.name}
        </h6>
        <div className="dropdown no-arrow">
          <IconButton onClick={handleClickSettingMenu}>
            <SettingsIcon />
          </IconButton>
          <SettingsMenu
            anchorEl={settingAnchorEl}
            handleClickDelete={handleClickDeleteDataset}
            handleClose={handleCloseSettingMenu}
          />
          <IconButton href={`/projects/project=${projectId}`}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="card-body">
        <Field
          name={"description"}
          component={NakedField}
          className={classes.description}
          fullWidth
          onBlur={handleSubmit}
          placeholder={dataset.description || "Add dataset description"}
        />
        <div className={classes.date}>
          <i class="bi bi-calendar" style={{ margin: "4px" }}></i>
          {"  Last Modified: "}
          {moment(dataset.modifiedDate).format("MMMM Do YYYY, h:mm")}
        </div>

        <Grid
          container
          item
          xs={12}
          spacing={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item>
            <SplitButton
              variant="success"
              href={`${backendURL}/export/export_dataset?dataset_id=${id}`}
              text="Export annotated data"
              icon={<i class="bi bi-arrow-down-square-fill"></i>}
            />
          </Grid>
          <Grid item>
            <SplitButton
              variant="info"
              href={`/datasets/upload/dataset=${datasetId}`}
              text="Import data"
              icon={<i class="bi bi-cloud-arrow-up-fill"></i>}
            />
          </Grid>
          <Grid item>
            <SplitButton
              href={`/annotations/dataset=${datasetId}?page=${1}`}
              text="Annotate"
              icon={<i class="bi bi-pencil-fill"></i>}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const DatasetInfoForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    description: "",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
  }),
})(DatasetInfo);

export default DatasetInfoForm;
