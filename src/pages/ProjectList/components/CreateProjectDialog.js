import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { get } from "lodash";

import TextField from "../../../components/TextField";

import ProjectService from "../../../services/ProjectService";
import "../../../assets/scss/sb-admin-2.scss";
const fields = [
  {
    name: "name",
    label: "Project name",
    helperText: "Must be unique",
    variant: "outlined",
    required: true,
    fullWidth: true,
    component: TextField,
  },
  {
    name: "description",
    label: "Description",
    variant: "outlined",
    fullWidth: true,
    component: TextField,
  },
];

const CreateProjectDialog = (props) => {
  const { open, setOpen, errors, handleSubmit, isSubmitting } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const generalError = get(errors, "error", "");

  return (
    <Dialog
      open={open || isSubmitting}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      {/* <DialogTitle id="form-dialog-title">
        Create project
        {generalError && <FormHelperText error>{generalError}</FormHelperText>}
      </DialogTitle> */}
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Create new project
        </h5>
        <button
          className="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <DialogContent>
        {fields.map((field) => {
          return <Field key={field.name} name={field.name} {...field} />;
        })}
      </DialogContent>
      <DialogActions>
        <a
          className="btn btn-secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Cancel
        </a>
        <a
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Create
        </a>
      </DialogActions>
    </Dialog>
  );
};

const CreateProjectForm = withFormik({
  mapPropsToValues: () => ({ name: "", description: "" }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
  }),

  handleSubmit: async (
    values,
    { props: { handleCreate, setOpen }, setSubmitting, setErrors }
  ) => {
    setSubmitting(true);

    try {
      const newProject = await ProjectService.createProject(values);
      handleCreate(newProject);
      setOpen(false);
    } catch (error) {
      const errMessage = get(error, "data.errors.json.project", "");
      setErrors({ error: errMessage });
    }
    setSubmitting(false);
  },
})(CreateProjectDialog);

export default CreateProjectForm;
