import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Link from "../../../../../components/Link";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  projectContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    background: "#ffffff",
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
    margin: 8,
  },
  projectName: {
    fontWeight: "bold",
    lineHeight: 1.5,
  },
  projectDescription: {
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

const ProjectItem = (props) => {
  const classes = useStyles();
  const { useStore, project } = props;

  const { id, name, description, date_created } = project;

  return (
    <Grid
      container
      className={classes.projectContainer}
      component={Link}
      to={`/projects/project=${id}`}
    >
      <div className={classes.avatarContainer}>
        <Avatar className={classes.avatar}>{name[0]}</Avatar>
      </div>
      <div>
        <div className={classes.projectName}>{name}</div>
        <div className={classes.projectDescription}>{description}</div>
        <div className={classes.date}>
          <i class="bi bi-calendar"></i>{" "}
          {moment(date_created).format("MMMM Do YYYY, h:mm")}
        </div>
      </div>
    </Grid>
  );
};

export default ProjectItem;
