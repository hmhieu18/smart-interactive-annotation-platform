import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SplitButton from "../../components/SplitButton";
import List from "./components/List/index";
import useProjectListStore from "./store";
import CreateProjectDialog from "./components/CreateProjectDialog";
import "../../assets/scss/sb-admin-2.scss";

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
  // const { useStore } = props;
  const appendProject = useProjectListStore(state => state.appendProject);

  React.useEffect(() => {
    queryProjects();
  });
  const handleCreateProject = (newProject) => {
    appendProject(newProject)
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
            <SplitButton onClick={() => setOpenCreateDialog(true)} text="New Project" icon={<i class="bi bi-plus-square-fill"></i>}/>
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
