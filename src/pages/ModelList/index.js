import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SplitButton from "../../components/SplitButton";
import List from "./components/List/index";
import useModelListStore from "./store";
import CreateModelDialog from "./components/CreateModelDialog";
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

  const queryModels = useModelListStore((state) => state.queryModels);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  // const { useStore } = props;
  const appendModel = useModelListStore((state) => state.appendModel);

  React.useEffect(() => {
    queryModels();
  });
  const handleCreateModel = (newModel) => {
    appendModel(newModel);
  };
  return (
    // <div className={classes.root}>
    //   <List useStore={useProjectListStore}/>
    // </div>
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Models list</h1>
          <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <SplitButton
              onClick={() => setOpenCreateDialog(true)}
              text="New Model"
              icon={<i class="bi bi-plus-square-fill"></i>}
            />
          </div>
          <CreateModelDialog
            open={openCreateDialog}
            setOpen={setOpenCreateDialog}
            handleCreate={handleCreateModel}
          />
          <List useStore={useModelListStore} />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
