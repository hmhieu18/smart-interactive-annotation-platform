import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "../../../../../components/Link";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modelContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    background: "#f8f9fc",
    borderRadius: 8,
    marginBottom: 10,
    "&:hover": {
      background: "#eef2f7",
    },
    display: "flex",
  },
  avatar: {
    margin: "auto",
    width: theme.spacing(7),
    height: theme.spacing(7),
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  modelName: {
    fontWeight: "bold",
    lineHeight: 1.5,
  },
  modelDescription: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "left",
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: "#595959",
  },
}));

const ModelItem = (props) => {
  const classes = useStyles();
  const { useStore, model } = props;

  const { id, name, description, modifiedDate } = model;
  
  return (
    <Grid
      container
      className={classes.modelContainer}
      component={Link}
      to={`/models/model=${id}`}
    >
      <div className={classes.avatarContainer}>
        {/* <Avatar className={classes.avatar}>{name[0]}</Avatar> */}
        <i class="bi bi-lightbulb" style={{fontSize: "40px"}}></i>

      </div>
      <div>
        <div className={classes.modelName}>{name}</div>
        <div className={classes.modelDescription}>{description}</div>
        <div className={classes.date}>
          <i class="bi bi-calendar" style={{margin: "4px"}}></i>{"  Last Modified: "}
          {moment(modifiedDate).format("MMMM Do YYYY, hh:mm")}
        </div>
      </div>
    </Grid>
  );
};

export default ModelItem;
