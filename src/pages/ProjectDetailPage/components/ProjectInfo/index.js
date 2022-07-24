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

import DeleteIcon from '@material-ui/icons/Delete';
import SplitButton from '../../../../components/SplitButton'

import moment from "moment";
import NakedField from "../../../../components/NakedField";

import ProjectClass from "../../../../classes/ProjectClass";

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

const ProjectInfo = (props) => {
  const classes = useStyles()
  const { 
    useStore, 
    values, setFieldValue,
    errors,
    setSubmitting, setErrors
  } = props

  const project = useStore(state => state.project)
  const updateProjectInfo = useStore(state => state.updateProjectInfo)
  const deleteProject = useStore(state => state.deleteProject)
  const confirm = useConfirm()
  const history = useHistory()
  React.useEffect(() => {
    const { name, description } = project
    setFieldValue("name", name)
    setFieldValue("description", description)
  }, [project, setFieldValue])

  const handleSubmit = async () => {
    let data = cloneDeep(values)
    Object.keys(data).forEach(key => {
      if (errors[key]) {
        data[key] = project[key]
      }
    })

    const newDataset = new ProjectClass(project.id, data.name, data.description)

    try {
      await updateProjectInfo(newDataset)
    } catch (error) {
      const errMessage = get(error, 'data.errors.json.project', '')
      setErrors({ error: errMessage })
    }
    setSubmitting(false)
  }

  const [settingAnchorEl, setSettingAnchorEl] = React.useState(null);

  const handleDeleteProject = () => {
    confirm({ 
      title: `Delete project "${project.name}"`,
      description: `Project "${project.name}" and all related datasets will be deleted.`,
    })
    .then(async () => { 
      await deleteProject()
      history.replace(`/projects`)
    })
  }



  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">
          {/* <StorageIcon className={classes.storageIcon}></StorageIcon> */}
          <i class="bi bi-lightbulb" className={classes.storageIcon} style={{fontSize: "25px", margin: 10}}></i>
          {project.name}
        </h6>
        <div className="dropdown no-arrow">
          <IconButton href={`/`}>
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
          placeholder={project.description || "Add project description"}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <div className={classes.date}>
          <i class="bi bi-calendar" style={{ margin: "4px" }}></i>
          {"  Last Modified: "}
          {moment(project.modifiedDate).format("MMMM Do YYYY, h:mm")}
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
              variant="danger"
              onClick={handleDeleteProject}
              text="Delete project"
              icon={<DeleteIcon/>}
            />
          </Grid>
        </Grid>
      </div>
      
    </div>
  );
};

const ProjectInfoForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    description: "",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
  }),
})(ProjectInfo);

export default ProjectInfoForm;
