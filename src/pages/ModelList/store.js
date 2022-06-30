import create from 'zustand'
import ModelService from '../../services/ModelService'

const useModelListStore = create((set, get) => ({
  isLoading: {},
  models: [],

  setIsLoading: (name, value) => set(state => ({ isLoading: { ...state.isLoading, [name]: value }})),
  queryModels: async () => {
    const models = await ModelService.getModels()
    console.log("models", models)
    set({ models })
  },
  appendModel: (newModel) => {
    const currentModels = [...get().models]
    set({ models: [...currentModels, newModel]})
  }
}))

export default useModelListStore