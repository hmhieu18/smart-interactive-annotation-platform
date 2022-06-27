import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { get, set, cloneDeep } from "lodash";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withFormik, Field } from "formik";
import * as Yup from "yup";

import DoubleSelectField from "../../../../../../../../components/DoubleSelectField";

import LabelClass from "../../../../../../../../classes/LabelClass";

// import { ColorEditInput } from './ColorCell'

const labelMapItem = {
  // name: "label",
  label1: "Your Label",
  label2: "Model's Label",
  placeholder: "new label",
  variant: "outlined",
  required: true,
  fullWidth: true,
  autoFocus: true,
  margin: "dense",
  component: DoubleSelectField,
};

const fields = []
const yourOptions = []
const LabelMappingDialog = (props) => {
  // const [fields, setFields] = React.useState([]);
  // const [yourOptions, setYourOptions] = React.useState([]);
  const [modelOptions, setModelOptions] = React.useState([]);
  const {
    open,
    setOpen,
    handleSave,
    datasetId,
    label,
    values,
    setFieldValue,
    errors,
    isSubmitting,
    setSubmitting,
    setErrors,
    yourLabels,
    modelLabels,
  } = props;

  React.useEffect(() => {
    yourOptions.splice()
    fields.splice()
    // console.log("yourLabels", yourLabels);
    yourLabels.forEach((label) => {
      // console.log("yourOptions", [
      //     ...yourOptions,
      //     { value: label.id, label: label.label },
      //   ])
      // setYourOptions((yourOptions) => [
      //   ...yourOptions,
      //   { value: label.id, label: label.label },
      // ]);
      yourOptions.push({ value: label.id, label: label.label })
    });
    // console.log("yourOptions", yourOptions);
    yourOptions.forEach((option, index) => {
      // setFields((fields) => [
      //   ...fields,
      //   { id: index, name: index, options1: [option], ...labelMapItem },
      // ]);
      fields.push({ id: index, name: index,value: option.label, options1: [], ...labelMapItem })
    });
    // console.log(fields);
  }, [yourLabels]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let data = cloneDeep(values);
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        return;
      }
    });

    const newListOfLabelPairs = [];
    yourLabels.forEach((label, index) => {
      newListOfLabelPairs.push({classID: modelLabel[index].id, lableID: label.id})
    }) 
    try {
      await handleSave(newListOfLabelPairs)
    } catch (error) {
      const errMessage = get(error, 'data.errors.json.label', '')
      setErrors({ error: errMessage })
    }
    setSubmitting(false)
    };

  const generalError = get(errors, "error", "");

  return (
    <Dialog
      open={open || isSubmitting}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Label Mapping
        {generalError && <FormHelperText error>{generalError}</FormHelperText>}
      </DialogTitle>
      <DialogContent>
        {fields.map((field) => {
          console.log(field.id);
          return <Field key={field.id} {...field} />;
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LabelForm = withFormik({
  // mapPropsToValues: ({ labelPairsList }) => (
  //   fields.forEach((field, index)=>{
  //     const list = []
  //     list.push({ id: index, name: index, options1: [option], options2: [labelPairsList[index]], ...labelMapItem })
  //   })
  // ),
  validationSchema: Yup.object().shape({
    label: Yup.string().required(),
    annotationProperties: Yup.object().shape({
      fill: Yup.string().required(),
      stroke: Yup.string().required(),
    }),
  }),
})(LabelMappingDialog);

export default LabelForm;
