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
import { Robot } from "../../../../components/icons/RobotIcon";
import moment from "moment";
import NakedField from "../../../../components/NakedField";
import SettingsMenu from "./components/SettingsMenu";

import ModelClass from "../../../../classes/ModelClass";

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
  date: {
    marginTop: 10,
    fontSize: 14,
    color: "#595959",
  },
}));

const ModelInfo = (props) => {
  const classes = useStyles();
  const { useStore, values, setFieldValue, errors, setSubmitting, setErrors } =
    props;

  const model = useStore((state) => state.model);
  const updateModelInfo = useStore((state) => state.updateModelInfo);
  const deleteModel = useStore((state) => state.deleteModel);
  const confirm = useConfirm();
  const history = useHistory();
  React.useEffect(() => {
    const { name, description, URL } = model;
    setFieldValue("name", name);
    setFieldValue("description", description);
    setFieldValue("url", URL);
  }, [model, setFieldValue]);

  const handleSubmit = async () => {
    let data = cloneDeep(values);
    console.log("data", data);
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        data[key] = model[key];
      }
    });

    const newDataset = new ModelClass(
      model.id,
      data.name,
      data.description,
      model.input,
      model.output,
      model.feature,
      data.url
    );
    console.log("newDataset", newDataset);

    try {
      await updateModelInfo(newDataset);
    } catch (error) {
      const errMessage = get(error, "data.errors.json.model", "");
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

  const handleDeleteModel = () => {
    confirm({
      title: `Delete model "${model.name}"`,
      description: `This action is permanent! You'll lost all dataset and annotations in this model.`,
    }).then(async () => {
      await deleteModel();
      history.replace(`/models`);
    });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">
          {/* <StorageIcon className={classes.storageIcon}></StorageIcon> */}
          <Robot
            className={classes.storageIcon}
            style={{ fontSize: "25px", margin: 10, width: 20, height: 20 }}
          ></Robot>
          {model.name}
        </h6>
        <div className="dropdown no-arrow">
          <IconButton onClick={handleClickSettingMenu}>
            <SettingsIcon />
          </IconButton>
          <SettingsMenu
            anchorEl={settingAnchorEl}
            handleClickDelete={handleDeleteModel}
            handleClose={handleCloseSettingMenu}
          />
          <IconButton href={`/`}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="card-body">
        <Field
          name={"url"}
          component={NakedField}
          className={classes.description}
          fullWidth
          onBlur={handleSubmit}
          placeholder={model.URL || "Config model's API endpoint"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <Field
          name={"description"}
          component={NakedField}
          className={classes.description}
          fullWidth
          onBlur={handleSubmit}
          placeholder={model.description || "Add model description"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <div className={classes.date}>
          <i class="bi bi-calendar" style={{ margin: "4px" }}></i>
          {"  Last Modified: "}
          {moment(model.modifiedDate).format("MMMM Do YYYY, h:mm")}
        </div>
      </div>
    </div>
  );
};

const ModelInfoForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    description: "",
    url: "",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    url: Yup.string(),
  }),
})(ModelInfo);

export default ModelInfoForm;
