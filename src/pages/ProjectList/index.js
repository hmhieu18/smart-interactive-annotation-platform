import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import List from "./components/List/index";
import useProjectListStore from "./store";
import CreateProjectDialog from "./components/CreateProjectDialog";
import CreateIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 50,
    [theme.breakpoints.down("md")]: {
      padding: 10,
    },
  },
  createButton: {
    textTransform: "none",
    fontWeight: "bold",
    float: "left",
    padding: "10px 10 10 10",
  },
}));

const ProjectList = (props) => {
  const classes = useStyles();

  const queryProjects = useProjectListStore((state) => state.queryProjects);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const { useStore } = props;
  // const appendProject = useStore(state => state.appendProject)

  React.useEffect(() => {
    queryProjects();
  });
  const handleCreateProject = (newProject) => {
    // appendProject(newProject)
  };
  return (
    // <div className={classes.root}>
    //   <List useStore={useProjectListStore}/>
    // </div>
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<CreateIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              New project
            </Button>
          </div>
          <CreateProjectDialog
            open={openCreateDialog}
            setOpen={setOpenCreateDialog}
            handleCreate={handleCreateProject}
          />
          <List useStore={useProjectListStore} />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
