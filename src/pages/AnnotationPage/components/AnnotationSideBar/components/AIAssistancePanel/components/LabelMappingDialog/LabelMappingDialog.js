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

const LabelMappingDialog = (props) => {
  const [fields, setFields] = React.useState([]);
  const {
    open,
    setOpen,
    handleSave,
    datasetId,
    labelPairList,
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
    setFields([]);
    const yourOptions = [];
    yourLabels.forEach((mlabel) => {
      yourOptions.push({ value: mlabel.id, label: mlabel.label });
    });
    const modelOptions = [];
    modelLabels.forEach((mlabel) => {
      modelOptions.push({ value: mlabel.id, label: mlabel.label });
    });
    yourOptions.forEach((option, index) => {
      // console.log("xxxx labelPairList", labelPairList[index].classId)
      // console.log("option.label", get(values, option.label))
      setFields((fields) => [
        ...fields,
        {
          name: option.label,
          valueYourOption: option.label,
          valueModelOption: labelPairList?labelPairList[index]?.classId:null,
          options2: modelOptions,
          ...labelMapItem,
        },
      ]);
    });
  }, [yourLabels, modelLabels]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let data = cloneDeep(values);
    console.log("values", values);
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        return;
      }
    });

    const newListOfLabelPairs = [];
    yourLabels.forEach((label, index) => {
      newListOfLabelPairs.push({
        classId: get(values, label.label, ""),
        lableId: label.id,
      });
    });
    try {
      await handleSave(newListOfLabelPairs);
    } catch (error) {
      const errMessage = get(error, "data.errors.json.label", "");
      setErrors({ error: errMessage });
    }
    setSubmitting(false);
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
          return <Field key={field.name} name={field.name} {...field} />;
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
  // enableReinitialize: true,
  // mapPropsToValues: ({ labelPairList }) =>
  //   labelPairList.map((labelPair) => {
  //     return { [labelPair[0].label]: labelPair[1].id };
  //   }),
  // validationSchema: Yup.object().shape({
  //   label: Yup.string().required(),
  //   annotationProperties: Yup.object().shape({
  //     fill: Yup.string().required(),
  //     stroke: Yup.string().required(),
  //   }),
  // }),
})(LabelMappingDialog);

export default LabelForm;
