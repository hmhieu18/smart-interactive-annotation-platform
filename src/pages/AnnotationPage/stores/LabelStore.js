import create from 'zustand'

import LabelService from '../../../services/LabelService'
import ModelLabelService from '../../../services/ModelLabelService'

const useLabelStore = create((set, get) => ({
  isLoading: {},
  setIsLoading: (name, value) => set(state => ({ isLoading: { ...state.isLoading, [name]: value } })),

  labels: [],
  modelLabels: [],
  labelMaps: [],

  loadDatasetLabel: async (datasetId) => {
    const setIsLoading = get().setIsLoading
    setIsLoading("loadDatasetLabel", true)

    const labels = await LabelService.getLabelByDataset(datasetId)
    set({ labels })

    setIsLoading("loadDatasetLabel", false)
  },

  loadModelLabel: async (modelId) => {
    const setIsLoading = get().setIsLoading
    setIsLoading("loadModelLabel", true)

    const modelLabels = await ModelLabelService.getLabelByModel(modelId)
    set({ modelLabels })

    setIsLoading("loadModelLabel", false)
  },
  loadLabelMaps: async (datasetId) => {
    const setIsLoading = get().setIsLoading
    setIsLoading("loadLabelMaps", true)

    const labelMaps = await LabelService.getLabelMappingByDataset(datasetId)
    set({ labelMaps: labelMaps })

    setIsLoading("loadLabelMaps", false)

  },
  createLabelMappings: async (newLabelMappings, datasetId) => {
    const createdLabelMaps = await LabelService.setLabelMapping(newLabelMappings, datasetId);

    set({
      labelMaps: createdLabelMaps,
    });
  },

  updateLabelMaps: async (newLabelMappings) => {
    const createdLabelMaps = await LabelService.editLabelMapping(newLabelMappings);

    set({
      labelMaps: createdLabelMaps,
    });
  },
}))

export default useLabelStore