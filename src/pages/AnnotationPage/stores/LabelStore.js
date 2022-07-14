import create from "zustand";

import LabelService from "../../../services/LabelService";
import ModelLabelService from "../../../services/ModelLabelService";
import { find } from "lodash";

const useLabelStore = create((set, get) => ({
  isLoading: {},
  setIsLoading: (name, value) =>
    set((state) => ({ isLoading: { ...state.isLoading, [name]: value } })),

  labels: [],
  modelLabels: [],
  labelMaps: [],
  getModelLabelByName: (name) => {
    return find(get().modelLabels, { label: name });
  },
  getDatasetLabelIDMappedModelLabelName: (name) => {
    const modelLabel = find(get().modelLabels, { label: name });
    console.log("modelLabel", modelLabel);
    const labelMaps = get().labelMaps;
    for (const labelMap of labelMaps) {
      if (labelMap.classId === modelLabel?.id) {
        const datasetLabelId = labelMap ? labelMap.labelId : null;
        return datasetLabelId;
      }
    }
  },
  loadDatasetLabel: async (datasetId) => {
    const setIsLoading = get().setIsLoading;
    setIsLoading("loadDatasetLabel", true);

    const labels = await LabelService.getLabelByDataset(datasetId);
    set({ labels });

    setIsLoading("loadDatasetLabel", false);
  },

  loadModelLabel: async (modelId) => {
    const setIsLoading = get().setIsLoading;
    setIsLoading("loadModelLabel", true);

    const modelLabels = await ModelLabelService.getLabelByModel(modelId);
    set({ modelLabels });

    setIsLoading("loadModelLabel", false);
  },
  loadLabelMaps: async (datasetId) => {
    const setIsLoading = get().setIsLoading;
    setIsLoading("loadLabelMaps", true);

    const labelMaps = await LabelService.getLabelMappingByDataset(datasetId);
    set({ labelMaps: labelMaps });

    setIsLoading("loadLabelMaps", false);
  },
  createLabelMappings: async (newLabelMappings, datasetId) => {
    const createdLabelMaps = await LabelService.setLabelMapping(
      newLabelMappings,
      datasetId
    );

    set({
      labelMaps: newLabelMappings,
    });
  },

  updateLabelMaps: async (newLabelMappings) => {
    const createdLabelMaps = await LabelService.editLabelMapping(
      newLabelMappings
    );

    set({
      labelMaps:newLabelMappings,
    });
  },
}));

export default useLabelStore;
