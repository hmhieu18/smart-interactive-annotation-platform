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
import SelectField from "../../../components/SelectField";
import { DATASET_DATATYPE, FEATURE_TYPE } from '../../../constants/constants'

import ModelService from "../../../services/ModelService";
import "../../../assets/scss/sb-admin-2.scss";
const fields = [
  {
    name: "name",
    label: "Model name",
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
  {
    name: "URL",
    label: "URL",
    variant: "outlined",
    fullWidth: false,
    component: TextField,
  },
  {
    name: 'input',
    label: 'Input Datatype',
    variant: 'outlined',
    options:[
      { value: DATASET_DATATYPE.IMAGE, label: 'Image' },
      { value: DATASET_DATATYPE.VIDEO, label: 'Video' },
    ],
    required: false,
    fullWidth: true,
    component: SelectField,
  },
  {
    name: "output",
    label: "Output",
    variant: "outlined",
    fullWidth: false,
    component: TextField,
  },  
  {
    name: 'feature',
    label: 'Model\'s Feature',
    variant: 'outlined',
    options:[
      { value: FEATURE_TYPE.EVENT, label: 'Event Annotation' },
      { value: FEATURE_TYPE.BBOX, label: 'Bounding-box Annotation' },
    ],
    required: true,
    fullWidth: true,
    component: SelectField,
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
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Create new model
        {generalError && <FormHelperText error>{generalError}</FormHelperText>}

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
      console.log("values", values)
      const newProject = await ModelService.createModel(values);
      handleCreate(newProject);
      setOpen(false);
    } catch (error) {
      const errMessage = get(error, "data");
      setErrors({ error: errMessage });
    }
    setSubmitting(false);
  },
})(CreateProjectDialog);

export default CreateProjectForm;
