import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ErrorMessage } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SelectField from "./SelectField";
import TextField from "@material-ui/core/TextField";

const StyledFormControl = withStyles((theme) => ({
  root: (props) => ({
    // width: props.fullWidth && "100% !important",
    // maxWidth: "100% !important",
    marginTop: 10,
    marginBottom: 10,
    "& label": {
      lineHeight: 1.5,
      width: "95%",
    },
    "& input:valid + fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: theme.palette.secondary.main,
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  }),
}))(FormControl);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Input = (props) => {
  const classes = useStyles();

  const {
    field = {},
    form,
    label1,
    options1,
    label2,
    options2,
    required,
    type,
    variant,
    error,
    touched,
    helperText,
    fullWidth,
    style = {},
    value,
    ...others
  } = props;
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth + (!fullWidth ? 200 : 0));
  // }, [fullWidth]);
  return (
    <Grid container spacing={3} >
      <Grid item xs>
        {/* <Paper className={classes.paper}></Paper> */}
        <TextField label={label1} {...props} disabled={true} value={value}/>
      </Grid>
      <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <i class="bi bi-arrow-right"></i>
      </Grid>
      <Grid item xs>
        <SelectField label={label2} options={options2} {...props} />
        {/* <Paper className={classes.paper}>xs</Paper> */}
      </Grid>
    </Grid>
  );
};

export default Input;
