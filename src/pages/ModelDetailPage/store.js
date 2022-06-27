import create from 'zustand'

import ModelService from '../../services/ModelService'
import LabelService from '../../services/LabelService'

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
    const setIsLoadingField = get().setIsLoadingField

    setIsLoadingField("labels", true)

    const labels = await LabelService.getLabelByModel(modelId)

    set({ labels })

    setIsLoadingField("labels", false)
  },

  appendNewLabel: (newLabel) => {
    const currentLabels = get().labels
    set({
      labels: [...currentLabels, newLabel]
    })
  },
}))

export default useModelInfoStore