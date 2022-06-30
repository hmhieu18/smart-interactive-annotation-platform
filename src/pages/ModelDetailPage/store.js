import create from 'zustand'
import { filter } from 'lodash'

import ModelService from '../../services/ModelService'
import ModelLabelService from '../../services/ModelLabelService'

const useModelInfoStore = create((set, get) => ({
  isLoading: {},
  model: {},
  labels: [],
  labels: [],

  setIsLoadingField: (name, value) => set(state => ({ isLoading: { ...state.isLoading, [name]: value } })),
  getModelInfo: async (modelId) => {
    const setIsLoadingField = get().setIsLoadingField
    setIsLoadingField("model", true)

    const model = await ModelService.getModelById(modelId)
    
    if (!model) {
      alert("Not found model!")
      window.history.back()
      Location.reload()
    } else {
      set({ model })
    }
    setIsLoadingField("model", false)
  },
  updateModelInfo: async (newModel) => {
    const updatedModel = await ModelService.updateModel(newModel)
    set({ model: updatedModel })
  },
  deleteModel: async () => {
    const setIsLoadingField = get().setIsLoadingField
    
    setIsLoadingField("deleting-model", true)

    const model = get().model

    await ModelService.deleteModelById(model.id)
      .catch(err => {
        alert(get(err, 'data.errors[0]', 'Error'))
      })

    setIsLoadingField("deleting-model", false)
  },
  getLabels: async (modelId) => {
    const setIsLoadingField = get().setIsLoadingField;

    setIsLoadingField("labels", true);
    try {
      const labels = await ModelLabelService.getLabelByModel(modelId);
      set({ labels: labels });
    } catch (error) {
      alert(get(error, "response.data.errors", "Error getting labels"));
    }

    setIsLoadingField("labels", false);
  },

  createLabel: async (newLabel) => {
    const createdLabel = await ModelLabelService.createLabel(newLabel);

    const currentLabels = get().labels;
    set({
      labels: [...currentLabels, createdLabel],
    });
  },

  updateLabel: async (newLabel) => {
    const updatedLabel = await ModelLabelService.updateLabel(newLabel);

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
      await ModelLabelService.deleteLabelById(deleteLabel.id);
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
}))

export default useModelInfoStore