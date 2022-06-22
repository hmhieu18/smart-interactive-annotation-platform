import create from "zustand";
import { remove } from "lodash";
import { filter } from 'lodash'

import DatasetService from "../../services/DatasetService";
import DataInstanceService from "../../services/DataInstanceService";
import LabelService from '../../services/LabelService'

const useDatasetManagementStore = create((set, get) => ({
  isLoading: {},
  dataset: {},
  dataList: [],
  selected: {},
  labels: [],

  setIsLoadingField: (name, value) =>
    set((state) => ({ isLoading: { ...state.isLoading, [name]: value } })),

  getDataset: async (datasetId) => {
    const setIsLoadingField = get().setIsLoadingField;

    setIsLoadingField("dataset", true);

    const dataset = await DatasetService.getDatasetById(datasetId);
    // .catch((err) => {
    //   alert(err.message)
    //   window.history.back()
    // })
    set({ dataset });

    setIsLoadingField("dataset", false);
  },
  updateDatasetInfo: async (newDataset) => {
    const updatedDataset = await DatasetService.updateDataset(newDataset);
    set({ dataset: updatedDataset });
  },

  getData: async (datasetId, page) => {
    const setIsLoadingField = get().setIsLoadingField;
    setIsLoadingField("dataList", true);

    const dataList = await DataInstanceService.getDataInstancesByDataset(
      datasetId,
      page
    );
    // console.log(dataList)
    set({ dataList });

    setIsLoadingField("dataList", false);
  },

  setSelectedData: (id, value) => {
    const selected = get().selected;
    set({ selected: { ...selected, [id]: value } });
  },
  deselectAll: () => {
    set({ selected: {} });
  },
  deleteSelectedData: async () => {
    const setIsLoadingField = get().setIsLoadingField;
    setIsLoadingField("deleting", true);

    const selected = get().selected;
    let dataList = [...get().dataList];

    let toDeleteData = remove(dataList, (data) => selected[data.id]);

    await Promise.all(
      toDeleteData.map((img) => DataInstanceService.deleteDataById(img.id))
    );

    set({
      selected: {},
      dataList,
    });
    setIsLoadingField("deleting", false);
  },

  deleteDataset: async (datasetId) => {
    const setIsLoadingField = get().setIsLoadingField;
    setIsLoadingField("deleting-dataset", true);

    await DatasetService.deleteDatasetById(datasetId).catch((err) => {
      alert(get(err, "data.errors[0]", "Error"));
    });

    setIsLoadingField("deleting-dataset", false);
  },
  getLabels: async (datasetID) => {
    const setIsLoadingField = get().setIsLoadingField;

    setIsLoadingField("labels", true);
    try {
      const labels = await LabelService.getLabelByDataset(datasetID);
      set({ labels: labels });
    } catch (error) {
      alert(get(error, "response.data.errors", "Error getting labels"));
    }

    setIsLoadingField("labels", false);
  },

  createLabel: async (newLabel) => {
    const createdLabel = await LabelService.createLabel(newLabel);

    const currentLabels = get().labels;
    set({
      labels: [...currentLabels, createdLabel],
    });
  },

  updateLabel: async (newLabel) => {
    const updatedLabel = await LabelService.updateLabel(newLabel);

    const newLabels = [...get().labels].map((label) => {
      if (label.id !== newLabel.id) {
        return label;
      } else {
        return updatedLabel;
      }
    });

    set({ labels: newLabels });
  },

  deleteLabel: async (deleteLabel) => {
    try {
      await LabelService.deleteLabelById(deleteLabel.id);
      const currentLabels = [...get().labels];
      const newLabels = filter(
        currentLabels,
        (label) => label.id !== deleteLabel.id
      );

      set({ labels: newLabels });
    } catch (error) {
      alert(get(error, "data.errors.json.label", ""));
    }
  },
}));

export default useDatasetManagementStore;
