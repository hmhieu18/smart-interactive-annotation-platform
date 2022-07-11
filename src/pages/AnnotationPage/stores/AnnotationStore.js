import create from "zustand";
import { filter, cloneDeep, find, findIndex } from "lodash";

import LabelService from "../../../services/LabelService";
import AnnotationService from "../../../services/AnnotationService";
const useAnnotationStore = create((set, get) => ({
  isLoading: {},
  setIsLoading: (name, value) =>
    set((state) => ({ isLoading: { ...state.isLoading, [name]: value } })),

  labels: [],
  loadAnnotationLabels: async (datasetId) => {
    const setIsLoading = get().setIsLoading;
    setIsLoading("loading_dataset_labels", true);

    const labels = await LabelService.getLabelByDataset(datasetId);
    set({ labels });

    setIsLoading("loading_dataset_labels", false);
  },

  selectedAnnotationId: null,
  setSelectedAnnotationId: (newAnnotationId) => set({ selectedAnnotationId: newAnnotationId }),
  getSelectedAnnotationId: () => get().selectedAnnotationId,

  annotations: [],
  loadAnnotations: async (dataID) => {
    const setIsLoading = get().setIsLoading;
    setIsLoading("loading_annotations", true);
    let annotationsList = await AnnotationService.getAnnotationsByDataInstance(
      dataID
    );
    console.log("annotationsListstore", annotationsList)
    let annotations = [];
    annotationsList.forEach((ann) => {
      annotations.push(ann);
    });
    set({
      annotations,
    });
    setIsLoading("loading_annotations", false);
  },
  appendAnnotation: (newAnnotation) => {
    set(state => ({ annotations: [...state.annotations, newAnnotation] }))
  },
  deleteAnnotation: (deleteAnnotationId) => {
    set(state => ({
      annotations: filter(state.annotations, ann => ann.id !== deleteAnnotationId)
    }))
  },
}));

export default useAnnotationStore;
